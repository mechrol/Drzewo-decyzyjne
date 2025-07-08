import React from 'react';
import { Shield, FileText, Lock, AlertCircle, Gavel } from 'lucide-react';
import { HomoHumanicusLogo } from './HomoHumanicusLogo';

interface LegalFooterProps {
  onOpenModal?: (type: 'privacy' | 'license' | 'terms' | 'copyright' | 'security') => void;
}

export const LegalFooter: React.FC<LegalFooterProps> = ({ onOpenModal }) => {
  const handleModalOpen = (type: 'privacy' | 'license' | 'terms' | 'copyright' | 'security') => {
    if (onOpenModal) {
      onOpenModal(type);
    }
  };

  return (
    <footer className="bg-black/90 backdrop-blur-xl border-t border-violet-500/30 shadow-2xl">
      <div className="container mx-auto px-4 py-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
          
          {/* Left - HomoHumanicus Branding */}
          <div className="flex flex-col items-center md:items-start space-y-1">
            <HomoHumanicusLogo size="sm" variant="horizontal" />
            <div className="text-center md:text-left">
              <p className="text-violet-300 text-xs font-medium">Wszystkie prawa zastrzeżone</p>
              <p className="text-violet-400 text-xs">Chronione prawem autorskim</p>
              <p className="text-violet-400 text-xs">Licencja własnościowa</p>
              <p className="text-blue-300 text-xs mt-1">Powered by HomoHumanicus</p>
            </div>
          </div>

          {/* Center - Copyright */}
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-1">
              <Shield className="w-4 h-4 text-violet-400" />
              <span className="text-violet-200 font-bold text-sm">© 2025 Drzewo Decyzyjne</span>
            </div>
            <p className="text-violet-300 text-xs leading-relaxed max-w-xs mx-auto">
              Strategiczna gra decyzyjna z zaawansowanym systemem optymalizacji czynników
            </p>
          </div>

          {/* Right - Legal Links */}
          <div className="flex flex-wrap justify-center md:justify-end gap-1">
            <button
              onClick={() => handleModalOpen('privacy')}
              className="flex items-center space-x-1 text-xs text-violet-300 hover:text-violet-200 transition-colors duration-200 px-2 py-1 rounded hover:bg-violet-900/30"
            >
              <Shield className="w-3 h-3" />
              <span>Prywatność</span>
            </button>
            
            <button
              onClick={() => handleModalOpen('license')}
              className="flex items-center space-x-1 text-xs text-violet-300 hover:text-violet-200 transition-colors duration-200 px-2 py-1 rounded hover:bg-violet-900/30"
            >
              <FileText className="w-3 h-3" />
              <span>Licencja</span>
            </button>
            
            <button
              onClick={() => handleModalOpen('terms')}
              className="flex items-center space-x-1 text-xs text-violet-300 hover:text-violet-200 transition-colors duration-200 px-2 py-1 rounded hover:bg-violet-900/30"
            >
              <Gavel className="w-3 h-3" />
              <span>Regulamin</span>
            </button>
            
            <button
              onClick={() => handleModalOpen('copyright')}
              className="flex items-center space-x-1 text-xs text-violet-300 hover:text-violet-200 transition-colors duration-200 px-2 py-1 rounded hover:bg-violet-900/30"
            >
              <AlertCircle className="w-3 h-3" />
              <span>Copyright</span>
            </button>
            
            <button
              onClick={() => handleModalOpen('security')}
              className="flex items-center space-x-1 text-xs text-violet-300 hover:text-violet-200 transition-colors duration-200 px-2 py-1 rounded hover:bg-violet-900/30"
            >
              <Lock className="w-3 h-3" />
              <span>Bezpieczeństwo</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
