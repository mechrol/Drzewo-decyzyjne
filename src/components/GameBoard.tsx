import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Branch } from './Branch';
import { FactorCard } from './FactorCard';
import { Factor, Topic, GameState, DragItem } from '../types/game';
import { Trophy, RotateCcw, LogOut, User, Target, Star, Gamepad2, Zap } from 'lucide-react';

// Game data
const gameTopics: Topic[] = [
  {
    id: 'forest',
    name: 'Ekosystem Leśny',
    description: 'Optymalizuj czynniki wpływające na zdrowie ekosystemu leśnego',
    targetScore: 300,
    branches: [
      { id: 'flora', name: 'Flora', factors: [], isComplete: false, score: 0 },
      { id: 'fauna', name: 'Fauna', factors: [], isComplete: false, score: 0 },
      { id: 'climate', name: 'Klimat', factors: [], isComplete: false, score: 0 },
      { id: 'soil', name: 'Gleba', factors: [], isComplete: false, score: 0 }
    ]
  },
  {
    id: 'startup',
    name: 'Startup Technologiczny',
    description: 'Zbuduj strategię dla sukcesu startupu technologicznego',
    targetScore: 320,
    branches: [
      { id: 'product', name: 'Produkt', factors: [], isComplete: false, score: 0 },
      { id: 'market', name: 'Rynek', factors: [], isComplete: false, score: 0 },
      { id: 'team', name: 'Zespół', factors: [], isComplete: false, score: 0 },
      { id: 'funding', name: 'Finansowanie', factors: [], isComplete: false, score: 0 }
    ]
  },
  {
    id: 'marketing',
    name: 'Marketing Mix 4P',
    description: 'Stwórz optymalną strategię marketingową 4P',
    targetScore: 280,
    branches: [
      { id: 'product-mix', name: 'Product (Produkt)', factors: [], isComplete: false, score: 0 },
      { id: 'price', name: 'Price (Cena)', factors: [], isComplete: false, score: 0 },
      { id: 'place', name: 'Place (Miejsce)', factors: [], isComplete: false, score: 0 },
      { id: 'promotion', name: 'Promotion (Promocja)', factors: [], isComplete: false, score: 0 }
    ]
  }
];

