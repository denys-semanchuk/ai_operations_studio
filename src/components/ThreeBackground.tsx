"use client";

import { useEffect, useRef, useState } from "react";

type Mode = "off" | "simple" | "full";

export default function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Reduced-motion → off entirely (accessibility). Touch/mobile → a much
  // cheaper "simple" mode: no mouse tracking, no connection lines, no data
  // packets, fewer particles, lower FPS. Desktop with a mouse → full effect.
  const [mode] = useState<Mode>(() => {
    if (typeof window === "undefined") return "off";
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "off";
    return window.matchMedia("(pointer: coarse)").matches ? "simple" : "full";
  });

  useEffect(() => {
    if (mode === "off") return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isSimple = mode === "simple";

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // FPS throttling — simple mode runs even lighter on mobile CPUs.
    const targetFPS = isSimple ? 18 : 30;
    const frameInterval = 1000 / targetFPS;
    let lastFrameTime = 0;

    const particles: Particle[] = [];
    const packets: Packet[] = [];
    const particleCount = isSimple
      ? Math.min(14, Math.floor((width * height) / 60000))
      : Math.min(50, Math.floor((width * height) / 30000));
    const connectionDistance = 120;
    const mouse = { x: -1000, y: -1000, radius: 180 };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        // Extremely slow movement
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
        this.size = Math.random() * 2 + 1;
        this.color = Math.random() > 0.5 ? "rgba(99, 102, 241, 0.3)" : "rgba(14, 165, 233, 0.3)";
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce borders
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse attraction/push
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 0.8;
          this.y -= (dy / dist) * force * 0.8;
        }
      }

      draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.fill();
      }
    }

    class Packet {
      from: Particle;
      to: Particle;
      progress: number;
      speed: number;
      color: string;

      constructor(from: Particle, to: Particle) {
        this.from = from;
        this.to = to;
        this.progress = 0;
        this.speed = Math.random() * 0.01 + 0.005; // Plausible transit speed
        this.color = Math.random() > 0.5 ? "rgba(14, 165, 233, 0.8)" : "rgba(217, 70, 239, 0.8)";
      }

      update() {
        this.progress += this.speed;
      }

      draw(context: CanvasRenderingContext2D) {
        const x = this.from.x + (this.to.x - this.from.x) * this.progress;
        const y = this.from.y + (this.to.y - this.from.y) * this.progress;

        context.save();
        context.beginPath();
        context.arc(x, y, 2, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.shadowColor = this.color;
        context.shadowBlur = 6;
        context.fill();
        context.restore();
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("resize", handleResize);
    // Simple mode has nothing to attract — mouse stays parked off-screen,
    // so skip the listener rather than track a pointer that isn't there.
    if (!isSimple) {
      window.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseleave", handleMouseLeave);
    }

    const animate = (timestamp: number) => {
      // FPS throttling
      const elapsed = timestamp - lastFrameTime;
      if (elapsed < frameInterval) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }
      lastFrameTime = timestamp - (elapsed % frameInterval);

      ctx.clearRect(0, 0, width, height);

      // Simple mode: just drifting dots, no O(n²) connection scan and no
      // packet flow — that's most of the CPU cost, and mobile can't see
      // the mouse-follow bit anyway.
      if (!isSimple) {
        // Track active connections to spawn packet data streams
        const connections: Array<[Particle, Particle]> = [];

        // Draw connections — use squared distance to avoid sqrt
        const connDistSq = connectionDistance * connectionDistance;
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distSq = dx * dx + dy * dy;

            if (distSq < connDistSq) {
              const dist = Math.sqrt(distSq);
              connections.push([particles[i], particles[j]]);
              const alpha = (1 - dist / connectionDistance) * 0.12;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }
        }

        // Spawning a glowing packet data flow occasionally along active connections
        if (connections.length > 0 && Math.random() < 0.04 && packets.length < 12) {
          const randomConn = connections[Math.floor(Math.random() * connections.length)];
          if (Math.random() > 0.5) {
            packets.push(new Packet(randomConn[0], randomConn[1]));
          } else {
            packets.push(new Packet(randomConn[1], randomConn[0]));
          }
        }

        // Update & Draw packets
        for (let i = packets.length - 1; i >= 0; i--) {
          const p = packets[i];
          p.update();
          if (p.progress >= 1) {
            packets.splice(i, 1);
          } else {
            p.draw(ctx);
          }
        }
      }

      // Update & Draw particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw(ctx);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mode]);

  if (mode === "off") return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        background: "transparent",
        willChange: "transform",
      }}
    />
  );
}
