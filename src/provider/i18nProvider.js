// i18nProvider.js
import polyglotI18nProvider from 'ra-i18n-polyglot';
import enfull from '../lang/en';
import jpfull from '../lang/jp';

const translations = { en: enfull, jp: jpfull };

export const i18nProvider = polyglotI18nProvider(
  (locale) => translations[locale],
  'jp', // default locale
  [
    { locale: 'en', name: 'English' },
    { locale: 'jp', name: 'Japanese' },
  ],
);