const allFactors: Record<string, Factor[]> = {
  forest: [
    { id: 'f1', name: 'Różnorodność gatunków', type: 'part', value: 25, description: 'Bogactwo gatunkowe roślin i zwierząt' },
    { id: 'f2', name: 'Stabilność ekosystemu', type: 'whole', value: 30, description: 'Ogólna równowaga środowiska' },
    { id: 'f3', name: 'Zanieczyszczenie', type: 'cause', value: 20, description: 'Źródło degradacji środowiska' },
    { id: 'f4', name: 'Wymieranie gatunków', type: 'effect', value: 15, description: 'Konsekwencja zaburzeń' },
    { id: 'f5', name: 'Drzewa liściaste', type: 'part', value: 22, description: 'Podstawowy element flory' },
    { id: 'f6', name: 'Cykl węglowy', type: 'whole', value: 28, description: 'Globalny obieg pierwiastka' },
    { id: 'f7', name: 'Wylesianie', type: 'cause', value: 18, description: 'Główna przyczyna degradacji' },
    { id: 'f8', name: 'Erozja gleby', type: 'effect', value: 16, description: 'Skutek utraty pokrywy leśnej' },
    { id: 'f9', name: 'Zwierzęta roślinożerne', type: 'part', value: 20, description: 'Konsumenci pierwotni' },
    { id: 'f10', name: 'Łańcuch pokarmowy', type: 'whole', value: 26, description: 'System przepływu energii' },
    { id: 'f11', name: 'Zmiany klimatu', type: 'cause', value: 24, description: 'Czynnik zewnętrzny' },
    { id: 'f12', name: 'Migracja zwierząt', type: 'effect', value: 14, description: 'Reakcja na zmiany środowiska' }
  ],
  startup: [
    { id: 's1', name: 'Funkcjonalności MVP', type: 'part', value: 25, description: 'Podstawowe cechy produktu' },
    { id: 's2', name: 'Model biznesowy', type: 'whole', value: 32, description: 'Kompleksowa strategia zarabiania' },
    { id: 's3', name: 'Potrzeba rynkowa', type: 'cause', value: 28, description: 'Motywacja do tworzenia rozwiązania' },
    { id: 's4', name: 'Wzrost przychodów', type: 'effect', value: 22, description: 'Rezultat sukcesu produktu' },
    { id: 's5', name: 'Interfejs użytkownika', type: 'part', value: 20, description: 'Warstwa interakcji z klientem' },
    { id: 's6', name: 'Strategia go-to-market', type: 'whole', value: 30, description: 'Plan wprowadzenia na rynek' },
    { id: 's7', name: 'Problem klienta', type: 'cause', value: 26, description: 'Źródło zapotrzebowania' },
    { id: 's8', name: 'Satysfakcja użytkowników', type: 'effect', value: 18, description: 'Miara sukcesu produktu' },
    { id: 's9', name: 'Zespół deweloperski', type: 'part', value: 24, description: 'Kluczowi wykonawcy' },
    { id: 's10', name: 'Kultura organizacyjna', type: 'whole', value: 28, description: 'Sposób funkcjonowania firmy' },
    { id: 's11', name: 'Konkurencja', type: 'cause', value: 16, description: 'Presja rynkowa' },
    { id: 's12', name: 'Udział w rynku', type: 'effect', value: 20, description: 'Pozycja konkurencyjna' }
  ],
  marketing: [
    { id: 'm1', name: 'Jakość produktu', type: 'part', value: 26, description: 'Podstawowa cecha oferty' },
    { id: 'm2', name: 'Propozycja wartości', type: 'whole', value: 30, description: 'Kompleksowa korzyść dla klienta' },
    { id: 'm3', name: 'Potrzeby konsumentów', type: 'cause', value: 28, description: 'Motywacja do zakupu' },
    { id: 'm4', name: 'Lojalność marki', type: 'effect', value: 20, description: 'Długoterminowa relacja z klientem' },
    { id: 'm5', name: 'Strategia cenowa', type: 'part', value: 24, description: 'Polityka kształtowania cen' },
    { id: 'm6', name: 'Pozycjonowanie marki', type: 'whole', value: 32, description: 'Miejsce w umyśle konsumenta' },
    { id: 'm7', name: 'Koszty produkcji', type: 'cause', value: 18, description: 'Determinanta ceny' },
    { id: 'm8', name: 'Rentowność sprzedaży', type: 'effect', value: 22, description: 'Wynik strategii cenowej' },
    { id: 'm9', name: 'Kanały dystrybucji', type: 'part', value: 20, description: 'Drogi dotarcia do klienta' },
    { id: 'm10', name: 'Doświadczenie klienta', type: 'whole', value: 28, description: 'Całościowa interakcja z marką' },
    { id: 'm11', name: 'Trendy rynkowe', type: 'cause', value: 16, description: 'Siły kształtujące popyt' },
    { id: 'm12', name: 'Świadomość marki', type: 'effect', value: 24, description: 'Rozpoznawalność w rynku' }
  ]
};

