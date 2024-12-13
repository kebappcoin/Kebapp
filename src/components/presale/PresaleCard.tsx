import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { ProgressBar } from '../ui/ProgressBar';
import { TokenInput } from '../ui/TokenInput';
import { useNotifications } from '../../context/NotificationContext';
import { useUser } from '../../context/UserContext';
import { usePresale } from '../../context/PresaleContext';

const TOKENS = [
  {
    symbol: 'SOL',
    icon: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png'
  },
  {
    symbol: 'USDT',
    icon: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB/logo.svg'
  }
];

const SOL_TO_USDT = 236.01;
const MIN_AMOUNT = 100;
const MAX_AMOUNT = 5000;

export function PresaleCard() {
  const [inputAmount, setInputAmount] = useState('');
  const [selectedToken, setSelectedToken] = useState(TOKENS[0]);
  const [isValidating, setIsValidating] = useState(false);
  const [validationError, setValidationError] = useState('');
  const { addNotification } = useNotifications();
  const { walletAddress, connectWallet } = useUser();
  const { addDeposit, progress, isPresaleEnded } = usePresale();

  const validateAmount = (amount: string) => {
    if (isPresaleEnded) {
      setValidationError('Presale has ended');
      return false;
    }

    const numAmount = Number(amount);
    
    if (isNaN(numAmount)) {
      setValidationError('Please enter a valid number');
      return false;
    }
    
    if (numAmount < MIN_AMOUNT) {
      setValidationError(`Minimum investment is $${MIN_AMOUNT}`);
      return false;
    }
    
    if (numAmount > MAX_AMOUNT) {
      setValidationError(`Maximum investment is $${MAX_AMOUNT}`);
      return false;
    }
    
    setValidationError('');
    return true;
  };

  const handleInputChange = (value: string) => {
    setInputAmount(value);
    setIsValidating(true);
  };

  useEffect(() => {
    if (isValidating) {
      validateAmount(inputAmount);
      setIsValidating(false);
    }
  }, [inputAmount, isValidating]);

  const handleSubmit = async () => {
    if (isPresaleEnded) {
      addNotification('error', 'Presale has ended');
      return;
    }

    if (!walletAddress) {
      addNotification('warning', 'Please connect your wallet first');
      return;
    }

    if (!validateAmount(inputAmount)) {
      addNotification('error', validationError);
      return;
    }

    try {
      addNotification('info', 'Processing your transaction...');
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const amount = Number(inputAmount);
      addDeposit(amount);
      
      setInputAmount('');
    } catch (error) {
      addNotification('error', 'Transaction failed. Please try again.');
    }
  };

  return (
    <div className="relative group">
      {/* Animated gradient background */}
      <div className="absolute -inset-[1px] bg-gradient-to-r from-brand-400/20 via-brand-500/20 to-brand-400/20 rounded-2xl blur-sm group-hover:from-brand-400/30 group-hover:via-brand-500/30 group-hover:to-brand-400/30 transition-all duration-500" />
      
      <Card className="relative bg-[#12131a]/95 backdrop-blur-sm">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold mb-6">KebappCoin Presale</h2>
          
          <div>
            <div className="flex flex-col gap-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Current Rate</span>
                <span className="text-brand-500">1 SOL = {SOL_TO_USDT} USDT</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Progress</span>
                <span className="text-white">{progress.toFixed(1)}%</span>
              </div>
              <ProgressBar progress={progress} className="animate-shimmer" />
            </div>
          </div>

          <div className="space-y-4">
            <TokenInput
              value={inputAmount}
              onChange={handleInputChange}
              onTokenSelect={setSelectedToken}
              selectedToken={selectedToken}
              tokens={TOKENS}
              label="Enter Amount"
            />
            {validationError && (
              <p className="text-red-500 text-sm mt-1 animate-slide-up">
                {validationError}
              </p>
            )}
          </div>

          <button 
            onClick={walletAddress ? handleSubmit : connectWallet}
            className="w-full bg-brand-500 text-black font-bold py-4 px-6 rounded-lg hover:bg-brand-400 transform hover:scale-[1.02] transition-all duration-300 hover:shadow-[0_0_20px_rgba(250,197,21,0.3)]"
          >
            {walletAddress ? 'Buy Now' : 'Connect Wallet'}
          </button>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="hover:transform hover:scale-[1.02] transition-all duration-300">
              <span className="text-gray-400 block">Minimum Buy</span>
              <span className="text-white">${MIN_AMOUNT}</span>
            </div>
            <div className="hover:transform hover:scale-[1.02] transition-all duration-300">
              <span className="text-gray-400 block">Maximum Buy</span>
              <span className="text-white">${MAX_AMOUNT}</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}