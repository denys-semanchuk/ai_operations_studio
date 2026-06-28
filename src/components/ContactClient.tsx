"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Send, Zap, Plus, CheckCircle2, Calendar as CalendarIcon, Clock, Phone, Building2 } from "lucide-react";
import TiltCard from "@/components/TiltCard";

export default function ContactClient() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quickLeadSubmitted, setQuickLeadSubmitted] = useState(false);

  // Form bound states
  const [messageText, setMessageText] = useState("");
  const [selectedService, setSelectedService] = useState("faq");

  // Quick Lead simulation states
  const [agencyName, setAgencyName] = useState("");
  const [agencyPhone, setAgencyPhone] = useState("");
  const [agencyNote, setAgencyNote] = useState("");

  // Interactive booking states
  const [bookedDay, setBookedDay] = useState("");
  const [bookedTime, setBookedTime] = useState("");
  const [sidebarTab, setSidebarTab] = useState<"calendar" | "crm">("calendar");

  const bookingDates = (() => {
    const DAY_NAMES = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    const MONTH_SHORT = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"];
    const result = [];
    const d = new Date();
    d.setDate(d.getDate() + 1);
    while (result.length < 8) {
      const dow = d.getDay();
      if (dow !== 0 && dow !== 6) {
        result.push({
          label: `${d.getDate()} ${MONTH_SHORT[d.getMonth()]}`,
          name: `${DAY_NAMES[dow]} ${d.getDate()} ${MONTH_SHORT[d.getMonth()]}`,
          status: "disponible",
        });
      }
      d.setDate(d.getDate() + 1);
    }
    return result;
  })();

  const timeSlots = [
    { time: "10:00", status: "disponible" },
    { time: "11:30", status: "disponible" },
    { time: "14:00", status: "occupé" },
    { time: "15:30", status: "disponible" },
  ];

  const selectBookingSlot = (dayName: string, timeVal: string, dayStatus: string, timeStatus: string) => {
    if (dayStatus === "occupé" || timeStatus === "occupé") return;
    setBookedDay(dayName);
    setBookedTime(timeVal);
    setSelectedService("audit");
    setMessageText(`Bonjour Denys, je souhaite réserver un créneau d'audit gratuit pour mon agence le ${dayName} à ${timeVal}. Nous cherchons à automatiser nos processus.`);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(false);
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("ct-name"),
          phone: data.get("ct-phone"),
          email: data.get("ct-email"),
          service: selectedService,
          message: messageText,
          bookedDay,
          bookedTime,
        }),
      });
      if (res.ok) {
        setFormSubmitted(true);
        form.reset();
        setTimeout(() => {
          setFormSubmitted(false);
          setMessageText("");
          setBookedDay("");
          setBookedTime("");
        }, 6000);
      } else {
        setFormError(true);
      }
    } catch {
      setFormError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agencyName || !agencyPhone) return;
    setQuickLeadSubmitted(true);
    setTimeout(() => {
      setQuickLeadSubmitted(false);
      setAgencyName("");
      setAgencyPhone("");
      setAgencyNote("");
    }, 5000);
  };

  return (
    <div className="page-wrapper container">
      {/* Intro */}
      <motion.div
        className="contact-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="section-label text-gradient">Audit Gratuit · 30 min</span>
        <h1 className="contact-title font-primary">Discutons de votre projet IA</h1>
        <p className="contact-subtitle">
          Planifiez un audit opérationnel gratuit ou utilisez notre assistant de réservation pour pré-remplir votre demande instantanément.
        </p>
      </motion.div>

      <div className="contact-layout">
        {/* Left Column: Form */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <TiltCard className="ct-form-panel">
            <div className="ct-panel-header">
              <div className="ct-panel-icon-wrap">
                <Send size={18} />
              </div>
              <div>
                <h3 className="ct-panel-title">Demande d&apos;audit opérationnel</h3>
                <p className="ct-panel-subtitle">Réponse sous 24 heures garantie</p>
              </div>
            </div>

            {formSubmitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="ct-success-msg">
                <div className="ct-success-icon-wrap">
                  <CheckCircle2 size={36} />
                </div>
                <h4>Demande reçue !</h4>
                <p>Denys vous contactera sous 24h pour valider votre créneau d&apos;audit.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleFormSubmit} className="ct-form">
                <div className="ct-form-row">
                  <div className="ct-form-group">
                    <label htmlFor="ct-name">Nom / Agence <span className="ct-required">*</span></label>
                    <div className="ct-input-wrap">
                      <Building2 size={16} className="ct-input-icon" />
                      <input id="ct-name" name="ct-name" type="text" required placeholder="Ex: Agence Immobilière de Bezons" className="ct-input" />
                    </div>
                  </div>
                  <div className="ct-form-group">
                    <label htmlFor="ct-phone">Téléphone</label>
                    <div className="ct-input-wrap">
                      <Phone size={16} className="ct-input-icon" />
                      <input id="ct-phone" name="ct-phone" type="tel" placeholder="+33 6 12 34 56 78" className="ct-input" />
                    </div>
                  </div>
                </div>

                <div className="ct-form-group">
                  <label htmlFor="ct-email">Adresse E-mail <span className="ct-required">*</span></label>
                  <div className="ct-input-wrap">
                    <Mail size={16} className="ct-input-icon" />
                    <input id="ct-email" name="ct-email" type="email" required placeholder="contact@votre-agence.com" className="ct-input" />
                  </div>
                </div>

                <div className="ct-form-group">
                  <label htmlFor="ct-service">Type d&apos;intégration souhaitée</label>
                  <div className="ct-select-wrap">
                    <select 
                      id="ct-service" 
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="ct-select"
                    >
                      <option value="faq">IA FAQ & Auto-Replies</option>
                      <option value="combo">Combo Web + IA Agent</option>
                      <option value="crm">Qualification & CRM Sync</option>
                      <option value="booking">Booking & Automations Relance</option>
                      <option value="audit">Audit opérationnel gratuit</option>
                    </select>
                  </div>
                </div>

                <div className="ct-form-group">
                  <label htmlFor="ct-message">Message ou créneau choisi</label>
                  <textarea 
                    id="ct-message" 
                    rows={4} 
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Ex: Nous recevons 100 leads/mois via SeLoger et les traitons à la main sur Excel..." 
                    className="ct-textarea"
                  ></textarea>
                </div>

                {formError && (
                  <p className="ct-form-error">Erreur d'envoi. Écrivez directement à <a href="mailto:denys@aioperations.studio">denys@aioperations.studio</a></p>
                )}
                <button type="submit" className="btn btn-primary ct-submit shine-hover" disabled={isSubmitting}>
                  <Send size={16} />
                  <span>{isSubmitting ? "Envoi en cours..." : "Envoyer ma demande d'audit"}</span>
                </button>
              </form>
            )}
          </TiltCard>
        </motion.div>

        {/* Right Column: Unified Console */}
        <motion.div
          className="ct-sidebar"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <TiltCard className="ct-console">
            {/* Console Tabs */}
            <div className="ct-tabs">
              <button 
                type="button"
                className={`ct-tab ${sidebarTab === "calendar" ? "active" : ""}`}
                onClick={() => setSidebarTab("calendar")}
              >
                <CalendarIcon size={14} />
                <span>Agenda</span>
              </button>
              <button 
                type="button"
                className={`ct-tab ${sidebarTab === "crm" ? "active" : ""}`}
                onClick={() => setSidebarTab("crm")}
              >
                <Zap size={14} />
                <span>Terminal CRM</span>
              </button>
            </div>

            {/* Tab content */}
            <div className="ct-console-body">
              <AnimatePresence mode="wait">
                {sidebarTab === "calendar" ? (
                  <motion.div
                    key="cal"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="ct-tab-desc">
                      Choisissez un créneau pour pré-remplir automatiquement le formulaire.
                    </p>

                    <div className="ct-cal-grid">
                      <span className="ct-cal-label">Jour</span>
                      <div className="ct-days-row">
                        {bookingDates.map((day) => (
                          <button
                            key={day.name}
                            type="button"
                            onClick={() => selectBookingSlot(day.name, bookedTime || "10:00", day.status, "disponible")}
                            className={`ct-day-btn ${bookedDay === day.name ? "active" : ""} ${day.status === "occupé" ? "busy" : ""}`}
                            disabled={day.status === "occupé"}
                          >
                            {day.label}
                          </button>
                        ))}
                      </div>

                      <span className="ct-cal-label">Heure</span>
                      <div className="ct-times-row">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot.time}
                            type="button"
                            onClick={() => selectBookingSlot(bookedDay || "Lundi 29 Juin", slot.time, "disponible", slot.status)}
                            className={`ct-time-btn ${bookedTime === slot.time ? "active" : ""} ${slot.status === "occupé" ? "busy" : ""}`}
                            disabled={slot.status === "occupé"}
                          >
                            <Clock size={12} />
                            <span>{slot.time}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {bookedDay && bookedTime && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }} 
                        animate={{ opacity: 1, scale: 1 }} 
                        className="ct-booking-confirm"
                      >
                        <CheckCircle2 size={14} />
                        <span>Pré-sélectionné : {bookedDay} à {bookedTime}</span>
                      </motion.div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="crm"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="ct-tab-desc">
                      Testez l&apos;insertion d&apos;un prospect dans notre CRM simulé.
                    </p>

                    {quickLeadSubmitted ? (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="ct-quick-success">
                        <CheckCircle2 size={24} />
                        <p>Lead inséré avec succès dans le CRM !</p>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleQuickLeadSubmit} className="ct-quick-form">
                        <div className="ct-input-wrap">
                          <Building2 size={16} className="ct-input-icon" />
                          <input
                            type="text"
                            required
                            value={agencyName}
                            onChange={(e) => setAgencyName(e.target.value)}
                            placeholder="Nom de l'agence *"
                            className="ct-input"
                          />
                        </div>
                        <div className="ct-input-wrap">
                          <Phone size={16} className="ct-input-icon" />
                          <input
                            type="tel"
                            required
                            value={agencyPhone}
                            onChange={(e) => setAgencyPhone(e.target.value)}
                            placeholder="Téléphone *"
                            className="ct-input"
                          />
                        </div>
                        <textarea
                          rows={2}
                          value={agencyNote}
                          onChange={(e) => setAgencyNote(e.target.value)}
                          placeholder="Note rapide (ex: souhaite le Combo Web+IA)"
                          className="ct-textarea"
                        ></textarea>
                        <button type="submit" className="btn btn-secondary ct-quick-submit shine-hover">
                          <Plus size={16} />
                          <span>Insérer le Lead</span>
                        </button>
                      </form>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Console Footer */}
            <div className="ct-console-footer">
              <div className="ct-footer-brand">AI Operations Studio</div>
              <div className="ct-footer-items">
                <div className="ct-footer-item">
                  <MapPin size={12} />
                  <span>Bezons (95870), Val-d&apos;Oise</span>
                </div>
                <div className="ct-footer-item">
                  <Mail size={12} />
                  <a href="mailto:denys@aioperations.studio">denys@aioperations.studio</a>
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>

      {styleContact}
    </div>
  );
}

