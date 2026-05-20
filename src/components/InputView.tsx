import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Moon, Sun, ArrowRight } from 'lucide-react';
import { cn } from '../utils';

interface InputViewProps {
  key?: string;
  onSubmit: (y: number, m: number, d: number, isLunar: boolean) => void;
  onViewList: () => void;
}

export function InputView({ onSubmit, onViewList }: InputViewProps) {
  const [isLunar, setIsLunar] = useState(false);
  const [dateStr, setDateStr] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dateStr || dateStr.length !== 8) {
      alert("우주의 신호가 정확하지 않습니다. 생년월일 8자리를 입력해주세요. (예: 19950524)");
      return;
    }
    const y = parseInt(dateStr.substring(0, 4));
    const m = parseInt(dateStr.substring(4, 6));
    const d = parseInt(dateStr.substring(6, 8));
    
    if (isNaN(y) || isNaN(m) || isNaN(d) || m < 1 || m > 12 || d < 1 || d > 31) {
      alert("우주의 신호가 정확하지 않습니다. 올바른 날짜를 입력해주세요.");
      return;
    }
    
    onSubmit(y, m, d, isLunar);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-md mx-auto px-6"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cosmic-glow rounded-full blur-[100px] -z-10 pointer-events-none" />
      
      <div className="text-center mb-10">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-gold to-yellow-600 mb-4 tracking-wider">
          핸들생일타로
        </h1>
        <p className="text-slate-300 font-light tracking-wide text-sm md:text-base">
          방황하는 당신께 인생 핸들을
        </p>
      </div>

      <div className="w-64 h-64 relative mb-12 flex items-center justify-center animate-spin-slow" style={{ animationDuration: '20s', animationTimingFunction: 'linear', animationIterationCount: 'infinite', animationName: 'spin' }}>
         <svg viewBox="0 0 100 100" className="w-full h-full text-gold opacity-80" fill="none" stroke="currentColor" strokeWidth="1">
            <circle cx="50" cy="50" r="45" strokeDasharray="4 4" />
            <circle cx="50" cy="50" r="35" />
            <path d="M 50 15 L 50 85 M 15 50 L 85 50" />
            <path d="M 25 25 L 75 75 M 25 75 L 75 25" />
            <circle cx="50" cy="50" r="10" fill="currentColor" />
         </svg>
      </div>

      <form onSubmit={handleSubmit} className="w-full space-y-6">
        <div className="flex bg-midnight-light p-1 rounded-xl shadow-inner mx-auto w-48">
          <button
            type="button"
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-sm font-medium transition-all",
              !isLunar ? "bg-slate-800 text-gold shadow-md" : "text-slate-400 hover:text-slate-200"
            )}
            onClick={() => setIsLunar(false)}
          >
            <Sun className="w-4 h-4" /> 양력
          </button>
          <button
            type="button"
            className={cn(
               "flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-sm font-medium transition-all",
               isLunar ? "bg-slate-800 text-gold shadow-md" : "text-slate-400 hover:text-slate-200"
             )}
            onClick={() => setIsLunar(true)}
          >
            <Moon className="w-4 h-4" /> 음력
          </button>
        </div>

        <div className="relative">
          <input
            type="text"
            inputMode="numeric"
            pattern="\d*"
            maxLength={8}
            placeholder="생년월일 8자리 (예: 19950524)"
            className="w-full bg-midnight-light/50 border border-slate-700 focus:border-gold outline-none rounded-xl py-4 px-6 text-center text-lg tracking-widest text-slate-100 placeholder:text-slate-600 transition-colors shadow-inner"
            value={dateStr}
            onChange={(e) => setDateStr(e.target.value.replace(/\D/g, ''))}
          />
        </div>

        <button
          type="submit"
          className="group relative w-full flex items-center justify-center gap-3 bg-gradient-to-r from-cosmic to-cosmic-light hover:from-cosmic-light hover:to-cosmic text-white font-medium py-4 px-6 rounded-xl transition-all shadow-[0_0_20px_rgba(109,40,217,0.3)] hover:shadow-[0_0_30px_rgba(109,40,217,0.5)] overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 mix-blend-overlay"></div>
          <Sparkles className="w-5 h-5 group-hover:animate-sparkle" />
          <span>나의 운명 확인하기</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </form>
      
      <button onClick={onViewList} className="mt-8 text-sm text-slate-500 hover:text-gold transition-colors underline underline-offset-4">
        타로 카드 도감 보기
      </button>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </motion.div>
  );
}
