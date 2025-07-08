import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import en from './locales/en.json';
import pl from './locales/pl.json';
import de from './locales/de.json';
import fr from './locales/fr.json';
import es from './locales/es.json';
import it from './locales/it.json';
import pt from './locales/pt.json';
import ru from './locales/ru.json';
import zh from './locales/zh.json';
import ja from './locales/ja.json';
import ar from './locales/ar.json';
import hi from './locales/hi.json';
import id from './locales/id.json';

const resources = {
  en: { translation: en },
  pl: { translation: pl },
  de: { translation: de },
  fr: { translation: fr },
  es: { translation: es },
  it: { translation: it },
  pt: { translation: pt },
  ru: { translation: ru },
  zh: { translation: zh },
  ja: { translation: ja },
  ar: { translation: ar },
  hi: { translation: hi },
  id: { translation: id }
};

const initI18n = async () => {
  try {
    await i18n
      .use(LanguageDetector)
      .use(initReactI18next)
      .init({
        resources,
        fallbackLng: 'en',
        debug: true, // Enable debug mode temporarily
        
        detection: {
          order: ['localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
          caches: ['localStorage'],
          lookupLocalStorage: 'i18nextLng',
          checkWhitelist: true
        },

        interpolation: {
          escapeValue: false
        },

        react: {
          useSuspense: false // Disable suspense to avoid blocking
        }
      });
    
    console.log('i18n initialized successfully');
    console.log('Current language:', i18n.language);
    console.log('Available languages:', Object.keys(resources));
  } catch (error) {
    console.error('Failed to initialize i18n:', error);
  }
};

// Initialize i18n
initI18n();

export default i18n;
