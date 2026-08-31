import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Escalona la entrada de hermanos: 0, 1, 2... */
  order?: number;
  as?: "div" | "li" | "section";
}

/**
 * Entrada al viewport sin JS: la anima `animation-timeline: view()`.
 * Donde no hay soporte, el contenido simplemente se ve.
 */
export function Reveal({
  children,
  className,
  order = 0,
  as: Tag = "div",
}: RevealProps) {
  return (
    <Tag
      className={cn("reveal", className)}
      style={{ "--reveal-order": order } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
