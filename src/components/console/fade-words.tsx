// Espeja rehype-word-fade de wald-face: parte el texto en palabras y las
// desvanece. Acá además escalonan, porque la demo no llega por streaming.
export function FadeWords({ text, delay }: { text: string; delay: number }) {
  const parts = text.split(/(\s+)/).filter(Boolean);

  return (
    <>
      {parts.map((part, i) => (
        <span
          key={i}
          className="fade-word"
          style={{ animationDelay: `${delay + i * 0.022}s` }}
        >
          {part}
        </span>
      ))}
    </>
  );
}
