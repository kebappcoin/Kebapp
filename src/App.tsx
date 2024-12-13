import { Header } from './components/layout/Header';
import { TokenSaleDetails } from './components/presale/TokenSaleDetails';
import { CountdownDisplay } from './components/presale/CountdownDisplay';
import { ReferralSection } from './components/presale/ReferralSection';
import { NotificationProvider } from './context/NotificationContext';
import { UserProvider } from './context/UserContext';
import { PresaleProvider } from './context/PresaleContext';
import { NotificationList } from './components/ui/Notification';
import { KebabBackground } from './components/background/KebabBackground';
import { WalletModal } from './components/wallet/WalletModal';
import { useUser } from './context/UserContext';
import { usePresale } from './context/PresaleContext';
import { Rocket } from 'lucide-react';

function AppContent() {
  const { isPresaleEnded } = usePresale();
  const { isWalletModalOpen, setWalletModalOpen } = useUser();
  const endDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const handleWalletConnect = () => {
    setWalletModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0b0d] text-white relative overflow-hidden">
      <Header />
      <KebabBackground />

      <main className="relative">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-12 sm:pb-20">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 items-center">
            <div className="text-center lg:text-left space-y-6 sm:space-y-8">
              <div className="space-y-4">
                {/* Presale Banner with gradient border */}
                <div className="relative inline-flex group">
                  {/* Gradient border background */}
                  <div className="absolute -inset-[1px] bg-gradient-brand rounded-full opacity-50 blur-sm group-hover:opacity-70 transition-all duration-300" />
                  
                  {/* Content container */}
                  <div className="relative flex items-center gap-2 px-4 py-2 bg-[#0a0b0d] rounded-full">
                    <Rocket className="w-4 h-4 sm:w-5 sm:h-5 bg-gradient-brand bg-clip-text text-transparent animate-pulse-slow" />
                    <span className="bg-gradient-brand bg-clip-text text-transparent font-semibold text-sm sm:text-base whitespace-nowrap">
                      Exclusive Presale Now Live
                    </span>
                    <div className="w-1.5 h-1.5 rounded-full bg-gradient-brand animate-pulse-slow" />
                  </div>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight animate-slide-up">
                  Join the{' '}
                  <span className="bg-gradient-brand bg-clip-text text-transparent">KebappCoin</span>
                  {' '}Revolution
                </h1>
                <p className="text-base sm:text-lg xl:text-xl text-gray-400 leading-relaxed animate-slide-up mx-auto lg:mx-0 max-w-2xl" style={{ animationDelay: '0.1s' }}>
                  Be part of the first kebab-backed cryptocurrency. Early investors get exclusive benefits and rewards in our limited-time presale event.
                </p>
              </div>
              <div className="flex justify-center lg:justify-start">
                <CountdownDisplay endDate={endDate} />
              </div>
            </div>

            <div className="flex justify-center">
              <div className="w-full max-w-md">
                <TokenSaleDetails />
              </div>
            </div>
          </div>
        </div>

        {!isPresaleEnded && (
          <div className="py-12 sm:py-16 lg:py-24">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
              <ReferralSection />
            </div>
          </div>
        )}
      </main>

      <WalletModal 
        isOpen={isWalletModalOpen}
        onClose={() => setWalletModalOpen(false)}
        onConnect={handleWalletConnect}
      />
      
      <NotificationList />
    </div>
  );
}

function App() {
  return (
    <NotificationProvider>
      <UserProvider>
        <PresaleProvider>
          <AppContent />
        </PresaleProvider>
      </UserProvider>
    </NotificationProvider>
  );
}

export default App;