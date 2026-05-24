import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import shipWheelImg from '../assets/images/wooden_ship_wheel_1779330238783.png';
import sphinxImg from '../assets/images/sphinx_icon_1779330254495.png';

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
      <div className="relative w-48 h-48 mb-16">
        {/* The ship's wheel that spins */}
        <motion.img
           src={shipWheelImg}
           alt="Ship's Wheel"
           animate={{ rotate: [0, -360] }}
           transition={{ duration: 10, ease: "linear", repeat: Infinity }}
           className="w-full h-full object-cover rounded-full shadow-[0_0_30px_rgba(217,119,6,0.3)] opacity-90"
           referrerPolicy="no-referrer"
        />
        
        {/* The Sphinx icon fixed at 12 o'clock */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-10 w-20 h-20 rounded-full overflow-hidden border-2 border-gold shadow-[0_0_20px_rgba(217,119,6,0.5)] bg-amber-50">
           <img 
             src={sphinxImg} 
             alt="Sphinx"
             className="w-full h-full object-cover" 
             referrerPolicy="no-referrer"
           />
        </div>

        <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gold w-10 h-10 animate-pulse drop-shadow-[0_0_10px_rgba(217,119,6,0.8)] z-10" />
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
