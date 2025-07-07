import React from 'react';
import { Branch as BranchType, Factor } from '../types/game';
import { FactorCard } from './FactorCard';

interface BranchProps {
  branch: BranchType;
  onDrop: (branchId: string, factor: Factor) => void;
  onRemoveFactor: (branchId: string, factorId: string) => void;
  onDragStart: (factor: Factor, branchId: string) => void;
  onDragEnd: () => void;
  draggedFactor: Factor | null;
}

export const Branch: React.FC<BranchProps> = ({
  branch,
  onDrop,
  onRemoveFactor,
  onDragStart,
  onDragEnd,
  draggedFactor
}) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedFactor) {
      onDrop(branch.id, draggedFactor);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const factorsByType = {
    part: branch.factors.filter(f => f.type === 'part'),
    whole: branch.factors.filter(f => f.type === 'whole'),
    cause: branch.factors.filter(f => f.type === 'cause'),
    effect: branch.factors.filter(f => f.type === 'effect')
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200 hover:border-gray-300 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800">{branch.name}</h3>
        <div className="flex items-center space-x-2">
          <span className={`text-lg font-bold ${getScoreColor(branch.score)}`}>
            {branch.score}%
          </span>
          {branch.isComplete && (
            <span className="text-green-500 text-xl">✓</span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {Object.entries(factorsByType).map(([type, factors]) => (
          <div
            key={type}
            className="min-h-[120px] p-3 border-2 border-dashed border-gray-300 rounded-lg"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <h4 className="text-sm font-semibold text-gray-600 mb-2 capitalize">
              {type === 'part' && 'Części'}
              {type === 'whole' && 'Całości'}
              {type === 'cause' && 'Przyczyny'}
              {type === 'effect' && 'Skutki'}
            </h4>
            
            <div className="space-y-2">
              {factors.map(factor => (
                <FactorCard
                  key={factor.id}
                  factor={factor}
                  onDragStart={(f) => onDragStart(f, branch.id)}
                  onDragEnd={onDragEnd}
                  isInBranch={true}
                  onRemove={() => onRemoveFactor(branch.id, factor.id)}
                />
              ))}
              
              {factors.length === 0 && (
                <div className="text-gray-400 text-sm text-center py-4">
                  Przeciągnij tutaj czynnik
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
