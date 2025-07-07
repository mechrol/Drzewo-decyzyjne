import React, { useState, useEffect } from 'react';
import { AlertTriangle, Shield, X, Eye, ExternalLink } from 'lucide-react';

interface LegalProtectionWrapperProps {
  children: React.ReactNode;
}

export const LegalProtectionWrapper: React.FC<LegalProtectionWrapperProps> = ({ children }) => {
  const [showWarning, setShowWarning] = useState(false);
  const [hasAccepted, setHasAccepted] = useState(false);

  useEffect(() => {
    // Check if user has already accepted the warning
    const accepted = localStorage.getItem('legal-warning-accepted');
    if (!accepted) {
      setShowWarning(true);
    } else {
      setHasAccepted(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('legal-warning-accepted', 'true');
    setHasAccepted(true);
    setShowWarning(false);
  };

  const handleContinueAnyway = () => {
    // Allow demo access without storing acceptance
    setShowWarning(false);
  };

  if (showWarning && !hasAccepted) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-red-900 via-red-800 to-red-900 flex items-center justify-center p-4 z-50">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="relative bg-black/90 backdrop-blur-xl rounded-3xl shadow-2xl max-w-2xl w-full border border-red-500/50 overflow-hidden">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 text-center relative">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="p-3 bg-red-500/30 rounded-full">
                <AlertTriangle className="w-8 h-8 text-red-200 animate-pulse" />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white mb-2">
              🚨 NARUSZENIE BEZPIECZEŃSTWA
            </h1>
            <p className="text-red-100 font-medium">
              Wykryto próbę nieautoryzowanego dostępu lub modyfikacji aplikacji.
            </p>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            <div className="bg-red-900/50 rounded-2xl p-6 border border-red-500/30 mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="w-6 h-6 text-red-300" />
                <h2 className="text-xl font-black text-white">OCHRONA PRAWNA</h2>
              </div>
              
              <ul className="space-y-3 text-red-100 text-sm">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Wszystkie działania są monitorowane i rejestrowane</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Nieautoryzowany dostęp jest zabroniony prawem</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Naruszenia podlegają odpowiedzialności prawnej</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Dane zostały przekazane do analizy prawnej</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-900/50 rounded-2xl p-4 border border-gray-500/30 mb-6">
              <p className="text-gray-300 text-sm text-center">
                <strong>© 2024 Drzewo Decyzyjne Game.</strong> Wszystkie prawa zastrzeżone.<br />
                Nieautoryzowane użycie jest ścigane zgodnie z prawem.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleAccept}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-black py-4 px-6 rounded-xl hover:from-green-500 hover:to-green-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Shield className="w-5 h-5" />
                <span>AKCEPTUJĘ WARUNKI PRAWNE</span>
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-black text-gray-400">lub</span>
                </div>
              </div>

              <button
                onClick={handleContinueAnyway}
                className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 text-white font-bold py-3 px-6 rounded-xl hover:from-yellow-500 hover:to-orange-500 transition-all duration-300 flex items-center justify-center space-x-2 border border-yellow-500/30"
              >
                <Eye className="w-5 h-5" />
                <span>KONTYNUUJ MIMO OSTRZEŻENIA (DEMO)</span>
              </button>

              <div className="bg-yellow-900/30 rounded-xl p-4 border border-yellow-500/30">
                <p className="text-yellow-200 text-xs text-center leading-relaxed">
                  ⚠️ <strong>UWAGA:</strong> Kontynuowanie bez akceptacji warunków prawnych 
                  umożliwia jedynie dostęp do wersji demonstracyjnej. Pełny dostęp wymaga 
                  akceptacji wszystkich warunków prawnych i spełnienia wymagań członkostwa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
