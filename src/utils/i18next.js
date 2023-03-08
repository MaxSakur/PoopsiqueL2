import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { EN_TRANSLATION_KEYS } from "../translations/en";
import { RU_TRANSLATION_KEYS } from "../translations/ru";

export const lngs = {
  en: { nativeName: "En" },
  ru: { nativeName: "Ru" },
};

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: false,
    fallbackLng: "en, ru",
    lng: "ru",
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: EN_TRANSLATION_KEYS,
      },
      ru: {
        translation: RU_TRANSLATION_KEYS,
      },
    },
  });

export default i18n;
