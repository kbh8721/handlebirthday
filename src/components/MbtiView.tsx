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

const BLOOD_TYPES = [
  [['A', 'A형'], ['B', 'B형']],
  [['O', 'O형'], ['AB', 'AB형']]
];

function generateFallbackReading(mbti: string, bloodType: string, result: TarotDrawResult): string {
  const isE = mbti.includes('E');
  const isS = mbti.includes('S');
  const isT = mbti.includes('T');
  const isJ = mbti.includes('J');

  const solarCard = TAROT_DECK[result.solarCard];
  const lunarCard = TAROT_DECK[result.lunarCard];
  const middleCard1 = TAROT_DECK[result.middleCard1];
  const middleCard2 = TAROT_DECK[result.middleCard2];

  const bloodTexts: Record<string, string> = {
    'A': '세심하고 책임감이 강하며 완벽을 추구하는',
    'B': '자유롭고 호기심이 많으며 독창적인 에너지를 뿜어내는',
    'O': '열정적이고 사교적이며 행동력이 뛰어난',
    'AB': '이성적이고 합리적이며 세련된 균형감각을 갖춘'
  };
  const bText = bloodTexts[bloodType] || '독특한';

  const eiText = isE ? '외부의 활발한 교류를 통해 에너지를 얻고 확산하는' : '내면의 깊은 탐구를 통해 단단한 에너지를 응축하는';
  const snText = isS ? '현실적인 감각이 뛰어나며 현재를 바탕으로 견고함을 쌓아가는' : '직관력이 뛰어나고 미래지향적인 비전으로 넓은 통찰력을 제시하는';
  const tfText = isT ? '상황을 객관적으로 분석하여 합리적이고 논리적인 해결책을 찾는' : '타인의 감정에 깊이 공감하고 따뜻한 유대감과 조화를 중시하는';
  const jpText = isJ ? '체계적인 계획을 세우고 목표를 향해 흔들림 없이 추진하는' : '변화하는 상황에 유연하게 대처하며 자유로운 흐름 속에서 기회를 잡는';

  return `### ✨ 타고난 본성과 숨겨진 강점
당신은 **${bText}** 혈액형(${bloodType}형) 기질을 바탕으로, **${eiText}** 성향(${isE ? 'E' : 'I'})과 **${snText}** 성향(${isS ? 'S' : 'N'})을 지녔습니다. 
당신의 타고난 에너지를 이끌어주는 양력 카드 **[${solarCard.name}]**(${solarCard.keyword})는 이러한 당신의 본질에 더 큰 빛을 비추고 있습니다. 
> *"${solarCard.description}"*

이 강렬한 빛은 당신의 타고난 혈액형과 특유의 MBTI 기질과 완벽하게 결합되어, 다른 사람들이 미처 보지 못하는 당신만의 독특한 매력과 잠재력으로 발현됩니다. 스스로의 강점을 깊이 믿고 나아가도 좋습니다.

### 🤝 관계와 소통의 지혜
사람들과 교류할 때 당신은 주로 **${tfText}** 특성(${isT ? 'T' : 'F'})을 발휘합니다. 
여기에 내면의 감정과 무의식을 상징하는 음력 카드 **[${lunarCard.name}]**(${lunarCard.keyword})의 기운이 어우러져, 관계를 맺는 당신의 모습에 깊이를 더해줍니다. 
> *"${lunarCard.description}"*

특히 갈등이나 선택의 기로에 섰을 때, 당신의 첫 번째 중간수 **[${middleCard1.name}]**가 주는 메시지를 떠올려 보세요. **"${middleCard1.advice}"** 당신만의 방식에 타로의 혜안이 더해지면, 주변 사람들과 더 깊고 단단한 인연의 시너지를 낼 수 있을 것입니다.

### 🌟 잠재력 만개를 위한 특별한 메시지
미래를 향해 걸어가는 당신의 발걸음은 **${jpText}** 에너지(${isJ ? 'J' : 'P'})로 채워져 있습니다. 
당신이 가진 잠재력을 최고로 끌어올릴 수 있는 핵심 열쇠는 두 번째 중간수 **[${middleCard2.name}]**(${middleCard2.keyword})에 있습니다. 
> *"${middleCard2.description}"*

마침내 당신이 원하는 목표에 닿기 위해, 이 카드의 조언을 꼭 기억하세요. **"${middleCard2.advice}"**
당신이 지닌 고유한 [**${mbti}**]와 [**${bloodType}형**]의 능력, 그리고 네 장의 타로 카드가 전하는 지혜를 나침반 삼아 흔들림 없이 전진한다면, 머지않아 당신만의 눈부신 성취를 거머쥐게 될 것입니다. 당신의 눈부신 여정을 진심으로 응원합니다!`;
}

