import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import en from './locales/en.json'
import pt from './locales/pt.json'
import es from './locales/es.json'

export const SUPPORTED_LANGUAGES = ['en', 'pt', 'es'] as const
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      pt: { translation: pt },
      es: { translation: es },
    },
    fallbackLng: 'en',
    supportedLngs: SUPPORTED_LANGUAGES,
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'elite-ride-lang',
    },
    interpolation: { escapeValue: false },
  })

export default i18next
