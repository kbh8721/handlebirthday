import { Lunar, Solar } from 'lunar-javascript';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// YYYY + MM + DD 합산 방식 (jotarot.com 방식)
function getNumerologySum(y: number, m: number, d: number): number {
  const sum = y + m + d;
  return sum.toString().split('').reduce((a, b) => a + Number(b), 0);
}

export function calculateTarotNumber(year: number, month: number, day: number): number {
  let result = getNumerologySum(year, month, day);
  
  if (result === 22) return 0; // 22 is The Fool (0)
  
  while (result > 21) {
    result = result.toString().split('').reduce((a, b) => a + Number(b), 0);
  }
  
  return result;
}

export function getYearlyCardNumber(targetYear: number, birthMonth: number, birthDay: number): number {
  return calculateTarotNumber(targetYear, birthMonth, birthDay);
}

export interface TarotDrawResult {
  solarCard: number;
  lunarCard: number;
  middleCard1: number;
  middleCard2: number;
  solarDate: { y: number; m: number; d: number };
  lunarDate: { y: number; m: number; d: number };
}

export function drawCards(inputY: number, inputM: number, inputD: number, isLunarInput: boolean): TarotDrawResult {
  let solarDate, lunarDate;
  
  if (isLunarInput) {
    lunarDate = { y: inputY, m: inputM, d: inputD };
    const l = Lunar.fromYmd(inputY, inputM, inputD);
    const s = l.getSolar();
    solarDate = { y: s.getYear(), m: s.getMonth(), d: s.getDay() };
  } else {
    solarDate = { y: inputY, m: inputM, d: inputD };
    const s = Solar.fromYmd(inputY, inputM, inputD);
    const l = s.getLunar();
    lunarDate = { y: l.getYear(), m: l.getMonth(), d: l.getDay() };
  }
  
  const solarCard = calculateTarotNumber(solarDate.y, solarDate.m, solarDate.d);
  const lunarCard = calculateTarotNumber(lunarDate.y, lunarDate.m, lunarDate.d);
  
  // 첫 번째 중간수: 음력카드 + 8 (22 이상일 경우 수비학적 환산)
  let middleCard1 = lunarCard + 8;
  if (middleCard1 === 22) {
    middleCard1 = 0;
  } else {
    while (middleCard1 > 21) {
      middleCard1 = middleCard1.toString().split('').reduce((a, b) => a + Number(b), 0);
    }
  }

  // 두 번째 중간수: 22 - 양력카드 (양력카드가 0(바보)일 경우 22로 취급하여 계산)
  let middleCard2 = 22 - (solarCard === 0 ? 22 : solarCard);
  if (middleCard2 === 22) {
    middleCard2 = 0;
  }
  
  return {
    solarCard,
    lunarCard,
    middleCard1,
    middleCard2,
    solarDate,
    lunarDate
  };
}
