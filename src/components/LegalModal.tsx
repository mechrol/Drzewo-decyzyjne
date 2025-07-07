import React from 'react';
import { X, Shield, FileText, Gavel, AlertCircle, Lock } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  type: 'privacy' | 'license' | 'terms' | 'copyright' | 'security' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, type, onClose }) => {
  if (!isOpen || !type) return null;

  const getModalContent = () => {
    switch (type) {
      case 'privacy':
        return {
          icon: <Shield className="w-8 h-8 text-blue-400" />,
          title: 'Polityka Prywatności',
          content: (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-3">1. Informacje Ogólne</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Niniejsza Polityka Prywatności określa zasady przetwarzania i ochrony danych osobowych 
                  użytkowników aplikacji "Drzewo Decyzyjne" (dalej: "Aplikacja").
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-white mb-3">2. Administrator Danych</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Administratorem danych osobowych jest właściciel aplikacji "Drzewo Decyzyjne", 
                  działający w oparciu o technologię HomoHumanicus.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-white mb-3">3. Zakres Zbieranych Danych</h3>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Dane uwierzytelniające (hasła dostępu)</li>
                  <li>• Dane techniczne (adres IP, przeglądarka)</li>
                  <li>• Dane o aktywności w aplikacji</li>
                  <li>• Wyniki gier i statystyki</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-white mb-3">4. Cel Przetwarzania</h3>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Świadczenie usług aplikacji</li>
                  <li>• Uwierzytelnianie użytkowników</li>
                  <li>• Analiza i ulepszanie funkcjonalności</li>
                  <li>• Zapewnienie bezpieczeństwa</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-white mb-3">5. Prawa Użytkownika</h3>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Prawo dostępu do danych</li>
                  <li>• Prawo do sprostowania</li>
                  <li>• Prawo do usunięcia</li>
                  <li>• Prawo do ograniczenia przetwarzania</li>
                </ul>
              </div>
              
              <div className="bg-blue-900/30 rounded-lg p-4 border border-blue-500/30">
                <p className="text-blue-200 text-xs">
                  <strong>Zgodność z RODO:</strong> Wszystkie dane są przetwarzane zgodnie z Rozporządzeniem 
                  Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. (RODO).
                </p>
              </div>
            </div>
          )
        };
        
      case 'license':
        return {
          icon: <FileText className="w-8 h-8 text-green-400" />,
          title: 'Licencja Własnościowa',
          content: (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-3">1. Własność Intelektualna</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Aplikacja "Drzewo Decyzyjne" jest własnością intelektualną chronioną prawem autorskim. 
                  Wszystkie prawa zastrzeżone © 2025.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-white mb-3">2. Zakres Licencji</h3>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Licencja na użytkowanie, nie na własność</li>
                  <li>• Ograniczona do celów edukacyjnych i rozrywkowych</li>
                  <li>• Zakaz kopiowania, modyfikacji lub dystrybucji</li>
                  <li>• Zakaz inżynierii wstecznej</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-white mb-3">3. Ograniczenia</h3>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Zakaz komercyjnego wykorzystania</li>
                  <li>• Zakaz tworzenia dzieł pochodnych</li>
                  <li>• Zakaz usuwania oznaczeń praw autorskich</li>
                  <li>• Zakaz dekompilacji kodu źródłowego</li>
                </ul>
              </div>
              
              <div className="bg-green-900/30 rounded-lg p-4 border border-green-500/30">
                <p className="text-green-200 text-xs">
                  <strong>Technologia HomoHumanicus:</strong> Aplikacja wykorzystuje zaawansowane 
                  technologie własnościowe chronione dodatkowymi patentami i prawami autorskimi.
                </p>
              </div>
            </div>
          )
        };
        
      case 'terms':
        return {
          icon: <Gavel className="w-8 h-8 text-purple-400" />,
          title: 'Regulamin Serwisu',
          content: (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-3">1. Postanowienia Ogólne</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Niniejszy Regulamin określa zasady korzystania z aplikacji "Drzewo Decyzyjne" 
                  oraz prawa i obowiązki użytkowników.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-white mb-3">2. Warunki Dostępu</h3>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Członkostwo w AI Tribes (warunek konieczny)</li>
                  <li>• Członkostwo w Live Good (warunek wystarczający)</li>
                  <li>• Dostęp demonstracyjny z ograniczeniami</li>
                  <li>• Akceptacja wszystkich warunków prawnych</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-white mb-3">3. Obowiązki Użytkownika</h3>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Korzystanie zgodne z przeznaczeniem</li>
                  <li>• Zakaz działań naruszających prawo</li>
                  <li>• Ochrona danych dostępowych</li>
                  <li>• Zgłaszanie problemów technicznych</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-white mb-3">4. Odpowiedzialność</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Użytkownik ponosi pełną odpowiedzialność za sposób korzystania z aplikacji 
                  oraz za wszelkie szkody wynikające z nieprawidłowego użytkowania.
                </p>
              </div>
              
              <div className="bg-purple-900/30 rounded-lg p-4 border border-purple-500/30">
                <p className="text-purple-200 text-xs">
                  <strong>Monitoring:</strong> Wszystkie działania w aplikacji są monitorowane 
                  w celu zapewnienia bezpieczeństwa i zgodności z regulaminem.
                </p>
              </div>
            </div>
          )
        };
        
      case 'copyright':
        return {
          icon: <AlertCircle className="w-8 h-8 text-red-400" />,
          title: 'Ochrona Praw Autorskich',
          content: (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-3">1. Prawa Autorskie</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Aplikacja "Drzewo Decyzyjne" jest chroniona prawem autorskim. Wszelkie elementy 
                  aplikacji, w tym kod, grafika, algorytmy i koncepcje są własnością autora.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-white mb-3">2. Zakazy</h3>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Kopiowanie całości lub części aplikacji</li>
                  <li>• Modyfikacja kodu źródłowego</li>
                  <li>• Tworzenie aplikacji pochodnych</li>
                  <li>• Komercyjne wykorzystanie bez zgody</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-white mb-3">3. Konsekwencje Naruszenia</h3>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Natychmiastowe zablokowanie dostępu</li>
                  <li>• Roszczenia odszkodowawcze</li>
                  <li>• Postępowanie prawne</li>
                  <li>• Zgłoszenie do organów ścigania</li>
                </ul>
              </div>
              
              <div className="bg-red-900/30 rounded-lg p-4 border border-red-500/30">
                <p className="text-red-200 text-xs">
                  <strong>Ostrzeżenie:</strong> Naruszenie praw autorskich jest przestępstwem 
                  ściganym z urzędu i może skutkować karą pozbawienia wolności do 3 lat.
                </p>
              </div>
            </div>
          )
        };
        
      case 'security':
        return {
          icon: <Lock className="w-8 h-8 text-yellow-400" />,
          title: 'Polityka Bezpieczeństwa',
          content: (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-3">1. Zabezpieczenia Techniczne</h3>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Szyfrowanie danych w transmisji</li>
                  <li>• Bezpieczne przechowywanie haseł</li>
                  <li>• Monitoring aktywności użytkowników</li>
                  <li>• Regularne aktualizacje bezpieczeństwa</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-white mb-3">2. Monitoring i Logowanie</h3>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Rejestracja wszystkich działań</li>
                  <li>• Analiza wzorców użytkowania</li>
                  <li>• Wykrywanie anomalii</li>
                  <li>• Automatyczne blokowanie podejrzanych działań</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-white mb-3">3. Ochrona Przed Zagrożeniami</h3>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Ochrona przed atakami DDoS</li>
                  <li>• Filtrowanie złośliwego ruchu</li>
                  <li>• Zabezpieczenia przed inżynierią społeczną</li>
                  <li>• Regularne testy penetracyjne</li>
                </ul>
              </div>
              
              <div className="bg-yellow-900/30 rounded-lg p-4 border border-yellow-500/30">
                <p className="text-yellow-200 text-xs">
                  <strong>Zgłaszanie Incydentów:</strong> Wszelkie podejrzane działania są 
                  automatycznie raportowane i mogą skutkować natychmiastowym zablokowaniem dostępu.
                </p>
              </div>
            </div>
          )
        };
        
      default:
        return null;
    }
  };

  const modalContent = getModalContent();
  if (!modalContent) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden border border-gray-700">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-6 border-b border-gray-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {modalContent.icon}
              <h2 className="text-2xl font-black text-white">{modalContent.title}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-600 rounded-lg transition-colors duration-200"
            >
              <X className="w-6 h-6 text-gray-300" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {modalContent.content}
        </div>

        {/* Footer */}
        <div className="bg-gray-800 p-4 border-t border-gray-600">
          <div className="flex justify-between items-center">
            <p className="text-gray-400 text-xs">© 2025 Drzewo Decyzyjne Game</p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-500 transition-colors duration-200 font-medium"
            >
              Zamknij
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
