import React from 'react';
import { Shield } from 'lucide-react';

export const CopyrightNotice: React.FC = () => {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-black/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-violet-500/30 shadow-lg">
        <div className="flex items-center space-x-2 text-xs text-violet-300">
          <Shield className="w-3 h-3" />
          <span>© 2025 Drzewo Decyzyjne Game</span>
        </div>
      </div>
    </div>
  );
};
