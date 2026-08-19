import { cn } from "@/lib/utils";

/** El doble bisel: la carcasa es de la web, el núcleo imita al producto. */
export function ConsoleShell({
  children,
  className,
  scrollable = false,
  innerRef,
}: {
  children: React.ReactNode;
  className?: string;
  /** Alto fijo y scroll propio, como el panel de conversación de la app. */
  scrollable?: boolean;
  innerRef?: React.Ref<HTMLDivElement>;
}) {
  return (
    <div
      className={cn(
        "rounded-bezel bg-surface-sunken p-1.5 shadow-ambient-lg ring-1 ring-hairline",
        className
      )}
    >
      <div
        ref={innerRef}
        className={cn(
          "flex flex-col gap-4 rounded-core bg-background p-6",
          scrollable ? "no-scrollbar h-[30rem] overflow-y-auto" : "min-h-[27rem]"
        )}
      >
        {children}
      </div>
    </div>
  );
}
