import React from 'react';
import { Timer } from 'lucide-react';
import CountdownTimer from './CountdownTimer';

export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0a0b0d] overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-3xl -top-48 -right-48 animate-float"></div>
        <div className="absolute w-[300px] h-[300px] bg-yellow-500/5 rounded-full blur-2xl bottom-0 left-0 animate-float" style={{ animationDelay: '-1s' }}></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">
          Welcome to Springfield
        </h1>
        <h2 className="text-4xl md:text-6xl font-bold mb-8">
          and <span className="text-yellow-400">$BART</span>
        </h2>
        <p className="text-xl md:text-2xl mb-12 text-gray-400">
          Where The Simpsons Token Moonshot On Solana!
        </p>
        <div className="mb-12">
          <CountdownTimer days={7} />
        </div>
        <button 
          className="bg-yellow-400 text-black font-bold py-4 px-12 rounded-full text-lg hover:bg-yellow-300 transform hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(250,204,21,0.3)] hover:shadow-[0_0_30px_rgba(250,204,21,0.5)]"
        >
          BUY NOW
        </button>
      </div>
    </div>
  );
}