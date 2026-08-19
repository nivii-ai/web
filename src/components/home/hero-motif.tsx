const VIEW = { w: 1440, h: 760 };
const GRID = 48;

// Determinista a propósito: un Math.random acá rompe la hidratación.
const noise = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const scatter = Array.from({ length: 160 }, (_, i) => ({
  cx: noise(i * 1.1) * VIEW.w,
  cy: noise(i * 2.3) * VIEW.h,
  r: 1 + noise(i * 3.7) * 1.3,
  opacity: 0.12 + noise(i * 4.9) * 0.16,
}));

const signal = Array.from({ length: 14 }, (_, i) => {
  const t = i / 13;
  return {
    cx: 60 + t * 700,
    cy: 715 - Math.pow(t, 1.6) * 250 + (noise(i * 7.3) - 0.5) * 26,
  };
});

const signalPath = signal
  .map(({ cx, cy }, i) => `${i === 0 ? "M" : "L"} ${cx.toFixed(1)} ${cy.toFixed(1)}`)
  .join(" ");

export function HeroMotif() {
  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full [mask-image:radial-gradient(115%_105%_at_8%_78%,black,transparent_68%)]"
    >
      <g stroke="var(--color-hairline)" strokeWidth="1" opacity="0.7">
        {Array.from({ length: Math.ceil(VIEW.w / GRID) }, (_, i) => (
          <line key={`v${i}`} x1={i * GRID} y1="0" x2={i * GRID} y2={VIEW.h} />
        ))}
        {Array.from({ length: Math.ceil(VIEW.h / GRID) }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={i * GRID} x2={VIEW.w} y2={i * GRID} />
        ))}
      </g>

      {scatter.map(({ cx, cy, r, opacity }, i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={r}
          fill="var(--color-ink-muted)"
          opacity={opacity}
        />
      ))}

      <path
        d={signalPath}
        fill="none"
        stroke="var(--color-brand-green)"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.4"
      />
      {signal.map(({ cx, cy }, i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r="3"
          fill="var(--color-brand-green)"
          opacity={0.28 + (i / signal.length) * 0.5}
        />
      ))}
    </svg>
  );
}
