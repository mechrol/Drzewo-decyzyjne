import React from 'react'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { GameBoard } from './components/GameBoard'
import { LoginPage } from './components/LoginPage'
import { CopyrightNotice } from './components/CopyrightNotice'
import { LegalProtectionWrapper } from './components/LegalProtectionWrapper'

function AppContent() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Ładowanie...</p>
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
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
