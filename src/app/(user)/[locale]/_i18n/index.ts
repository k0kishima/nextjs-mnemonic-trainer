import 'server-only';
import Negotiator from 'negotiator';

export const AVAILABLE_LOCALES = ['ja', 'en'] as const;
export type Locale = (typeof AVAILABLE_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'ja';

export const extractLocale = (headers: Negotiator.Headers): Locale => {
  const negotiatedLocale = new Negotiator({ headers }).language([
    ...AVAILABLE_LOCALES,
  ]);
  return (negotiatedLocale as Locale) ?? DEFAULT_LOCALE;
};

const translations: Record<Locale, () => Promise<any>> = {
  ja: () => import('./translations/ja.json').then((module) => module.default),
  en: () => import('./translations/en.json').then((module) => module.default),
};

export const getTranslations = async (locale: Locale) => {
  const translation = await translations[locale]();

  const t = (key: string, values: Record<string, string> = {}) => {
    let text = translation[key] || key;
    Object.keys(values).forEach((valueKey) => {
      const regex = new RegExp(`{${valueKey}}`, 'g');
      text = text.replace(regex, values[valueKey]);
    });
    return text;
  };

  return t;
};
