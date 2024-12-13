import React from 'react';
import { ChevronDown } from 'lucide-react';

interface Token {
  symbol: string;
  icon: string;
}

interface TokenInputProps {
  value: string;
  onChange: (value: string) => void;
  onTokenSelect: (token: Token) => void;
  selectedToken: Token;
  tokens: Token[];
  label: string;
  readOnly?: boolean;
}

export function TokenInput({
  value,
  onChange,
  onTokenSelect,
  selectedToken,
  tokens,
  label,
  readOnly = false
}: TokenInputProps) {
  const [isTokenListOpen, setIsTokenListOpen] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsTokenListOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="space-y-2">
      <label className="block text-sm text-gray-400 font-medium">{label}</label>
      <div className="relative group">
        <div className={`
          absolute -inset-0.5 bg-brand-blue/10 rounded-lg opacity-0 
          group-hover:opacity-20 transition-opacity duration-300
          ${isFocused ? 'opacity-30' : ''}
        `} />

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          readOnly={readOnly}
          className={`
            w-full bg-[#0a0b0d] border border-brand-blue/20 rounded-lg px-4 py-4 pr-32
            text-xl font-medium text-white placeholder-gray-500
            focus:outline-none focus:border-brand-blue/40 
            transition-all duration-300 relative z-10
            ${isFocused ? 'ring-2 ring-brand-blue/20' : ''}
          `}
          placeholder="0.0"
        />

        <div className="absolute right-2 top-1/2 -translate-y-1/2 z-20">
          <button
            ref={buttonRef}
            onClick={() => setIsTokenListOpen(!isTokenListOpen)}
            className="bg-[#1a1b1e] hover:bg-gradient-brand hover:text-black px-3 py-2 rounded-lg flex items-center gap-2 transition-all duration-300"
          >
            <img src={selectedToken.icon} alt={selectedToken.symbol} className="w-5 h-5" />
            <span className="font-medium">{selectedToken.symbol}</span>
            <ChevronDown className="w-4 h-4" />
          </button>

          {isTokenListOpen && buttonRef.current && (
            <div 
              ref={dropdownRef}
              style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '0.5rem',
                width: '12rem',
                zIndex: 30,
              }}
              className="bg-[#1a1b1e] border border-brand-blue/20 rounded-lg shadow-xl overflow-hidden"
            >
              <div className="backdrop-blur-md bg-[#1a1b1e]/95 p-1">
                {tokens.map((token) => (
                  <button
                    key={token.symbol}
                    onClick={() => {
                      onTokenSelect(token);
                      setIsTokenListOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-3 hover:bg-gradient-brand hover:text-black rounded-md transition-all duration-300"
                  >
                    <img src={token.icon} alt={token.symbol} className="w-5 h-5" />
                    <span className="font-medium">{token.symbol}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}