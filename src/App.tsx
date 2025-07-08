import React, { Suspense, useEffect } from 'react'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { GameBoard } from './components/GameBoard'
import { LoginPage } from './components/LoginPage'
import { CopyrightNotice } from './components/CopyrightNotice'
import { LegalProtectionWrapper } from './components/LegalProtectionWrapper'
import { useTranslation } from 'react-i18next'

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-400 mx-auto mb-4"></div>
        <p className="text-violet-200">Loading...</p>
      </div>
    </div>
  );
}

function AppContent() {
  const { user, isLoading } = useAuth();
  const { t, i18n } = useTranslation();

  // Set document direction for RTL languages
  useEffect(() => {
    const isRTL = i18n.language === 'ar';
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-400 mx-auto mb-4"></div>
          <p className="text-violet-200">{t('loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <LegalProtectionWrapper>
      {user ? <GameBoard /> : <LoginPage />}
      <CopyrightNotice />
    </LegalProtectionWrapper>
  );
}

function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Suspense>
  )
}

export default App
