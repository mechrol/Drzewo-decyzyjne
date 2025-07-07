import React from 'react';

interface HomoHumanicusLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'horizontal' | 'vertical' | 'icon-only';
  className?: string;
}

export const HomoHumanicusLogo: React.FC<HomoHumanicusLogoProps> = ({ 
  size = 'md', 
  variant = 'horizontal',
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16',
    xl: 'h-24'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-4xl'
  };

  if (variant === 'icon-only') {
    return (
      <div className={`flex items-center ${className}`}>
        <img
          src="https://nai.info.pl/zasoby/grafika/logo.png"
          alt="HomoHumanicus Logo"
          className={`${sizeClasses[size]} w-auto object-contain`}
          onError={(e) => {
            // Fallback if image fails to load
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const fallback = target.nextElementSibling as HTMLElement;
            if (fallback) fallback.style.display = 'flex';
          }}
        />
        {/* Fallback icon */}
        <div 
          className={`${sizeClasses[size]} w-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-black hidden`}
          style={{ aspectRatio: '1/1' }}
        >
          HH
        </div>
      </div>
    );
  }

  if (variant === 'vertical') {
    return (
      <div className={`flex flex-col items-center space-y-2 ${className}`}>
        <img
          src="https://nai.info.pl/zasoby/grafika/logo.png"
          alt="HomoHumanicus Logo"
          className={`${sizeClasses[size]} w-auto object-contain`}
          onError={(e) => {
            // Fallback if image fails to load
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const fallback = target.nextElementSibling as HTMLElement;
            if (fallback) fallback.style.display = 'flex';
          }}
        />
        {/* Fallback icon */}
        <div 
          className={`${sizeClasses[size]} w-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-black hidden`}
          style={{ aspectRatio: '1/1' }}
        >
          HH
        </div>
        <div className="text-center">
          <span className={`${textSizeClasses[size]} font-black text-white bg-gradient-to-r from-blue-200 via-purple-200 to-blue-200 bg-clip-text text-transparent`}>
            HomoHumanicus
          </span>
        </div>
      </div>
    );
  }

  // Default horizontal variant
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <img
        src="https://nai.info.pl/zasoby/grafika/logo.png"
        alt="HomoHumanicus Logo"
        className={`${sizeClasses[size]} w-auto object-contain`}
        onError={(e) => {
          // Fallback if image fails to load
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          const fallback = target.nextElementSibling as HTMLElement;
          if (fallback) fallback.style.display = 'flex';
        }}
      />
      {/* Fallback icon */}
      <div 
        className={`${sizeClasses[size]} w-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-black hidden`}
        style={{ aspectRatio: '1/1' }}
      >
        HH
      </div>
      <div>
        <span className={`${textSizeClasses[size]} font-black text-white bg-gradient-to-r from-blue-200 via-purple-200 to-blue-200 bg-clip-text text-transparent`}>
          HomoHumanicus
        </span>
      </div>
    </div>
  );
};
