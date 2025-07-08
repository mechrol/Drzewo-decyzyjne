import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Trophy, Users, Shield, ExternalLink, Eye, EyeOff, Lock, CreditCard, UserCheck, AlertCircle, Gamepad2, Zap, Star, FileText, Gavel } from 'lucide-react';
import { LegalFooter } from './LegalFooter';
import { LegalModal } from './LegalModal';
import { HomoHumanicusLogo } from './HomoHumanicusLogo';

export const LoginPage: React.FC = () => {
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

      {/* Main Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col">
        
        {/* Content Area */}
        <div className="flex-1 container mx-auto px-4 py-8">
          
          {/* Header with HomoHumanicus Branding */}
          <div className="text-center mb-8">
            {/* HomoHumanicus Logo */}
            <div className="mb-6">
              <HomoHumanicusLogo size="lg" variant="vertical" className="mx-auto" />
              <div className="mt-4 text-center">
                <p className="text-blue-200 text-sm font-medium">Powered by HomoHumanicus Technology</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
              <div className="relative">
                <Trophy className="w-16 h-16 sm:w-20 sm:h-20 text-yellow-400 drop-shadow-lg animate-pulse" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-ping"></div>
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white drop-shadow-2xl bg-gradient-to-r from-white via-violet-200 to-white bg-clip-text text-transparent">
                  DRZEWO DECYZYJNE
                </h1>
                <div className="flex items-center justify-center sm:justify-start space-x-2 mt-2">
                  <Gamepad2 className="w-5 h-5 sm:w-6 sm:h-6 text-violet-300" />
                  <span className="text-lg sm:text-xl font-bold text-violet-300 tracking-wider">STRATEGIC GAME</span>
                </div>
              </div>
            </div>
            <p className="text-lg sm:text-xl text-violet-100 max-w-4xl mx-auto leading-relaxed font-medium px-4">
              🎮 Rozwijaj swoje umiejętności strategicznego myślenia poprzez optymalizację 
              rozmieszczenia czynników w różnych scenariuszach biznesowych i ekologicznych
            </p>
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
            
            {/* Left Side - Requirements Information */}
            <div className="space-y-6">
              
              {/* Main Requirements Card */}
              <div className="bg-black/40 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-8 border border-violet-500/30 hover:border-violet-400/50 transition-all duration-300">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-violet-500/20 rounded-xl">
                    <AlertCircle className="w-6 h-6 sm:w-8 sm:h-8 text-violet-300" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">WARUNKI DOSTĘPU</h2>
                </div>
                
                <p className="text-violet-100 mb-8 text-base sm:text-lg leading-relaxed font-medium">
                  🔐 Hasło do logowania zostanie przyznane po spełnieniu następujących warunków:
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
                          <h3 className="text-xl sm:text-2xl font-black text-white">
                            WARUNEK KONIECZNY
                          </h3>
                          <span className="px-3 py-1 bg-red-500/30 text-red-200 text-sm font-bold rounded-full">BEZPŁATNE</span>
                        </div>
                        <div className="flex items-center space-x-2 mb-4">
                          <Zap className="w-5 h-5 text-yellow-400" />
                          <span className="text-red-200 font-bold text-lg">AI TRIBES</span>
                        </div>
                        <p className="text-red-100 mb-4 text-sm sm:text-base leading-relaxed">
                          Dołącz do społeczności AI Tribes i weź udział w dyskusjach o sztucznej inteligencji
                        </p>
                        <button
                          onClick={handleAITribesClick}
                          className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-xl font-bold transition-all duration-300 hover:scale-105 shadow-lg"
                        >
                          <Users className="w-4 h-4" />
                          <span>Dołącz do AI Tribes</span>
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Premium Subscription - Sufficient Condition */}
                  <div className="bg-gradient-to-r from-yellow-900/50 to-amber-800/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-yellow-400/30 hover:border-yellow-300/50 transition-all duration-300 hover:scale-105">
                    <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4">
                      <div className="p-3 bg-yellow-500/20 rounded-xl">
                        <CreditCard className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-300 flex-shrink-0" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-3">
                          <h3 className="text-xl sm:text-2xl font-black text-white">
                            WARUNEK WYSTARCZAJĄCY
                          </h3>
                          <span className="px-3 py-1 bg-yellow-500/30 text-yellow-200 text-sm font-bold rounded-full">PREMIUM</span>
                        </div>
                        <div className="flex items-center space-x-2 mb-4">
                          <Star className="w-5 h-5 text-yellow-400" />
                          <span className="text-yellow-200 font-bold text-lg">SUBSKRYPCJA PREMIUM</span>
                        </div>
                        <p className="text-yellow-100 mb-4 text-sm sm:text-base leading-relaxed">
                          Wykup subskrypcję premium i uzyskaj natychmiastowy dostęp do wszystkich funkcji
                        </p>
                        <button
                          onClick={handlePremiumClick}
                          className="inline-flex items-center space-x-2 bg-yellow-600 hover:bg-yellow-500 text-white px-4 py-2 rounded-xl font-bold transition-all duration-300 hover:scale-105 shadow-lg"
                        >
                          <CreditCard className="w-4 h-4" />
                          <span>Wykup Premium</span>
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Verification Process */}
                  <div className="bg-gradient-to-r from-green-900/50 to-emerald-800/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-green-400/30 hover:border-green-300/50 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4">
                      <div className="p-3 bg-green-500/20 rounded-xl">
                        <UserCheck className="w-6 h-6 sm:w-8 sm:h-8 text-green-300 flex-shrink-0" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl sm:text-2xl font-black text-white mb-3">
                          PROCES WERYFIKACJI
                        </h3>
                        <div className="space-y-3 text-green-100 text-sm sm:text-base">
                          <div className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span>Spełnij jeden z powyższych warunków</span>
                          </div>
                          <div className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span>Skontaktuj się z administratorem w celu weryfikacji</span>
                          </div>
                          <div className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span>Otrzymaj hasło dostępu do gry</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Game Features Preview */}
              <div className="bg-black/40 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-8 border border-violet-500/30">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-violet-500/20 rounded-xl">
                    <Gamepad2 className="w-6 h-6 sm:w-8 sm:h-8 text-violet-300" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">FUNKCJE GRY</h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-violet-900/30 rounded-xl p-4 border border-violet-500/20">
                    <div className="flex items-center space-x-2 mb-2">
                      <Trophy className="w-5 h-5 text-yellow-400" />
                      <span className="text-white font-bold">Ranking</span>
                    </div>
                    <p className="text-violet-200 text-sm">Rywalizuj z innymi graczami</p>
                  </div>
                  
                  <div className="bg-violet-900/30 rounded-xl p-4 border border-violet-500/20">
                    <div className="flex items-center space-x-2 mb-2">
                      <Shield className="w-5 h-5 text-blue-400" />
                      <span className="text-white font-bold">Bezpieczeństwo</span>
                    </div>
                    <p className="text-violet-200 text-sm">Pełna ochrona danych</p>
                  </div>
                  
                  <div className="bg-violet-900/30 rounded-xl p-4 border border-violet-500/20">
                    <div className="flex items-center space-x-2 mb-2">
                      <Zap className="w-5 h-5 text-yellow-400" />
                      <span className="text-white font-bold">Szybka gra</span>
                    </div>
                    <p className="text-violet-200 text-sm">Optymalizacja wydajności</p>
                  </div>
                  
                  <div className="bg-violet-900/30 rounded-xl p-4 border border-violet-500/20">
                    <div className="flex items-center space-x-2 mb-2">
                      <Star className="w-5 h-5 text-purple-400" />
                      <span className="text-white font-bold">Osiągnięcia</span>
                    </div>
                    <p className="text-violet-200 text-sm">System nagród</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Login Form and EULA */}
            <div className="space-y-6">
              
              {/* Tab Navigation */}
              <div className="bg-black/40 backdrop-blur-xl rounded-3xl shadow-2xl border border-violet-500/30 overflow-hidden">
                <div className="flex">
                  <button
                    onClick={() => setActiveTab('login')}
                    className={`flex-1 px-6 py-4 font-bold text-lg transition-all duration-300 ${
                      activeTab === 'login'
                        ? 'bg-violet-600 text-white'
                        : 'bg-transparent text-violet-300 hover:bg-violet-900/30'
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <Lock className="w-5 h-5" />
                      <span>LOGOWANIE</span>
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveTab('eula')}
                    className={`flex-1 px-6 py-4 font-bold text-lg transition-all duration-300 ${
                      activeTab === 'eula'
                        ? 'bg-violet-600 text-white'
                        : 'bg-transparent text-violet-300 hover:bg-violet-900/30'
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <FileText className="w-5 h-5" />
                      <span>EULA</span>
                    </div>
                  </button>
                </div>

                {/* Tab Content */}
                <div className="p-6 sm:p-8">
                  {activeTab === 'login' ? (
                    /* Login Form */
                    <div>
                      <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">DOSTĘP DO GRY</h2>
                        <p className="text-violet-200">Wprowadź hasło otrzymane po weryfikacji</p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Password Input */}
                        <div>
                          <label htmlFor="password" className="block text-sm font-bold text-violet-200 mb-2">
                            HASŁO DOSTĘPU
                          </label>
                          <div className="relative">
                            <input
                              type={showPassword ? 'text' : 'password'}
                              id="password"
                              name="password"
                              value={formData.password}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 bg-black/50 border border-violet-500/30 rounded-xl text-white placeholder-violet-300 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20 transition-all duration-300"
                              placeholder="Wprowadź hasło..."
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
                          className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 disabled:from-gray-600 disabled:to-gray-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 hover:scale-105 disabled:scale-100 shadow-lg disabled:cursor-not-allowed"
                        >
                          {isLoading ? (
                            <div className="flex items-center justify-center space-x-2">
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                              <span>LOGOWANIE...</span>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center space-x-2">
                              <Lock className="w-5 h-5" />
                              <span>ZALOGUJ SIĘ</span>
                            </div>
                          )}
                        </button>
                      </form>

                      {/* Help Text */}
                      <div className="mt-8 text-center">
                        <p className="text-violet-300 text-sm mb-4">
                          Nie masz hasła? Spełnij warunki dostępu po lewej stronie.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-xs text-violet-400">
                          <span>🔒 Bezpieczne logowanie</span>
                          <span>⚡ Szybki dostęp</span>
                          <span>🎮 Pełna funkcjonalność</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* EULA Content */
                    <div>
                      <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">UMOWA LICENCYJNA</h2>
                        <p className="text-violet-200">End User License Agreement</p>
                      </div>

                      <div className="space-y-6">
                        {/* EULA Summary */}
                        <div className="bg-violet-900/30 rounded-xl p-6 border border-violet-500/20">
                          <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                            <Gavel className="w-5 h-5 text-violet-400" />
                            <span>Główne postanowienia</span>
                          </h3>
                          <div className="space-y-3 text-violet-200 text-sm">
                            <div className="flex items-start space-x-2">
                              <div className="w-2 h-2 bg-violet-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span>Gra jest udostępniana na licencji niewyłącznej</span>
                            </div>
                            <div className="flex items-start space-x-2">
                              <div className="w-2 h-2 bg-violet-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span>Zabrania się modyfikacji kodu źródłowego</span>
                            </div>
                            <div className="flex items-start space-x-2">
                              <div className="w-2 h-2 bg-violet-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span>Dane użytkownika są chronione zgodnie z RODO</span>
                            </div>
                            <div className="flex items-start space-x-2">
                              <div className="w-2 h-2 bg-violet-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span>Licencja może zostać cofnięta w przypadku naruszenia</span>
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
                              <span className="text-white font-bold text-sm">Regulamin</span>
                            </div>
                            <p className="text-violet-300 text-xs">Zasady korzystania z gry</p>
                          </button>

                          <button
                            onClick={() => openLegalModal('privacy')}
                            className="bg-black/30 hover:bg-black/50 border border-violet-500/20 hover:border-violet-400/30 rounded-xl p-4 transition-all duration-300 hover:scale-105"
                          >
                            <div className="flex items-center space-x-2 mb-2">
                              <Shield className="w-5 h-5 text-blue-400" />
                              <span className="text-white font-bold text-sm">Prywatność</span>
                            </div>
                            <p className="text-violet-300 text-xs">Polityka prywatności</p>
                          </button>

                          <button
                            onClick={() => openLegalModal('license')}
                            className="bg-black/30 hover:bg-black/50 border border-violet-500/20 hover:border-violet-400/30 rounded-xl p-4 transition-all duration-300 hover:scale-105"
                          >
                            <div className="flex items-center space-x-2 mb-2">
                              <Gavel className="w-5 h-5 text-yellow-400" />
                              <span className="text-white font-bold text-sm">Licencja</span>
                            </div>
                            <p className="text-violet-300 text-xs">Warunki licencyjne</p>
                          </button>

                          <button
                            onClick={() => openLegalModal('security')}
                            className="bg-black/30 hover:bg-black/50 border border-violet-500/20 hover:border-violet-400/30 rounded-xl p-4 transition-all duration-300 hover:scale-105"
                          >
                            <div className="flex items-center space-x-2 mb-2">
                              <Lock className="w-5 h-5 text-green-400" />
                              <span className="text-white font-bold text-sm">Bezpieczeństwo</span>
                            </div>
                            <p className="text-violet-300 text-xs">Polityka bezpieczeństwa</p>
                          </button>
                        </div>

                        {/* Acceptance Notice */}
                        <div className="bg-green-900/30 border border-green-500/20 rounded-xl p-4">
                          <div className="flex items-start space-x-3">
                            <UserCheck className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="text-green-200 font-bold text-sm mb-1">Akceptacja warunków</h4>
                              <p className="text-green-300 text-xs leading-relaxed">
                                Logując się do gry automatycznie akceptujesz wszystkie powyższe warunki 
                                i zobowiązujesz się do ich przestrzegania.
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
