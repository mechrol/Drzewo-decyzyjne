import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Check } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English', nativeName: 'English', flag: 'https://flagcdn.com/w40/us.png', country: 'United States' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski', flag: 'https://flagcdn.com/w40/pl.png', country: 'Poland' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: 'https://flagcdn.com/w40/de.png', country: 'Germany' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: 'https://flagcdn.com/w40/fr.png', country: 'France' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: 'https://flagcdn.com/w40/es.png', country: 'Spain' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: 'https://flagcdn.com/w40/it.png', country: 'Italy' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: 'https://flagcdn.com/w40/pt.png', country: 'Portugal' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: 'https://flagcdn.com/w40/ru.png', country: 'Russia' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: 'https://flagcdn.com/w40/cn.png', country: 'China' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: 'https://flagcdn.com/w40/jp.png', country: 'Japan' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: 'https://flagcdn.com/w40/in.png', country: 'India' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', flag: 'https://flagcdn.com/w40/id.png', country: 'Indonesia' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: 'https://flagcdn.com/w40/kr.png', country: 'South Korea' },
  { code: 'th', name: 'Thai', nativeName: 'ไทย', flag: 'https://flagcdn.com/w40/th.png', country: 'Thailand' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: 'https://flagcdn.com/w40/vn.png', country: 'Vietnam' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: 'https://flagcdn.com/w40/tr.png', country: 'Turkey' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: 'https://flagcdn.com/w40/nl.png', country: 'Netherlands' },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska', flag: 'https://flagcdn.com/w40/se.png', country: 'Sweden' },
  { code: 'no', name: 'Norwegian', nativeName: 'Norsk', flag: 'https://flagcdn.com/w40/no.png', country: 'Norway' }
];

interface LanguageSelectorProps {
  variant?: 'compact' | 'full';
  position?: 'left' | 'right';
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  variant = 'compact',
  position = 'left'
}) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = async (languageCode: string) => {
    try {
      console.log('Changing language to:', languageCode);
      await i18n.changeLanguage(languageCode);
      setIsOpen(false);
      console.log('Language changed successfully to:', languageCode);
      
      // Store language preference
      localStorage.setItem('preferredLanguage', languageCode);
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  // Don't render if i18n is not ready
  if (!i18n || !i18n.isInitialized) {
    return null;
  }

  const dropdownClasses = position === 'left' 
    ? 'left-0' 
    : 'right-0';

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 bg-black/30 hover:bg-black/50 border border-violet-500/20 hover:border-violet-400/30 rounded-xl transition-all duration-300 text-violet-200 hover:text-white group"
      >
        <Globe className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
        <img 
          src={currentLanguage.flag} 
          alt={currentLanguage.country}
          className="w-5 h-3 object-cover rounded-sm border border-white/20"
          onError={(e) => {
            // Fallback to emoji if image fails to load
            e.currentTarget.style.display = 'none';
          }}
        />
        {variant === 'full' && (
          <span className="text-sm font-medium min-w-0">
            {currentLanguage.nativeName}
          </span>
        )}
        {variant === 'compact' && (
          <span className="hidden sm:inline text-sm font-medium">
            {currentLanguage.nativeName}
          </span>
        )}
        <div className={`w-0 h-0 border-l-[4px] border-r-[4px] border-t-[4px] border-l-transparent border-r-transparent border-t-violet-300 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}></div>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown - Full width expansion */}
          <div className={`absolute top-full mt-2 w-80 bg-black/95 backdrop-blur-xl border border-violet-500/30 rounded-xl shadow-2xl z-50 max-h-80 overflow-y-auto ${dropdownClasses}`}>
            <div className="p-2">
              <div className="text-xs text-violet-400 font-medium px-3 py-2 border-b border-violet-500/20 mb-2">
                Select Language / Wybierz język
              </div>
              
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleLanguageChange(language.code);
                  }}
                  className={`w-full flex items-center space-x-3 px-3 py-3 text-left hover:bg-violet-600/20 transition-all duration-200 cursor-pointer rounded-lg group ${
                    i18n.language === language.code 
                      ? 'bg-violet-600/30 text-violet-200 border border-violet-500/30' 
                      : 'text-violet-300 hover:text-white'
                  }`}
                  type="button"
                >
                  {/* Flag on the left side */}
                  <div className="flex-shrink-0">
                    <img 
                      src={language.flag} 
                      alt={language.country}
                      className="w-6 h-4 object-cover rounded-sm border border-white/20 group-hover:scale-110 transition-transform duration-200"
                      onError={(e) => {
                        // Fallback to text if image fails to load
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                  
                  {/* Language info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium truncate">
                          {language.nativeName}
                        </div>
                        <div className="text-xs text-violet-400 truncate">
                          {language.name}
                        </div>
                      </div>
                      
                      {/* Active indicator */}
                      {i18n.language === language.code && (
                        <div className="flex-shrink-0 ml-2">
                          <Check className="w-4 h-4 text-violet-400" />
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
            
            {/* Footer */}
            <div className="border-t border-violet-500/20 p-3">
              <div className="text-xs text-violet-400 text-center">
                🌍 {languages.length} languages available
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
