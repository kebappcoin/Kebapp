import React from 'react';

export function KebabBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute w-[1000px] h-[1000px] opacity-[0.03]">
        <div className="absolute w-full h-full bg-gradient-brand rounded-full blur-3xl animate-float-slow" />
        <div className="absolute w-full h-full bg-gradient-brand rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Heat wave effects */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-full h-40 bg-gradient-brand opacity-[0.01] blur-xl animate-float-slow"
            style={{
              top: `${30 * i}%`,
              animationDelay: `${i * 2}s`
            }}
          />
        ))}
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gradient-brand rounded-full opacity-[0.02] animate-float-slow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* Subtle overlay texture */}
      <div className="absolute inset-0 mix-blend-overlay opacity-[0.005]">
        <div className="h-full w-full bg-noise" />
      </div>
    </div>
  );
}