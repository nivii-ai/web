import { cn } from "@/lib/utils";

/** El doble bisel: la carcasa es de la web, el núcleo imita al producto. */
export function ConsoleShell({
  children,
  className,
  scrollable = false,
  innerRef,
  tone = "light",
}: {
  children: React.ReactNode;
  className?: string;
  /** Alto fijo y scroll propio, como el panel de conversación de la app. */
  scrollable?: boolean;
  innerRef?: React.Ref<HTMLDivElement>;
  /** Sobre el panel oscuro la carcasa se ilumina en vez de proyectar sombra. */
  tone?: "light" | "dark";
}) {
  return (
    <div
      className={cn(
        "rounded-bezel p-1.5 ring-1",
        tone === "dark"
          ? "bg-white/10 ring-panel-hairline"
          : "bg-surface-sunken shadow-ambient-lg ring-hairline",
        className,
      )}
    >
      <div
        ref={innerRef}
        className={cn(
          "flex flex-col gap-4 rounded-core bg-background p-6",
          scrollable
            ? "no-scrollbar h-[30rem] overflow-y-auto"
            : "min-h-[27rem]",
        )}
      >
        {children}
      </div>
    </div>
  );
}
