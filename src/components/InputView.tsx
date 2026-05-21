import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Moon, Sun, ArrowRight } from 'lucide-react';
import { cn } from '../utils';
import shipWheelImg from '../assets/images/wooden_ship_wheel_1779330238783.png';
import sphinxImg from '../assets/images/sphinx_icon_1779330254495.png';

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
      className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-md mx-auto px-6 relative"
    >
      <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
        <motion.div
           animate={{ rotate: [90, -90], opacity: [0, 1, 1, 0] }}
           transition={{ duration: 10, ease: "linear", repeat: Infinity, times: [0, 0.1, 0.9, 1] }}
           className="absolute bottom-[-10vh] left-1/2 w-0 h-[70vh] origin-bottom"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-20 bg-yellow-500 rounded-full blur-[2px] shadow-[0_0_80px_rgba(234,179,8,1)] flex items-center justify-center">
            <div className="w-12 h-12 bg-yellow-200 rounded-full shadow-[0_0_40px_rgba(253,224,71,1)]"></div>
          </div>
        </motion.div>
      </div>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cosmic-glow rounded-full blur-[100px] pointer-events-none" style={{ zIndex: 0 }} />
      
      <div className="text-center mb-10 relative z-10">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-gold to-yellow-600 mb-4 tracking-wider relative z-10">
          핸들생일타로
        </h1>
        <p className="text-slate-300 font-light tracking-wide text-sm md:text-base relative z-10">
          방황하는 당신께 인생 핸들을
        </p>
      </div>

      <div className="relative w-56 h-56 mx-auto mb-16 flex items-center justify-center z-10">
        {/* The ship's wheel that spins */}
        <motion.img
           src={shipWheelImg}
           alt="Ship's Wheel"
           animate={{ rotate: [0, -360] }}
           transition={{ duration: 20, ease: "linear", repeat: Infinity }}
           className="w-full h-full object-cover rounded-full shadow-[0_0_30px_rgba(212,175,55,0.2)] mix-blend-screen relative z-10"
           referrerPolicy="no-referrer"
        />
        
        {/* The Sphinx icon fixed at 12 o'clock */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-20 w-24 h-24 rounded-full overflow-hidden border-2 border-gold shadow-[0_0_20px_rgba(212,175,55,0.6)] bg-black">
           <img 
             src={sphinxImg} 
             alt="Sphinx"
             className="w-full h-full object-cover" 
             referrerPolicy="no-referrer"
           />
        </div>

        <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gold w-12 h-12 animate-pulse drop-shadow-[0_0_10px_rgba(212,175,55,0.8)] z-20 mix-blend-screen" />
      </div>

      <form onSubmit={handleSubmit} className="w-full space-y-6 relative z-10">
        <div className="flex bg-midnight-light p-1 rounded-xl shadow-[0_0_10px_rgba(212,175,55,0.3)] mx-auto w-48 border border-gold">
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
            className="w-full bg-midnight-light/50 border border-gold focus:border-gold-light focus:shadow-[0_0_10px_rgba(212,175,55,0.4)] outline-none rounded-xl py-4 px-6 text-center text-lg tracking-widest text-slate-100 placeholder:text-slate-600 transition-all shadow-inner"
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
