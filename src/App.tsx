import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { InputView } from './components/InputView';
import { CalculationView } from './components/CalculationView';
import { ResultView } from './components/ResultView';
import { CardListView } from './components/CardListView';
import { YearlyView } from './components/YearlyView';
import { drawCards, TarotDrawResult } from './utils';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export default function App() {
  const [step, setStep] = useState<'input' | 'calculating' | 'result' | 'list' | 'yearly'>('input');
  const [result, setResult] = useState<TarotDrawResult | null>(null);

  const handleSubmit = (y: number, m: number, d: number, isLunar: boolean) => {
    const res = drawCards(y, m, d, isLunar);
    setResult(res);
    setStep('calculating');
  };

  const handleCalcComplete = () => {
    setStep('result');
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden selection:bg-cosmic/30">
      {/* Ambient background particles */}
      <div className="fixed inset-0 pointer-events-none opacity-20 z-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      
      <main className="container mx-auto px-4 py-8 relative z-10 flex flex-col items-center justify-center min-h-screen">
        <AnimatePresence mode="wait">
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
            />
          )}
          {step === 'yearly' && result && (
            <YearlyView 
              key="yearly" 
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
        </AnimatePresence>
      </main>
      
      <footer className="py-6 text-center text-slate-600 text-xs font-serif fixed bottom-0 w-full z-[1] pointer-events-none">
        &copy; Handle Birthday Tarot. Cosmos guides you.
      </footer>
    </div>
  );
}
