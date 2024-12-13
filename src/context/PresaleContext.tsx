import React, { createContext, useContext, useState } from 'react';
import { useNotifications } from './NotificationContext';

interface PresaleContextType {
  totalRaised: number;
  hardCap: number;
  progress: number;
  isPresaleEnded: boolean;
  setPresaleEnded: (ended: boolean) => void;
  addDeposit: (amount: number) => void;
}

const PresaleContext = createContext<PresaleContextType | undefined>(undefined);

export function PresaleProvider({ children }: { children: React.ReactNode }) {
  const [totalRaised, setTotalRaised] = useState(0); // $1.5M initial raised
  const [isPresaleEnded, setIsPresaleEnded] = useState(false);
  const hardCap = 2250000; // $2.25M hard cap
  const { addNotification } = useNotifications();

  const addDeposit = (amount: number) => {
    if (isPresaleEnded) {
      addNotification('error', 'Presale has ended');
      return;
    }

    const newTotal = totalRaised + amount;
    if (newTotal > hardCap) {
      addNotification('error', 'Amount exceeds hard cap');
      return;
    }
    setTotalRaised(newTotal);
    addNotification('success', `Successfully added $${amount.toLocaleString()} to the presale`);
  };

  const progress = (totalRaised / hardCap) * 100;

  return (
    <PresaleContext.Provider value={{
      totalRaised,
      hardCap,
      progress,
      isPresaleEnded,
      setPresaleEnded: setIsPresaleEnded,
      addDeposit
    }}>
      {children}
    </PresaleContext.Provider>
  );
}

export function usePresale() {
  const context = useContext(PresaleContext);
  if (context === undefined) {
    throw new Error('usePresale must be used within a PresaleProvider');
  }
  return context;
}