export function MbtiView({ result, onBack }: MbtiViewProps) {
  const [mbtiVals, setMbtiVals] = useState<string[]>(['', '', '', '']);
  const [bloodType, setBloodType] = useState<string>('');
  const [reading, setReading] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isComplete = mbtiVals.every(v => v !== '') && bloodType !== '';
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
        body: JSON.stringify({ mbti: mbtiString, bloodType, targetCards })
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
      setReading(generateFallbackReading(mbtiString, bloodType, result));
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
          className="p-2 mr-4 bg-white/50 hover:bg-amber-200/50 rounded-full transition-colors text-stone-600"
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
            className="flex flex-col gap-8 bg-amber-100 p-6 md:p-8 rounded-3xl border border-amber-300/50 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 blur-[120px] pointer-events-none" />
            <h3 className="text-xl font-medium text-center text-stone-700">당신의 MBTI와 혈액형을 선택해주세요</h3>
            
            <div className="flex flex-col gap-4 relative z-10">
              <div className="text-sm font-medium text-gold mb-[-8px]">MBTI</div>
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
                            ? "bg-white border-gold shadow-[0_0_15px_rgba(217, 119, 6,0.2)] text-gold" 
                            : "bg-amber-50 border-amber-300 text-stone-500 hover:border-amber-400 hover:text-stone-700"
                        }`}
                      >
                        <span className="text-2xl font-bold font-serif mb-1">{val}</span>
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
                            ? "bg-white border-gold shadow-[0_0_15px_rgba(217, 119, 6,0.2)] text-gold" 
                            : "bg-amber-50 border-amber-300 text-stone-500 hover:border-amber-400 hover:text-stone-700"
                        }`}
                      >
                        <span className="text-lg font-bold font-serif">{label}</span>
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
                  ? "bg-gold text-midnight hover:bg-yellow-500 hover:shadow-[0_0_30px_rgba(217, 119, 6,0.4)]" 
                  : "bg-white text-stone-500 cursor-not-allowed"
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
            className="flex flex-col gap-6 bg-amber-100 p-6 md:p-8 rounded-3xl border border-gold/30 shadow-[0_0_40px_rgba(217, 119, 6,0.15)] relative overflow-hidden"
          >
            <div className="flex items-center justify-center mb-2 gap-3 relative z-10">
              <div className="px-4 py-1.5 rounded-full bg-amber-200/80 border border-amber-300 font-serif text-lg text-gold font-bold">
                {mbtiString} {bloodType}형
              </div>
              <span className="text-stone-500">×</span>
              <div className="px-4 py-1.5 rounded-full bg-amber-200/80 border border-amber-300 font-serif text-lg text-gold font-bold">
                Tarot
              </div>
            </div>

            <div className="markdown-body prose prose-stone prose-headings:font-serif prose-headings:text-amber-700 prose-a:text-amber-600 hover:prose-a:text-amber-500 max-w-none relative z-10 leading-relaxed text-stone-700">
              <Markdown>{reading}</Markdown>
            </div>
            
            <div className="flex flex-col gap-3 mt-6">
              <button
                onClick={() => {
                  setReading(null);
                  setMbtiVals(['', '', '', '']);
                  setBloodType('');
                }}
                className="w-full py-4 rounded-full border border-amber-300 bg-white/50 text-stone-600 hover:bg-amber-200 hover:text-stone-800 transition-all relative z-10"
              >
                다시 분석하기
              </button>
              <button
                onClick={() => window.print()}
                className="w-full py-4 rounded-full border border-amber-300 bg-amber-50 text-stone-600 hover:bg-amber-200 hover:text-stone-800 transition-all relative z-10 flex items-center justify-center gap-2"
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
