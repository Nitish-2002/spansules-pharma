'use client';

import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { Translation } from '@/lib/i18n';
import { useSite } from '../site-context';
import Container from '../components/Container';
import ContactForm from '../components/ContactForm';
import Accordion from '../components/Accordion';
import SectionHeading from '../components/SectionHeading';
import { Reveal, Stagger, StaggerItem } from '../components/Reveal';

const DETAILS: {
  icon: typeof MapPin;
  labelKey: keyof Translation;
  valueKey: keyof Translation;
  href?: (value: string) => string;
}[] = [
  { icon: MapPin, labelKey: 'contactAddressLabel', valueKey: 'contactAddressValue' },
  {
    icon: Phone,
    labelKey: 'contactPhoneLabel',
    valueKey: 'contactPhoneValue',
    href: (value) => `tel:${value.replace(/\s/g, '')}`,
  },
  {
    icon: Mail,
    labelKey: 'contactEmailLabel',
    valueKey: 'contactEmailValue',
    href: (value) => `mailto:${value}`,
  },
  { icon: Clock, labelKey: 'contactHoursLabel', valueKey: 'contactHoursValue' },
];

const FAQS: { id: string; questionKey: keyof Translation; answerKey: keyof Translation }[] = [
  { id: 'lead-time', questionKey: 'faqLeadTimeQ', answerKey: 'faqLeadTimeA' },
  { id: 'moq', questionKey: 'faqMoqQ', answerKey: 'faqMoqA' },
  { id: 'samples', questionKey: 'faqSamplesQ', answerKey: 'faqSamplesA' },
  { id: 'export', questionKey: 'faqExportQ', answerKey: 'faqExportA' },
];

export default function ContactPage() {
  const { t } = useSite();

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden pt-14 sm:pt-20 pb-12">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="u-grid-lines absolute inset-0 opacity-60" />
          <div className="u-brand-glow absolute -top-52 -right-20 w-[32rem] h-[32rem] opacity-60" />
        </div>

        <Container size="wide" className="relative">
          <Reveal>
            <span className="u-eyebrow" style={{ color: 'var(--primary-color)' }}>
              {t('contactHeroEyebrow')}
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="u-display u-display-xl mt-6 max-w-4xl">
              {t('contactHeroTitle')}
              <span className="u-serif-italic block opacity-70">{t('contactHeroAccent')}</span>
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="u-lead mt-8 max-w-2xl">{t('contactHeroLead')}</p>
          </Reveal>
        </Container>
      </section>

      {/* Form + details */}
      <section className="pb-24 sm:pb-32">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <Reveal className="lg:col-span-7">
              <ContactForm />
            </Reveal>

            <div className="lg:col-span-5">
              <Reveal delay={0.08}>
                <h2 className="u-eyebrow text-[var(--ink-faint)]">{t('contactOfficeTitle')}</h2>
              </Reveal>

              <Stagger className="mt-6" step={0.06}>
                {DETAILS.map((detail) => {
                  const Icon = detail.icon;
                  const value = t(detail.valueKey);
                  return (
                    <StaggerItem key={detail.labelKey}>
                      <div className="flex gap-5 py-6 border-t border-[var(--hairline)]">
                        <span
                          className="w-10 h-10 rounded-2xl grid place-items-center shrink-0"
                          style={{
                            backgroundColor: 'var(--brand-tint-strong)',
                            color: 'var(--primary-color)',
                          }}
                        >
                          <Icon className="w-4 h-4" aria-hidden="true" />
                        </span>
                        <div>
                          <p className="u-eyebrow text-[10px] text-[var(--ink-faint)]">
                            {t(detail.labelKey)}
                          </p>
                          {detail.href ? (
                            <a
                              href={detail.href(value)}
                              className="u-underline inline-block mt-2 text-sm sm:text-base font-medium"
                            >
                              {value}
                            </a>
                          ) : (
                            <p className="mt-2 text-sm sm:text-base leading-relaxed">{value}</p>
                          )}
                        </div>
                      </div>
                    </StaggerItem>
                  );
                })}
              </Stagger>

              <Reveal delay={0.1}>
                <div
                  className="rounded-[1.75rem] p-7 mt-8"
                  style={{ backgroundColor: 'var(--brand-tint)' }}
                >
                  <h3 className="text-base font-semibold tracking-tight">
                    {t('contactResponseTitle')}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--ink-muted)]">
                    {t('contactResponseDesc')}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="pb-24 sm:pb-32 border-t border-[var(--hairline)] pt-24 sm:pt-28">
        <Container>
          <SectionHeading
            index="01"
            eyebrow={t('contactFaqEyebrow')}
            title={t('contactFaqTitle')}
            accent={t('contactFaqAccent')}
          />
          <div className="mt-12">
            <Accordion
              items={FAQS.map((faq) => ({
                id: faq.id,
                question: t(faq.questionKey),
                answer: t(faq.answerKey),
              }))}
            />
          </div>
        </Container>
      </section>
    </>
  );
}
