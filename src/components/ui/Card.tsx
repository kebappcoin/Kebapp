import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-background-secondary rounded-2xl p-8 border border-brand-500/20 hover:border-brand-500/30 transition-colors ${className}`}>
      {children}
    </div>
  );
}