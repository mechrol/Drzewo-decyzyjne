import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { Trophy, Users, Shield, ExternalLink, Eye, EyeOff, Lock, CreditCard, UserCheck, AlertCircle, Gamepad2, Zap, Star, FileText, Gavel } from 'lucide-react';
import { LegalFooter } from './LegalFooter';
import { LegalModal } from './LegalModal';
import { HomoHumanicusLogo } from './HomoHumanicusLogo';
import { LanguageSelector } from './LanguageSelector';

export const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const { login, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: ''
  });
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'login' | 'eula'>('login');
  const [legalModal, setLegalModal] = useState<{
    isOpen: boolean;
    type: 'privacy' | 'license' | 'terms' | 'copyright' | 'security' | null;
  }>({
    isOpen: false,
    type: null
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // Use a fixed username for the informational login
      await login('gameuser', formData.password, false);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const openLegalModal = (type: 'privacy' | 'license' | 'terms' | 'copyright' | 'security') => {
    setLegalModal({ isOpen: true, type });
  };

  const closeLegalModal = () => {
    setLegalModal({ isOpen: false, type: null });
  };

  const handleAITribesClick = () => {
    window.open('https://kontrakt.aitribes.app/ft/eXDMm', '_blank', 'noopener,noreferrer');
  };

  const handlePremiumClick = () => {
    window.open('https://www.LiveGoodTour.com/mechrol', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-violet-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      {/* Language Selector - Fixed Position Top Right */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageSelector variant="compact" position="right" />
      </div>

      {/* Main Content Container - Mobile Optimized */}
      <div className="relative z-10 min-h-screen flex flex-col">
        
        {/* Content Area - Mobile Scrollable */}
        <div className="flex-1 w-full overflow-y-auto">
          <div className="container mx-auto px-4 py-8 pb-20">
            
            {/* Header with HomoHumanicus Branding */}
            <div className="text-center mb-8">
              {/* HomoHumanicus Logo */}
              <div className="mb-6">
                <HomoHumanicusLogo size="lg" variant="vertical" className="mx-auto" />
                <div className="mt-4 text-center">
                  <p className="text-blue-200 text-sm font-medium">{t('app.poweredBy')}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
                <div className="relative">
                  <Trophy className="w-16 h-16 sm:w-20 sm:h-20 text-yellow-400 drop-shadow-lg animate-pulse" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-ping"></div>
                </div>
                <div className="text-center sm:text-left">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white drop-shadow-2xl bg-gradient-to-r from-white via-violet-200 to-white bg-clip-text text-transparent">
                    {t('app.title')}
                  </h1>
                  <div className="flex items-center justify-center sm:justify-start space-x-2 mt-2">
                    <Gamepad2 className="w-5 h-5 sm:w-6 sm:h-6 text-violet-300" />
                    <span className="text-lg sm:text-xl font-bold text-violet-300 tracking-wider">{t('app.subtitle')}</span>
                  </div>
                </div>
              </div>
              <p className="text-base sm:text-lg lg:text-xl text-violet-100 max-w-4xl mx-auto leading-relaxed font-medium px-4">
                {t('app.description')}
              </p>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8 items-start">
              
              {/* Left Side - Requirements Information */}
              <div className="xl:col-span-2 space-y-6">
                
                {/* Main Requirements Card */}
                <div className="bg-black/40 backdrop-blur-xl rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-violet-500/30 hover:border-violet-400/50 transition-all duration-300">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 bg-violet-500/20 rounded-xl">
                      <AlertCircle className="w-6 h-6 sm:w-8 sm:h-8 text-violet-300" />
                    </div>
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white">{t('auth.accessConditions')}</h2>
                  </div>
                  
                  <p className="text-violet-100 mb-8 text-sm sm:text-base lg:text-lg leading-relaxed font-medium">
                    {t('auth.demoPasswordInfo')}
                  </p>

                  <div className="space-y-6">
                    {/* AI Tribes Requirement - Necessary Condition */}
                    <div className="bg-gradient-to-r from-red-900/50 to-red-800/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-red-400/30 hover:border-red-300/50 transition-all duration-300 hover:scale-105">
                      <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4">
                        <div className="p-3 bg-red-500/20 rounded-xl">
                          <Users className="w-6 h-6 sm:w-8 sm:h-8 text-red-300 flex-shrink-0" />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-3">
                            <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-white">
                              {t('auth.demoAccess')}
                            </h3>
                            <span className="px-3 py-1 bg-red-500/30 text-red-200 text-sm font-bold rounded-full">{t('auth.free')}</span>
                          </div>
                          <div className="flex items-center space-x-2 mb-4">
                            <Zap className="w-5 h-5 text-yellow-400" />
                            <span className="text-red-200 font-bold text-base lg:text-lg">{t('auth.aiTribes')}</span>
                          </div>
                          <p className="text-red-100 mb-4 text-sm sm:text-base leading-relaxed">
                            {t('auth.aiTribesDescription')}
                          </p>
                          <div className="bg-red-800/30 rounded-xl p-3 mb-4 border border-red-500/20">
                            <div className="flex items-start space-x-2">
                              <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-red-100 text-sm font-medium">
                                {t('auth.registrationNote')}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={handleAITribesClick}
                            className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-xl font-bold transition-all duration-300 hover:scale-105 shadow-lg text-sm sm:text-base"
                          >
                            <Users className="w-4 h-4" />
                            <span>{t('auth.joinAiTribes')}</span>
                            <ExternalLink className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Premium Subscription - Full Access */}
                    <div className="bg-gradient-to-r from-yellow-900/50 to-amber-800/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-yellow-400/30 hover:border-yellow-300/50 transition-all duration-300 hover:scale-105">
                      <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4">
                        <div className="p-3 bg-yellow-500/20 rounded-xl">
                          <CreditCard className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-300 flex-shrink-0" />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-3">
                            <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-white">
                              {t('auth.fullAccess')}
                            </h3>
                            <span className="px-3 py-1 bg-yellow-500/30 text-yellow-200 text-sm font-bold rounded-full">{t('auth.premium')}</span>
                          </div>
                          <div className="flex items-center space-x-2 mb-4">
                            <Star className="w-5 h-5 text-yellow-400" />
                            <span className="text-yellow-200 font-bold text-base lg:text-lg">{t('auth.premiumSubscription')}</span>
                          </div>
                          <p className="text-yellow-100 mb-4 text-sm sm:text-base leading-relaxed">
                            {t('auth.premiumDescription')}
                          </p>
                          <button
                            onClick={handlePremiumClick}
                            className="inline-flex items-center space-x-2 bg-yellow-600 hover:bg-yellow-500 text-white px-4 py-2 rounded-xl font-bold transition-all duration-300 hover:scale-105 shadow-lg text-sm sm:text-base"
                          >
                            <CreditCard className="w-4 h-4" />
                            <span>{t('auth.buyPremium')}</span>
                            <ExternalLink className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Game Features Preview */}
                <div className="bg-black/40 backdrop-blur-xl rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-violet-500/30">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 bg-violet-500/20 rounded-xl">
                      <Gamepad2 className="w-6 h-6 sm:w-8 sm:h-8 text-violet-300" />
                    </div>
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white">{t('game.features')}</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-violet-900/30 rounded-xl p-4 border border-violet-500/20">
                      <div className="flex items-center space-x-2 mb-2">
                        <Trophy className="w-5 h-5 text-yellow-400" />
                        <span className="text-white font-bold text-sm sm:text-base">{t('game.ranking')}</span>
                      </div>
                      <p className="text-violet-200 text-xs sm:text-sm">{t('game.rankingDesc')}</p>
                    </div>
                    
                    <div className="bg-violet-900/30 rounded-xl p-4 border border-violet-500/20">
                      <div className="flex items-center space-x-2 mb-2">
                        <Shield className="w-5 h-5 text-blue-400" />
                        <span className="text-white font-bold text-sm sm:text-base">{t('game.security')}</span>
                      </div>
                      <p className="text-violet-200 text-xs sm:text-sm">{t('game.securityDesc')}</p>
                    </div>
                    
                    <div className="bg-violet-900/30 rounded-xl p-4 border border-violet-500/20">
                      <div className="flex items-center space-x-2 mb-2">
                        <Zap className="w-5 h-5 text-yellow-400" />
                        <span className="text-white font-bold text-sm sm:text-base">{t('game.fastGame')}</span>
                      </div>
                      <p className="text-violet-200 text-xs sm:text-sm">{t('game.fastGameDesc')}</p>
                    </div>
                    
                    <div className="bg-violet-900/30 rounded-xl p-4 border border-violet-500/20">
                      <div className="flex items-center space-x-2 mb-2">
                        <Star className="w-5 h-5 text-purple-400" />
                        <span className="text-white font-bold text-sm sm:text-base">{t('game.achievements')}</span>
                      </div>
                      <p className="text-violet-200 text-xs sm:text-sm">{t('game.achievementsDesc')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Login Form, EULA, and Password Instructions */}
              <div className="xl:col-span-1 space-y-6">
                
                {/* Verification Process - Now positioned on the right */}
                <div className="bg-gradient-to-r from-green-900/50 to-emerald-800/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-green-400/30 hover:border-green-300/50 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4">
                    <div className="p-3 bg-green-500/20 rounded-xl">
                      <UserCheck className="w-6 h-6 sm:w-8 sm:h-8 text-green-300 flex-shrink-0" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-white mb-3">
                        {t('auth.howToGetPassword')}
                      </h3>
                      <div className="space-y-3 text-green-100 text-sm sm:text-base">
                        <div className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{t('auth.steps.clickButton')}</span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{t('auth.steps.register')}</span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{t('auth.steps.receivePassword')}</span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{t('auth.steps.returnAndLogin')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tab Navigation */}
                <div className="bg-black/40 backdrop-blur-xl rounded-3xl shadow-2xl border border-violet-500/30 overflow-hidden">
                  <div className="flex">
                    <button
                      onClick={() => setActiveTab('login')}
                      className={`flex-1 px-4 sm:px-6 py-4 font-bold text-sm sm:text-base lg:text-lg transition-all duration-300 ${
                        activeTab === 'login'
                          ? 'bg-violet-600 text-white'
                          : 'bg-transparent text-violet-300 hover:bg-violet-900/30'
                      }`}
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <Lock className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="hidden sm:inline">LOGOWANIE</span>
                        <span className="sm:hidden">LOGIN</span>
                      </div>
                    </button>
                    <button
                      onClick={() => setActiveTab('eula')}
                      className={`flex-1 px-4 sm:px-6 py-4 font-bold text-sm sm:text-base lg:text-lg transition-all duration-300 ${
                        activeTab === 'eula'
                          ? 'bg-violet-600 text-white'
                          : 'bg-transparent text-violet-300 hover:bg-violet-900/30'
                      }`}
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>{t('legal.eula')}</span>
                      </div>
                    </button>
                  </div>

                  {/* Tab Content */}
                  <div className="p-4 sm:p-6 lg:p-8">
                    {activeTab === 'login' ? (
                      /* Login Form */
                      <div>
                        <div className="text-center mb-8">
                          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white mb-2">{t('auth.loginTitle')}</h2>
                          <p className="text-violet-200 text-sm sm:text-base">{t('auth.loginSubtitle')}</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                          {/* Password Input */}
                          <div>
                            <label htmlFor="password" className="block text-sm font-bold text-violet-200 mb-2">
                              {t('auth.demoPassword')}
                            </label>
                            <div className="relative">
                              <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-black/50 border border-violet-500/30 rounded-xl text-white placeholder-violet-300 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20 transition-all duration-300 text-sm sm:text-base"
                                placeholder={t('auth.passwordPlaceholder')}
                                required
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-violet-300 hover:text-violet-200 transition-colors duration-200"
                              >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                              </button>
                            </div>
                          </div>

                          {/* Error Message */}
                          {error && (
                            <div className="bg-red-900/50 border border-red-500/30 rounded-xl p-4">
                              <div className="flex items-center space-x-2">
                                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                                <span className="text-red-200 text-sm">{error}</span>
                              </div>
                            </div>
                          )}

                          {/* Submit Button */}
                          <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 disabled:from-gray-600 disabled:to-gray-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 hover:scale-105 disabled:scale-100 shadow-lg disabled:cursor-not-allowed text-sm sm:text-base"
                          >
                            {isLoading ? (
                              <div className="flex items-center justify-center space-x-2">
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                <span>{t('auth.logging')}</span>
                              </div>
                            ) : (
                              <div className="flex items-center justify-center space-x-2">
                                <Lock className="w-5 h-5" />
                                <span>{t('auth.login')}</span>
                              </div>
                            )}
                          </button>
                        </form>

                        {/* Help Text */}
                        <div className="mt-8 text-center">
                          <p className="text-violet-300 text-sm mb-4">
                            {t('auth.noPassword')}
                          </p>
                          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-xs text-violet-400">
                            <span>{t('auth.secureLogin')}</span>
                            <span>{t('auth.quickAccess')}</span>
                            <span>{t('auth.demoVersion')}</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* EULA Content */
                      <div>
                        <div className="text-center mb-8">
                          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white mb-2">{t('legal.licenseAgreement')}</h2>
                          <p className="text-violet-200 text-sm sm:text-base">{t('legal.endUserLicense')}</p>
                        </div>

                        <div className="space-y-6">
                          {/* EULA Summary */}
                          <div className="bg-violet-900/30 rounded-xl p-4 sm:p-6 border border-violet-500/20">
                            <h3 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center space-x-2">
                              <Gavel className="w-5 h-5 text-violet-400" />
                              <span>{t('legal.mainProvisions')}</span>
                            </h3>
                            <div className="space-y-3 text-violet-200 text-sm">
                              <div className="flex items-start space-x-2">
                                <div className="w-2 h-2 bg-violet-400 rounded-full mt-2 flex-shrink-0"></div>
                                <span>{t('legal.provisions.nonExclusive')}</span>
                              </div>
                              <div className="flex items-start space-x-2">
                                <div className="w-2 h-2 bg-violet-400 rounded-full mt-2 flex-shrink-0"></div>
                                <span>{t('legal.provisions.noModification')}</span>
                              </div>
                              <div className="flex items-start space-x-2">
                                <div className="w-2 h-2 bg-violet-400 rounded-full mt-2 flex-shrink-0"></div>
                                <span>{t('legal.provisions.gdprProtection')}</span>
                              </div>
                              <div className="flex items-start space-x-2">
                                <div className="w-2 h-2 bg-violet-400 rounded-full mt-2 flex-shrink-0"></div>
                                <span>{t('legal.provisions.revocable')}</span>
                              </div>
                            </div>
                          </div>

                          {/* Legal Documents Links */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <button
                              onClick={() => openLegalModal('terms')}
                              className="bg-black/30 hover:bg-black/50 border border-violet-500/20 hover:border-violet-400/30 rounded-xl p-4 transition-all duration-300 hover:scale-105"
                            >
                              <div className="flex items-center space-x-2 mb-2">
                                <FileText className="w-5 h-5 text-violet-400" />
                                <span className="text-white font-bold text-sm">{t('legal.terms')}</span>
                              </div>
                              <p className="text-violet-300 text-xs">{t('legal.termsDesc')}</p>
                            </button>

                            <button
                              onClick={() => openLegalModal('privacy')}
                              className="bg-black/30 hover:bg-black/50 border border-violet-500/20 hover:border-violet-400/30 rounded-xl p-4 transition-all duration-300 hover:scale-105"
                            >
                              <div className="flex items-center space-x-2 mb-2">
                                <Shield className="w-5 h-5 text-blue-400" />
                                <span className="text-white font-bold text-sm">{t('legal.privacy')}</span>
                              </div>
                              <p className="text-violet-300 text-xs">{t('legal.privacyDesc')}</p>
                            </button>

                            <button
                              onClick={() => openLegalModal('license')}
                              className="bg-black/30 hover:bg-black/50 border border-violet-500/20 hover:border-violet-400/30 rounded-xl p-4 transition-all duration-300 hover:scale-105"
                            >
                              <div className="flex items-center space-x-2 mb-2">
                                <Gavel className="w-5 h-5 text-yellow-400" />
                                <span className="text-white font-bold text-sm">{t('legal.license')}</span>
                              </div>
                              <p className="text-violet-300 text-xs">{t('legal.licenseDesc')}</p>
                            </button>

                            <button
                              onClick={() => openLegalModal('security')}
                              className="bg-black/30 hover:bg-black/50 border border-violet-500/20 hover:border-violet-400/30 rounded-xl p-4 transition-all duration-300 hover:scale-105"
                            >
                              <div className="flex items-center space-x-2 mb-2">
                                <Lock className="w-5 h-5 text-green-400" />
                                <span className="text-white font-bold text-sm">{t('legal.security')}</span>
                              </div>
                              <p className="text-violet-300 text-xs">{t('legal.securityDesc')}</p>
                            </button>
                          </div>

                          {/* Acceptance Notice */}
                          <div className="bg-green-900/30 border border-green-500/20 rounded-xl p-4">
                            <div className="flex items-start space-x-3">
                              <UserCheck className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                              <div>
                                <h4 className="text-green-200 font-bold text-sm mb-1">{t('legal.acceptanceTitle')}</h4>
                                <p className="text-green-300 text-xs leading-relaxed">
                                  {t('legal.acceptanceDesc')}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Footer */}
        <LegalFooter onLegalClick={openLegalModal} />
      </div>

      {/* Legal Modal */}
      <LegalModal
        isOpen={legalModal.isOpen}
        type={legalModal.type}
        onClose={closeLegalModal}
      />
    </div>
  );
};
