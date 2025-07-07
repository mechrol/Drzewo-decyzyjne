import React, { useState, useEffect } from 'react';
import { GameState, Topic, Factor, DragItem } from '../types/game';
import { sampleTopics, ecosystemFactors, businessFactors } from '../data/gameData';
import { Branch } from './Branch';
import { FactorCard } from './FactorCard';
import { Trophy, RotateCcw, Play } from 'lucide-react';

export const GameBoard: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentTopic: null,
    availableFactors: [],
    score: 0,
    level: 1,
    isGameActive: false
  });

  const [draggedItem, setDraggedItem] = useState<DragItem | null>(null);

  const startGame = (topicId: string) => {
    const topic = sampleTopics.find(t => t.id === topicId);
    if (!topic) return;

    const factors = topicId === 'ecosystem' ? ecosystemFactors : businessFactors;
    
    setGameState({
      currentTopic: { ...topic },
      availableFactors: [...factors],
      score: 0,
      level: 1,
      isGameActive: true
    });
  };

  const calculateBranchScore = (factors: Factor[]): number => {
    if (factors.length === 0) return 0;
    
    const typeCount = {
      part: factors.filter(f => f.type === 'part').length,
      whole: factors.filter(f => f.type === 'whole').length,
      cause: factors.filter(f => f.type === 'cause').length,
      effect: factors.filter(f => f.type === 'effect').length
    };

    // Bonus for having all types
    const typeBonus = Object.values(typeCount).every(count => count > 0) ? 20 : 0;
    
    // Base score from factor values
    const baseScore = factors.reduce((sum, factor) => sum + factor.value, 0);
    
    // Balance penalty - penalize having too many of one type
    const maxCount = Math.max(...Object.values(typeCount));
    const balancePenalty = maxCount > 2 ? (maxCount - 2) * 5 : 0;
    
    return Math.min(100, Math.max(0, baseScore + typeBonus - balancePenalty));
  };

  const handleDrop = (branchId: string, factor: Factor) => {
    if (!gameState.currentTopic || !draggedItem) return;

    setGameState(prev => {
      const newTopic = { ...prev.currentTopic! };
      const branch = newTopic.branches.find(b => b.id === branchId);
      if (!branch) return prev;

      // Remove factor from source
      let newAvailableFactors = [...prev.availableFactors];
      
      if (draggedItem.sourceType === 'available') {
        newAvailableFactors = newAvailableFactors.filter(f => f.id !== factor.id);
      } else if (draggedItem.sourceType === 'branch' && draggedItem.sourceBranchId) {
        const sourceBranch = newTopic.branches.find(b => b.id === draggedItem.sourceBranchId);
        if (sourceBranch) {
          sourceBranch.factors = sourceBranch.factors.filter(f => f.id !== factor.id);
          sourceBranch.score = calculateBranchScore(sourceBranch.factors);
          sourceBranch.isComplete = sourceBranch.factors.length >= 4;
        }
      }

      // Add factor to target branch
      branch.factors.push(factor);
      branch.score = calculateBranchScore(branch.factors);
      branch.isComplete = branch.factors.length >= 4;

      // Calculate total score
      const totalScore = Math.round(
        newTopic.branches.reduce((sum, b) => sum + b.score, 0) / newTopic.branches.length
      );

      return {
        ...prev,
        currentTopic: newTopic,
        availableFactors: newAvailableFactors,
        score: totalScore
      };
    });
  };

  const handleRemoveFactor = (branchId: string, factorId: string) => {
    if (!gameState.currentTopic) return;

    setGameState(prev => {
      const newTopic = { ...prev.currentTopic! };
      const branch = newTopic.branches.find(b => b.id === branchId);
      if (!branch) return prev;

      const factor = branch.factors.find(f => f.id === factorId);
      if (!factor) return prev;

      // Remove from branch and add back to available
      branch.factors = branch.factors.filter(f => f.id !== factorId);
      branch.score = calculateBranchScore(branch.factors);
      branch.isComplete = branch.factors.length >= 4;

      const newAvailableFactors = [...prev.availableFactors, factor];

      // Calculate total score
      const totalScore = Math.round(
        newTopic.branches.reduce((sum, b) => sum + b.score, 0) / newTopic.branches.length
      );

      return {
        ...prev,
        currentTopic: newTopic,
        availableFactors: newAvailableFactors,
        score: totalScore
      };
    });
  };

  const handleDragStart = (factor: Factor, sourceType: 'available' | 'branch' = 'available', sourceBranchId?: string) => {
    setDraggedItem({
      factor,
      sourceType,
      sourceBranchId
    });
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const resetGame = () => {
    if (gameState.currentTopic) {
      startGame(gameState.currentTopic.id);
    }
  };

  const isGameWon = gameState.currentTopic && gameState.score >= gameState.currentTopic.targetScore;

  if (!gameState.isGameActive) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full">
          <div className="text-center mb-8">
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Gra w Drzewo Decyzyjne</h1>
            <p className="text-gray-600">
              Optymalizuj rozmieszczenie czynników aby osiągnąć najlepszy wynik
            </p>
          </div>

          <div className="space-y-4">
            {sampleTopics.map(topic => (
              <div
                key={topic.id}
                className="p-6 border-2 border-gray-200 rounded-xl hover:border-blue-300 transition-colors cursor-pointer"
                onClick={() => startGame(topic.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-800">{topic.name}</h3>
                  <Play className="w-6 h-6 text-blue-500" />
                </div>
                <p className="text-gray-600 mb-2">{topic.description}</p>
                <p className="text-sm text-blue-600 font-semibold">
                  Cel: {topic.targetScore}% punktów
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {gameState.currentTopic?.name}
              </h1>
              <p className="text-gray-600">{gameState.currentTopic?.description}</p>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{gameState.score}%</div>
                <div className="text-sm text-gray-500">Wynik</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {gameState.currentTopic?.targetScore}%
                </div>
                <div className="text-sm text-gray-500">Cel</div>
              </div>
              
              <button
                onClick={resetGame}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
            </div>
          </div>
          
          {isGameWon && (
            <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded-lg">
              <div className="flex items-center space-x-2">
                <Trophy className="w-6 h-6 text-green-600" />
                <span className="text-green-800 font-semibold">
                  Gratulacje! Osiągnąłeś cel {gameState.currentTopic?.targetScore}% punktów!
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Available Factors */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Dostępne Czynniki ({gameState.availableFactors.length})
              </h2>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {gameState.availableFactors.map(factor => (
                  <FactorCard
                    key={factor.id}
                    factor={factor}
                    onDragStart={(f) => handleDragStart(f, 'available')}
                    onDragEnd={handleDragEnd}
                    isDragging={draggedItem?.factor.id === factor.id}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Branches */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {gameState.currentTopic?.branches.map(branch => (
                <Branch
                  key={branch.id}
                  branch={branch}
                  onDrop={handleDrop}
                  onRemoveFactor={handleRemoveFactor}
                  onDragStart={(f, branchId) => handleDragStart(f, 'branch', branchId)}
                  onDragEnd={handleDragEnd}
                  draggedFactor={draggedItem?.factor || null}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
