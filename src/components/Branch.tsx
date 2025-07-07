import React from 'react';
import { FactorCard } from './FactorCard';
import { Factor, Branch as BranchType } from '../types/game';
import { Target, CheckCircle, Zap } from 'lucide-react';

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
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    if (score >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return 'from-green-500 to-emerald-400';
    if (score >= 60) return 'from-yellow-500 to-orange-400';
    if (score >= 40) return 'from-orange-500 to-red-400';
    return 'from-red-500 to-red-600';
  };

  return (
    <div className="bg-black/40 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-violet-500/30 hover:border-violet-400/50 transition-all duration-300">
      {/* Branch Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-violet-500/20 rounded-xl">
            <Target className="w-6 h-6 text-violet-400" />
          </div>
          <h3 className="text-xl font-black text-white">{branch.name}</h3>
          {branch.isComplete && (
            <div className="p-1 bg-green-500/20 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
          )}
        </div>
        
        <div className="text-right">
          <div className={`text-2xl font-black ${getScoreColor(branch.score)}`}>
            {branch.score}
          </div>
          <div className="text-xs text-violet-300 font-medium">PUNKTY</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="w-full bg-black/30 rounded-full h-3 border border-violet-500/20">
          <div
            className={`h-full bg-gradient-to-r ${getProgressColor(branch.score)} rounded-full transition-all duration-500 shadow-lg`}
            style={{ width: `${Math.min(100, branch.score)}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-violet-300 mt-1 font-medium">
          <span>0</span>
          <span>100</span>
        </div>
      </div>

      {/* Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`min-h-48 p-4 rounded-xl border-2 border-dashed transition-all duration-300 ${
          draggedFactor
            ? 'border-violet-400 bg-violet-500/10 scale-105'
            : 'border-violet-500/30 bg-black/20'
        }`}
      >
        {branch.factors.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-8">
            <Zap className="w-12 h-12 text-violet-400 mb-3 animate-pulse" />
            <p className="text-violet-300 font-medium">
              Przeciągnij czynniki tutaj
            </p>
            <p className="text-violet-400 text-sm mt-1">
              Potrzebujesz 4+ czynników dla bonusu
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {branch.factors.map(factor => (
              <div key={factor.id} className="relative group">
                <FactorCard
                  factor={factor}
                  onDragStart={(f) => onDragStart(f, branch.id)}
                  onDragEnd={onDragEnd}
                  isDragging={false}
                  showRemove
                  onRemove={() => onRemoveFactor(branch.id, factor.id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Branch Stats */}
      <div className="mt-4 pt-4 border-t border-violet-500/20">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-lg font-black text-white">{branch.factors.length}</div>
            <div className="text-xs text-violet-300 font-medium">CZYNNIKI</div>
          </div>
          <div>
            <div className={`text-lg font-black ${branch.isComplete ? 'text-green-400' : 'text-violet-400'}`}>
              {branch.isComplete ? 'GOTOWE' : 'W TOKU'}
            </div>
            <div className="text-xs text-violet-300 font-medium">STATUS</div>
          </div>
        </div>
      </div>
    </div>
  );
};
