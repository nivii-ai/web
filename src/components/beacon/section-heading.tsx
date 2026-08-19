import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  className?: string;
}) {
  return (
    <Reveal className={cn("max-w-3xl", className)}>
      <p className="text-eyebrow font-medium text-ink-muted uppercase">
        {eyebrow}
      </p>
      <h2 className="mt-5 text-display-l text-ink">{title}</h2>
      {description ? (
        <p className="mt-6 text-body-l text-ink-muted">{description}</p>
      ) : null}
    </Reveal>
  );
}
