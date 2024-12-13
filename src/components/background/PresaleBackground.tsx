import React from 'react';

export function PresaleBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c0d0f] via-[#0a0b0d] to-[#0c0d0f]" />

      {/* Animated circles */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-yellow-400/5 to-yellow-500/5 animate-float-slow"
            style={{
              width: `${300 + i * 100}px`,
              height: `${300 + i * 100}px`,
              left: `${20 + i * 30}%`,
              top: `${10 + i * 20}%`,
              animationDelay: `${i * 2}s`,
              filter: 'blur(60px)',
            }}
          />
        ))}
      </div>

      {/* Animated lines */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px w-full bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent animate-pulse-slow"
            style={{
              top: `${20 + i * 15}%`,
              animationDelay: `${i * 0.5}s`,
              transform: `rotate(${-5 + i * 2}deg)`,
            }}
          />
        ))}
      </div>

      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(to right, #fbbf24 1px, transparent 1px), linear-gradient(to bottom, #fbbf24 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
    </div>
  );
}