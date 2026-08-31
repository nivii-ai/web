"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from "motion/react";
import { ConsoleShell } from "@/components/console/console-shell";
import { ScrollBinder } from "@/components/scroll-binder";
import { ParticleField } from "@/components/console/particle-field";
import { spring } from "@/lib/motion";

type Step = { title: React.ReactNode; description: string };

export function TimelineSteps({
  steps,
  pieces,
  readyLine,
  preparation,
}: {
  steps: Step[];
  pieces: React.ReactNode[];
  readyLine: React.ReactNode;
  /** Lo que muestra la pantalla en el primer paso, antes de la conversación. */
  preparation: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useMotionValue(0);
  const [active, setActive] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const pane = useRef<HTMLDivElement>(null);
  const mobilePane = useRef<HTMLDivElement>(null);

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
    const next = Math.min(steps.length - 1, Math.floor(value * steps.length));
    if (next !== active) setActive(next);
  });

  // El primer paso es la preparación: las piezas de la conversación empiezan en el segundo.
  const SEARCHING = 1;
  const shown = pieces
    .slice(0, active)
    .map((piece, i) =>
      i === SEARCHING && active > SEARCHING + 1 ? readyLine : piece,
    );

  return (
    <div ref={ref} className="relative mt-20 pb-16 lg:mt-28">
      <ScrollBinder
        targetRef={ref}
        offset={["start start", "end end"]}
        output={progress}
      />

      <div
        aria-hidden
        className="absolute inset-y-0 left-4 w-px bg-hairline lg:left-[54%]"
      >
        <motion.div
          style={{ scaleY: progress }}
          className="h-full w-full origin-top bg-brand-green"
        />
      </div>

      {/* Columna absoluta: le da al sticky un rango que termina con la sección,
          así la consola nunca se pasa del contenedor. */}
      <div className="pointer-events-none absolute inset-0 z-10 hidden lg:block">
        <div className="sticky top-[calc(50vh-16rem)] isolate w-[46%]">
          <ParticleField
            count={80}
            drift={1}
            className="pointer-events-none absolute -inset-x-24 -inset-y-20 -z-10 h-[calc(100%+10rem)] w-[calc(100%+12rem)] [mask-image:radial-gradient(closest-side,black_60%,transparent)]"
          />
          {/* La misma pantalla cambia de modo: preparación primero, conversación después. */}
          <div className="pointer-events-auto">
            <ConsoleShell scrollable innerRef={pane}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active === 0 ? "preparation" : "conversation"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.25 }}
                  className="flex flex-col gap-4"
                >
                  {active === 0 ? preparation : shown}
                </motion.div>
              </AnimatePresence>
            </ConsoleShell>
          </div>
        </div>
      </div>

      {steps.map((step, i) => (
        <div
          key={step.description}
          className="relative flex min-h-[52vh] items-center lg:min-h-[58vh]"
        >
          <span
            aria-hidden
            className="absolute left-4 z-10 flex size-9 -translate-x-1/2 items-center justify-center rounded-full border border-hairline bg-background font-mono text-body-s text-brand-green lg:left-[54%]"
          >
            {i + 1}
          </span>

          <motion.div
            animate={{ opacity: active === i ? 1 : 0.25 }}
            transition={prefersReducedMotion ? { duration: 0 } : spring}
            className="w-full pl-12 lg:ms-auto lg:w-[calc(46%-3rem)] lg:pl-0"
          >
            <h3 className="font-display text-display-m text-ink">
              {step.title}
            </h3>
            <p className="mt-3 text-body-l text-ink-muted">
              {step.description}
            </p>

            {/* En mobile cada paso muestra su propia pantalla, sin sticky. */}
            {i === 0 || i === steps.length - 1 ? (
              <div className="mt-8 text-left lg:hidden">
                <ConsoleShell
                  scrollable
                  innerRef={i === 0 ? undefined : mobilePane}
                >
                  {i === 0 ? preparation : shown}
                </ConsoleShell>
              </div>
            ) : null}
          </motion.div>
        </div>
      ))}
    </div>
  );
}
