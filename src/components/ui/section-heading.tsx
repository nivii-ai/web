import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "light",
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";

  return (
    <Reveal className={cn("max-w-3xl", className)}>
      <p
        className={cn(
          "text-eyebrow font-medium uppercase",
          dark ? "text-panel-ink/60" : "text-ink-muted"
        )}
      >
        {eyebrow}
      </p>
      <h2
        className={cn(
          "mt-5 text-display-l",
          dark ? "text-panel-ink" : "text-ink"
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-6 text-body-l",
            dark ? "text-panel-ink/70" : "text-ink-muted"
          )}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
