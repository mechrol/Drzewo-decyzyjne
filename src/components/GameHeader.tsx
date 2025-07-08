import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, Trophy, Shield } from 'lucide-react';
import { HomoHumanicusLogo } from './HomoHumanicusLogo';
import { LanguageSelector } from './LanguageSelector';

export const GameHeader: React.FC = () => {
  const { t } = useTranslation();
  const { logout } = useAuth();

  return (
    <header className="relative z-10 bg-black/40 backdrop-blur-xl border-b border-violet-500/30">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 lg:space-x-6">
            <HomoHumanicusLogo size="sm" variant="horizontal" />
            <div className="border-l border-violet-500/30 pl-4 lg:pl-6">
              <div className="flex items-center space-x-3 lg:space-x-4">
                <div className="relative">
                  <Trophy className="w-8 h-8 lg:w-10 lg:h-10 text-yellow-400 animate-pulse" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 lg:w-4 lg:h-4 bg-yellow-400 rounded-full animate-ping"></div>
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl lg:text-2xl font-black text-white bg-gradient-to-r from-white via-violet-200 to-white bg-clip-text text-transparent">
                    {t('app.title')}
                  </h1>
                  <p className="text-violet-300 text-xs sm:text-sm font-medium">{t('app.subtitle')}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <LanguageSelector />
            <div className="hidden sm:flex items-center space-x-2 text-violet-300">
              <Shield className="w-4 h-4" />
              <span className="text-xs lg:text-sm font-medium">{t('legal.copyrightProtected')}</span>
            </div>
            <button
              onClick={logout}
              className="flex items-center space-x-2 px-3 lg:px-4 py-2 bg-red-600/20 text-red-300 rounded-xl hover:bg-red-600/30 hover:text-red-200 transition-all duration-200 border border-red-500/30 text-sm"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline font-medium">{t('auth.logout')}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
