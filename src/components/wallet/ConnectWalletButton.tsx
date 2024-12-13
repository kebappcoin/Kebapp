// components/wallet/ConnectWalletButton.tsx
import { useState, useRef, useEffect } from 'react';
import { Wallet, Copy, User, LogOut, ChevronDown } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { useNotifications } from '../../context/NotificationContext';

interface ConnectWalletButtonProps {
  className?: string;
  variant?: 'header' | 'default';
}

export function ConnectWalletButton({ className = '', variant = 'default' }: ConnectWalletButtonProps) {
  const { walletAddress, isLoading, connectWallet, disconnectWallet } = useUser();
  const { addNotification } = useNotifications();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const copyAddress = async () => {
    if (walletAddress) {
      await navigator.clipboard.writeText(walletAddress);
      addNotification('success', 'Address copied to clipboard!');
      setIsDropdownOpen(false);
    }
  };

  const handleDisconnect = () => {
    disconnectWallet();
    setIsDropdownOpen(false);
    addNotification('info', 'Wallet disconnected');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!walletAddress) {
    return (
      <button 
        onClick={connectWallet}
        disabled={isLoading}
        className={`flex items-center gap-2 bg-gradient-brand text-black px-6 py-2.5 rounded-lg hover:shadow-gradient transition-all duration-300 font-semibold disabled:opacity-50 ${className}`}
      >
        <Wallet className="w-5 h-5" />
        {isLoading ? 'Connecting...' : 'Connect Wallet'}
      </button>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className={`flex items-center gap-2 bg-gradient-brand text-black px-6 py-2.5 rounded-lg hover:shadow-gradient transition-all duration-300 font-semibold ${className}`}
      >
        <Wallet className="w-5 h-5" />
        <span>{truncateAddress(walletAddress)}</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-[#1a1b1e] border border-brand-blue/10 rounded-lg shadow-lg overflow-hidden">
          <div className="py-1">
            <button
              onClick={copyAddress}
              className="flex items-center gap-3 w-full px-4 py-2 text-sm text-white hover:bg-brand-blue/10 transition-colors duration-200"
            >
              <Copy className="w-4 h-4" />
              Copy Address
            </button>
            
            <button
              onClick={() => {
                setIsDropdownOpen(false);
                // Add profile action here
              }}
              className="flex items-center gap-3 w-full px-4 py-2 text-sm text-white hover:bg-brand-blue/10 transition-colors duration-200"
            >
              <User className="w-4 h-4" />
              Profile
            </button>
            
            <button
              onClick={handleDisconnect}
              className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-500 hover:bg-brand-blue/10 transition-colors duration-200"
            >
              <LogOut className="w-4 h-4" />
              Disconnect
            </button>
          </div>
        </div>
      )}
    </div>
  );
}