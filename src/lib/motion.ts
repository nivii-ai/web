import type { Transition } from "motion/react";

/** Por defecto para cualquier cosa que el usuario pueda tocar. Sin overshoot. */
export const spring: Transition = { type: "spring", bounce: 0, duration: 0.4 };

/** Sólo después de un gesto que ya traía inercia: un flick, un arrastre soltado. */
export const springMomentum: Transition = {
  type: "spring",
  bounce: 0.2,
  duration: 0.4,
};

export const springSheet: Transition = {
  type: "spring",
  bounce: 0.2,
  duration: 0.3,
};
