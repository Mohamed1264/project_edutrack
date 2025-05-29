import React from 'react';

const sizeMap = {
  sm: 'h-1.5 w-1.5',
  md: 'h-2.5 w-2.5',
  lg: 'h-3.5 w-3.5',
};

const colorMap = {
  primary: 'bg-blue-600',
  purple : 'bg-purple-600',
  secondary: 'bg-purple-600',
  accent: 'bg-teal-600',
  success: 'bg-green-600',
  warning: 'bg-amber-600',
  error: 'bg-red-600',
};

const containerSizeMap = {
  sm: 'h-5 w-16',
  md: 'h-8 w-20',
  lg: 'h-10 w-24',
};

const DotLoader = ({
  size = 'lg',
  color = 'purple',

}) => {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm'>
      <div className="relative w-full max-w-md mx-4">
        <div className="flex flex-col items-center justify-center" role="status">
          <div className={`relative ${containerSizeMap[size]} flex items-center justify-center`}>
            <div
              className={`absolute ${sizeMap[size]} ${colorMap[color]} rounded-full`}
              style={{
                animation: 'dot-bounce 1.4s infinite ease-in-out both',
                animationDelay: '-0.32s',
                left: '15%',
              }}
              aria-hidden="true"
            />
            <div
              className={`absolute ${sizeMap[size]} ${colorMap[color]} rounded-full`}
              style={{
                animation: 'dot-bounce 1.4s infinite ease-in-out both',
                animationDelay: '-0.16s',
              }}
              aria-hidden="true"
            />
            <div
              className={`absolute ${sizeMap[size]} ${colorMap[color]} rounded-full`}
              style={{
                animation: 'dot-bounce 1.4s infinite ease-in-out both',
                right: '15%',
              }}
              aria-hidden="true"
            />
          </div>

          <span className="sr-only">Loading</span>
          <style jsx>{`
            @keyframes dot-bounce {
              0%, 80%, 100% {
                transform: scale(0);
              }
              40% {
                transform: scale(1.0);
              }
            }
          `}</style>
        </div>
      </div>
    </div>
  );
};

export default DotLoader;