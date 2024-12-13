// components/layout/Header.tsx
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { ConnectWalletButton } from '../wallet/ConnectWalletButton';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-brand rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-all duration-300" />
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden">
                <img 
                  src="/api/placeholder/48/48"
                  alt="KebappCoin Logo"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <span className="text-xl sm:text-2xl font-bold bg-gradient-brand bg-clip-text text-transparent">
              KebappCoin
            </span>
          </div>
          
          <button 
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-brand-blue" />
            ) : (
              <Menu className="w-6 h-6 text-brand-blue" />
            )}
          </button>
          
          <div className="hidden lg:block">
            <ConnectWalletButton variant="header" />
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden mt-4 py-4 border-t border-brand-blue/10">
            <ConnectWalletButton className="w-full" />
          </div>
        )}
      </div>
    </header>
  );
}