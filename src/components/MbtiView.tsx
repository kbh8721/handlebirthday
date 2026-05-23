import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Sparkles, Loader2 } from 'lucide-react';
import Markdown from 'react-markdown';
import { TarotDrawResult } from '../utils';
import { TAROT_DECK } from '../tarotData';

interface MbtiViewProps {
  result: TarotDrawResult;
  onBack: () => void;
}

const MBTI_TRAITS = [
  [['E', '외향형 (Extraversion)'], ['I', '내향형 (Introversion)']],
  [['S', '감각형 (Sensing)'], ['N', '직관형 (iNtuition)']],
  [['T', '사고형 (Thinking)'], ['F', '감정형 (Feeling)']],
  [['J', '판단형 (Judging)'], ['P', '인식형 (Perceiving)']]
];

export function MbtiView({ result, onBack }: MbtiViewProps) {
  const [mbtiVals, setMbtiVals] = useState<string[]>(['', '', '', '']);
  const [reading, setReading] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isComplete = mbtiVals.every(v => v !== '');
  const mbtiString = mbtiVals.join('');

  const handleSelect = (idx: number, val: string) => {
    const newVals = [...mbtiVals];
    newVals[idx] = val;
    setMbtiVals(newVals);
  };

  const handleAnalyze = async () => {
    if (!isComplete) return;
    setIsLoading(true);
    setError(null);

    const targetCards = [
      `양력 카드: ${TAROT_DECK[result.solarCard].name}`,
      `음력 카드: ${TAROT_DECK[result.lunarCard].name}`,
      `첫번째 중간수: ${TAROT_DECK[result.middleCard1].name}`,
      `두번째 중간수: ${TAROT_DECK[result.middleCard2].name}`
    ];

    try {
      const res = await fetch('/api/mbti-reading', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ mbti: mbtiString, targetCards })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to analyze');
      setReading(data.reading);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-2xl mx-auto flex flex-col"
    >
      <div className="flex items-center mb-8">
        <button 
          onClick={onBack}
          className="p-2 mr-4 bg-slate-800/50 hover:bg-slate-700/50 rounded-full transition-colors text-slate-300"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-2xl font-serif text-gold">MBTI × 생일 타로 시너지</h2>
      </div>

      <AnimatePresence mode="wait">
        {!reading ? (
          <motion.div
            key="selector"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-8 bg-midnight-light p-6 md:p-8 rounded-3xl border border-slate-700/50 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 blur-[120px] pointer-events-none" />
            <h3 className="text-xl font-medium text-center text-slate-200">당신의 MBTI를 선택해주세요</h3>
            
            <div className="flex flex-col gap-4 relative z-10">
              {MBTI_TRAITS.map((pair, rowIdx) => (
                <div key={rowIdx} className="grid grid-cols-2 gap-4">
                  {pair.map(([val, label]) => {
                    const isSelected = mbtiVals[rowIdx] === val;
                    return (
                      <button
                        key={val}
                        onClick={() => handleSelect(rowIdx, val)}
                        className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${
                          isSelected 
                            ? "bg-slate-800 border-gold shadow-[0_0_15px_rgba(212,175,55,0.2)] text-gold" 
                            : "bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200"
                        }`}
                      >
                        <span className="text-2xl font-bold font-serif mb-1">{val}</span>
                        <span className="text-xs">{label}</span>
                      </button>
                    )
                  })}
                </div>
              ))}
            </div>

            {error && (
              <div className="text-red-400 text-sm p-4 bg-red-400/10 rounded-lg text-center border border-red-400/20">
                {error}
              </div>
            )}

            <button
              onClick={handleAnalyze}
              disabled={!isComplete || isLoading}
              className={`w-full py-4 rounded-full flex items-center justify-center gap-2 font-medium transition-all ${
                isComplete 
                  ? "bg-gold text-midnight hover:bg-yellow-500 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]" 
                  : "bg-slate-800 text-slate-500 cursor-not-allowed"
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  분석 우주와 교신 중...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  시너지 분석하기
                </>
              )}
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="reading"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col gap-6 bg-midnight-light p-6 md:p-8 rounded-3xl border border-gold/30 shadow-[0_0_40px_rgba(212,175,55,0.15)] relative overflow-hidden"
          >
            <div className="flex items-center justify-center mb-2 gap-3 relative z-10">
              <div className="px-4 py-1.5 rounded-full bg-slate-800/80 border border-slate-600 font-serif text-lg text-gold font-bold">
                {mbtiString}
              </div>
              <span className="text-slate-400">×</span>
              <div className="px-4 py-1.5 rounded-full bg-slate-800/80 border border-slate-600 font-serif text-lg text-gold font-bold">
                Tarot
              </div>
            </div>

            <div className="markdown-body prose prose-invert prose-headings:font-serif prose-headings:text-gold prose-a:text-yellow-400 hover:prose-a:text-yellow-300 max-w-none relative z-10 leading-relaxed text-slate-300">
              <Markdown>{reading}</Markdown>
            </div>
            
            <button
              onClick={() => {
                setReading(null);
                setMbtiVals(['', '', '', '']);
              }}
              className="mt-6 w-full py-4 rounded-full border border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-800 hover:text-white transition-all relative z-10"
            >
              다시 분석하기
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
