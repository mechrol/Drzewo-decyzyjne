import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GameTheme } from './GameTheme';
import { LegalFooter } from './LegalFooter';
import { LegalModal } from './LegalModal';
import { GameHeader } from './GameHeader';
import { ThemeGrid } from './ThemeGrid';

export const GameBoard: React.FC = () => {
  const { t } = useTranslation();
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [legalModal, setLegalModal] = useState<{
    isOpen: boolean;
    type: 'privacy' | 'license' | 'terms' | 'copyright' | 'security' | null;
  }>({
    isOpen: false,
    type: null
  });

  const themes = [
    {
      id: 'forest',
      name: t('themes.forest.name'),
      emoji: '🌲',
      description: t('themes.forest.description'),
      color: 'from-green-600 to-emerald-500'
    },
    {
      id: 'startup',
      name: t('themes.startup.name'),
      emoji: '🚀',
      description: t('themes.startup.description'),
      color: 'from-blue-600 to-cyan-500'
    },
    {
      id: 'marketing',
      name: t('themes.marketing.name'),
      emoji: '📈',
      description: t('themes.marketing.description'),
      color: 'from-purple-600 to-pink-500'
    }
  ];

  const openLegalModal = (type: 'privacy' | 'license' | 'terms' | 'copyright' | 'security') => {
    setLegalModal({ isOpen: true, type });
  };

  const closeLegalModal = () => {
    setLegalModal({ isOpen: false, type: null });
  };

  if (selectedTheme) {
    return (
      <div className="min-h-screen flex flex-col">
        <GameTheme 
          themeId={selectedTheme} 
          onBack={() => setSelectedTheme(null)} 
        />
        <LegalFooter onOpenModal={openLegalModal} />
        <LegalModal
          isOpen={legalModal.isOpen}
          type={legalModal.type}
          onClose={closeLegalModal}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 relative overflow-hidden flex flex-col">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-violet-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <GameHeader />

      <main className="relative z-10 flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-6 lg:py-8">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-4 bg-gradient-to-r from-white via-violet-200 to-white bg-clip-text text-transparent">
              {t('game.chooseScenario')}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-violet-100 max-w-3xl mx-auto leading-relaxed font-medium px-4">
              {t('game.scenarioDescription')}
            </p>
          </div>

          <ThemeGrid themes={themes} onThemeSelect={setSelectedTheme} />
        </div>
      </main>

      <LegalFooter onOpenModal={openLegalModal} />
      <LegalModal
        isOpen={legalModal.isOpen}
        type={legalModal.type}
        onClose={closeLegalModal}
      />
    </div>
  );
};
