import { Database, Lightbulb } from "lucide-react";

// Placeholder del layout de la consola. La coreografía real entra en <NiviiConsole />.
const queries = [
  {
    label: "Ventas diarias por día del 11 al 17 de noviembre",
    rows: 7,
    s: "12.0",
  },
  { label: "Top 10 productos por ingresos totales", rows: 10, s: "8.5" },
  { label: "Stock diario con días de quiebre", rows: 70, s: "8.2" },
];

export function ConsoleStage() {
  return (
    <div className="min-w-0 lg:perspective-[1300px]">
      <div className="rounded-bezel bg-surface-sunken p-1.5 shadow-ambient-lg ring-1 ring-hairline lg:rotate-x-[3deg] lg:rotate-y-[-12deg] lg:shadow-tilt">
        <div className="flex min-h-[27rem] flex-col gap-5 rounded-core bg-background p-6">
          <p className="ml-auto rounded-product bg-surface-sunken px-3 py-2 text-body-s text-ink">
            ¿Qué Havannets vendemos más: cajas o individuales?
          </p>

          <ul className="flex flex-col gap-2">
            {queries.map(({ label, rows, s }) => (
              <li
                key={label}
                className="flex items-center gap-2 font-mono text-code text-ink-muted"
              >
                <Database className="size-3.5 shrink-0 text-brand-green" />
                <span className="min-w-0 truncate">{label}</span>
                <span className="ml-auto shrink-0 tabular">
                  {rows} · {s}s
                </span>
              </li>
            ))}
          </ul>

          <p className="text-body-l font-semibold text-ink">
            Las cajas generan más ingresos (64% del total), pero los
            individuales se venden más en volumen (53% de las unidades).
          </p>

          <div className="mt-auto flex items-center gap-2 rounded-product bg-brand-green-tint px-3 py-2 text-body-s text-brand-green-dark">
            <Lightbulb className="size-4 shrink-0" />
            Recomendación
          </div>
        </div>
      </div>
    </div>
  );
}
