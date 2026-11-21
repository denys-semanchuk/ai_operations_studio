// Génère public/offre-systeme.pdf à partir de offre.html (Chromium via Playwright).
//
// Le build s'arrête avec une erreur, sans produire de PDF, si :
//  - une police du site (Outfit, Plus Jakarta Sans) ne se charge pas ou si
//    Chromium dessine du texte avec une autre police (police de secours) ;
//  - le contenu dépasse la page A4 ou entre dans les marges de 12 mm ;
//  - un texte fait moins de 9 pt.

import { mkdir, stat } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright";
import QRCode from "qrcode";

const here = dirname(fileURLToPath(import.meta.url));
const template = join(here, "offre.html");
const output = join(here, "..", "..", "public", "offre-systeme.pdf");

const QR_URL = "https://ai-operations.studio/contact";
const EXPECTED_FACES = 6; // Outfit 400/700/800 + Plus Jakarta Sans 400/600/700
const ALLOWED_FONTS = /^(Outfit|Plus Jakarta Sans)\b/;
const MIN_MARGIN_MM = 12;
const MIN_FONT_PT = 9;

const fail = (msg) => {
  console.error(`\n✗ ${msg}\n`);
  process.exit(1);
};

const qrSvg = await QRCode.toString(QR_URL, {
  type: "svg",
  errorCorrectionLevel: "M",
  margin: 4,
  color: { dark: "#131634", light: "#ffffff" },
});

const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  const failed = [];
  page.on("requestfailed", (r) => failed.push(`${r.url()} (${r.failure()?.errorText})`));

  await page.goto(pathToFileURL(template).href, { waitUntil: "load" });
  await page.emulateMedia({ media: "print" });
  await page.evaluate((svg) => {
    document.getElementById("qr").innerHTML = svg;
  }, qrSvg);

  // 1. Polices : toutes chargées.
  const faces = await page.evaluate(async () => {
    await Promise.allSettled([...document.fonts].map((f) => f.load()));
    await document.fonts.ready;
    return [...document.fonts].map((f) => ({ family: f.family, weight: f.weight, status: f.status }));
  });
  const notLoaded = faces.filter((f) => f.status !== "loaded");
  if (failed.length || notLoaded.length || faces.length !== EXPECTED_FACES) {
    fail(
      "Les polices du site ne se chargent pas, PDF non généré.\n" +
        [...failed.map((u) => `  requête échouée : ${u}`), ...faces.map((f) => `  ${f.family} ${f.weight} : ${f.status}`)].join("\n")
    );
  }

  // 2. Polices réellement utilisées pour dessiner le texte (pas de police de secours).
  const cdp = await page.context().newCDPSession(page);
  await cdp.send("DOM.enable");
  await cdp.send("CSS.enable");
  const { root } = await cdp.send("DOM.getDocument", { depth: -1 });
  const { nodeIds } = await cdp.send("DOM.querySelectorAll", { nodeId: root.nodeId, selector: "body *" });
  const used = new Set();
  for (const nodeId of nodeIds) {
    const { fonts } = await cdp.send("CSS.getPlatformFontsForNode", { nodeId });
    for (const f of fonts) used.add(f.familyName);
  }
  const foreign = [...used].filter((n) => !ALLOWED_FONTS.test(n));
  if (foreign.length) fail(`Texte dessiné avec une police hors charte : ${foreign.join(", ")}`);

  // 3. Mise en page : une page A4, marges, taille minimale du texte.
  const layout = await page.evaluate(
    ({ minMarginMm, minFontPt }) => {
      const mm = 96 / 25.4;
      const p = document.querySelector(".page");
      const box = p.getBoundingClientRect();
      const problems = [];
      if (p.scrollHeight > p.clientHeight + 0.5 || p.scrollWidth > p.clientWidth + 0.5) {
        problems.push(`contenu plus grand que la page (${p.scrollWidth}×${p.scrollHeight} px pour ${p.clientWidth}×${p.clientHeight})`);
      }
      const inner = {
        left: box.left + minMarginMm * mm - 0.5,
        top: box.top + minMarginMm * mm - 0.5,
        right: box.right - minMarginMm * mm + 0.5,
        bottom: box.bottom - minMarginMm * mm + 0.5,
      };
      const label = (el) => `${el.tagName.toLowerCase()}${el.className && typeof el.className === "string" ? "." + el.className.split(" ").join(".") : ""} « ${(el.textContent || "").trim().slice(0, 40)} »`;
      for (const el of p.querySelectorAll("*")) {
        const r = el.getBoundingClientRect();
        if (!r.width || !r.height) continue;
        if (r.left < inner.left || r.top < inner.top || r.right > inner.right || r.bottom > inner.bottom) {
          problems.push(`hors des marges de ${minMarginMm} mm : ${label(el)}`);
        }
        const hasText = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
        const pt = (parseFloat(getComputedStyle(el).fontSize) * 72) / 96;
        if (hasText && pt < minFontPt - 0.01) problems.push(`texte de ${pt.toFixed(2)} pt : ${label(el)}`);
      }
      return { problems };
    },
    { minMarginMm: MIN_MARGIN_MM, minFontPt: MIN_FONT_PT }
  );
  if (layout.problems.length) fail("Mise en page :\n  " + layout.problems.join("\n  "));

  await mkdir(dirname(output), { recursive: true });
  await page.pdf({ path: output, preferCSSPageSize: true, printBackground: true, tagged: true });

  const { size } = await stat(output);
  console.log(`✓ ${output}`);
  console.log(`  ${Math.round(size / 1024)} Ko · polices : ${[...used].sort().join(", ")}`);
  console.log(`  QR : ${QR_URL}`);
} finally {
  await browser.close();
}