const styleContact = (
  <style jsx global>{`
    /* ──────────────────── HEADER ──────────────────── */
    .contact-header {
      text-align: center;
      margin-bottom: 3rem;
    }
    .contact-title {
      font-size: 2.75rem;
      color: white;
      margin-top: 0.5rem;
      margin-bottom: 1.25rem;
      letter-spacing: -0.02em;
    }
    .contact-subtitle {
      font-size: 1.1rem;
      color: var(--text-muted);
      max-width: 620px;
      margin: 0 auto;
      line-height: 1.65;
    }

    /* ──────────────────── LAYOUT ──────────────────── */
    .contact-layout {
      display: grid;
      grid-template-columns: 1.3fr 1fr;
      gap: 2.5rem;
      align-items: start;
    }

    /* ──────────────────── FORM PANEL ──────────────────── */
    .ct-form-panel {
      padding: 2.75rem !important;
      border: 1px solid rgba(99, 102, 241, 0.12) !important;
      background: linear-gradient(145deg, rgba(15, 20, 50, 0.5) 0%, rgba(5, 8, 22, 0.5) 100%) !important;
    }
    .ct-panel-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 2.25rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }
    .ct-panel-icon-wrap {
      width: 42px;
      height: 42px;
      border-radius: 12px;
      background: var(--gradient-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      flex-shrink: 0;
    }
    .ct-panel-title {
      font-size: 1.35rem;
      color: white;
      margin-bottom: 0.15rem;
    }
    .ct-panel-subtitle {
      font-size: 0.85rem;
      color: var(--text-muted);
    }

    /* ──────────────────── FORM ELEMENTS ──────────────────── */
    .ct-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    .ct-form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.25rem;
    }
    .ct-form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .ct-form-group label {
      font-size: 0.82rem;
      font-weight: 600;
      color: var(--text-muted);
      letter-spacing: 0.02em;
    }
    .ct-required {
      color: var(--secondary);
    }
    .ct-input-wrap {
      position: relative;
      display: flex;
      align-items: center;
    }
    .ct-input-icon {
      position: absolute;
      left: 1rem;
      color: var(--text-dim);
      pointer-events: none;
      z-index: 1;
    }
    .ct-input {
      width: 100%;
      background: rgba(0, 0, 0, 0.25);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 10px;
      padding: 0.8rem 1rem 0.8rem 2.75rem;
      color: white;
      font-size: 0.9rem;
      outline: none;
      transition: all 0.3s ease;
      font-family: inherit;
    }
    .ct-input::placeholder {
      color: var(--text-dim);
    }
    .ct-input:focus {
      border-color: rgba(14, 165, 233, 0.5);
      background: rgba(0, 0, 0, 0.35);
      box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.08), 0 0 20px rgba(14, 165, 233, 0.1);
    }
    .ct-textarea {
      width: 100%;
      background: rgba(0, 0, 0, 0.25);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 10px;
      padding: 0.8rem 1rem;
      color: white;
      font-size: 0.9rem;
      outline: none;
      transition: all 0.3s ease;
      font-family: inherit;
      resize: vertical;
    }
    .ct-textarea::placeholder {
      color: var(--text-dim);
    }
    .ct-textarea:focus {
      border-color: rgba(14, 165, 233, 0.5);
      background: rgba(0, 0, 0, 0.35);
      box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.08), 0 0 20px rgba(14, 165, 233, 0.1);
    }

    /* ─── Custom Select ─── */
    .ct-select-wrap {
      position: relative;
    }
    .ct-select-wrap::after {
      content: '▾';
      font-size: 1rem;
      color: var(--text-dim);
      position: absolute;
      right: 1.15rem;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none;
    }
    .ct-select {
      width: 100%;
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      background: rgba(0, 0, 0, 0.25);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 10px;
      padding: 0.8rem 2.5rem 0.8rem 1rem;
      color: white;
      font-size: 0.9rem;
      outline: none;
      cursor: pointer;
      transition: all 0.3s ease;
      font-family: inherit;
    }
    .ct-select:focus {
      border-color: rgba(14, 165, 233, 0.5);
      background: rgba(0, 0, 0, 0.35);
      box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.08), 0 0 20px rgba(14, 165, 233, 0.1);
    }
    .ct-select option {
      background: #0a0f1e;
      color: white;
    }

    /* ─── Submit Button ─── */
    .ct-submit {
      width: 100%;
      margin-top: 0.5rem;
      padding: 0.9rem 1.5rem;
      font-size: 0.95rem;
      justify-content: center;
      gap: 0.6rem;
    }
    .ct-submit:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    .ct-form-error {
      font-size: 0.85rem;
      color: #ef4444;
      background: rgba(239, 68, 68, 0.08);
      border: 1px solid rgba(239, 68, 68, 0.2);
      border-radius: 8px;
      padding: 0.7rem 1rem;
    }
    .ct-form-error a {
      color: #ef4444;
      text-decoration: underline;
    }

    /* ──────────────────── SUCCESS ──────────────────── */
    .ct-success-msg {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 1rem;
      padding: 4rem 2rem;
    }
    .ct-success-icon-wrap {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: rgba(16, 185, 129, 0.1);
      border: 1px solid rgba(16, 185, 129, 0.25);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #10b981;
    }
    .ct-success-msg h4 {
      font-size: 1.3rem;
      color: white;
    }
    .ct-success-msg p {
      font-size: 0.95rem;
      color: var(--text-muted);
      line-height: 1.5;
      max-width: 320px;
    }

    /* ──────────────────── CONSOLE CARD ──────────────────── */
    .ct-sidebar {
      position: sticky;
      top: 6rem;
    }
    .ct-console {
      padding: 0 !important;
      border: 1px solid rgba(14, 165, 233, 0.15) !important;
      background: linear-gradient(160deg, rgba(10, 16, 40, 0.6) 0%, rgba(5, 8, 22, 0.6) 100%) !important;
      overflow: hidden;
    }

    /* ─── Tabs ─── */
    .ct-tabs {
      display: flex;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }
    .ct-tab {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 1rem 0.75rem;
      background: transparent;
      border: none;
      color: var(--text-dim);
      cursor: pointer;
      font-size: 0.85rem;
      font-weight: 600;
      transition: all 0.25s ease;
      position: relative;
      font-family: inherit;
    }
    .ct-tab:hover {
      color: var(--text-muted);
      background: rgba(255, 255, 255, 0.02);
    }
    .ct-tab.active {
      color: white;
      background: rgba(14, 165, 233, 0.05);
    }
    .ct-tab.active::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 15%;
      right: 15%;
      height: 2px;
      background: var(--gradient-primary);
      border-radius: 2px 2px 0 0;
    }

    /* ─── Tab Body ─── */
    .ct-console-body {
      padding: 1.75rem;
      min-height: 280px;
    }
    .ct-tab-desc {
      font-size: 0.85rem;
      color: var(--text-muted);
      line-height: 1.5;
      margin-bottom: 1.5rem;
    }

    /* ─── Calendar ─── */
    .ct-cal-grid {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    .ct-cal-label {
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--text-dim);
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }
    .ct-days-row {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 0.4rem;
    }
    .ct-day-btn {
      padding: 0.55rem 0.2rem;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 8px;
      color: white;
      cursor: pointer;
      font-size: 0.78rem;
      font-weight: 600;
      transition: all 0.2s ease;
      font-family: inherit;
    }
    .ct-day-btn:hover:not(.busy) {
      border-color: rgba(14, 165, 233, 0.4);
      background: rgba(14, 165, 233, 0.06);
    }
    .ct-day-btn.active {
      border-color: var(--secondary);
      background: rgba(14, 165, 233, 0.1);
      box-shadow: 0 0 12px rgba(14, 165, 233, 0.12);
    }
    .ct-day-btn.busy {
      opacity: 0.25;
      cursor: not-allowed;
      text-decoration: line-through;
    }

    .ct-times-row {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.4rem;
    }
    .ct-time-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.4rem;
      padding: 0.55rem;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.06);
      color: var(--text-muted);
      cursor: pointer;
      font-size: 0.8rem;
      font-weight: 500;
      transition: all 0.2s ease;
      font-family: inherit;
    }
    .ct-time-btn:hover:not(.busy) {
      border-color: rgba(14, 165, 233, 0.4);
      color: white;
    }
    .ct-time-btn.active {
      border-color: var(--secondary);
      background: rgba(14, 165, 233, 0.1);
      color: white;
    }
    .ct-time-btn.busy {
      opacity: 0.25;
      cursor: not-allowed;
      text-decoration: line-through;
    }

    .ct-booking-confirm {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(16, 185, 129, 0.06);
      border: 1px solid rgba(16, 185, 129, 0.2);
      border-radius: 8px;
      padding: 0.65rem 1rem;
      font-size: 0.82rem;
      color: #10b981;
      margin-top: 1rem;
      font-weight: 600;
    }

    /* ─── Quick Lead CRM ─── */
    .ct-quick-form {
      display: flex;
      flex-direction: column;
      gap: 0.9rem;
    }
    .ct-quick-submit {
      width: 100%;
      font-size: 0.88rem;
      padding: 0.75rem;
      justify-content: center;
      gap: 0.5rem;
      margin-top: 0.25rem;
    }
    .ct-quick-success {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 0.75rem;
      padding: 3rem 1rem;
      color: #10b981;
    }
    .ct-quick-success p {
      font-size: 0.92rem;
      color: var(--text-muted);
    }

    /* ─── Console Footer ─── */
    .ct-console-footer {
      border-top: 1px solid rgba(255, 255, 255, 0.06);
      padding: 1.25rem 1.75rem;
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }
    .ct-footer-brand {
      font-size: 0.85rem;
      font-weight: 700;
      color: white;
    }
    .ct-footer-items {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }
    .ct-footer-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.78rem;
      color: var(--text-dim);
    }
    .ct-footer-item a {
      color: var(--text-dim);
      transition: color 0.2s;
    }
    .ct-footer-item a:hover {
      color: white;
    }

    /* ──────────────────── RESPONSIVE ──────────────────── */
    @media (max-width: 990px) {
      .contact-layout {
        grid-template-columns: 1fr;
        gap: 2.5rem;
      }
      .ct-sidebar {
        position: static;
      }
    }
    @media (max-width: 600px) {
      .contact-title {
        font-size: 1.9rem;
      }
      .contact-subtitle {
        font-size: 1rem;
      }
      .ct-form-row {
        grid-template-columns: 1fr;
      }
      .ct-days-row {
        grid-template-columns: repeat(4, 1fr);
      }
      .ct-form-panel {
        padding: 1.5rem !important;
      }
      .ct-panel-title {
        font-size: 1.15rem;
      }
    }

    @media (max-width: 420px) {
      .ct-days-row {
        grid-template-columns: repeat(4, 1fr);
        gap: 0.25rem;
      }
      .ct-day-btn {
        font-size: 0.7rem;
        padding: 0.45rem 0.1rem;
      }
      .ct-times-row {
        grid-template-columns: repeat(2, 1fr);
      }
      .ct-console-body {
        padding: 1.25rem;
      }
    }
  `}</style>
);
