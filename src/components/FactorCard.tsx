import React from 'react';
import { Factor } from '../types/game';
import { X, Grip } from 'lucide-react';

interface FactorCardProps {
  factor: Factor;
  onDragStart: (factor: Factor) => void;
  onDragEnd: () => void;
  isDragging: boolean;
  showRemove?: boolean;
  onRemove?: () => void;
}

const typeColors = {
  part: 'from-blue-600 to-blue-500',
  whole: 'from-green-600 to-green-500',
  cause: 'from-orange-600 to-orange-500',
  effect: 'from-purple-600 to-purple-500'
};

const typeLabels = {
  part: 'CZĘŚĆ',
  whole: 'CAŁOŚĆ',
  cause: 'PRZYCZYNA',
  effect: 'SKUTEK'
};

const typeIcons = {
  part: '🔧',
  whole: '🌐',
  cause: '⚡',
  effect: '🎯'
};

export const FactorCard: React.FC<FactorCardProps> = ({
  factor,
  onDragStart,
  onDragEnd,
  isDragging,
  showRemove = false,
  onRemove
}) => {
  const handleDragStart = (e: React.DragEvent) => {
    onDragStart(factor);
  };

  const handleDragEnd = () => {
    onDragEnd();
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`group relative bg-black/50 backdrop-blur-sm rounded-xl p-4 border border-violet-500/30 cursor-move transition-all duration-300 hover:border-violet-400/50 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/20 ${
        isDragging ? 'opacity-50 scale-95' : ''
      }`}
    >
      {/* Drag Handle */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Grip className="w-4 h-4 text-violet-400" />
      </div>

      {/* Remove Button */}
      {showRemove && onRemove && (
        <button
          onClick={onRemove}
          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-400 hover:scale-110 shadow-lg"
        >
          <X className="w-3 h-3" />
        </button>
      )}

      {/* Type Badge */}
      <div className={`inline-flex items-center space-x-1 px-3 py-1 bg-gradient-to-r ${typeColors[factor.type]} text-white text-xs font-bold rounded-full mb-3 shadow-lg`}>
        <span>{typeIcons[factor.type]}</span>
        <span>{typeLabels[factor.type]}</span>
      </div>

      {/* Factor Name */}
      <h4 className="text-white font-bold text-sm mb-2 leading-tight">
        {factor.name}
      </h4>

      {/* Factor Description */}
      <p className="text-violet-200 text-xs mb-3 leading-relaxed">
        {factor.description}
      </p>

      {/* Value */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
          <span className="text-violet-300 text-xs font-medium">WARTOŚĆ</span>
        </div>
        <div className="text-yellow-400 font-black text-lg">
          {factor.value}
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
};
