import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Lock, Unlock, Eye, EyeOff, AlertCircle, Settings, Sparkles } from 'lucide-react';
import { TAROT_DECK } from '../tarotData';

interface LoginViewProps {
  onLoginSuccess: () => void;
  onGoToSettings: () => void;
}

export function LoginView({ onLoginSuccess, onGoToSettings }: LoginViewProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Initialize password to '1234' if not set
  useEffect(() => {
    if (!localStorage.getItem('birthday_tarot_password')) {
      localStorage.setItem('birthday_tarot_password', '1234');
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const storedPassword = localStorage.getItem('birthday_tarot_password') || '1234';
    
    if (password === storedPassword) {
      setIsUnlocked(true);
      setError('');
      setTimeout(() => {
        onLoginSuccess();
      }, 800);
    } else {
      setError('비밀번호가 일치하지 않습니다. 우주의 기운이 닫혀 있습니다.');
      // Shake animation effect or vibration
      if (navigator.vibrate) {
        navigator.vibrate(100);
      }
    }
  };

  // Quick helper card of the day for background decoration
  const tarotKeys = Object.keys(TAROT_DECK).map(Number);
  const cardIndex = tarotKeys.length > 0 ? tarotKeys[Math.floor(Date.now() / 86400000) % tarotKeys.length] : 0;
  const cardOfTheDay = TAROT_DECK[cardIndex] || TAROT_DECK[0];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="w-full max-w-md mx-auto px-6 py-8 flex flex-col items-center justify-center min-h-[80vh] relative z-10"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Decorative Golden Star */}
      <div className="mb-6 relative flex items-center justify-center">
        <motion.div
          animate={{ rotate: isUnlocked ? 180 : 0, scale: isUnlocked ? 1.2 : 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className={`w-20 h-20 rounded-full border-2 border-gold flex items-center justify-center bg-stone-900/40 backdrop-blur-md shadow-[0_0_20px_rgba(217,119,6,0.3)]`}
        >
          {isUnlocked ? (
            <Unlock className="w-10 h-10 text-gold-light animate-pulse" />
          ) : (
            <Lock className="w-10 h-10 text-gold" />
          )}
        </motion.div>
        <Sparkles className="absolute -top-2 -right-2 text-gold-light w-6 h-6 animate-pulse" />
      </div>

      <div className="text-center mb-8">
        <h2 className="font-serif text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-gold to-yellow-600 mb-2">
          우주의 문이 닫혀 있습니다
        </h2>
        <p className="text-stone-500 text-xs md:text-sm font-light leading-relaxed">
          핸들생일타로에 접속하려면 비밀번호를 입력하세요.
        </p>
      </div>

      <form onSubmit={handleLogin} className="w-full space-y-4">
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError('');
            }}
            placeholder="비밀번호 입력"
            className="w-full bg-amber-50/60 border border-gold focus:border-gold-light focus:shadow-[0_0_12px_rgba(217,119,6,0.3)] outline-none rounded-2xl py-4 pl-6 pr-14 text-center text-lg tracking-widest text-stone-800 placeholder:text-stone-400 placeholder:tracking-normal transition-all shadow-inner"
            autoFocus
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-gold transition-colors p-2"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 text-red-500 text-xs text-center font-light bg-red-50/80 border border-red-200 py-2.5 px-4 rounded-xl"
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}

        <button
          type="submit"
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-gold via-amber-500 to-yellow-600 hover:from-amber-500 hover:to-gold text-white font-medium shadow-[0_4px_20px_rgba(217,119,6,0.25)] hover:shadow-[0_4px_25px_rgba(217,119,6,0.4)] transition-all flex items-center justify-center gap-2"
        >
          <span>운명의 문 열기</span>
        </button>
      </form>

      {/* Settings / Configuration button */}
      <div className="mt-10 flex flex-col items-center gap-4">
        <button
          onClick={onGoToSettings}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-amber-50/50 hover:bg-amber-100/80 border border-amber-300 text-stone-600 hover:text-stone-800 transition-all text-xs"
        >
          <Settings className="w-4 h-4 text-gold animate-spin-slow" />
          <span>로그인 암호 설정</span>
        </button>
        
        {/* Decorative Quote */}
        <div className="text-center mt-6 text-stone-400 font-serif italic text-xs max-w-xs border-t border-amber-200/50 pt-4">
          "오늘의 타로 기운: {cardOfTheDay.name} ({cardOfTheDay.keyword})"
        </div>
      </div>
    </motion.div>
  );
}
