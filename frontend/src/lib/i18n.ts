import enTranslation from '../../public/locales/en.json';

export type Language = 'en' | 'te';

export type Translation = typeof enTranslation;

export function getTranslation(lang: Language) {
  // Dynamically load browser JSON
  const dictionary = require(`../../public/locales/${lang}.json`);
  return (key: keyof Translation): string => {
    return dictionary[key] || enTranslation[key] || String(key);
  };
}
