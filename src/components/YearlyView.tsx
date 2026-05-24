import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, CalendarDays, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import Markdown from 'react-markdown';
import { TarotDrawResult, getYearlyCardNumber } from '../utils';
import { TAROT_DECK } from '../tarotData';

const MBTI_TRAITS = [
  [['E', '외향 (Extraversion)'], ['I', '내향 (Introversion)']],
  [['S', '감각 (Sensing)'], ['N', '직관 (iNtuition)']],
  [['T', '사고 (Thinking)'], ['F', '감정 (Feeling)']],
  [['J', '판단 (Judging)'], ['P', '인식 (Perceiving)']]
];

const BLOOD_TYPES = [
  [['A', 'A형'], ['B', 'B형']],
  [['O', 'O형'], ['AB', 'AB형']]
];

interface YearlyViewProps {
  result: TarotDrawResult;
  onBack: () => void;
}

export function YearlyView({ result, onBack }: YearlyViewProps) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 7 }, (_, i) => currentYear - 3 + i);

  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const [mbtiVals, setMbtiVals] = useState<string[]>(['', '', '', '']);
  const [bloodType, setBloodType] = useState<string>('');
  const [reading, setReading] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isComplete = mbtiVals.every(v => v !== '') && bloodType !== '';
  const mbtiString = mbtiVals.join('');

  const solarCardId = getYearlyCardNumber(selectedYear, result.solarDate.m, result.solarDate.d);
  const lunarCardId = getYearlyCardNumber(selectedYear, result.lunarDate.m, result.lunarDate.d);

  // When year changes, reset the reading as it's no longer valid
  const handleYearSelect = (y: number) => {
    setSelectedYear(y);
    setReading(null);
    setError(null);
  };

  const handleMbtiSelect = (idx: number, val: string) => {
    const next = [...mbtiVals];
    next[idx] = val;
    setMbtiVals(next);
  };

  const fetchReading = async () => {
    if (!isComplete) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/yearly-reading', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          year: selectedYear,
          mbti: mbtiString,
          bloodType,
          solarCard: TAROT_DECK[solarCardId].name,
          lunarCard: TAROT_DECK[lunarCardId].name
        })
      });
      
      const text = await res.text();
      let data;
      try {
        if (!text) {
          throw new Error('서버로부터 응답 데이터를 받지 못했습니다.');
        }
        data = JSON.parse(text);
      } catch (parseError: any) {
        throw new Error('API_FETCH_FAILED');
      }

      if (!res.ok) throw new Error('API_FETCH_FAILED');
      setReading(data.reading);
    } catch (err: any) {
      console.warn("API 분석에 실패하였습니다:", err);
      setError("상세 분석을 불러오는 데 실패했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderMiniCard = (year: number, isSolar: boolean) => {
    const cardId = isSolar 
      ? getYearlyCardNumber(year, result.solarDate.m, result.solarDate.d)
      : getYearlyCardNumber(year, result.lunarDate.m, result.lunarDate.d);
    
    return (
      <div className="flex flex-col items-center">
        <span className="text-[10px] text-stone-500 mb-1">{isSolar ? '양력' : '음력'}</span>
        <div className="relative w-16 h-24 bg-amber-50 border border-gold/40 rounded-md overflow-hidden flex flex-col items-center justify-center shadow-lg shadow-black/50">
          <img src={TAROT_DECK[cardId].imageUrl} alt={TAROT_DECK[cardId].name} referrerPolicy="no-referrer" className="w-full h-full object-cover transform scale-110" />
          <div className="absolute bottom-0 w-full h-[18%] bg-amber-50 flex items-center justify-center border-t border-gold/30">
            <span className="text-gold font-serif font-semibold tracking-tighter text-[8px] whitespace-nowrap overflow-hidden text-ellipsis px-1">{TAROT_DECK[cardId].name}</span>
          </div>
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
          className="flex items-center gap-2 text-stone-500 hover:text-gold transition-colors"
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
            onClick={() => handleYearSelect(y)}
            className={`snap-center shrink-0 flex flex-col items-center p-4 rounded-xl border transition-all ${selectedYear === y ? 'bg-white border-gold shadow-[0_0_15px_rgba(217,119,6,0.2)]' : 'bg-amber-50/50 border-amber-300 hover:border-amber-400 hover:bg-amber-200/80'} min-w-[120px]`}
          >
            <span className={`text-sm font-medium ${selectedYear === y ? 'text-gold' : 'text-stone-600'}`}>
              {y}년
            </span>
            <span className="text-xs text-stone-500 mt-1">
              {y === currentYear ? '올해' : y < currentYear ? '이전' : '이후'}
            </span>
          </button>
        ))}
      </div>

      <div className="w-full bg-amber-100/50 border border-amber-300/50 rounded-3xl p-6 md:p-10 backdrop-blur-sm mb-12">
        <div className="text-center mb-8 border-b border-amber-300/50 pb-6">
          <h3 className="text-3xl text-stone-800 font-serif">{selectedYear}년 에너지의 흐름</h3>
          <p className="text-stone-500 mt-2 font-light">
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
              <div className="absolute inset-0 bg-amber-50 border-2 border-gold rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(217, 119, 6,0.15)] flex flex-col items-center justify-center">
                <img src={TAROT_DECK[lunarCardId].imageUrl} alt={TAROT_DECK[lunarCardId].name} referrerPolicy="no-referrer" className="w-full h-full object-cover transform scale-110" />
                <div className="absolute bottom-0 w-full h-[15%] bg-amber-50 flex items-center justify-center border-t border-gold/30">
                  <span className="text-gold font-serif font-semibold tracking-widest text-sm md:text-base">{TAROT_DECK[lunarCardId].name}</span>
                </div>
              </div>
            </div>

            <div className="px-2 md:px-4 text-center">
              <p className="text-xs md:text-sm text-stone-600 font-light leading-relaxed hidden md:block">
                그 해 상반기까지 흘러가는 에너지이면서 끌리는 성향을 나타냅니다.
              </p>
              <div className="mt-4 p-3 md:p-4 bg-amber-50/50 rounded-lg border border-amber-300/50 text-stone-700 text-xs md:text-sm italic line-clamp-3 md:line-clamp-none">
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
              <div className="absolute inset-0 bg-amber-50 border-2 border-gold rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(217, 119, 6,0.15)] flex flex-col items-center justify-center">
                <img src={TAROT_DECK[solarCardId].imageUrl} alt={TAROT_DECK[solarCardId].name} referrerPolicy="no-referrer" className="w-full h-full object-cover transform scale-110" />
                <div className="absolute bottom-0 w-full h-[15%] bg-amber-50 flex items-center justify-center border-t border-gold/30">
                  <span className="text-gold font-serif font-semibold tracking-widest text-sm md:text-base">{TAROT_DECK[solarCardId].name}</span>
                </div>
              </div>
            </div>

            <div className="px-2 md:px-4 text-center">
              <p className="text-xs md:text-sm text-stone-600 font-light leading-relaxed hidden md:block">
                하반기에 중점적으로 흘러가는 에너지이자 그 해 성취해야 할 숙제입니다.
              </p>
              <div className="mt-4 p-3 md:p-4 bg-amber-50/50 rounded-lg border border-amber-300/50 text-stone-700 text-xs md:text-sm italic line-clamp-3 md:line-clamp-none">
                {TAROT_DECK[solarCardId].advice}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-amber-100/50 border border-amber-300/50 rounded-3xl p-6 md:p-10 backdrop-blur-sm mb-12">
        <div className="text-center mb-8 border-b border-amber-300/50 pb-6">
          <h3 className="text-2xl text-stone-800 font-serif flex justify-center items-center gap-2">
            <Sparkles className="text-gold w-6 h-6" /> 올해의 심층 분석
          </h3>
          <p className="text-stone-500 mt-2 font-light">
            MBTI와 혈액형을 입력하면 더 깊이 있는 맞춤형 조언을 드립니다.
          </p>
        </div>

        {!reading ? (
          <div className="flex flex-col gap-6 w-full max-w-xl mx-auto">
            <div className="text-sm font-medium text-gold mb-[-8px]">MBTI</div>
            {MBTI_TRAITS.map((pair, rowIdx) => (
              <div key={rowIdx} className="grid grid-cols-2 gap-4">
                {pair.map(([val, label]) => {
                  const isSelected = mbtiVals[rowIdx] === val;
                  return (
                    <button
                      key={val}
                      onClick={() => handleMbtiSelect(rowIdx, val)}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                        isSelected 
                          ? "bg-white border-gold shadow-[0_0_15px_rgba(217,119,6,0.2)] text-gold" 
                          : "bg-amber-50 border-amber-300 text-stone-500 hover:border-amber-400 hover:text-stone-700"
                      }`}
                    >
                      <span className="text-lg font-bold font-serif mb-1">{val}</span>
                      <span className="text-xs">{label}</span>
                    </button>
                  )
                })}
              </div>
            ))}
            
            <div className="text-sm font-medium text-gold mt-2 mb-[-8px]">혈액형</div>
            {BLOOD_TYPES.map((pair, rowIdx) => (
              <div key={`bt-${rowIdx}`} className="grid grid-cols-2 gap-4">
                {pair.map(([val, label]) => {
                  const isSelected = bloodType === val;
                  return (
                    <button
                      key={val}
                      onClick={() => setBloodType(val)}
                      className={`flex items-center justify-center py-3 px-4 rounded-xl border transition-all ${
                        isSelected 
                          ? "bg-white border-gold shadow-[0_0_15px_rgba(217,119,6,0.2)] text-gold" 
                          : "bg-amber-50 border-amber-300 text-stone-500 hover:border-amber-400 hover:text-stone-700"
                      }`}
                    >
                      <span className="text-lg font-bold font-serif">{label}</span>
                    </button>
                  )
                })}
              </div>
            ))}

            {error && (
              <div className="text-red-600 text-sm p-4 bg-red-100 rounded-lg text-center border border-red-300 flex flex-col items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                {error}
              </div>
            )}

            <button
              onClick={fetchReading}
              disabled={!isComplete || isLoading}
              className={`w-full mt-4 py-4 rounded-2xl font-medium transition-all flex items-center justify-center gap-2 ${
                isComplete 
                ? "bg-amber-500 hover:bg-amber-400 text-white shadow-[0_0_20px_rgba(217,119,6,0.4)]" 
                : "bg-amber-200 text-stone-500 cursor-not-allowed"
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  우주의 기운을 읽는 중...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" /> 심층 결과 확인하기
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-6 bg-amber-50/50 p-6 md:p-8 rounded-3xl border border-gold/30 shadow-[0_0_40px_rgba(217,119,6,0.15)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 blur-[120px] pointer-events-none" />
            
            <div className="text-center border-b border-amber-300/50 pb-6 mb-2">
              <h3 className="font-serif text-2xl text-stone-800 mb-2">올해의 맞춤 심층 분석</h3>
              <div className="flex flex-wrap items-center justify-center gap-3 relative z-10">
                <div className="px-4 py-1.5 rounded-full bg-white/80 border border-amber-300 font-serif text-lg text-gold font-bold">
                  {mbtiString} {bloodType}형
                </div>
              </div>
            </div>

            <div className="markdown-body prose prose-stone prose-headings:font-serif prose-headings:text-amber-700 prose-a:text-amber-600 hover:prose-a:text-amber-500 max-w-none relative z-10 leading-relaxed text-stone-700">
              <Markdown>{reading}</Markdown>
            </div>
            
            <div className="mt-8 pt-6 border-t border-amber-300/50 flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => {
                  setReading(null);
                }}
                className="w-full sm:w-auto px-8 py-4 rounded-full border border-amber-300 bg-white/50 text-stone-600 hover:bg-amber-200 hover:text-stone-800 transition-all relative z-10"
              >
                다시 분석하기
              </button>
            </div>
          </div>
        )}
      </div>

    </motion.div>
  );
}
