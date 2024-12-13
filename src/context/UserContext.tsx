// UserContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';

interface WalletWindow extends Window {
  solana?: any;
}

interface UserContextType {
  walletAddress: string;
  isWalletModalOpen: boolean;
  isLoading: boolean;
  connectWallet: () => Promise<void>;
  setWalletModalOpen: (isOpen: boolean) => void;
  disconnectWallet: () => void;
  getConnection: () => Connection;
}

const NETWORK = 'devnet';
const COMMITMENT = 'processed';

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [walletAddress, setWalletAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // Fix: Initialize the modal state
  const [isWalletModalOpen, setWalletModalOpen] = useState(false);

  const getConnection = () => {
    return new Connection(
      `https://api.${NETWORK}.solana.com`,
      { commitment: COMMITMENT }
    );
  };

  const connectWallet = async () => {
    setIsLoading(true);
    try {
      const { solana } = window as WalletWindow;
      if (!solana) {
        throw new Error('Phantom wallet not found!');
      }

      const response = await solana.connect();
      const address = response.publicKey.toString();
      setWalletAddress(address);
      setWalletModalOpen(false); // Close modal after successful connection
    } catch (error) {
      console.error('Wallet connection error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectWallet = () => {
    const { solana } = window as WalletWindow;
    if (solana) {
      solana.disconnect();
      setWalletAddress('');
    }
  };

  const contextValue = {
    walletAddress,
    isWalletModalOpen,
    isLoading,
    connectWallet,
    setWalletModalOpen, // Expose the setter function
    disconnectWallet,
    getConnection,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};