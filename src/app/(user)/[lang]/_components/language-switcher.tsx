'use client';

import Cookies from 'js-cookie';
import {
  cookieName,
  availableLanguages,
  defaultLanguage,
} from '@/app/i18n/settings';

export const LanguageSwitcher = ({ currentLanguage = defaultLanguage }) => {
  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newLocale = event.target.value;
    Cookies.set(cookieName, newLocale);
    window.location.href = '/';
  };

  return (
    <select
      value={currentLanguage}
      onChange={handleLanguageChange}
      className="cursor-pointer rounded-lg border border-primary bg-primary-foreground px-4 py-2 text-primary shadow transition duration-150 ease-in-out hover:border-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
    >
      {availableLanguages.map((lang) => (
        <option key={lang} value={lang}>
          {lang.toUpperCase()}
        </option>
      ))}
    </select>
  );
};

export default LanguageSwitcher;
