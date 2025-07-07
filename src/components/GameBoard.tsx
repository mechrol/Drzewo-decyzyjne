import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, Trophy, RotateCcw, Info, Shield } from 'lucide-react';
import { GameTheme } from './GameTheme';
import { LegalFooter } from './LegalFooter';
import { LegalModal } from './LegalModal';
import { HomoHumanicusLogo } from './HomoHumanicusLogo';

export const GameBoard: React.FC = () => {
  const { logout } = useAuth();
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
      name: 'Ekosystem Leśny',
      emoji: '🌲',
      description: 'Optymalizuj czynniki środowiskowe w lesie',
      color: 'from-green-600 to-emerald-500'
    },
    {
      id: 'startup',
      name: 'Startup Tech',
      emoji: '🚀',
      description: 'Buduj strategię technologicznego startupu',
      color: 'from-blue-600 to-cyan-500'
    },
    {
      id: 'marketing',
      name: 'Marketing Mix 4P',
      emoji: '📈',
      description: 'Twórz optymalny mix marketingowy',
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
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-violet-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-black/40 backdrop-blur-xl border-b border-violet-500/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              {/* HomoHumanicus Logo */}
              <HomoHumanicusLogo size="sm" variant="horizontal" />
              
              <div className="border-l border-violet-500/30 pl-6">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Trophy className="w-10 h-10 text-yellow-400 animate-pulse" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
                  </div>
                  <div>
                    <h1 className="text-2xl font-black text-white bg-gradient-to-r from-white via-violet-200 to-white bg-clip-text text-transparent">
                      DRZEWO DECYZYJNE
                    </h1>
                    <p className="text-violet-300 text-sm font-medium">Strategic Decision Game</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 text-violet-300">
                <Shield className="w-4 h-4" />
                <span className="text-sm font-medium">Chronione prawem autorskim</span>
              </div>
              <button
                onClick={logout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600/20 text-red-300 rounded-xl hover:bg-red-600/30 hover:text-red-200 transition-all duration-200 border border-red-500/30"
              >
                <LogOut className="w-4 h-4" />
                <span className="font-medium">Wyloguj</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-8 flex-1">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-white mb-4 bg-gradient-to-r from-white via-violet-200 to-white bg-clip-text text-transparent">
            WYBIERZ SCENARIUSZ GRY
          </h2>
          <p className="text-xl text-violet-100 max-w-3xl mx-auto leading-relaxed font-medium">
            🎯 Każdy scenariusz oferuje unikalne wyzwania strategiczne. 
            Optymalizuj rozmieszczenie czynników i maksymalizuj swój wynik!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {themes.map((theme) => (
            <div
              key={theme.id}
              className="group bg-black/40 backdrop-blur-xl rounded-3xl p-8 border border-violet-500/30 hover:border-violet-400/50 transition-all duration-300 hover:scale-105 cursor-pointer shadow-2xl hover:shadow-violet-500/25"
              onClick={() => setSelectedTheme(theme.id)}
            >
              <div className="text-center">
                <div className={`w-20 h-20 bg-gradient-to-r ${theme.color} rounded-2xl flex items-center justify-center mx-auto mb-6 text-4xl shadow-lg group-hover:shadow-lg group-hover:scale-110 transition-all duration-300`}>
                  {theme.emoji}
                </div>
                
                <h3 className="text-2xl font-black text-white mb-4 group-hover:text-violet-200 transition-colors">
                  {theme.name}
                </h3>
                
                <p className="text-violet-200 mb-6 leading-relaxed font-medium">
                  {theme.description}
                </p>
                
                <div className={`inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r ${theme.color} text-white rounded-xl font-bold shadow-lg group-hover:shadow-lg group-hover:scale-105 transition-all duration-300`}>
                  <span>ROZPOCZNIJ GRĘ</span>
                  <RotateCcw className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Game Info */}
        <div className="mt-16 bg-black/40 backdrop-blur-xl rounded-3xl p-8 border border-violet-500/30 max-w-4xl mx-auto">
          <div className="flex items-center space-x-3 mb-6">
            <Info className="w-8 h-8 text-blue-400" />
            <h3 className="text-2xl font-black text-white">JAK GRAĆ?</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-violet-200 mb-3">🎯 CEL GRY</h4>
              <ul className="text-violet-100 space-y-2 text-sm">
                <li>• Przeciągnij czynniki do odpowiednich gałęzi</li>
                <li>• Każda gałąź potrzebuje 4 czynników</li>
                <li>• Zbalansuj części i całości</li>
                <li>• Zbalansuj przyczyny i skutki</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-violet-200 mb-3">🏆 PUNKTACJA</h4>
              <ul className="text-violet-100 space-y-2 text-sm">
                <li>• +10 punktów za każdy poprawny czynnik</li>
                <li>• +50 punktów za zbalansowaną gałąź</li>
                <li>• +100 punktów za ukończenie scenariusza</li>
                <li>• Maksymalny wynik: 270 punktów</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Legal Footer */}
      <LegalFooter onOpenModal={openLegalModal} />

      {/* Legal Modal */}
      <LegalModal
        isOpen={legalModal.isOpen}
        type={legalModal.type}
        onClose={closeLegalModal}
      />
    </div>
  );
};
