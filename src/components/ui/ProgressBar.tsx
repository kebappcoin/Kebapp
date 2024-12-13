import React from 'react';

interface ProgressBarProps {
  progress: number;
  className?: string;
}

export function ProgressBar({ progress, className = '' }: ProgressBarProps) {
  return (
    <div className={`w-full bg-[#12131a] rounded-full overflow-hidden ${className}`}>
      <div
        className="bg-gradient-brand h-full rounded-full transition-all duration-1000 ease-out"
        style={{ width: `${Math.min(progress, 100)}%` }}
      >
        <div className="w-full h-full opacity-50 bg-gradient-to-b from-white/10 to-transparent" />
      </div>
    </div>
  );
}