import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import language files
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
import hi from './locales/hi.json';
import id from './locales/id.json';

// Get preferred language from localStorage or default to 'en'
const getInitialLanguage = () => {
  const saved = localStorage.getItem('preferredLanguage');
  if (saved && ['en', 'pl', 'de', 'fr', 'es', 'it', 'pt', 'ru', 'zh', 'ja', 'hi', 'id'].includes(saved)) {
    return saved;
  }
  
  // Try to detect browser language
  const browserLang = navigator.language.split('-')[0];
  if (['en', 'pl', 'de', 'fr', 'es', 'it', 'pt', 'ru', 'zh', 'ja', 'hi', 'id'].includes(browserLang)) {
    return browserLang;
  }
  
  return 'en'; // fallback
};

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
  hi: { translation: hi },
  id: { translation: id }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getInitialLanguage(),
    fallbackLng: 'en',
    
    interpolation: {
      escapeValue: false
    },

    react: {
      useSuspense: false
    },

    // Save language preference when changed
    saveMissing: false,
    
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

// Listen for language changes and save to localStorage
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('preferredLanguage', lng);
  console.log('Language changed and saved:', lng);
});

export default i18n;
