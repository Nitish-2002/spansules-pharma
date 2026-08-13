'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Loader2, Send } from 'lucide-react';
import { FormField } from '@/components';
import { Translation } from '@/lib/i18n';
import { useSite } from '../site-context';

const SUBJECTS: (keyof Translation)[] = [
  'subjectGeneral',
  'subjectQuote',
  'subjectPartnership',
  'subjectQuality',
  'subjectCareers',
];

interface FormValues {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const EMPTY: FormValues = {
  name: '',
  email: '',
  phone: '',
  subject: 'subjectGeneral',
  message: '',
};

export default function ContactForm() {
  const { t } = useSite();
  const [values, setValues] = useState<FormValues>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const update = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const validate = (): Partial<Record<keyof FormValues, string>> => {
    const next: Partial<Record<keyof FormValues, string>> = {};
    if (!values.name.trim()) next.name = t('errorRequired');
    if (!values.email.trim()) next.email = t('errorRequired');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
      next.email = t('errorEmailInvalid');
    }
    if (!values.message.trim()) next.message = t('errorRequired');
    else if (values.message.trim().length < 20) next.message = t('errorMessageShort');
    return next;
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus('submitting');
    // No enquiry endpoint exists on the backend yet — this stands in for it.
    await new Promise((resolve) => setTimeout(resolve, 900));
    setStatus('success');
    setValues(EMPTY);
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="u-panel rounded-[1.75rem] sm:rounded-[2rem] p-8 sm:p-11 lg:p-14 text-center"
        role="status"
      >
        <span
          className="w-14 h-14 rounded-full grid place-items-center mx-auto"
          style={{ backgroundColor: 'var(--primary-color)', color: 'var(--text-on-primary)' }}
        >
          <Check className="w-6 h-6" aria-hidden="true" />
        </span>
        <h3 className="u-display u-display-md mt-8">{t('contactSuccessTitle')}</h3>
        <p className="u-lead mt-4 text-sm sm:text-base">{t('contactSuccessDesc')}</p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="u-btn u-btn-ghost mt-10"
        >
          {t('contactSendAnother')}
        </button>
      </motion.div>
    );
  }

  const isSubmitting = status === 'submitting';

  return (
    <form onSubmit={onSubmit} className="u-panel rounded-[1.75rem] sm:rounded-[2rem] p-6 sm:p-8 lg:p-10" noValidate>
      <h2 className="u-display u-display-md">{t('contactFormTitle')}</h2>
      <p className="u-lead mt-3 text-sm sm:text-base">{t('contactFormLead')}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-9">
        <FormField label={t('name')}>
          <input
            type="text"
            value={values.name}
            onChange={(event) => update('name', event.target.value)}
            placeholder={t('contactNamePlaceholder')}
            aria-invalid={Boolean(errors.name)}
            className={`u-field ${errors.name ? 'u-field-invalid' : ''}`}
          />
          <FieldError message={errors.name} />
        </FormField>

        <FormField label={t('email')}>
          <input
            type="email"
            value={values.email}
            onChange={(event) => update('email', event.target.value)}
            placeholder={t('contactEmailPlaceholder')}
            aria-invalid={Boolean(errors.email)}
            className={`u-field ${errors.email ? 'u-field-invalid' : ''}`}
          />
          <FieldError message={errors.email} />
        </FormField>

        <FormField label={t('phone')}>
          <input
            type="tel"
            value={values.phone}
            onChange={(event) => update('phone', event.target.value)}
            placeholder={t('contactPhonePlaceholder')}
            className="u-field"
          />
        </FormField>

        <FormField label={t('contactSubjectLabel')}>
          <select
            value={values.subject}
            onChange={(event) => update('subject', event.target.value)}
            className="u-field"
          >
            {SUBJECTS.map((key) => (
              <option key={key} value={key}>
                {t(key)}
              </option>
            ))}
          </select>
        </FormField>

        <div className="sm:col-span-2">
          <FormField label={t('contactMessageLabel')}>
            <textarea
              rows={5}
              value={values.message}
              onChange={(event) => update('message', event.target.value)}
              placeholder={t('contactMessagePlaceholder')}
              aria-invalid={Boolean(errors.message)}
              className={`u-field resize-none ${errors.message ? 'u-field-invalid' : ''}`}
            />
            <FieldError message={errors.message} />
          </FormField>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-9">
        <button type="submit" disabled={isSubmitting} className="u-btn u-btn-primary disabled:opacity-70">
          <span className="relative z-10 flex items-center gap-2">
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
            ) : (
              <Send className="w-4 h-4" aria-hidden="true" />
            )}
            {isSubmitting ? t('contactSubmitting') : t('contactSubmit')}
          </span>
        </button>
        <p className="text-xs text-[var(--ink-faint)]">{t('contactPrivacyNote')}</p>
      </div>
    </form>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-2 text-xs font-medium text-rose-500" role="alert">
      {message}
    </p>
  );
}
