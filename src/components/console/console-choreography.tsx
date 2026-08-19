"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A media página la coreografía tiene que arrancar al entrar en pantalla, no al
 * cargar. Se pausa recién en el efecto: el HTML del servidor se ve igual sin JS.
 */
export function ConsoleChoreography({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"initial" | "paused" | "playing">(
    "initial"
  );

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    setState("paused");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setState("playing");
        observer.disconnect();
      },
      { threshold: 0.25 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} data-choreo={state} className={className}>
      {children}
    </div>
  );
}
