import React from 'react';
import { useTranslation } from 'react-i18next';

interface ThemeCardProps {
  theme: {
    id: string;
    name: string;
    emoji: string;
    description: string;
    color: string;
  };
  onSelect: (themeId: string) => void;
}

export const ThemeCard: React.FC<ThemeCardProps> = ({ theme, onSelect }) => {
  const { t } = useTranslation();

  return (
    <div
      className="group bg-black/40 backdrop-blur-xl rounded-3xl p-6 lg:p-8 border border-violet-500/30 hover:border-violet-400/50 transition-all duration-300 hover:scale-105 cursor-pointer shadow-2xl hover:shadow-violet-500/25"
      onClick={() => onSelect(theme.id)}
    >
      <div className="text-center">
        <div className={`w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-r ${theme.color} rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl lg:text-4xl shadow-lg group-hover:shadow-lg group-hover:scale-110 transition-all duration-300`}>
          {theme.emoji}
        </div>
        
        <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-white mb-4 group-hover:text-violet-200 transition-colors">
          {theme.name}
        </h3>
        
        <p className="text-violet-200 mb-6 leading-relaxed font-medium text-sm sm:text-base">
          {theme.description}
        </p>
        
        <button className={`inline-flex items-center space-x-2 px-4 lg:px-6 py-3 bg-gradient-to-r ${theme.color} text-white rounded-xl font-bold shadow-lg group-hover:shadow-lg group-hover:scale-105 transition-all duration-300 text-sm sm:text-base`}>
          <span>{t('game.startGame')}</span>
        </button>
      </div>
    </div>
  );
};
