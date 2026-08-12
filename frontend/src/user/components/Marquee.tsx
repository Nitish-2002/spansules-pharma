/**
 * Infinite hairline strip of short labels (certifications, markets).
 * The list is rendered twice so the -50% translate loops seamlessly;
 * hovering pauses it.
 */
export default function Marquee({ items }: { items: string[] }) {
  const loop = [...items, ...items];
  return (
    <div
      className="u-marquee relative overflow-hidden py-6"
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
      }}
    >
      <div className="u-marquee-track">
        {loop.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="u-eyebrow flex items-center gap-10 px-10 whitespace-nowrap text-[var(--ink-faint)]"
            aria-hidden={index >= items.length ? 'true' : undefined}
          >
            {item}
            <span
              className="w-1 h-1 rounded-full"
              style={{ backgroundColor: 'var(--primary-color)' }}
              aria-hidden="true"
            />
          </span>
        ))}
      </div>
    </div>
  );
}
