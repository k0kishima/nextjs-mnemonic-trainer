import Negotiator from 'negotiator';

export const AVAILABLE_LOCALES = ['ja', 'en'];
export const DEFAULT_LOCALE = 'ja';

export const extractLocale = (headers: Negotiator.Headers) => {
  return (
    new Negotiator({ headers }).language(AVAILABLE_LOCALES) ?? DEFAULT_LOCALE
  );
};
