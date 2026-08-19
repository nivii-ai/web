// Espeja wald-face/src/features/chat/components/chat-message-stream-info.tsx,
// sin el chevron: acá la demo se reproduce sola y no hay nada que abrir.
import { RingSpinner } from "./ring-spinner";

interface StreamInfoProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export function StreamInfo({ text, className, style }: StreamInfoProps) {
  return (
    <p
      className={`flex items-start gap-1.5 text-code text-ink-muted italic ${className ?? ""}`}
      style={style}
    >
      <RingSpinner />
      <span>{text}</span>
    </p>
  );
}
