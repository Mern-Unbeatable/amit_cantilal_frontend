import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import en from './locales/en.json'
import pt from './locales/pt.json'
import es from './locales/es.json'

import lisbonPortoEn from './locales/landings/lisbon-porto-private-transfer/en.json'
import lisbonPortoPt from './locales/landings/lisbon-porto-private-transfer/pt.json'
import lisbonPortoEs from './locales/landings/lisbon-porto-private-transfer/es.json'

import lisbonAlgarveEn from './locales/landings/lisbon-algarve-private-transfer/en.json'
import lisbonAlgarvePt from './locales/landings/lisbon-algarve-private-transfer/pt.json'
import lisbonAlgarveEs from './locales/landings/lisbon-algarve-private-transfer/es.json'

import lisbonSevilleEn from './locales/landings/lisbon-seville-private-transfer/en.json'
import lisbonSevillePt from './locales/landings/lisbon-seville-private-transfer/pt.json'
import lisbonSevilleEs from './locales/landings/lisbon-seville-private-transfer/es.json'

import lisbonMadridEn from './locales/landings/lisbon-madrid-private-transfer/en.json'
import lisbonMadridPt from './locales/landings/lisbon-madrid-private-transfer/pt.json'
import lisbonMadridEs from './locales/landings/lisbon-madrid-private-transfer/es.json'

import lisbonComportaEn from './locales/landings/lisbon-comporta-private-transfer/en.json'
import lisbonComportaPt from './locales/landings/lisbon-comporta-private-transfer/pt.json'
import lisbonComportaEs from './locales/landings/lisbon-comporta-private-transfer/es.json'

import lisbonEvoraEn from './locales/landings/lisbon-evora-private-transfer/en.json'
import lisbonEvoraPt from './locales/landings/lisbon-evora-private-transfer/pt.json'
import lisbonEvoraEs from './locales/landings/lisbon-evora-private-transfer/es.json'

import portoDouroEn from './locales/landings/porto-douro-valley-private-transfer/en.json'
import portoDouroPt from './locales/landings/porto-douro-valley-private-transfer/pt.json'
import portoDouroEs from './locales/landings/porto-douro-valley-private-transfer/es.json'

import lisbonAirportEn from './locales/landings/lisbon-airport-private-transfer/en.json'
import lisbonAirportPt from './locales/landings/lisbon-airport-private-transfer/pt.json'
import lisbonAirportEs from './locales/landings/lisbon-airport-private-transfer/es.json'

export const SUPPORTED_LANGUAGES = ['en', 'pt', 'es'] as const
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]

/** Landing-page namespaces — one folder per landing under locales/landings/ */
export const LANDING_NAMESPACES = {
  lisbonPortoTransfer: {
    en: lisbonPortoEn,
    pt: lisbonPortoPt,
    es: lisbonPortoEs,
  },
  lisbonAlgarveTransfer: {
    en: lisbonAlgarveEn,
    pt: lisbonAlgarvePt,
    es: lisbonAlgarveEs,
  },
  lisbonSevilleTransfer: {
    en: lisbonSevilleEn,
    pt: lisbonSevillePt,
    es: lisbonSevilleEs,
  },
  lisbonMadridTransfer: {
    en: lisbonMadridEn,
    pt: lisbonMadridPt,
    es: lisbonMadridEs,
  },
  lisbonComportaTransfer: {
    en: lisbonComportaEn,
    pt: lisbonComportaPt,
    es: lisbonComportaEs,
  },
  lisbonEvoraTransfer: {
    en: lisbonEvoraEn,
    pt: lisbonEvoraPt,
    es: lisbonEvoraEs,
  },
  portoDouroTransfer: {
    en: portoDouroEn,
    pt: portoDouroPt,
    es: portoDouroEs,
  },
  lisbonAirportTransfer: {
    en: lisbonAirportEn,
    pt: lisbonAirportPt,
    es: lisbonAirportEs,
  },
} as const

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en,
        lisbonPortoTransfer: LANDING_NAMESPACES.lisbonPortoTransfer.en,
        lisbonAlgarveTransfer: LANDING_NAMESPACES.lisbonAlgarveTransfer.en,
        lisbonSevilleTransfer: LANDING_NAMESPACES.lisbonSevilleTransfer.en,
        lisbonMadridTransfer: LANDING_NAMESPACES.lisbonMadridTransfer.en,
        lisbonComportaTransfer: LANDING_NAMESPACES.lisbonComportaTransfer.en,
        lisbonEvoraTransfer: LANDING_NAMESPACES.lisbonEvoraTransfer.en,
        portoDouroTransfer: LANDING_NAMESPACES.portoDouroTransfer.en,
        lisbonAirportTransfer: LANDING_NAMESPACES.lisbonAirportTransfer.en,
      },
      pt: {
        translation: pt,
        lisbonPortoTransfer: LANDING_NAMESPACES.lisbonPortoTransfer.pt,
        lisbonAlgarveTransfer: LANDING_NAMESPACES.lisbonAlgarveTransfer.pt,
        lisbonSevilleTransfer: LANDING_NAMESPACES.lisbonSevilleTransfer.pt,
        lisbonMadridTransfer: LANDING_NAMESPACES.lisbonMadridTransfer.pt,
        lisbonComportaTransfer: LANDING_NAMESPACES.lisbonComportaTransfer.pt,
        lisbonEvoraTransfer: LANDING_NAMESPACES.lisbonEvoraTransfer.pt,
        portoDouroTransfer: LANDING_NAMESPACES.portoDouroTransfer.pt,
        lisbonAirportTransfer: LANDING_NAMESPACES.lisbonAirportTransfer.pt,
      },
      es: {
        translation: es,
        lisbonPortoTransfer: LANDING_NAMESPACES.lisbonPortoTransfer.es,
        lisbonAlgarveTransfer: LANDING_NAMESPACES.lisbonAlgarveTransfer.es,
        lisbonSevilleTransfer: LANDING_NAMESPACES.lisbonSevilleTransfer.es,
        lisbonMadridTransfer: LANDING_NAMESPACES.lisbonMadridTransfer.es,
        lisbonComportaTransfer: LANDING_NAMESPACES.lisbonComportaTransfer.es,
        lisbonEvoraTransfer: LANDING_NAMESPACES.lisbonEvoraTransfer.es,
        portoDouroTransfer: LANDING_NAMESPACES.portoDouroTransfer.es,
        lisbonAirportTransfer: LANDING_NAMESPACES.lisbonAirportTransfer.es,
      },
    },
    fallbackLng: 'en',
    supportedLngs: SUPPORTED_LANGUAGES,
    defaultNS: 'translation',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'elite-ride-lang',
    },
    interpolation: { escapeValue: false },
  })

export default i18next
