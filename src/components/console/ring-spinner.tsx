// Espeja wald-face/src/features/chat/components/stream-ring-spinner.tsx.
const SIZE = 14;
const STROKE = 1.2;
const CENTER = SIZE / 2;
const OUTER = SIZE / 2 - STROKE;
const INNER = SIZE / 2 - STROKE * 2.5;
const ORIGIN = `${CENTER}px ${CENTER}px`;

export function RingSpinner() {
  return (
    <svg
      aria-hidden
      className="shrink-0"
      fill="none"
      width={SIZE}
      height={SIZE}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
    >
      <circle
        cx={CENTER}
        cy={CENTER}
        r={OUTER}
        stroke="var(--color-brand-green)"
        strokeWidth={STROKE}
        strokeLinecap="round"
        strokeDasharray={`${OUTER * Math.PI * 0.75} ${OUTER * Math.PI * 1.25}`}
        style={{
          transformOrigin: ORIGIN,
          animation:
            "spin-ring 1.8s linear infinite, pulse-opacity 1.8s ease-in-out infinite",
        }}
      />
      <circle
        cx={CENTER}
        cy={CENTER}
        r={INNER}
        stroke="var(--color-brand-green)"
        strokeWidth={STROKE}
        strokeLinecap="round"
        strokeDasharray={`${INNER * Math.PI * 0.5} ${INNER * Math.PI * 1.5}`}
        style={{
          transformOrigin: ORIGIN,
          animation:
            "spin-ring-reverse 1.4s linear infinite, pulse-opacity 1.4s ease-in-out infinite 0.3s",
        }}
      />
    </svg>
  );
}
