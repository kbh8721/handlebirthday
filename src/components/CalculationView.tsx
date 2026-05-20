import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface CalculationViewProps {
  key?: string;
  onComplete: () => void;
}

const PHRASES = [
  "별들의 에너지를 모으는 중...",
  "당신의 생체 주기를 운명의 수레바퀴와 동기화합니다...",
  "과거와 미래의 교차점을 계산 중...",
  "우주의 신호를 해독 중..."
];

export function CalculationView({ onComplete }: CalculationViewProps) {
  const [phraseIdx, setPhraseIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPhraseIdx(p => (p + 1) % PHRASES.length);
    }, 1500);
    
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 4000);

    return () => {
      clearInterval(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-md mx-auto"
    >
      <div className="relative w-32 h-32 mb-12">
        <motion.div
           animate={{ rotate: 360 }}
           transition={{ duration: 4, ease: "linear", repeat: Infinity }}
           className="w-full h-full rounded-full border-2 border-gold/30 border-t-gold border-b-cosmic"
        />
        <motion.div
           animate={{ rotate: -360 }}
           transition={{ duration: 3, ease: "linear", repeat: Infinity }}
           className="absolute inset-2 rounded-full border border-cosmic-light/30 border-l-cosmic-light border-r-gold"
        />
        <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gold w-8 h-8 animate-pulse" />
      </div>

      <motion.p 
        key={phraseIdx}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="text-gold font-serif text-lg text-center min-h-[3rem]"
      >
        {PHRASES[phraseIdx]}
      </motion.p>
    </motion.div>
  );
}
