import React, { useState, useEffect } from 'react';
import { ArrowLeft, Trophy, Target, Zap, CheckCircle, XCircle, RotateCcw, Star, Award } from 'lucide-react';
import { Factor, Branch, Topic, DragItem } from '../types/game';
import { ecosystemFactors, businessFactors, marketingFactors } from '../data/gameData';

interface GameThemeProps {
  themeId: string;
  onBack: () => void;
}

export const GameTheme: React.FC<GameThemeProps> = ({ themeId, onBack }) => {
  const [availableFactors, setAvailableFactors] = useState<Factor[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [draggedItem, setDraggedItem] = useState<DragItem | null>(null);

  // Theme configurations
  const themeConfig = {
    forest: {
      name: 'Ekosystem Leśny',
      emoji: '🌲',
      description: 'Optymalizuj czynniki środowiskowe w lesie',
      color: 'from-green-600 to-emerald-500',
      factors: ecosystemFactors,
      branches: [
        { id: 'producers', name: 'Producenci', factors: [], isComplete: false, score: 0 },
        { id: 'consumers', name: 'Konsumenci', factors: [], isComplete: false, score: 0 },
        { id: 'decomposers', name: 'Rozkładacze', factors: [], isComplete: false, score: 0 }
      ]
    },
    startup: {
      name: 'Startup Tech',
      emoji: '🚀',
      description: 'Buduj strategię technologicznego startupu',
      color: 'from-blue-600 to-cyan-500',
      factors: businessFactors,
      branches: [
        { id: 'product', name: 'Produkt', factors: [], isComplete: false, score: 0 },
        { id: 'marketing', name: 'Marketing', factors: [], isComplete: false, score: 0 },
        { id: 'operations', name: 'Operacje', factors: [], isComplete: false, score: 0 }
      ]
    },
    marketing: {
      name: 'Marketing Mix 4P',
      emoji: '📈',
      description: 'Twórz optymalny mix marketingowy',
      color: 'from-purple-600 to-pink-500',
      factors: marketingFactors,
      branches: [
        { id: 'distribution', name: 'Dystrybucja', factors: [], isComplete: false, score: 0 },
        { id: 'price', name: 'Cena', factors: [], isComplete: false, score: 0 },
        { id: 'product-marketing', name: 'Produkt', factors: [], isComplete: false, score: 0 },
        { id: 'promotion', name: 'Promocja', factors: [], isComplete: false, score: 0 }
      ]
    }
  };

  const currentTheme = themeConfig[themeId as keyof typeof themeConfig];

  useEffect(() => {
    if (currentTheme) {
      setAvailableFactors([...currentTheme.factors]);
      setBranches([...currentTheme.branches]);
      setScore(0);
      setGameComplete(false);
    }
  }, [themeId]);

  const handleDragStart = (factor: Factor, sourceType: 'available' | 'branch', sourceBranchId?: string) => {
    setDraggedItem({ factor, sourceType, sourceBranchId });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetBranchId: string) => {
    e.preventDefault();
    
    if (!draggedItem) return;

    const { factor, sourceType, sourceBranchId } = draggedItem;

    // Remove from source
    if (sourceType === 'available') {
      setAvailableFactors(prev => prev.filter(f => f.id !== factor.id));
    } else if (sourceType === 'branch' && sourceBranchId) {
      setBranches(prev => prev.map(branch => 
        branch.id === sourceBranchId 
          ? { ...branch, factors: branch.factors.filter(f => f.id !== factor.id) }
          : branch
      ));
    }

    // Add to target branch
    setBranches(prev => prev.map(branch => {
      if (branch.id === targetBranchId && branch.factors.length < 4) {
        const newFactors = [...branch.factors, factor];
        const newScore = calculateBranchScore(newFactors);
        const isComplete = newFactors.length === 4 && isBalanced(newFactors);
        
        return {
          ...branch,
          factors: newFactors,
          score: newScore,
          isComplete
        };
      }
      return branch;
    }));

    setDraggedItem(null);
    updateTotalScore();
  };

  const calculateBranchScore = (factors: Factor[]): number => {
    let score = 0;
    
    // Base points for each factor
    factors.forEach(factor => {
      score += factor.value;
    });

    // Balance bonus
    if (factors.length === 4 && isBalanced(factors)) {
      score += 50; // Balance bonus
    }

    return score;
  };

  const isBalanced = (factors: Factor[]): boolean => {
    const types = factors.map(f => f.type);
    const partCount = types.filter(t => t === 'part').length;
    const wholeCount = types.filter(t => t === 'whole').length;
    const causeCount = types.filter(t => t === 'cause').length;
    const effectCount = types.filter(t => t === 'effect').length;

    // Check if we have at least one of each type or balanced pairs
    return (partCount > 0 && wholeCount > 0) || (causeCount > 0 && effectCount > 0);
  };

  const updateTotalScore = () => {
    const totalScore = branches.reduce((sum, branch) => sum + branch.score, 0);
    setScore(totalScore);

    // Check if game is complete
    const allComplete = branches.every(branch => branch.isComplete);
    if (allComplete) {
      setGameComplete(true);
      setScore(prev => prev + 100); // Completion bonus
    }
  };

  const resetGame = () => {
    if (currentTheme) {
      setAvailableFactors([...currentTheme.factors]);
      setBranches([...currentTheme.branches]);
      setScore(0);
      setGameComplete(false);
    }
  };

  const removeFactor = (branchId: string, factorId: string) => {
    const factor = branches.find(b => b.id === branchId)?.factors.find(f => f.id === factorId);
    if (!factor) return;

    // Remove from branch
    setBranches(prev => prev.map(branch => 
      branch.id === branchId 
        ? { 
            ...branch, 
            factors: branch.factors.filter(f => f.id !== factorId),
            score: calculateBranchScore(branch.factors.filter(f => f.id !== factorId)),
            isComplete: false
          }
        : branch
    ));

    // Add back to available
    setAvailableFactors(prev => [...prev, factor]);
    updateTotalScore();
  };

  if (!currentTheme) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center text-white">
          <XCircle className="w-16 h-16 mx-auto mb-4 text-red-400" />
          <h2 className="text-2xl font-bold mb-2">Nieznany scenariusz</h2>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-violet-600 text-white rounded-xl hover:bg-violet-500 transition-colors"
          >
            Powrót do menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-violet-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-black/40 backdrop-blur-xl border-b border-violet-500/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="flex items-center space-x-2 px-4 py-2 bg-violet-600/20 text-violet-300 rounded-xl hover:bg-violet-600/30 hover:text-violet-200 transition-all duration-200 border border-violet-500/30"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="font-medium">Powrót</span>
              </button>
              
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 bg-gradient-to-r ${currentTheme.color} rounded-xl flex items-center justify-center text-2xl shadow-lg`}>
                  {currentTheme.emoji}
                </div>
                <div>
                  <h1 className="text-xl font-black text-white">{currentTheme.name}</h1>
                  <p className="text-violet-300 text-sm">{currentTheme.description}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Trophy className="w-6 h-6 text-yellow-400" />
                <span className="text-2xl font-black text-white">{score}</span>
                <span className="text-violet-300 text-sm">punktów</span>
              </div>
              
              <button
                onClick={resetGame}
                className="flex items-center space-x-2 px-4 py-2 bg-orange-600/20 text-orange-300 rounded-xl hover:bg-orange-600/30 hover:text-orange-200 transition-all duration-200 border border-orange-500/30"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="font-medium">Reset</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Game Complete Modal */}
      {gameComplete && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-3xl p-8 text-center max-w-md w-full shadow-2xl">
            <Award className="w-16 h-16 text-white mx-auto mb-4" />
            <h2 className="text-3xl font-black text-white mb-4">GRATULACJE!</h2>
            <p className="text-white/90 mb-6 font-medium">
              Ukończyłeś scenariusz "{currentTheme.name}" z wynikiem {score} punktów!
            </p>
            <div className="flex space-x-4">
              <button
                onClick={resetGame}
                className="flex-1 bg-white/20 text-white py-3 px-6 rounded-xl hover:bg-white/30 transition-colors font-bold"
              >
                Zagraj ponownie
              </button>
              <button
                onClick={onBack}
                className="flex-1 bg-white text-orange-500 py-3 px-6 rounded-xl hover:bg-white/90 transition-colors font-bold"
              >
                Wybierz scenariusz
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Game Area */}
      <main className="relative z-10 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Available Factors */}
          <div className="lg:col-span-1">
            <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-6 border border-violet-500/30 sticky top-8">
              <h3 className="text-xl font-black text-white mb-4 flex items-center">
                <Target className="w-6 h-6 mr-2 text-violet-400" />
                DOSTĘPNE CZYNNIKI
              </h3>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {availableFactors.map((factor) => (
                  <div
                    key={factor.id}
                    draggable
                    onDragStart={() => handleDragStart(factor, 'available')}
                    className={`p-4 rounded-xl border-2 border-dashed cursor-move hover:scale-105 transition-all duration-200 ${
                      factor.type === 'part' ? 'border-blue-400/50 bg-blue-900/20' :
                      factor.type === 'whole' ? 'border-green-400/50 bg-green-900/20' :
                      factor.type === 'cause' ? 'border-red-400/50 bg-red-900/20' :
                      'border-yellow-400/50 bg-yellow-900/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-white text-sm">{factor.name}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        factor.type === 'part' ? 'bg-blue-500/30 text-blue-200' :
                        factor.type === 'whole' ? 'bg-green-500/30 text-green-200' :
                        factor.type === 'cause' ? 'bg-red-500/30 text-red-200' :
                        'bg-yellow-500/30 text-yellow-200'
                      }`}>
                        {factor.type === 'part' ? 'CZĘŚĆ' :
                         factor.type === 'whole' ? 'CAŁOŚĆ' :
                         factor.type === 'cause' ? 'PRZYCZYNA' : 'SKUTEK'}
                      </span>
                    </div>
                    <p className="text-violet-200 text-xs mb-2">{factor.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-violet-300 text-xs">Wartość:</span>
                      <span className="text-yellow-400 font-bold text-sm">{factor.value}pt</span>
                    </div>
                  </div>
                ))}
              </div>
              
              {availableFactors.length === 0 && (
                <div className="text-center py-8">
                  <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                  <p className="text-violet-200 font-medium">Wszystkie czynniki zostały użyte!</p>
                </div>
              )}
            </div>
          </div>

          {/* Branches */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {branches.map((branch) => (
                <div
                  key={branch.id}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, branch.id)}
                  className={`bg-black/40 backdrop-blur-xl rounded-3xl p-6 border-2 border-dashed transition-all duration-300 min-h-96 ${
                    branch.isComplete 
                      ? 'border-green-400/50 bg-green-900/10' 
                      : 'border-violet-500/30 hover:border-violet-400/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-black text-white">{branch.name}</h3>
                    <div className="flex items-center space-x-2">
                      {branch.isComplete && <CheckCircle className="w-5 h-5 text-green-400" />}
                      <span className="text-yellow-400 font-bold">{branch.score}pt</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    {branch.factors.map((factor) => (
                      <div
                        key={factor.id}
                        draggable
                        onDragStart={() => handleDragStart(factor, 'branch', branch.id)}
                        className={`p-3 rounded-xl border cursor-move hover:scale-105 transition-all duration-200 ${
                          factor.type === 'part' ? 'border-blue-400/50 bg-blue-900/30' :
                          factor.type === 'whole' ? 'border-green-400/50 bg-green-900/30' :
                          factor.type === 'cause' ? 'border-red-400/50 bg-red-900/30' :
                          'border-yellow-400/50 bg-yellow-900/30'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-bold text-white text-sm">{factor.name}</h4>
                          <button
                            onClick={() => removeFactor(branch.id, factor.id)}
                            className="text-red-400 hover:text-red-300 text-xs"
                          >
                            ✕
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                            factor.type === 'part' ? 'bg-blue-500/30 text-blue-200' :
                            factor.type === 'whole' ? 'bg-green-500/30 text-green-200' :
                            factor.type === 'cause' ? 'bg-red-500/30 text-red-200' :
                            'bg-yellow-500/30 text-yellow-200'
                          }`}>
                            {factor.type === 'part' ? 'CZĘŚĆ' :
                             factor.type === 'whole' ? 'CAŁOŚĆ' :
                             factor.type === 'cause' ? 'PRZYCZYNA' : 'SKUTEK'}
                          </span>
                          <span className="text-yellow-400 font-bold text-sm">{factor.value}pt</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Drop Zone */}
                  {branch.factors.length < 4 && (
                    <div className="border-2 border-dashed border-violet-500/30 rounded-xl p-4 text-center">
                      <Zap className="w-8 h-8 text-violet-400 mx-auto mb-2" />
                      <p className="text-violet-300 text-sm font-medium">
                        Przeciągnij tutaj czynnik
                      </p>
                      <p className="text-violet-400 text-xs">
                        {4 - branch.factors.length} miejsc pozostało
                      </p>
                    </div>
                  )}

                  {/* Branch Status */}
                  <div className="mt-4 pt-4 border-t border-violet-500/30">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-violet-300">Status:</span>
                      <span className={`font-bold ${
                        branch.isComplete ? 'text-green-400' : 
                        branch.factors.length === 4 ? 'text-yellow-400' : 'text-violet-400'
                      }`}>
                        {branch.isComplete ? 'UKOŃCZONE' : 
                         branch.factors.length === 4 ? 'NIEZBALANSOWANE' : 
                         `${branch.factors.length}/4 CZYNNIKÓW`}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
