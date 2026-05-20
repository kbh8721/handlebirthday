import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { TAROT_DECK } from '../tarotData';

export function CardListView({ onBack, key }: { key?: string; onBack: () => void }) {
  const cards = Object.values(TAROT_DECK).sort((a, b) => a.id - b.id);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-6xl mx-auto py-10 px-4"
    >
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-400 hover:text-gold transition-colors mb-8"
      >
        <ArrowLeft className="w-5 h-5" /> 메인으로 돌아가기
      </button>

      <h2 className="font-serif text-3xl font-bold text-gold mb-4">메이저 아르카나 도감</h2>
      <p className="text-slate-400 mb-12">22장의 메이저 아르카나가 품고 있는 신비로운 의미들을 확인해보세요.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cards.map(card => (
          <div key={card.id} className="bg-midnight-light border border-slate-700/50 rounded-2xl p-6 hover:border-gold/50 transition-colors group">
            <div className="flex items-end justify-between mb-4 border-b border-slate-700 pb-3">
              <span className="font-serif text-2xl text-gold group-hover:scale-110 transition-transform origin-bottom-left">
                {card.id}
              </span>
              <div className="text-right">
                <h3 className="font-serif text-lg text-white">{card.name}</h3>
                <span className="text-[10px] text-slate-400 tracking-widest uppercase">{card.nameEn}</span>
              </div>
            </div>
            
            <p className="text-cosmic-light text-sm mb-3">"{card.keyword}"</p>
            <p className="text-slate-300 text-sm font-light leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
