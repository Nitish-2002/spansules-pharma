'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Translation } from '@/lib/i18n';
import { useSite } from '../site-context';
import Container from '../components/Container';
import SectionHeading from '../components/SectionHeading';
import { Reveal } from '../components/Reveal';

const STEPS: { titleKey: keyof Translation; descKey: keyof Translation }[] = [
  { titleKey: 'stepSourcingTitle', descKey: 'stepSourcingDesc' },
  { titleKey: 'stepBlendingTitle', descKey: 'stepBlendingDesc' },
  { titleKey: 'stepEncapsulationTitle', descKey: 'stepEncapsulationDesc' },
  { titleKey: 'stepInspectionTitle', descKey: 'stepInspectionDesc' },
  { titleKey: 'stepDispatchTitle', descKey: 'stepDispatchDesc' },
];

export default function Process() {
  const { t } = useSite();
  const trackRef = useRef<HTMLDivElement>(null);

  // The connecting line fills as the section scrolls through the viewport
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 85%', 'end 55%'],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.5 });

  return (
    <section className="py-16 sm:py-24 lg:py-32 border-t border-[var(--hairline)]">
      <Container size="wide">
        <SectionHeading
          index="02"
          eyebrow={t('homeProcessEyebrow')}
          title={t('homeProcessTitle')}
          accent={t('homeProcessAccent')}
          lead={t('homeProcessLead')}
        />

        <div ref={trackRef} className="relative mt-10 sm:mt-16">
          {/* Rail: horizontal on desktop, vertical on mobile */}
          <div
            className="absolute left-[15px] top-2 bottom-2 w-px lg:left-0 lg:right-0 lg:top-[15px] lg:bottom-auto lg:h-px lg:w-full bg-[var(--hairline)]"
            aria-hidden="true"
          />
          {/* Filled portion — separate elements because the rail changes axis */}
          <motion.div
            className="lg:hidden absolute left-[15px] top-2 bottom-2 w-px origin-top"
            style={{ scaleY: fill, backgroundColor: 'var(--primary-color)' }}
            aria-hidden="true"
          />
          <motion.div
            className="hidden lg:block absolute left-0 right-0 top-[15px] h-px origin-left"
            style={{ scaleX: fill, backgroundColor: 'var(--primary-color)' }}
            aria-hidden="true"
          />

          <ol className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-6">
            {STEPS.map((step, index) => (
              <li key={step.titleKey} className="relative pl-12 lg:pl-0">
                <Reveal delay={index * 0.06}>
                  {/* Node */}
                  <span
                    className="absolute left-0 top-0 lg:static w-8 h-8 rounded-full grid place-items-center text-[11px] font-bold border"
                    style={{
                      backgroundColor: 'var(--surface-raised)',
                      borderColor: 'var(--primary-color)',
                      color: 'var(--primary-color)',
                    }}
                  >
                    {index + 1}
                  </span>

                  <h3 className="text-base font-semibold tracking-tight mt-0 lg:mt-7">
                    {t(step.titleKey)}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[var(--ink-muted)] lg:pr-4">
                    {t(step.descKey)}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
