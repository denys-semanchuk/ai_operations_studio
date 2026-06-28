"use client";

import { useEffect, useRef } from "react";

interface ConfettiProps {
  active: boolean;
}

export default function Confetti({ active }: ConfettiProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const colors = ["#4f46e5", "#0ea5e9", "#d946ef", "#10b981", "#fbbf24"];
    const particles: ConfettiParticle[] = [];

    class ConfettiParticle {
      x: number;
      y: number;
      size: number;
      color: string;
      vx: number;
      vy: number;
      rotation: number;
      rotationSpeed: number;
      opacity: number;

      constructor() {
        // Explode from bottom center of the viewport
        this.x = width / 2;
        this.y = height + 10;
        this.size = Math.random() * 8 + 6;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.vx = (Math.random() - 0.5) * 16;
        this.vy = -Math.random() * 14 - 10; // Upwards force
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 4;
        this.opacity = 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.28; // Gravity simulation
        this.vx *= 0.985; // Air resistance friction
        this.rotation += this.rotationSpeed;
        if (this.vy > 0) {
          this.opacity -= 0.015; // Slowly fade out as it descends
        }
      }

      draw(c: CanvasRenderingContext2D) {
        c.save();
        c.translate(this.x, this.y);
        c.rotate((this.rotation * Math.PI) / 180);
        c.fillStyle = this.color;
        c.globalAlpha = Math.max(0, this.opacity);
        c.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        c.restore();
      }
    }

    // Spawn 100 colorful particles
    for (let i = 0; i < 100; i++) {
      particles.push(new ConfettiParticle());
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      let activeCount = 0;
      particles.forEach((p) => {
        p.update();
        if (p.opacity > 0 && p.y < height + 20) {
          p.draw(ctx);
          activeCount++;
        }
      });

      if (activeCount > 0) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, width, height);
      }
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 99999,
        pointerEvents: "none",
        background: "transparent",
      }}
    />
  );
}
