import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { InputView } from './components/InputView';
import { CalculationView } from './components/CalculationView';
import { ResultView } from './components/ResultView';
import { CardListView } from './components/CardListView';
import { YearlyView } from './components/YearlyView';
import { MbtiView } from './components/MbtiView';
import { LoginView } from './components/LoginView';
import { SettingsView } from './components/SettingsView';
import { drawCards, TarotDrawResult } from './utils';
import { Settings, LogOut } from 'lucide-react';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export default function App() {
  const [step, setStep] = useState<'input' | 'calculating' | 'result' | 'list' | 'yearly' | 'mbti' | 'settings'>('input');
  const [result, setResult] = useState<TarotDrawResult | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [prevStep, setPrevStep] = useState<'input' | 'calculating' | 'result' | 'list' | 'yearly' | 'mbti'>('input');

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

  const navigateToSettings = () => {
    if (step !== 'settings') {
      setPrevStep(step);
    }
    setStep('settings');
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden selection:bg-cosmic/30 relative">
      {/* Ambient background particles */}
      <div className="fixed inset-0 pointer-events-none opacity-40 z-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
      
      {/* Top Bar with Settings and Logout (visible only when logged in, and not on calculating/settings step) */}
      {isLoggedIn && step !== 'calculating' && step !== 'settings' && (
        <div className="absolute top-6 right-6 flex items-center gap-2.5 z-40">
          <button
            onClick={navigateToSettings}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/70 hover:bg-amber-100 border border-amber-200/80 text-stone-600 hover:text-stone-800 transition-all text-xs font-medium shadow-sm"
          >
            <Settings className="w-3.5 h-3.5 text-gold" />
            <span>암호 설정</span>
          </button>
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
          {!isLoggedIn && step !== 'settings' ? (
            <LoginView
              key="login"
              onLoginSuccess={() => setIsLoggedIn(true)}
              onGoToSettings={navigateToSettings}
            />
          ) : step === 'settings' ? (
            <SettingsView
              key="settings"
              isLoggedIn={isLoggedIn}
              onBack={() => {
                if (isLoggedIn) {
                  setStep(prevStep);
                } else {
                  setStep('input');
                }
              }}
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
