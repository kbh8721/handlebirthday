import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { InputView } from './components/InputView';
import { CalculationView } from './components/CalculationView';
import { ResultView } from './components/ResultView';
import { CardListView } from './components/CardListView';
import { YearlyView } from './components/YearlyView';
import { MbtiView } from './components/MbtiView';
import { LoginView } from './components/LoginView';
import { drawCards, TarotDrawResult } from './utils';
import { LogOut } from 'lucide-react';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export default function App() {
  const [step, setStep] = useState<'input' | 'calculating' | 'result' | 'list' | 'yearly' | 'mbti'>('input');
  const [result, setResult] = useState<TarotDrawResult | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = (y: number, m: number, d: number, isLunar: boolean) => {
    const res = drawCards(y, m, d, isLunar);
    setResult(res);
    setStep('calculating');
  };

  const handleCalcComplete = () => {
    setStep('result');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setStep('input');
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden selection:bg-cosmic/30 relative">
      {/* Ambient background particles */}
      <div className="fixed inset-0 pointer-events-none opacity-40 z-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
      
      {/* Top Bar with Logout (visible only when logged in, and not on calculating step) */}
      {isLoggedIn && step !== 'calculating' && (
        <div className="absolute top-6 right-6 flex items-center gap-2.5 z-40">
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/70 hover:bg-red-50 border border-stone-200 text-stone-500 hover:text-red-600 transition-all text-xs font-medium shadow-sm"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>로그아웃</span>
          </button>
        </div>
      )}

      <main className="container mx-auto px-4 py-8 relative z-10 flex flex-col items-center justify-center min-h-screen">
        <AnimatePresence mode="wait">
          {!isLoggedIn ? (
            <LoginView
              key="login"
              onLoginSuccess={() => setIsLoggedIn(true)}
            />
          ) : (
            <>
              {step === 'input' && (
                <InputView 
                  key="input" 
                  onSubmit={handleSubmit} 
                  onViewList={() => setStep('list')} 
                />
              )}
              {step === 'calculating' && (
                <CalculationView 
                  key="calculating" 
                  onComplete={handleCalcComplete} 
                />
              )}
              {step === 'result' && result && (
                <ResultView 
                  key="result" 
                  result={result} 
                  onReset={() => {
                    setResult(null);
                    setStep('input');
                  }}
                  onViewYearly={() => setStep('yearly')}
                  onViewMbti={() => setStep('mbti')}
                />
              )}
              {step === 'yearly' && result && (
                <YearlyView 
                  key="yearly" 
                  result={result} 
                  onBack={() => setStep('result')} 
                />
              )}
              {step === 'mbti' && result && (
                <MbtiView
                  key="mbti"
                  result={result}
                  onBack={() => setStep('result')}
                />
              )}
              {step === 'list' && (
                <CardListView 
                  key="list" 
                  onBack={() => setStep('input')} 
                />
              )}
            </>
          )}
        </AnimatePresence>
      </main>
      
      <footer className="py-6 text-center text-stone-500 text-xs font-serif fixed bottom-0 w-full z-[1] pointer-events-none">
        &copy; Handle Birthday Tarot. Cosmos guides you.
      </footer>
    </div>
  );
}
