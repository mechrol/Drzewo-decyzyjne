import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' }
];

export const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = async (languageCode: string) => {
    console.log('Language change clicked:', languageCode); // Debug log
    
    try {
      if (i18n && typeof i18n.changeLanguage === 'function') {
        console.log('Changing language to:', languageCode); // Debug log
        await i18n.changeLanguage(languageCode);
        console.log('Language changed successfully to:', languageCode); // Debug log
        setIsOpen(false);
      } else {
        console.error('i18n.changeLanguage is not available');
      }
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  const handleButtonClick = (e: React.MouseEvent, languageCode: string) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Button clicked for language:', languageCode); // Debug log
    handleLanguageChange(languageCode);
  };

  // Don't render if i18n is not ready
  if (!i18n || !i18n.isInitialized) {
    console.log('i18n not ready, not rendering selector'); // Debug log
    return null;
  }

  console.log('Current language:', i18n.language); // Debug log
  console.log('i18n initialized:', i18n.isInitialized); // Debug log

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 bg-black/30 hover:bg-black/50 border border-violet-500/20 hover:border-violet-400/30 rounded-xl transition-all duration-300 text-violet-200 hover:text-white"
      >
        <Globe className="w-4 h-4" />
        <span className="text-lg">{currentLanguage.flag}</span>
        <span className="hidden sm:inline text-sm font-medium">{currentLanguage.name}</span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute top-full right-0 mt-2 w-48 bg-black/90 backdrop-blur-xl border border-violet-500/30 rounded-xl shadow-2xl z-50 max-h-64 overflow-y-auto">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={(e) => handleButtonClick(e, language.code)}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-violet-600/20 transition-colors duration-200 ${
                  i18n.language === language.code 
                    ? 'bg-violet-600/30 text-violet-200' 
                    : 'text-violet-300 hover:text-white'
                } ${language.code === 'ar' ? 'text-right' : 'text-left'}`}
                dir={language.code === 'ar' ? 'rtl' : 'ltr'}
                type="button"
              >
                <span className="text-lg">{language.flag}</span>
                <span className="text-sm font-medium">{language.name}</span>
                {i18n.language === language.code && (
                  <div className="ml-auto w-2 h-2 bg-violet-400 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
