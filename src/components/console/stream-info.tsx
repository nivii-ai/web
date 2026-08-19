// Espeja wald-face/src/features/chat/components/chat-message-stream-info.tsx,
// sin el chevron: acá la demo se reproduce sola y no hay nada que abrir.
import { RingSpinner } from "./ring-spinner";

interface StreamInfoProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  /** Terminado: el spinner deja lugar a un punto verde. */
  done?: boolean;
}

export function StreamInfo({ text, className, style, done }: StreamInfoProps) {
  return (
    <p
      className={`flex items-center gap-2 text-code text-ink-muted italic ${className ?? ""}`}
      style={style}
    >
      {done ? (
        <span className="size-2.5 shrink-0 rounded-full bg-brand-green" />
      ) : (
        <RingSpinner />
      )}
      <span>{text}</span>
    </p>
  );
}
