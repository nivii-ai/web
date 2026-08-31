"use client";

import { useEffect, useRef } from "react";

const SPEED = 0.32;

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  depth: number;
  alpha: number;
  phase: number;
};

export function ParticleField({
  className,
  count = 110,
  /** -1 corriente hacia la izquierda, 1 hacia la derecha, 0 flotando. */
  drift = 0,
}: {
  className?: string;
  count?: number;
  drift?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const target = useRef(drift);

  // El loop lee la referencia, así cambiar la dirección no lo reinicia.
  target.current = drift;

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const green = getComputedStyle(document.documentElement)
      .getPropertyValue("--color-brand-green")
      .trim();
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let frame = 0;
    let visible = true;
    let current = 0;

    const seed = (i: number) => {
      const x = Math.sin(i * 12.9898) * 43758.5453;
      return x - Math.floor(x);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      particles = Array.from({ length: count }, (_, i) => {
        const depth = seed(i + 53);
        return {
          x: seed(i + 1) * width,
          y: seed(i + 99) * height,
          vx: (seed(i + 7) - 0.5) * SPEED,
          vy: -SPEED * (0.3 + seed(i + 31) * 0.7),
          r: 0.6 + depth * 1.3,
          depth,
          alpha: 0.05 + seed(i + 71) * 0.15,
          phase: seed(i + 17) * Math.PI * 2,
        };
      });
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      // Eased: la corriente entra y se apaga sola, sin escalón.
      current += (target.current - current) * 0.045;

      for (const p of particles) {
        if (!still) {
          // Las de adelante corren más: da profundidad al arrastre.
          const stream = current * (1.2 + p.depth * 3.4);
          p.x += p.vx + stream + Math.sin(time / 2600 + p.phase) * 0.22;
          p.y += p.vy;
          if (p.y < -8) p.y = height + 8;
          if (p.x < -8) p.x = width + 8;
          if (p.x > width + 8) p.x = -8;
        }

        // Las grandes llevan halo; las chicas quedan como puntos limpios.
        if (p.r > 1.4) {
          const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 8);
          glow.addColorStop(0, green);
          glow.addColorStop(1, "transparent");
          ctx.globalAlpha = p.alpha * 0.5;
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 8, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = green;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
    };

    const loop = (time: number) => {
      draw(time);
      frame = requestAnimationFrame(loop);
    };

    // El sticky puede medir cero en el primer paint: sin esto el buffer queda
    // con el tamaño equivocado y las partículas se ven estiradas.
    const observer = new ResizeObserver(() => {
      resize();
      if (still) draw(0);
    });
    observer.observe(canvas);

    resize();

    if (still) {
      draw(0);
      return () => observer.disconnect();
    }

    const inView = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting === visible) return;
      visible = entry.isIntersecting;
      if (visible) frame = requestAnimationFrame(loop);
      else cancelAnimationFrame(frame);
    });
    inView.observe(canvas);
    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      inView.disconnect();
      observer.disconnect();
    };
  }, [count]);

  return <canvas ref={ref} aria-hidden className={className} />;
}
