export interface TarotCard {
  id: number;
  name: string;
  nameEn: string;
  keyword: string;
  description: string;
  advice: string;
  imageUrl: string;
}

export const TAROT_DECK: Record<number, TarotCard> = {
  0: {
    id: 0,
    name: "바보",
    nameEn: "The Fool",
    keyword: "무한한 가능성, 새로운 시작, 자유",
    description: "아무것도 얽매이지 않은 자유로운 영혼입니다. 아직 정해지지 않은 길이기에 당신 앞에는 무한한 가능성이 펼쳐져 있습니다. 두려움을 버리고 첫 걸음을 내딛어 보세요.",
    advice: "너무 많은 계산보다는 직관을 믿고 모험을 시작할 때입니다.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/90/RWS_Tarot_00_Fool.jpg"
  },
  1: {
    id: 1,
    name: "마법사",
    nameEn: "The Magician",
    keyword: "창조력, 자신감, 시작 능력",
    description: "무에서 유를 창조할 수 있는 당신은 이미 모든 도구와 능력을 갖추고 있습니다. 강한 의지와 목적 의식을 가지고 당신의 아이디어를 현실로 만들어낼 수 있습니다.",
    advice: "자신을 믿고 가지고 있는 재능을 마음껏 발휘하세요.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg"
  },
  2: {
    id: 2,
    name: "고위 여사제",
    nameEn: "The High Priestess",
    keyword: "직관, 지혜, 신비로운 내면",
    description: "보이지 않는 진실을 꿰뚫어 보는 지혜로운 눈을 가졌습니다. 외부의 소음보다는 내면의 목소리에 귀를 기울일 때 가장 정확한 답을 얻을 수 있습니다.",
    advice: "때로는 행동하기보다 조용히 관찰하며 직관을 따르는 것이 좋습니다.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/88/RWS_Tarot_02_High_Priestess.jpg"
  },
  3: {
    id: 3,
    name: "여황제",
    nameEn: "The Empress",
    keyword: "풍요, 모성애, 따뜻한 포용",
    description: "풍부한 감수성과 따뜻한 마음으로 주변을 돌봅니다. 물질적, 정신적으로 풍요로운 에너지를 가지고 있으며 아름다움을 즐길 줄 압니다.",
    advice: "자신과 타인에게 사랑을 베풀며 현재의 풍요를 만끽하세요.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d2/RWS_Tarot_03_Empress.jpg"
  },
  4: {
    id: 4,
    name: "황제",
    nameEn: "The Emperor",
    keyword: "권위, 책임감, 안정적인 구조",
    description: "강력한 리더십과 논리적인 사고로 안정적인 기반을 다집니다. 책임을 다하며, 체계적인 방식으로 목표를 성취하는 힘이 있습니다.",
    advice: "감정보다 이성에 바탕을 두고 계획적으로 실행하세요.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c3/RWS_Tarot_04_Emperor.jpg"
  },
  5: {
    id: 5,
    name: "교황",
    nameEn: "The Hierophant",
    keyword: "전통, 믿음, 정신적 지도",
    description: "올바른 길을 안내하는 멘토와 같은 존재입니다. 전통적인 가치와 규칙을 존중하며, 배움과 진리 탐구를 통해 성장합니다.",
    advice: "경험자의 조언을 구하거나 정석대로 묵묵히 나아가는 것이 좋습니다.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8d/RWS_Tarot_05_Hierophant.jpg"
  },
  6: {
    id: 6,
    name: "연인",
    nameEn: "The Lovers",
    keyword: "사랑, 조화, 중요한 선택",
    description: "사람들과의 조화로운 관계를 중시하며 매력이 넘칩니다. 두 가지 가치나 길 사이에서 마음을 따라 중요한 선택을 내려야 할 시기를 의미하기도 합니다.",
    advice: "가장 마음이 이끌리고 진정으로 사랑하는 것을 선택하세요.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3a/RWS_Tarot_06_Lovers.jpg"
  },
  7: {
    id: 7,
    name: "전차",
    nameEn: "The Chariot",
    keyword: "추진력, 승리, 의지력",
    description: "목표를 향해 거침없이 돌진하는 강한 추진력이 있습니다. 상반된 두 가지 에너지를 조화롭게 통제하며 마침내 승리를 쟁취합니다.",
    advice: "방해물을 두려워하지 말고 강한 의지로 앞만 보고 달려가세요.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9b/RWS_Tarot_07_Chariot.jpg"
  },
  8: {
    id: 8,
    name: "힘",
    nameEn: "Strength",
    keyword: "내면의 힘, 인내, 부드러운 카리스마",
    description: "물리적인 힘이 아닌, 부드러움과 인내로 상황을 압도합니다. 포용력과 굳센 마음으로 어떤 두려움이나 어려움도 길들일 수 있습니다.",
    advice: "분노나 조급함을 내려놓고 부드러움으로 상황을 이끄세요.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f5/RWS_Tarot_08_Strength.jpg"
  },
  9: {
    id: 9,
    name: "은둔자",
    nameEn: "The Hermit",
    keyword: "탐구, 성찰, 고독한 지혜",
    description: "진리를 찾기 위해 기꺼이 자신만의 동굴로 들어갑니다. 남들의 시선을 벗어나 깊은 내면의 지혜의 빛을 밝히는 성찰가입니다.",
    advice: "혼자만의 시간을 가지며 내면에서 진정한 해답을 찾아보세요.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4d/RWS_Tarot_09_Hermit.jpg"
  },
  10: {
    id: 10,
    name: "운명의 수레바퀴",
    nameEn: "Wheel of Fortune",
    keyword: "전환점, 운명적 만남, 거스를 수 없는 흐름",
    description: "삶의 자연스러운 순환과 흐름을 받아들입니다. 뜻밖의 행운이나 피할 수 없는 변화가 다가오며, 이는 결국 더 나은 방향을 향해 있습니다.",
    advice: "변화를 두려워하지 말고 운명의 흐름에 몸을 맡겨 보세요.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3c/RWS_Tarot_10_Wheel_of_Fortune.jpg"
  },
  11: {
    id: 11,
    name: "정의",
    nameEn: "Justice",
    keyword: "균형, 공정함, 원인과 결과",
    description: "저울처럼 흔들림 없이 상황을 객관적으로 판단합니다. 뿌린 대로 거둔다는 인과율을 믿으며, 공정하고 이성적인 결정을 내립니다.",
    advice: "감정에 치우치지 말고 양쪽의 균형을 맞춘 합리적 결정을 내리세요.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e0/RWS_Tarot_11_Justice.jpg"
  },
  12: {
    id: 12,
    name: "매달린 사람",
    nameEn: "The Hanged Man",
    keyword: "시각의 전환, 희생, 정체기",
    description: "스스로 거꾸로 매달려 세상을 다르게 보는 인물입니다. 겉모습은 정체되어 보이지만, 깊은 깨달음을 얻기 위해 기꺼이 바치는 시간입니다.",
    advice: "상황을 억지로 바꾸려 하지 말고 관점을 완전히 뒤집어 보세요.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2b/RWS_Tarot_12_Hanged_Man.jpg"
  },
  13: {
    id: 13,
    name: "죽음",
    nameEn: "Death",
    keyword: "종결, 새로운 시작, 급격한 변화",
    description: "과거의 낡은 것들이 확실하게 끝나고, 새로운 삶을 위한 자리가 마련됩니다. 끝은 곧 새로운 시작을 의미하는 거대한 전환점입니다.",
    advice: "과거에 미련을 두지 말고 벗어던질 것은 과감히 끊어내세요.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d7/RWS_Tarot_13_Death.jpg"
  },
  14: {
    id: 14,
    name: "절제",
    nameEn: "Temperance",
    keyword: "조화, 치유, 중용의 미덕",
    description: "서로 다른 요소들을 섞어 완벽한 조화를 만들어냅니다. 극단으로 치우치지 않고 인내심 있게 상황을 치유하며 균형을 잡아나갑니다.",
    advice: "한쪽으로 휩쓸리지 말고 적절한 중도와 타협점을 찾으세요.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f8/RWS_Tarot_14_Temperance.jpg"
  },
  15: {
    id: 15,
    name: "악마",
    nameEn: "The Devil",
    keyword: "유혹, 집착, 물질적 욕망",
    description: "당신을 얽매고 있는 강렬한 욕망이나 벗어나기 힘든 매력을 뜻합니다. 쾌락이나 물질적인 성취에는 항상 대가가 따른다는 것을 경고합니다.",
    advice: "당신을 구속하고 있는 나쁜 습관이나 집착에서 의식적으로 벗어나려 노력하세요.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/55/RWS_Tarot_15_Devil.jpg"
  },
  16: {
    id: 16,
    name: "탑",
    nameEn: "The Tower",
    keyword: "갑작스러운 붕괴, 변화, 잘못된 신념의 파괴",
    description: "잘못 쌓아 올린 과거의 신념이나 기반이 외부의 충격으로 무너집니다. 고통스럽지만, 더 튼튼한 집을 새로 짓기 위해 반드시 필요한 과정입니다.",
    advice: "예상치 못한 변화를 통제하려 하지 말고 겸허히 받아들이며 새 판을 짜세요.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/53/RWS_Tarot_16_Tower.jpg"
  },
  17: {
    id: 17,
    name: "별",
    nameEn: "The Star",
    keyword: "희망, 영감, 치유와 평안",
    description: "어두운 밤을 비추는 길잡이 별처럼, 가장 희망차고 영감이 넘치는 에너지입니다. 당신의 맑고 순수한 영혼이 마침내 빛을 보는 시기입니다.",
    advice: "상처는 아물고 있습니다. 긍정적인 미래를 상상하며 기대를 품어보세요.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_17_Star.jpg"
  },
  18: {
    id: 18,
    name: "달",
    nameEn: "The Moon",
    keyword: "불안, 무의식, 보이지 않는 진실",
    description: "안개 낀 밤길처럼 상황이 모호하고 어지럽습니다. 숨겨진 불안과 의심이 피어오를 수 있지만, 이는 짙은 무의식의 깊이를 보여줍니다.",
    advice: "모든 것이 뚜렷해질 때까지 섣부른 판단을 미루고 조심스럽게 나아가세요.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7f/RWS_Tarot_18_Moon.jpg"
  },
  19: {
    id: 19,
    name: "태양",
    nameEn: "The Sun",
    keyword: "성공, 기쁨, 긍정적인 에너지",
    description: "가장 밝고 명확하며 순수한 행복의 카드입니다. 당신의 노력이 결실을 맺어 모두에게 축복받으며, 어두운 그림자가 전부 사라집니다.",
    advice: "어린아이처럼 순수하게 성취의 기쁨을 즐기세요.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/17/RWS_Tarot_19_Sun.jpg"
  },
  20: {
    id: 20,
    name: "심판",
    nameEn: "Judgement",
    keyword: "부활, 소명, 최종적인 결정",
    description: "잠들어 있던 당신의 진정한 재능이나 잠재력이 깨어납니다. 과거를 돌이켜보고 최종적인 보상이나 한 단계 높은 세상으로의 초대를 의미합니다.",
    advice: "당신을 부르는 새로운 목소리나 피할 수 없는 결정에 당당히 응답하세요.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/dd/RWS_Tarot_20_Judgment.jpg"
  },
  21: {
    id: 21,
    name: "세계",
    nameEn: "The World",
    keyword: "완성, 성취, 새로운 차원",
    description: "하나의 긴 여정이 완벽하게 끝을 맺고 성취를 이룹니다. 당신 주변에 단단한 울타리가 생기며, 이제 더 넓은 새로운 세상으로 나아갈 준비가 되었습니다.",
    advice: "목표의 완성을 자축하며 한 차원 더 높은 목표를 설정할 때입니다.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/ff/RWS_Tarot_21_World.jpg"
  }
};
