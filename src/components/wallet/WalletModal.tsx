import React from 'react';
import { Modal } from '../ui/Modal';
import { QrCode } from 'lucide-react';

interface WalletOption {
  id: string;
  name: string;
  icon: string;
  action?: 'qr' | 'connect';
}

const walletOptions: WalletOption[] = [
  {
    id: 'walletconnect',
    name: 'WalletConnect',
    icon: 'https://raw.githubusercontent.com/WalletConnect/walletconnect-assets/master/Logo/Blue%20(Default)/Logo.svg',
    action: 'qr'
  },
  {
    id: 'metamask',
    name: 'MetaMask',
    icon: 'https://raw.githubusercontent.com/MetaMask/brand-resources/master/SVG/metamask-fox.svg',
    action: 'connect'
  },
  {
    id: 'phantom',
    name: 'Phantom',
    icon: 'https://raw.githubusercontent.com/phantom-labs/press-kit/main/phantom-logo.svg',
    action: 'connect'
  }
];

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: () => void;
}

export function WalletModal({ isOpen, onClose, onConnect }: WalletModalProps) {
  const handleWalletClick = (wallet: WalletOption) => {
    onConnect();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Connect Wallet">
      <div className="space-y-4">
        {walletOptions.map((wallet) => (
          <button
            key={wallet.id}
            onClick={() => handleWalletClick(wallet)}
            className="w-full flex items-center justify-between p-4 rounded-xl bg-[#12131a] hover:bg-gradient-brand group transition-all duration-300 border border-brand-blue/10"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white p-2 flex items-center justify-center group-hover:bg-black/10">
                <img 
                  src={wallet.icon} 
                  alt={wallet.name} 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-lg font-medium text-white group-hover:text-black transition-colors">
                {wallet.name}
              </span>
            </div>
            {wallet.action === 'qr' && (
              <div className="px-3 py-1 rounded-md bg-white/10 text-white group-hover:bg-black/10 group-hover:text-black text-sm font-medium flex items-center gap-1 transition-colors">
                <QrCode className="w-4 h-4" />
                QR CODE
              </div>
            )}
          </button>
        ))}

        <button
          onClick={onClose}
          className="w-full flex items-center justify-between p-4 rounded-xl bg-[#12131a] hover:bg-gradient-brand group transition-all duration-300 border border-brand-blue/10"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/5 p-2 flex items-center justify-center group-hover:bg-black/10">
              <div className="w-6 h-6 grid grid-cols-2 gap-1">
                <div className="bg-white/30 rounded-sm group-hover:bg-black/30"></div>
                <div className="bg-white/30 rounded-sm group-hover:bg-black/30"></div>
                <div className="bg-white/30 rounded-sm group-hover:bg-black/30"></div>
                <div className="bg-white/30 rounded-sm group-hover:bg-black/30"></div>
              </div>
            </div>
            <span className="text-lg font-medium text-white group-hover:text-black transition-colors">
              All Wallets
            </span>
          </div>
          <div className="px-3 py-1 rounded-md bg-white/10 text-white group-hover:bg-black/10 group-hover:text-black text-sm font-medium transition-colors">
            4
          </div>
        </button>
      </div>
    </Modal>
  );
}