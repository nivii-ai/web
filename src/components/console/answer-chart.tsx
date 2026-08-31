import type { ChartSpec } from "./types";

const W = 320;
const H = 116;
const PAD = { top: 10, right: 6, bottom: 18, left: 6 };
const GRID_LINES = 3;

export function AnswerChart({ spec }: { spec: ChartSpec }) {
  const values = spec.points.map((p) => p.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  // Aire arriba y abajo para que la línea no toque los bordes del área.
  const lo = min - span * 0.35;
  const hi = max + span * 0.25;

  const px = (i: number) =>
    PAD.left +
    (i * (W - PAD.left - PAD.right)) / Math.max(spec.points.length - 1, 1);
  const py = (v: number) =>
    PAD.top + ((hi - v) / (hi - lo)) * (H - PAD.top - PAD.bottom);

  const line = spec.points
    .map(
      (p, i) =>
        `${i === 0 ? "M" : "L"} ${px(i).toFixed(1)} ${py(p.value).toFixed(1)}`,
    )
    .join(" ");
  const area = `${line} L ${px(spec.points.length - 1).toFixed(1)} ${H - PAD.bottom} L ${px(0).toFixed(1)} ${H - PAD.bottom} Z`;

  const last = spec.points[spec.points.length - 1];

  return (
    <figure className="flex flex-col gap-1">
      <figcaption className="text-code font-medium text-ink">
        {spec.title}
      </figcaption>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        // El SVG escala con el ancho: sin tope, las etiquetas crecen fuera de escala.
        className="mx-auto w-full max-w-md"
        role="img"
        aria-label={`${spec.title}: ${spec.points.map((p) => `${p.label} ${p.display ?? p.value}${p.display ? "" : (spec.unit ?? "")}`).join(", ")}`}
      >
        {Array.from({ length: GRID_LINES }, (_, i) => {
          const y =
            PAD.top + (i * (H - PAD.top - PAD.bottom)) / (GRID_LINES - 1);
          return (
            <line
              key={i}
              x1={PAD.left}
              x2={W - PAD.right}
              y1={y}
              y2={y}
              stroke="var(--color-hairline)"
            />
          );
        })}

        <path d={area} fill="var(--color-brand-green)" opacity="0.09" />
        <path
          d={line}
          fill="none"
          stroke="var(--color-brand-green)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Sólo los extremos llevan marcador, y sólo el último lleva número. */}
        <circle
          cx={px(0)}
          cy={py(spec.points[0].value)}
          r="4"
          fill="var(--color-brand-green)"
          stroke="var(--color-background)"
          strokeWidth="2"
        />
        <circle
          cx={px(spec.points.length - 1)}
          cy={py(last.value)}
          r="4"
          fill="var(--color-brand-green)"
          stroke="var(--color-background)"
          strokeWidth="2"
        />

        {spec.points.map((p, i) => (
          <text
            key={p.label}
            x={px(i)}
            y={H - 4}
            textAnchor={
              i === 0
                ? "start"
                : i === spec.points.length - 1
                  ? "end"
                  : "middle"
            }
            fill="var(--color-ink-muted)"
            fontSize="9"
          >
            {p.label}
          </text>
        ))}

        <text
          x={px(spec.points.length - 1)}
          y={py(last.value) - 9}
          textAnchor="end"
          fill="var(--color-ink)"
          fontSize="10"
          fontWeight="600"
        >
          {last.display ?? `${last.value}${spec.unit ?? ""}`}
        </text>
      </svg>
    </figure>
  );
}
