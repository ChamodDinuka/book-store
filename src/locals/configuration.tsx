import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import commonTranslations from "./translations.json"; // Load your translation file

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: commonTranslations,
    },
  },
  fallbackLng: "en",
  debug: true,
});

export default i18n;
