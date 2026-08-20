"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from "motion/react";
import { ConsoleShell } from "@/components/console/console-shell";
import { ScrollBinder } from "@/components/scroll-binder";
import { ParticleField } from "@/components/console/particle-field";
import { spring } from "@/lib/motion";

type Step = { title: string; description: string };

export function TimelineSteps({
  steps,
  pieces,
  readyLine,
}: {
  steps: Step[];
  pieces: React.ReactNode[];
  readyLine: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useMotionValue(0);
  const [active, setActive] = useState(0);
  // La consola está vacía hasta el primer paso: lo que se anima es la pregunta.
  const [started, setStarted] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const [moving, setMoving] = useState(false);
  const pane = useRef<HTMLDivElement>(null);
  const mobilePane = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMoving(true);
    const id = setTimeout(() => setMoving(false), 620);
    return () => clearTimeout(id);
  }, [active]);

  // Al llegar una pieza nueva la conversación se sigue sola, como un chat.
  useEffect(() => {
    for (const node of [pane.current, mobilePane.current]) {
      node?.scrollTo({
        top: node.scrollHeight,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    }
  }, [active, prefersReducedMotion]);

  useMotionValueEvent(progress, "change", (value) => {
    if (value > 0.02 && !started) setStarted(true);
    const next = Math.min(steps.length - 1, Math.floor(value * steps.length));
    if (next !== active) setActive(next);
  });

  // Impar a la izquierda, par a la derecha: el zigzag del boceto.
  const consoleOnRight = active % 2 === 0;

  // La línea de trabajo pasa a "respuesta lista" cuando llega la respuesta.
  const shown = pieces
    .slice(0, active + 1)
    .map((piece, i) => (i === 1 && active >= 2 ? readyLine : piece));

  return (
    <div ref={ref} className="relative pb-16">
      <ScrollBinder
        targetRef={ref}
        offset={["start start", "end end"]}
        output={progress}
      />

      <div
        aria-hidden
        className="absolute inset-y-0 left-4 w-px bg-hairline lg:left-1/2"
      >
        <motion.div
          style={{ scaleY: progress }}
          className="h-full w-full origin-top bg-brand-green"
        />
      </div>

      {/* Columna absoluta: le da al sticky un rango que termina con la sección,
          así la consola nunca se pasa del contenedor. */}
      <div className="pointer-events-none absolute inset-0 z-10 hidden lg:block">
        <div className="sticky top-[calc(50vh-16rem)] isolate">
          <ParticleField
            count={80}
            drift={moving ? (consoleOnRight ? 1 : -1) : 0}
            className="pointer-events-none absolute -inset-x-24 -inset-y-20 -z-10 h-[calc(100%+10rem)] w-[calc(100%+12rem)] [mask-image:radial-gradient(closest-side,black_60%,transparent)]"
          />
          <motion.div
            animate={{ x: consoleOnRight ? "117%" : "0%" }}
            transition={prefersReducedMotion ? { duration: 0 } : spring}
            className="pointer-events-auto w-[46%]"
          >
            {/* La consola está desde el principio; lo que espera es el contenido. */}
            <ConsoleShell scrollable innerRef={pane}>
              {started ? shown : null}
            </ConsoleShell>
          </motion.div>
        </div>
      </div>

      {steps.map((step, i) => (
        <div
          key={step.title}
          className="relative flex min-h-[70vh] items-center lg:min-h-[80vh]"
        >
          <span
            aria-hidden
            className="absolute left-4 z-10 flex size-9 -translate-x-1/2 items-center justify-center rounded-full border border-hairline bg-background font-mono text-body-s text-brand-green lg:left-1/2"
          >
            {i + 1}
          </span>

          <motion.div
            animate={{ opacity: active === i ? 1 : 0.25 }}
            transition={prefersReducedMotion ? { duration: 0 } : spring}
            className={`w-full pl-12 lg:w-[calc(50%-4rem)] lg:pl-0 ${
              i % 2 === 0 ? "lg:mr-auto lg:text-right" : "lg:ml-auto"
            }`}
          >
            <h3 className="font-display text-display-m text-ink">
              {step.title}
            </h3>
            <p className="mt-3 text-body-l text-ink-muted">
              {step.description}
            </p>

            {i === steps.length - 1 ? (
              <div className="mt-8 text-left lg:hidden">
                <ConsoleShell scrollable innerRef={mobilePane}>
                  {shown}
                </ConsoleShell>
              </div>
            ) : null}
          </motion.div>
        </div>
      ))}
    </div>
  );
}
