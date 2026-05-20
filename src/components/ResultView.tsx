import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Share2, RotateCcw } from 'lucide-react';
import { TAROT_DECK } from '../tarotData';
import { TarotDrawResult } from '../utils';

interface ResultViewProps {
  key?: string;
  result: TarotDrawResult;
  onReset: () => void;
}

export function ResultView({ result, onReset }: ResultViewProps) {
  const [revealed, setRevealed] = useState([false, false, false, false]);

  useEffect(() => {
    // 순차적으로 4장의 카드 뒤집기
    const timers = [
      setTimeout(() => setRevealed(r => [true, r[1], r[2], r[3]]), 800),
      setTimeout(() => setRevealed(r => [r[0], true, r[2], r[3]]), 1600),
      setTimeout(() => setRevealed(r => [r[0], r[1], true, r[3]]), 2400),
      setTimeout(() => {
        setRevealed(r => [r[0], r[1], r[2], true]);
        // 마지막 카드 뒤집힐 때 효과
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#6D28D9', '#ffffff']
        });
      }, 3200)
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleShare = async () => {
    const text = `내 인생을 안내하는 핸들생일타로\n\n음력카드: ${TAROT_DECK[result.lunarCard].name}\n양력카드: ${TAROT_DECK[result.solarCard].name}\n중간수1: ${TAROT_DECK[result.middleCard1].name}\n중간수2: ${TAROT_DECK[result.middleCard2].name}\n\n나의 운명 확인하기: ${window.location.origin}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: '핸들생일타로 결과', text });
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("공유하기를 지원하지 않는 브라우저입니다.");
    }
  };

  const topCards = [
    { label: "음력 탄생카드", id: result.lunarCard, index: 0 },
    { label: "양력 탄생카드", id: result.solarCard, index: 1 },
  ];
  
  const bottomCards = [
    { label: "첫번째 중간수", id: result.middleCard1, index: 2 },
    { label: "두번째 중간수", id: result.middleCard2, index: 3 },
  ];

  const allRevealed = revealed[3];

  const renderCard = (c: { label: string, id: number, index: number }) => (
    <div key={c.index} className="flex flex-col items-center flex-1 w-full max-w-[240px]">
      <span className="text-sm text-slate-400 mb-4 tracking-widest">{c.label}</span>
      <div className="relative w-full aspect-[2/3] perspective-1000">
         <motion.div
            className="w-full h-full relative preserve-3d"
            animate={{ rotateY: revealed[c.index] ? 180 : 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 60 }}
         >
           {/* 앞면 (뒤집히기 전) */}
           <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-midnight-light to-midnight border-2 border-slate-700 rounded-2xl flex items-center justify-center shadow-lg">
              <div className="w-4/5 h-4/5 border border-slate-600 rounded-xl flex items-center justify-center opacity-30">
                 <div className="w-16 h-16 rounded-full border border-gold/50 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full border border-gold/30" />
                 </div>
              </div>
           </div>

           {/* 뒷면 (타로카드 내용) */}
           <div className="absolute inset-0 backface-hidden [transform:rotateY(180deg)] bg-slate-900 border-2 border-gold rounded-2xl p-4 flex flex-col items-center justify-between shadow-[0_0_30px_rgba(212,175,55,0.15)] overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent pointer-events-none" />
              
              <div className="w-full text-center border-b border-gold/30 pb-2">
                 <div className="text-gold font-serif text-3xl mb-1">{c.id}</div>
              </div>
              
              <div className="flex-1 flex flex-col items-center justify-center w-full z-10 text-center">
                 <h3 className="font-serif text-[1.3rem] leading-tight font-bold text-white mb-1">
                   {TAROT_DECK[c.id].name}
                 </h3>
                 <p className="text-[10px] text-gold/80 font-serif tracking-widest uppercase">
                   {TAROT_DECK[c.id].nameEn}
                 </p>
              </div>

              <div className="w-full border-t border-gold/30 pt-3 text-center px-1">
                 <p className="text-[11px] text-slate-300 leading-tight">
                   {TAROT_DECK[c.id].keyword}
                 </p>
              </div>
           </div>
         </motion.div>
      </div>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center min-h-[80vh] w-full max-w-4xl mx-auto py-10 px-4"
    >
      <h2 className="font-serif text-3xl font-bold text-gold mb-12 text-center">당신의 운명의 수레바퀴</h2>

      <div className="flex flex-col gap-10 w-full mb-16 items-center">
        {/* 상단 2장 (음력, 양력) */}
        <div className="flex flex-col md:flex-row gap-6 w-full justify-center items-center">
          {topCards.map(renderCard)}
        </div>
        {/* 하단 2장 (중간수 1, 2) */}
        <div className="flex flex-col md:flex-row gap-6 w-full justify-center items-center">
          {bottomCards.map(renderCard)}
        </div>
      </div>

      <AnimatePresence>
        {allRevealed && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-2xl bg-midnight-light/50 border border-slate-700/50 rounded-2xl p-8 backdrop-blur-sm"
          >
            <div className="prose prose-invert max-w-none font-serif text-slate-200">
              <h3 className="text-gold text-2xl border-b border-slate-700 pb-4 mb-6">운명의 해석</h3>
              
              <div className="space-y-8">
                <div>
                  <h4 className="text-lg text-white mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cosmic-light" />
                    내면의 흐름: 음력의 나 ({TAROT_DECK[result.lunarCard].name})
                  </h4>
                  <p className="leading-relaxed font-sans font-light">
                    {TAROT_DECK[result.lunarCard].description}
                  </p>
                </div>

                <div>
                  <h4 className="text-lg text-white mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gold" />
                    현재의 에너지: 양력의 나 ({TAROT_DECK[result.solarCard].name})
                  </h4>
                  <p className="leading-relaxed font-sans font-light">
                    {TAROT_DECK[result.solarCard].description}
                  </p>
                </div>
                
                <div className="bg-slate-900/50 p-6 rounded-xl border border-gold/20 mt-8 space-y-6">
                  <div>
                    <h4 className="text-xl text-gold mb-3 text-center">첫번째 중간수의 조언 ({TAROT_DECK[result.middleCard1].name})</h4>
                    <p className="text-center font-sans font-light leading-relaxed">
                      "{TAROT_DECK[result.middleCard1].advice}"
                    </p>
                  </div>
                  <div className="w-12 h-[1px] bg-gold/20 mx-auto" />
                  <div>
                    <h4 className="text-xl text-gold mb-3 text-center">두번째 중간수의 조언 ({TAROT_DECK[result.middleCard2].name})</h4>
                    <p className="text-center font-sans font-light leading-relaxed">
                      "{TAROT_DECK[result.middleCard2].advice}"
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12 pt-8 border-t border-slate-700/50">
              <button onClick={handleShare} className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white py-3 px-6 rounded-xl transition-colors font-medium">
                <Share2 className="w-4 h-4" /> 결과 공유하기
              </button>
              <button onClick={onReset} className="flex items-center justify-center gap-2 bg-transparent border border-slate-600 hover:border-gold hover:text-gold text-slate-300 py-3 px-6 rounded-xl transition-colors font-medium">
                <RotateCcw className="w-4 h-4" /> 다시 뽑기
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
