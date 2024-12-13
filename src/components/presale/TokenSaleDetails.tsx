import { useState } from 'react';
import { 
  PublicKey, 
  Transaction, 
  SystemProgram,
  TransactionInstruction,
  SendTransactionError,
  LAMPORTS_PER_SOL
} from '@solana/web3.js';
import { Target, Wallet } from 'lucide-react';
import { usePresale } from '../../context/PresaleContext';
import { TokenInput } from '../ui/TokenInput';
import { useNotifications } from '../../context/NotificationContext';
import { useUser } from '../../context/UserContext';
import { Card } from '../ui/Card';
import { ProgressBar } from '../ui/ProgressBar';

// Program Constants
const PROGRAM_ID = new PublicKey('581gc2hFXcg1V5Wx3MLeH557MgsVwqowC3P21oWjkELm');
const ADMIN_WALLET = new PublicKey('2FcJbN2kgx3eB1JeJgoBKczpAsXxJzosq269Coidxfhd');

// Investment Limits
const MIN_INVESTMENT = 0.00000001;
const MAX_INVESTMENT = 5000;

// Available Tokens
const TOKENS = [
  {
    symbol: 'SOL',
    icon: '/api/placeholder/24/24'
  }
];

export function TokenSaleDetails() {
  const { addNotification } = useNotifications();
  const { walletAddress, connectWallet, getConnection } = useUser();
  const { totalRaised, hardCap, progress, isPresaleEnded, addDeposit } = usePresale();

  const [amount, setAmount] = useState('');
  const [selectedToken] = useState(TOKENS[0]);
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const createInstructionData = (lamports: number): Uint8Array => {
    const data = new Uint8Array(9);
    data[0] = 0; // InvestSol instruction index
    
    // Write lamports as little-endian bytes
    const buffer = new ArrayBuffer(8);
    const view = new DataView(buffer);
    view.setBigUint64(0, BigInt(lamports), true); // true for little-endian
    data.set(new Uint8Array(buffer), 1);
    
    console.log('Instruction data created:', [...data]); // For debugging
    return data;
  };

  const validateAmount = (value: string): boolean => {
    if (isPresaleEnded) {
      setError('Presale has ended');
      return false;
    }

    const numAmount = Number(value);
    if (isNaN(numAmount) || numAmount <= 0) {
      setError('Please enter a valid amount');
      return false;
    }

    if (numAmount < MIN_INVESTMENT) {
      setError(`Minimum investment is ${MIN_INVESTMENT} SOL`);
      return false;
    }

    if (numAmount > MAX_INVESTMENT) {
      setError(`Maximum investment is ${MAX_INVESTMENT} SOL`);
      return false;
    }

    setError('');
    return true;
  };

  const handleAmountChange = (value: string) => {
    setAmount(value);
    validateAmount(value);
  };

  const handleInvest = async () => {
    if (!walletAddress) {
      addNotification('warning', 'Please connect your wallet');
      return;
    }

    if (!validateAmount(amount)) {
      addNotification('error', error);
      return;
    }

    setIsProcessing(true);
    try {
      const connection = getConnection();
      if (!window.solana) {
        throw new Error('Wallet not found');
      }

      // Convert amount to lamports
      const lamports = Math.floor(Number(amount) * LAMPORTS_PER_SOL);
      console.log('Investment amount:', amount, 'SOL');
      console.log('Lamports:', lamports);

      // Check balance
      const balance = await connection.getBalance(new PublicKey(walletAddress));
      if (balance < lamports) {
        throw new Error(`Insufficient balance. Required: ${lamports / LAMPORTS_PER_SOL} SOL, Available: ${balance / LAMPORTS_PER_SOL} SOL`);
      }
      
      // Create and send transaction
      const instruction = new TransactionInstruction({
        keys: [
          { pubkey: new PublicKey(walletAddress), isSigner: true, isWritable: true },
          { pubkey: ADMIN_WALLET, isSigner: false, isWritable: true },
          { pubkey: SystemProgram.programId, isSigner: false, isWritable: false }
        ],
        programId: PROGRAM_ID,
        data: createInstructionData(lamports)
      });

      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash('confirmed');
      
      const transaction = new Transaction();
      transaction.add(instruction);
      transaction.feePayer = new PublicKey(walletAddress);
      transaction.recentBlockhash = blockhash;

      const signed = await window.solana.signTransaction(transaction);
      const signature = await connection.sendRawTransaction(signed.serialize(), {
        skipPreflight: false,
        preflightCommitment: 'confirmed'
      });
      
      await connection.confirmTransaction({
        signature,
        blockhash,
        lastValidBlockHeight
      });

      addNotification('success', 'Investment successful!');
      addDeposit(Number(amount));
      setAmount('');

    } catch (error) {
      console.error('Investment failed:', error);
      if (error instanceof SendTransactionError) {
        addNotification('error', `Transaction failed: ${error.message}`);
      } else {
        addNotification('error', error instanceof Error ? error.message : 'Investment failed');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="relative group">
      <div className="absolute -inset-[1px] bg-gradient-brand rounded-2xl blur-sm opacity-10 group-hover:opacity-15 transition-all duration-500" />
      
      <Card className="relative bg-[#12131a]/95 backdrop-blur-sm">
        <div className="space-y-8">
          <div className="space-y-3">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Target className="w-5 h-5 text-brand-yellow" />
              <span className="bg-gradient-brand bg-clip-text text-transparent">
                Fundraising Progress
              </span>
            </h3>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Total Raised</span>
              <span className="text-white">
                {totalRaised.toLocaleString()} / {hardCap.toLocaleString()} SOL
              </span>
            </div>
            
            <ProgressBar progress={progress} className="h-3" />
            
            <div className="flex justify-end">
              <span className="text-sm text-gray-400">
                {progress.toFixed(1)}% Complete
              </span>
            </div>
          </div>

          <div className="border-t border-brand-blue/10" />

          <div className="space-y-6">
            <h2 className="text-2xl font-bold bg-gradient-brand bg-clip-text text-transparent">
              Investment Details
            </h2>
            
            <TokenInput
              value={amount}
              onChange={handleAmountChange}
              selectedToken={selectedToken}
              tokens={TOKENS}
              label="Amount (SOL)"
              disabled={isProcessing}
            />

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <button 
              onClick={walletAddress ? handleInvest : connectWallet}
              disabled={isPresaleEnded || isProcessing}
              className="w-full bg-gradient-brand text-black font-bold py-4 px-6 rounded-lg hover:shadow-gradient transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:transform-none disabled:hover:shadow-none"
            >
              {isProcessing ? 'Processing...' : 
               walletAddress ? (
                 <div className="flex items-center justify-center gap-2">
                   <Wallet className="w-5 h-5" />
                   <span>Invest Now</span>
                 </div>
               ) : 'Connect Wallet'}
            </button>

            <div className="flex justify-between text-sm mt-4">
              <div>
                <span className="text-gray-400 block">Min Investment</span>
                <span className="text-white">{MIN_INVESTMENT} SOL</span>
              </div>
              <div className="text-right">
                <span className="text-gray-400 block">Max Investment</span>
                <span className="text-white">{MAX_INVESTMENT} SOL</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}