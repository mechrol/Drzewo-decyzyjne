import React from 'react';
import { Factor } from '../types/game';

interface FactorCardProps {
  factor: Factor;
  onDragStart: (factor: Factor) => void;
  onDragEnd: () => void;
  isDragging?: boolean;
  isInBranch?: boolean;
  onRemove?: () => void;
}

const typeColors = {
  part: 'bg-blue-100 border-blue-300 text-blue-800',
  whole: 'bg-green-100 border-green-300 text-green-800',
  cause: 'bg-orange-100 border-orange-300 text-orange-800',
  effect: 'bg-purple-100 border-purple-300 text-purple-800'
};

const typeLabels = {
  part: 'Część',
  whole: 'Całość',
  cause: 'Przyczyna',
  effect: 'Skutek'
};

export const FactorCard: React.FC<FactorCardProps> = ({
  factor,
  onDragStart,
  onDragEnd,
  isDragging = false,
  isInBranch = false,
  onRemove
}) => {
  return (
    <div
      draggable
      onDragStart={() => onDragStart(factor)}
      onDragEnd={onDragEnd}
      className={`
        p-3 rounded-lg border-2 cursor-move transition-all duration-200
        ${typeColors[factor.type]}
        ${isDragging ? 'opacity-50 scale-95' : 'hover:scale-105 hover:shadow-md'}
        ${isInBranch ? 'relative' : ''}
      `}
    >
      {isInBranch && onRemove && (
        <button
          onClick={onRemove}
          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs hover:bg-red-600 transition-colors"
        >
          ×
        </button>
      )}
      
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold text-sm">{factor.name}</span>
        <span className="text-xs px-2 py-1 rounded-full bg-white bg-opacity-50">
          {typeLabels[factor.type]}
        </span>
      </div>
      
      <p className="text-xs opacity-80 mb-2">{factor.description}</p>
      
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold">Wartość: {factor.value}</span>
      </div>
    </div>
  );
};
