'use client';

import { useSite } from '../site-context';
import Container from '../components/Container';
import ActionLink from '../components/ActionLink';
import CapsuleVisual from '../components/CapsuleVisual';
import { Reveal } from '../components/Reveal';

/**
 * Closing call to action, reused at the end of every page. Copy is passed in
 * so each page can end on its own note.
 */
export default function CtaBand({
  title,
  accent,
  lead,
  primaryHref = '/user/contact',
  primaryLabelKey = 'ctaGetQuote',
  secondaryHref = '/user/products',
  secondaryLabelKey = 'ctaExploreProducts',
}: {
  title: string;
  accent: string;
  lead: string;
  primaryHref?: string;
  primaryLabelKey?: 'ctaGetQuote' | 'ctaTalkToUs';
  secondaryHref?: string;
  secondaryLabelKey?: 'ctaExploreProducts' | 'ctaLearnMore';
}) {
  const { t } = useSite();

  return (
    <section className="pb-8">
      <Container size="wide">
        <Reveal>
          <div
            className="u-panel rounded-[1.75rem] sm:rounded-[2.5rem] px-6 sm:px-10 lg:px-14 py-12 sm:py-16 lg:py-20 relative overflow-hidden"
            style={{ backgroundColor: 'var(--brand-tint)' }}
          >
            <div
              className="u-brand-glow absolute -bottom-40 -left-24 w-[28rem] h-[28rem] opacity-60"
              aria-hidden="true"
            />
            <CapsuleVisual
              className="hidden lg:block absolute -right-16 -top-16 w-[26rem] h-auto opacity-40"
            />

            <div className="relative max-w-2xl">
              <h2 className="u-display u-display-lg">
                {title}
                <span className="u-serif-italic block" style={{ color: 'var(--primary-color)' }}>
                  {accent}
                </span>
              </h2>
              <p className="u-lead mt-6">{lead}</p>
              <div className="flex flex-wrap items-center gap-3 mt-10">
                <ActionLink href={primaryHref} label={t(primaryLabelKey)} />
                <ActionLink
                  href={secondaryHref}
                  label={t(secondaryLabelKey)}
                  variant="ghost"
                  withArrow={false}
                />
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
