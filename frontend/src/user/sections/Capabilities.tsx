'use client';

import { ReactNode } from 'react';
import { Beaker, Boxes, FlaskConical, Factory, Handshake } from 'lucide-react';
import { Translation } from '@/lib/i18n';
import { useSite } from '../site-context';
import Container from '../components/Container';
import SectionHeading from '../components/SectionHeading';
import { Stagger, StaggerItem } from '../components/Reveal';
import CapsuleVisual from '../components/CapsuleVisual';

interface Capability {
  icon: ReactNode;
  titleKey: keyof Translation;
  descKey: keyof Translation;
  span: string;
}

export default function Capabilities() {
  const { t } = useSite();

  const feature: Capability = {
    icon: <FlaskConical className="w-5 h-5" />,
    titleKey: 'capFormulationTitle',
    descKey: 'capFormulationDesc',
    span: '',
  };

  const rest: Capability[] = [
    {
      icon: <Factory className="w-5 h-5" />,
      titleKey: 'capManufacturingTitle',
      descKey: 'capManufacturingDesc',
      span: '',
    },
    {
      icon: <Beaker className="w-5 h-5" />,
      titleKey: 'capQualityTitle',
      descKey: 'capQualityDesc',
      span: '',
    },
    {
      icon: <Boxes className="w-5 h-5" />,
      titleKey: 'capSupplyTitle',
      descKey: 'capSupplyDesc',
      span: 'lg:col-span-2',
    },
    {
      icon: <Handshake className="w-5 h-5" />,
      titleKey: 'capContractTitle',
      descKey: 'capContractDesc',
      span: '',
    },
  ];

  return (
    <section className="py-16 sm:py-24 lg:py-32">
      <Container size="wide">
        <SectionHeading
          index="01"
          eyebrow={t('homeCapabilitiesEyebrow')}
          title={t('homeCapabilitiesTitle')}
          accent={t('homeCapabilitiesAccent')}
          lead={t('homeCapabilitiesLead')}
        />

        {/* Bento: one tall feature tile beside a set of smaller ones */}
        <Stagger className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-10 sm:mt-16" step={0.07}>
          <StaggerItem className="lg:col-span-2 lg:row-span-2">
            <div className="u-panel u-panel-hover rounded-[1.75rem] sm:rounded-[2rem] p-6 sm:p-8 lg:p-10 h-full flex flex-col overflow-hidden relative">
              <span
                className="u-eyebrow text-[10px] px-3 py-1.5 rounded-full self-start"
                style={{ backgroundColor: 'var(--brand-tint-strong)', color: 'var(--primary-color)' }}
              >
                {t('capHighlightLabel')}
              </span>

              <div className="flex-1 grid sm:grid-cols-5 gap-8 items-center mt-10">
                <div className="sm:col-span-3">
                  <IconBadge>{feature.icon}</IconBadge>
                  <h3 className="u-display u-display-md mt-6">{t(feature.titleKey)}</h3>
                  <p className="mt-4 text-sm sm:text-base leading-relaxed text-[var(--ink-muted)]">
                    {t(feature.descKey)}
                  </p>
                </div>
                <div className="sm:col-span-2">
                  <CapsuleVisual className="w-full h-auto max-w-64 mx-auto opacity-90" />
                </div>
              </div>
            </div>
          </StaggerItem>

          {rest.map((item) => (
            <StaggerItem key={item.titleKey} className={item.span}>
              <div className="u-panel u-panel-hover rounded-[1.75rem] sm:rounded-[2rem] p-6 sm:p-7 lg:p-8 h-full">
                <IconBadge>{item.icon}</IconBadge>
                <h3 className="text-lg font-semibold mt-6 tracking-tight">{t(item.titleKey)}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--ink-muted)]">
                  {t(item.descKey)}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}

function IconBadge({ children }: { children: ReactNode }) {
  return (
    <span
      className="w-11 h-11 rounded-2xl grid place-items-center"
      style={{ backgroundColor: 'var(--brand-tint-strong)', color: 'var(--primary-color)' }}
    >
      {children}
    </span>
  );
}
