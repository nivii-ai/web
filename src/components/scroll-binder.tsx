"use client";

import {
  useMotionValueEvent,
  useScroll,
  type MotionValue,
} from "motion/react";
import type { RefObject } from "react";

type ScrollOffset = Parameters<typeof useScroll>[0] extends
  | { offset?: infer O }
  | undefined
  ? O
  : never;

// Render this only once the target is mounted: useScroll throws "Target ref is
// defined but not hydrated" if the ref is still empty when its effect runs.
// Isolated so callers never remount their children to satisfy that.
export function ScrollBinder({
  targetRef,
  offset,
  output,
}: {
  targetRef: RefObject<HTMLElement | null>;
  offset: ScrollOffset;
  output: MotionValue<number>;
}) {
  const { scrollYProgress } = useScroll({ target: targetRef, offset });

  useMotionValueEvent(scrollYProgress, "change", (value) => output.set(value));

  return null;
}