export const GameBoard: React.FC = () => {
  const { user, logout } = useAuth();
  const [gameState, setGameState] = useState<GameState>({
    currentTopic: gameTopics[0],
    availableFactors: allFactors.forest,
    score: 0,
    level: 1,
    isGameActive: true
  });
  const [draggedFactor, setDraggedFactor] = useState<Factor | null>(null);
  const [dragSource, setDragSource] = useState<DragItem | null>(null);

  // Calculate total score
  useEffect(() => {
    if (gameState.currentTopic) {
      const totalScore = gameState.currentTopic.branches.reduce((sum, branch) => sum + branch.score, 0);
      setGameState(prev => ({ ...prev, score: totalScore }));
    }
  }, [gameState.currentTopic]);

  const calculateBranchScore = (factors: Factor[]) => {
    if (factors.length === 0) return 0;
    
    const baseScore = factors.reduce((sum, factor) => sum + factor.value, 0);
    const typeBalance = checkTypeBalance(factors);
    const completionBonus = factors.length >= 4 ? 20 : 0;
    
    return Math.min(100, baseScore + typeBalance + completionBonus);
  };

  const checkTypeBalance = (factors: Factor[]) => {
    const types = ['part', 'whole', 'cause', 'effect'];
    const typeCounts = types.map(type => factors.filter(f => f.type === type).length);
    const hasAllTypes = typeCounts.every(count => count > 0);
    return hasAllTypes ? 15 : 0;
  };

  const handleDrop = (branchId: string, factor: Factor) => {
    if (!gameState.currentTopic) return;

    setGameState(prev => {
      const newTopic = { ...prev.currentTopic! };
      const branch = newTopic.branches.find(b => b.id === branchId);
      
      if (!branch || branch.factors.some(f => f.id === factor.id)) return prev;

      // Remove from source if it's from another branch
      if (dragSource?.sourceType === 'branch' && dragSource.sourceBranchId) {
        const sourceBranch = newTopic.branches.find(b => b.id === dragSource.sourceBranchId);
        if (sourceBranch) {
          sourceBranch.factors = sourceBranch.factors.filter(f => f.id !== factor.id);
          sourceBranch.score = calculateBranchScore(sourceBranch.factors);
          sourceBranch.isComplete = sourceBranch.factors.length >= 4;
        }
      }

      // Add to target branch
      branch.factors.push(factor);
      branch.score = calculateBranchScore(branch.factors);
      branch.isComplete = branch.factors.length >= 4;

      // Remove from available factors if it was from there
      const newAvailableFactors = dragSource?.sourceType === 'available' 
        ? prev.availableFactors.filter(f => f.id !== factor.id)
        : prev.availableFactors;

      return {
        ...prev,
        currentTopic: newTopic,
        availableFactors: newAvailableFactors
      };
    });

    setDraggedFactor(null);
    setDragSource(null);
  };

  const handleRemoveFactor = (branchId: string, factorId: string) => {
    if (!gameState.currentTopic) return;

    setGameState(prev => {
      const newTopic = { ...prev.currentTopic! };
      const branch = newTopic.branches.find(b => b.id === branchId);
      
      if (!branch) return prev;

      const removedFactor = branch.factors.find(f => f.id === factorId);
      if (!removedFactor) return prev;

      branch.factors = branch.factors.filter(f => f.id !== factorId);
      branch.score = calculateBranchScore(branch.factors);
      branch.isComplete = branch.factors.length >= 4;

      return {
        ...prev,
        currentTopic: newTopic,
        availableFactors: [...prev.availableFactors, removedFactor]
      };
    });
  };

  const handleDragStart = (factor: Factor, sourceType: 'available' | 'branch', sourceBranchId?: string) => {
    setDraggedFactor(factor);
    setDragSource({ factor, sourceType, sourceBranchId });
  };

  const handleDragEnd = () => {
    setDraggedFactor(null);
    setDragSource(null);
  };

  const switchTopic = (topicId: string) => {
    const topic = gameTopics.find(t => t.id === topicId);
    if (topic) {
      setGameState(prev => ({
        ...prev,
        currentTopic: topic,
        availableFactors: allFactors[topicId]
      }));
    }
  };

  const resetGame = () => {
    const resetTopic = { ...gameState.currentTopic! };
    resetTopic.branches.forEach(branch => {
      branch.factors = [];
      branch.score = 0;
      branch.isComplete = false;
    });

    setGameState(prev => ({
      ...prev,
      currentTopic: resetTopic,
      availableFactors: allFactors[resetTopic.id],
      score: 0
    }));
  };

  if (!gameState.currentTopic) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-violet-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 bg-black/50 backdrop-blur-xl border-b border-violet-500/30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Trophy className="w-10 h-10 text-yellow-400 drop-shadow-lg" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
              </div>
              <div>
                <h1 className="text-3xl font-black text-white drop-shadow-lg bg-gradient-to-r from-white via-violet-200 to-white bg-clip-text text-transparent">
                  DRZEWO DECYZYJNE
                </h1>
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-violet-300" />
                  <p className="text-sm text-violet-200 font-medium">Witaj, {user?.username}!</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 bg-black/30 backdrop-blur-sm rounded-xl px-4 py-2 border border-violet-500/30">
                <Target className="w-6 h-6 text-blue-400" />
                <span className="font-black text-2xl text-white">
                  {gameState.score}
                </span>
                <span className="text-violet-300 font-medium">/{gameState.currentTopic.targetScore}</span>
              </div>
              
              <button
                onClick={resetGame}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl hover:from-blue-500 hover:to-blue-400 transition-all duration-300 font-bold shadow-lg hover:shadow-blue-500/25 hover:scale-105"
              >
                <RotateCcw className="w-4 h-4" />
                <span>RESET</span>
              </button>
              
              <button
                onClick={logout}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl hover:from-red-500 hover:to-red-400 transition-all duration-300 font-bold shadow-lg hover:shadow-red-500/25 hover:scale-105"
              >
                <LogOut className="w-4 h-4" />
                <span>WYLOGUJ</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-6">
        {/* Topic Selection */}
        <div className="mb-6">
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {gameTopics.map(topic => (
              <button
                key={topic.id}
                onClick={() => switchTopic(topic.id)}
                className={`flex-shrink-0 px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105 ${
                  gameState.currentTopic.id === topic.id
                    ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/25'
                    : 'bg-black/30 backdrop-blur-sm text-violet-200 hover:bg-black/50 border border-violet-500/30'
                }`}
              >
                {topic.name}
              </button>
            ))}
          </div>
          
          <div className="mt-4 p-6 bg-black/40 backdrop-blur-xl rounded-2xl shadow-xl border border-violet-500/30">
            <div className="flex items-center space-x-3 mb-3">
              <Gamepad2 className="w-6 h-6 text-violet-400" />
              <h2 className="text-2xl font-black text-white">
                {gameState.currentTopic.name}
              </h2>
            </div>
            <p className="text-violet-200 font-medium">{gameState.currentTopic.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Available Factors */}
          <div className="lg:col-span-1">
            <div className="bg-black/40 backdrop-blur-xl rounded-2xl shadow-xl p-6 sticky top-6 border border-violet-500/30">
              <h3 className="text-xl font-black text-white mb-4 flex items-center">
                <div className="p-2 bg-yellow-500/20 rounded-xl mr-3">
                  <Star className="w-5 h-5 text-yellow-400" />
                </div>
                DOSTĘPNE CZYNNIKI
              </h3>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {gameState.availableFactors.map(factor => (
                  <FactorCard
                    key={factor.id}
                    factor={factor}
                    onDragStart={(f) => handleDragStart(f, 'available')}
                    onDragEnd={handleDragEnd}
                    isDragging={draggedFactor?.id === factor.id}
                  />
                ))}
              </div>
              
              {gameState.availableFactors.length === 0 && (
                <div className="text-center py-8">
                  <Zap className="w-12 h-12 text-violet-400 mx-auto mb-3" />
                  <p className="text-violet-300 font-medium">
                    Wszystkie czynniki zostały użyte!
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Branches */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {gameState.currentTopic.branches.map(branch => (
                <Branch
                  key={branch.id}
                  branch={branch}
                  onDrop={handleDrop}
                  onRemoveFactor={handleRemoveFactor}
                  onDragStart={(f, branchId) => handleDragStart(f, 'branch', branchId)}
                  onDragEnd={handleDragEnd}
                  draggedFactor={draggedFactor}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Progress Summary */}
        {gameState.score >= gameState.currentTopic.targetScore && (
          <div className="mt-8 p-8 bg-gradient-to-r from-green-900/50 to-emerald-900/50 backdrop-blur-xl border border-green-400/30 rounded-3xl shadow-2xl">
            <div className="text-center">
              <div className="relative mb-6">
                <Trophy className="w-16 h-16 text-yellow-400 mx-auto drop-shadow-lg" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-ping"></div>
              </div>
              <h3 className="text-4xl font-black text-white mb-4 bg-gradient-to-r from-white via-green-200 to-white bg-clip-text text-transparent">
                GRATULACJE! 🎉
              </h3>
              <p className="text-green-100 text-xl font-medium">
                Osiągnąłeś cel dla tematu "{gameState.currentTopic.name}"!
                <br />
                <span className="font-black text-2xl text-yellow-300">
                  Twój wynik: {gameState.score}/{gameState.currentTopic.targetScore} punktów
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
