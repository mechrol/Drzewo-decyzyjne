import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Trophy, Users, Shield, ExternalLink, Eye, EyeOff, Lock, CreditCard, UserCheck, AlertCircle, Gamepad2, Zap, Star } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: ''
  });
  const [error, setError] = useState('');

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

      <div className="relative z-10 container mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="text-center mb-8">
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
                      <p className="text-red-100 mb-4 leading-relaxed font-medium text-sm sm:text-base">
                        <strong>⚠️ Bez rejestracji w AI Tribes nie ma dostępu do gry.</strong> 
                        To podstawowy warunek, który musi być spełniony przez każdego gracza.
                      </p>
                      <div className="bg-red-500/20 rounded-xl p-4 mb-4 border border-red-400/20">
                        <p className="text-red-100 text-sm font-medium">
                          <strong>🚨 UWAGA:</strong> Rejestracja w AI Tribes jest obowiązkowa i bezpłatna. 
                          Bez niej nie otrzymasz hasła dostępu, nawet jeśli spełnisz drugi warunek.
                        </p>
                      </div>
                      <a
                        href="https://kontrakt.aitribes.app/ft/eXDMm"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl hover:from-red-500 hover:to-red-400 transition-all duration-300 font-bold shadow-lg hover:shadow-red-500/25 hover:scale-105 text-sm sm:text-base"
                      >
                        <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>DOŁĄCZ DO AI TRIBES</span>
                        <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Live Good Requirement - Sufficient Condition */}
                <div className="bg-gradient-to-r from-green-900/50 to-emerald-800/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-green-400/30 hover:border-green-300/50 transition-all duration-300 hover:scale-105">
                  <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4">
                    <div className="p-3 bg-green-500/20 rounded-xl">
                      <CreditCard className="w-6 h-6 sm:w-8 sm:h-8 text-green-300 flex-shrink-0" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-3">
                        <h3 className="text-xl sm:text-2xl font-black text-white">
                          WARUNEK WYSTARCZAJĄCY
                        </h3>
                        <span className="px-3 py-1 bg-green-500/30 text-green-200 text-sm font-bold rounded-full">PŁATNE</span>
                      </div>
                      <div className="flex items-center space-x-2 mb-4">
                        <Star className="w-5 h-5 text-yellow-400" />
                        <span className="text-green-200 font-bold text-lg">LIVE GOOD</span>
                      </div>
                      <p className="text-green-100 mb-4 leading-relaxed font-medium text-sm sm:text-base">
                        <strong>✅ Po rejestracji w Live Good (wraz z AI Tribes) otrzymasz hasło dostępu.</strong> 
                        To warunek, który kończy proces weryfikacji i umożliwia dostęp do gry.
                      </p>
                      <div className="bg-green-500/20 rounded-xl p-4 mb-4 border border-green-400/20">
                        <p className="text-green-100 text-sm font-medium">
                          <strong>💎 WAŻNE:</strong> Live Good to płatny program partnerski. 
                          Po rejestracji w obu platformach administrator przydzieli Ci hasło dostępu.
                        </p>
                      </div>
                      <a
                        href="https://livegood.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-xl hover:from-green-500 hover:to-emerald-400 transition-all duration-300 font-bold shadow-lg hover:shadow-green-500/25 hover:scale-105 text-sm sm:text-base"
                      >
                        <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>PRZEJDŹ DO LIVE GOOD</span>
                        <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Logic Explanation */}
              <div className="mt-8 bg-gradient-to-r from-blue-900/50 to-indigo-900/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-blue-400/30">
                <h4 className="font-black text-blue-200 mb-4 text-lg sm:text-xl flex items-center">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-yellow-400" />
                  LOGIKA DOSTĘPU:
                </h4>
                <div className="space-y-2 text-blue-100 font-medium text-sm sm:text-base">
                  <p><strong className="text-red-300">🔴 AI TRIBES</strong> = warunek konieczny (bez tego brak dostępu)</p>
                  <p><strong className="text-green-300">🟢 LIVE GOOD</strong> = warunek wystarczający (z AI Tribes = otrzymanie hasła)</p>
                  <p><strong className="text-yellow-300">🟡 OBA WARUNKI RAZEM</strong> = pełny dostęp do gry</p>
                </div>
              </div>
            </div>

            {/* Process Steps */}
            <div className="bg-black/40 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-8 border border-violet-500/30">
              <h3 className="text-xl sm:text-2xl font-black text-white mb-6 flex items-center">
                <div className="p-2 bg-purple-500/20 rounded-xl mr-3">
                  <UserCheck className="w-5 h-5 sm:w-6 sm:h-6 text-purple-300" />
                </div>
                PROCES UZYSKANIA HASŁA
              </h3>
              
              <div className="space-y-4">
                {[
                  { num: 1, title: "Rejestracja AI Tribes (Konieczne)", desc: "Bezpłatna rejestracja w społeczności AI Tribes - bez tego brak dostępu", color: "red" },
                  { num: 2, title: "Rejestracja Live Good (Wystarczające)", desc: "Płatna rejestracja w programie partnerskim - kończy proces weryfikacji", color: "green" },
                  { num: 3, title: "Weryfikacja Członkostwa", desc: "Administrator sprawdza spełnienie obu warunków", color: "blue" },
                  { num: 4, title: "Przyznanie Hasła", desc: "Administrator przekazuje hasło dostępu do gry", color: "yellow" },
                  { num: 5, title: "Logowanie do Gry", desc: "Użyj otrzymanego hasła do zalogowania się", color: "purple" }
                ].map((step, index) => (
                  <div key={index} className="flex items-start space-x-4 group hover:scale-105 transition-transform duration-300">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-${step.color}-500 to-${step.color}-400 text-white rounded-full flex items-center justify-center font-black text-base sm:text-lg shadow-lg group-hover:shadow-${step.color}-500/50 flex-shrink-0`}>
                      {step.num}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-white text-base sm:text-lg">{step.title}</h4>
                      <p className="text-violet-200 text-sm font-medium">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Game Features Preview */}
            <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-purple-400/30">
              <h3 className="text-xl sm:text-2xl font-black text-white mb-6 flex items-center">
                <Gamepad2 className="w-6 h-6 sm:w-8 sm:h-8 mr-3 text-purple-300" />
                CO CIĘ CZEKA W GRZE?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { emoji: "🌲", title: "Ekosystem Leśny", desc: "Optymalizuj czynniki środowiskowe" },
                  { emoji: "🚀", title: "Startup Tech", desc: "Buduj strategię biznesową" },
                  { emoji: "📈", title: "Marketing 4P", desc: "Twórz mix marketingowy" }
                ].map((feature, index) => (
                  <div key={index} className="text-center group hover:scale-110 transition-transform duration-300">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-xl sm:text-2xl shadow-lg group-hover:shadow-purple-500/50">
                      {feature.emoji}
                    </div>
                    <h4 className="font-black text-white text-base sm:text-lg mb-2">{feature.title}</h4>
                    <p className="text-purple-200 font-medium text-sm">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="bg-black/50 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-8 border border-violet-500/30 xl:sticky xl:top-8 hover:border-violet-400/50 transition-all duration-300">
            <div className="text-center mb-8">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-3 bg-gradient-to-r from-white via-violet-200 to-white bg-clip-text text-transparent">
                LOGOWANIE DO GRY
              </h2>
              <p className="text-violet-200 font-medium text-sm sm:text-base">
                🎮 Wprowadź hasło otrzymane po spełnieniu warunków dostępu
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-900/50 border border-red-400/30 rounded-xl backdrop-blur-sm">
                <p className="text-red-200 text-sm font-medium">⚠️ {error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-violet-200 mb-3">
                  🔑 HASŁO DOSTĘPU
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-violet-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-14 py-4 bg-black/30 border border-violet-500/30 rounded-xl focus:ring-2 focus:ring-violet-400 focus:border-violet-400 text-white placeholder-violet-300 font-medium backdrop-blur-sm transition-all duration-300"
                    placeholder="Hasło od administratora"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-violet-400 hover:text-violet-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white py-4 px-6 rounded-xl hover:from-violet-500 hover:to-purple-500 focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-black text-base sm:text-lg shadow-lg hover:shadow-violet-500/25 hover:scale-105"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>SPRAWDZANIE DOSTĘPU...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <Gamepad2 className="w-5 h-5" />
                    <span>ZALOGUJ SIĘ DO GRY</span>
                  </div>
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-violet-500/30">
              <div className="bg-gradient-to-r from-yellow-900/50 to-orange-900/50 rounded-xl p-4 border border-yellow-400/30 backdrop-blur-sm">
                <h4 className="font-black text-yellow-200 mb-2 flex items-center">
                  <Star className="w-5 h-5 mr-2" />
                  NIE MASZ JESZCZE HASŁA?
                </h4>
                <p className="text-yellow-100 text-sm mb-3 font-medium">
                  🎯 Spełnij oba warunki dostępu: zarejestruj się w AI Tribes (konieczne) 
                  i Live Good (wystarczające), a następnie skontaktuj się z administratorem.
                </p>
                <div className="bg-yellow-500/20 rounded-lg p-3 border border-yellow-400/20">
                  <p className="text-yellow-200 text-xs font-bold">
                    🎮 <strong>DEMO HASŁO:</strong> admin123 (tylko do celów testowych)
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-xs text-violet-300 font-medium">
                🔐 Hasło zostanie przyznane po weryfikacji członkostwa
                <br />
                w AI Tribes (konieczne) i Live Good (wystarczające).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
