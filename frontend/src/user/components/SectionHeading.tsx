import { Reveal } from './Reveal';

/**
 * Editorial section header: numbered rule + micro label, serif display title
 * and an optional lead paragraph. Numbers give the page a visual spine.
 */
export default function SectionHeading({
  index,
  eyebrow,
  title,
  accent,
  lead,
  align = 'left',
  className = '',
}: {
  index?: string;
  eyebrow: string;
  title: string;
  accent?: string;
  lead?: string;
  align?: 'left' | 'center';
  className?: string;
}) {
  const isCentered = align === 'center';
  return (
    <div className={`${isCentered ? 'text-center mx-auto max-w-3xl' : 'max-w-3xl'} ${className}`}>
      <Reveal>
        <div
          className={`flex items-center gap-3 ${isCentered ? 'justify-center' : ''}`}
          style={{ color: 'var(--primary-color)' }}
        >
          {index && <span className="u-eyebrow u-numeral opacity-70">{index}</span>}
          <span className="h-px w-8 bg-current opacity-40" aria-hidden="true" />
          <span className="u-eyebrow">{eyebrow}</span>
        </div>
      </Reveal>

      <Reveal delay={0.06}>
        <h2 className="u-display u-display-lg mt-5">
          {title}
          {accent && <span className="u-serif-italic block opacity-70">{accent}</span>}
        </h2>
      </Reveal>

      {lead && (
        <Reveal delay={0.12}>
          <p className="u-lead mt-6">{lead}</p>
        </Reveal>
      )}
    </div>
  );
}
