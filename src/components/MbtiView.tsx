import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Sparkles, Loader2, Printer } from 'lucide-react';
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

function generateFallbackReading(mbti: string, result: TarotDrawResult): string {
  const isE = mbti.includes('E');
  const isN = mbti.includes('N');
  const isF = mbti.includes('F');
  const isJ = mbti.includes('J');

  const solarCard = TAROT_DECK[result.solarCard];
  const lunarCard = TAROT_DECK[result.lunarCard];

  return `### ✨ ${mbti} 성향과 타로의 특별한 만남
당신은 **${isE ? '외부 세계와 활발히 소통하며 에너지를 얻는' : '내면의 깊은 생각과 성찰을 통해 에너지를 모으는'}** 성향을 가지고 있습니다. 여기에 양력 카드인 **${solarCard.name}**의 에너지가 더해져, 당신의 타고난 능력이 더욱 밝게 빛나고 있습니다. **${isN ? '직관적이고 미래지향적인 아이디어' : '현실감각과 꼼꼼한 관찰력'}**를 바탕으로 새로운 기회를 포착하는 데 유리한 잠재력을 지녔습니다.

### 💖 깊은 내면과 관계의 시너지
음력 카드인 **${lunarCard.name}**는 당신의 내면 깊은 곳의 정서적 기반을 보여줍니다. **${isF ? '타인의 감정에 깊이 공감하고 따뜻한 유대를 중시하는' : '논리적이고 객관적인 판단을 통해 명확한 기준을 세우는'}** 당신의 특징이 이 카드와 결합되어, 주위 사람들에게 신뢰와 영감을 줍니다. 관계를 맺거나 중요한 결정을 내릴 때, 이러한 당신만의 흔들리지 않는 가치관과 통찰력이 큰 힘이 될 것입니다.

### 🌟 잠재력과 나아갈 방향
생일로부터 도출된 중간수 타로 카드들은 당신이 가진 **${isJ ? '체계적이고 계획적인 실행력' : '상황에 유연하게 대처하는 적응력'}**을 지지하고 응원하고 있습니다. 지금 당장 모든 것이 완벽하지 않더라도, 당신만의 페이스로 꾸준히 나아가다 보면 자연스럽게 긍정적인 결과를 성취하게 될 것입니다. 자신의 타고난 재능과 내면의 소리를 믿고 한 걸음씩 나아가 보세요. 앞으로 더 찬란하고 빛나는 미래가 당신을 기다리고 있습니다!`;
}

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
      // 휴대폰 앱(로컬 웹뷰)에서 실행 중일 때는 원격 백엔드를 가리키도록 설정합니다.
      const isMobileApp = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.protocol === 'file:';
      const apiUrl = isMobileApp 
        ? 'https://ais-pre-55kycslwbfp6ks7eo3ktlf-681460553821.asia-east1.run.app/api/mbti-reading'
        : '/api/mbti-reading';
        
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ mbti: mbtiString, targetCards })
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
      console.warn("API 분석에 실패하여 로컬 분석 결과를 제공합니다:", err);
      // 모바일 앱 환경 등 네트워크 제한 시 기본 로컬 분석 로직을 대신 보여줍니다.
      setError(null);
      setReading(generateFallbackReading(mbtiString, result));
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
            
            <div className="flex flex-col gap-3 mt-6">
              <button
                onClick={() => {
                  setReading(null);
                  setMbtiVals(['', '', '', '']);
                }}
                className="w-full py-4 rounded-full border border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-800 hover:text-white transition-all relative z-10"
              >
                다시 분석하기
              </button>
              <button
                onClick={() => window.print()}
                className="w-full py-4 rounded-full border border-slate-700 bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white transition-all relative z-10 flex items-center justify-center gap-2"
              >
                <Printer className="w-5 h-5" />
                결과 프린트하기
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
