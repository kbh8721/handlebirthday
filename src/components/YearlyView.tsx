import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, CalendarDays } from 'lucide-react';
import { TarotDrawResult, getYearlyCardNumber } from '../utils';
import { TAROT_DECK } from '../tarotData';

interface YearlyViewProps {
  result: TarotDrawResult;
  onBack: () => void;
}

export function YearlyView({ result, onBack }: YearlyViewProps) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 7 }, (_, i) => currentYear - 3 + i);

  const [selectedYear, setSelectedYear] = useState<number>(currentYear);

  const solarCardId = getYearlyCardNumber(selectedYear, result.solarDate.m, result.solarDate.d);
  const lunarCardId = getYearlyCardNumber(selectedYear, result.lunarDate.m, result.lunarDate.d);

  const renderMiniCard = (year: number, isSolar: boolean) => {
    const cardId = isSolar 
      ? getYearlyCardNumber(year, result.solarDate.m, result.solarDate.d)
      : getYearlyCardNumber(year, result.lunarDate.m, result.lunarDate.d);
    
    return (
      <div className="flex flex-col items-center">
        <span className="text-[10px] text-slate-400 mb-1">{isSolar ? '양력' : '음력'}</span>
        <div className="w-16 h-24 bg-slate-900 border border-gold/40 rounded-md overflow-hidden flex flex-col items-center justify-center shadow-lg shadow-black/50">
          <img src={TAROT_DECK[cardId].imageUrl} alt={TAROT_DECK[cardId].name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
        </div>
      </div>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center min-h-[80vh] w-full max-w-4xl mx-auto py-10 px-4"
    >
      <div className="w-full flex justify-between items-center mb-10">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-gold transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>결과로 돌아가기</span>
        </button>
        <h2 className="font-serif text-2xl font-bold text-gold flex items-center gap-2">
          <CalendarDays className="w-6 h-6" /> 올해의 카드
        </h2>
        <div className="w-[100px]" /> {/* Spacer for centering */}
      </div>

      <div className="w-full flex overflow-x-auto gap-4 py-4 mb-8 snap-x no-scrollbar pb-6 justify-start md:justify-center">
        {years.map(y => (
          <button
            key={y}
            onClick={() => setSelectedYear(y)}
            className={`snap-center shrink-0 flex flex-col items-center p-4 rounded-xl border transition-all ${selectedYear === y ? 'bg-slate-800 border-gold shadow-[0_0_15px_rgba(212,175,55,0.2)]' : 'bg-slate-900/50 border-slate-700 hover:border-slate-500 hover:bg-slate-800/80'} min-w-[120px]`}
          >
            <span className={`text-sm font-medium ${selectedYear === y ? 'text-gold' : 'text-slate-300'}`}>
              {y}년
            </span>
            <span className="text-xs text-slate-500 mt-1">
              {y === currentYear ? '올해' : y < currentYear ? '이전' : '이후'}
            </span>
          </button>
        ))}
      </div>

      <div className="w-full bg-midnight-light/50 border border-slate-700/50 rounded-3xl p-6 md:p-10 backdrop-blur-sm mb-12">
        <div className="text-center mb-8 border-b border-slate-700/50 pb-6">
          <h3 className="text-3xl text-white font-serif">{selectedYear}년 에너지의 흐름</h3>
          <p className="text-slate-400 mt-2 font-light">
            해당 연도에 전체적으로 흐르는 운명과 숙제를 보여줍니다.
          </p>
        </div>

        <div className="flex flex-row gap-4 md:gap-12 w-full justify-center">
          {/* 음력 카드 */}
          <div className="flex-1 flex flex-col items-center">
            <h4 className="text-sm md:text-lg text-gold mb-6 font-serif tracking-widest text-center border-b border-gold/30 pb-2 inline-block">
              올해의 음력 (전반기)
            </h4>
            
            <div className="relative w-full max-w-[192px] aspect-[2/3] perspective-1000 mb-6">
              <div className="absolute inset-0 bg-slate-900 border-2 border-gold rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(212,175,55,0.15)] flex flex-col items-center justify-center">
                <img src={TAROT_DECK[lunarCardId].imageUrl} alt={TAROT_DECK[lunarCardId].name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="px-2 md:px-4 text-center">
              <p className="text-xs md:text-sm text-slate-300 font-light leading-relaxed hidden md:block">
                그 해 상반기까지 흘러가는 에너지이면서 끌리는 성향을 나타냅니다.
              </p>
              <div className="mt-4 p-3 md:p-4 bg-slate-900/50 rounded-lg border border-slate-700/50 text-slate-200 text-xs md:text-sm italic line-clamp-3 md:line-clamp-none">
                {TAROT_DECK[lunarCardId].advice}
              </div>
            </div>
          </div>

          {/* 양력 카드 */}
          <div className="flex-1 flex flex-col items-center">
            <h4 className="text-sm md:text-lg text-gold mb-6 font-serif tracking-widest text-center border-b border-gold/30 pb-2 inline-block">
              올해의 양력 (후반기)
            </h4>
            
            <div className="relative w-full max-w-[192px] aspect-[2/3] perspective-1000 mb-6">
              <div className="absolute inset-0 bg-slate-900 border-2 border-gold rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(212,175,55,0.15)] flex flex-col items-center justify-center">
                <img src={TAROT_DECK[solarCardId].imageUrl} alt={TAROT_DECK[solarCardId].name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="px-2 md:px-4 text-center">
              <p className="text-xs md:text-sm text-slate-300 font-light leading-relaxed hidden md:block">
                하반기에 중점적으로 흘러가는 에너지이자 그 해 성취해야 할 숙제입니다.
              </p>
              <div className="mt-4 p-3 md:p-4 bg-slate-900/50 rounded-lg border border-slate-700/50 text-slate-200 text-xs md:text-sm italic line-clamp-3 md:line-clamp-none">
                {TAROT_DECK[solarCardId].advice}
              </div>
            </div>
          </div>
        </div>
      </div>

    </motion.div>
  );
}
