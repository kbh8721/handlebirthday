const cases = [
  { y: 1981, m: 4, d: 1, Ly: 1981, Lm: 2, Ld: 27, S: 6, L: 3, M1: 11, M2: 16 },
  { y: 1983, m: 3, d: 10, Ly: 1983, Lm: 1, Ld: 26, S: 7, L: 3, M1: 11, M2: 15 },
  { y: 2013, m: 6, d: 24, Ly: 2013, Lm: 5, Ld: 17, S: 9, L: 9, M1: 17, M2: 13 }, // Force L=9 as per jotarot output
  { y: 1990, m: 1, d: 15, Ly: 1989, Lm: 12, Ld: 19, S: 8, L: 4, M1: 12, M2: 14 },
  { y: 1995, m: 12, d: 31, Ly: 1995, Lm: 11, Ld: 10, S: 13, L: 9, M1: 17, M2: 9 }, // wait, M2=9?
  { y: 2000, m: 5, d: 5, Ly: 2000, Lm: 4, Ld: 2, S: 3, L: 8, M1: 16, M2: 19 },
  { y: 2024, m: 2, d: 29, Ly: 2024, Lm: 1, Ld: 20, S: 12, L: 11, M1: 19, M2: 10 }
];

function sumDigits(n) { return n.toString().split('').reduce((a, b) => a + Number(b), 0); }

function getNumerologySum(y, m, d) {
  const sum = y + m + d;
  return sum.toString().split('').reduce((a, b) => a + Number(b), 0);
}

function reduce22(n) {
  let r = n;
  if(r === 22) return 0;
  while(r > 21) {
     r = sumDigits(r);
  }
  return r;
}

const fs = [];

// Method 2 (Tarot Personality/Soul cards) is:
// Personality = sumDigits(y+m+d)
// Soul = sumDigits(Personality)
fs.push({ f: c => reduce22(sumDigits(c.y+c.m+c.d)), desc: 'reduce22(sumDigits(y+m+d))' });

// What if it's sum of digits of Year, plus month, plus day?
for (let key in cases[0]) {
  for (let key2 in cases[0]) {
      fs.push({ f: c => reduce22(c[key] + c[key2]), desc: `reduce22(${key} + ${key2})` });
  }
}

// Check what relates to S (Solar card)? M2!
for (let c of cases) {
   let T = getNumerologySum(c.y, c.m, c.d); // This is the first sum!
   
   console.log(`Solar: Y=${c.y} M=${c.m} D=${c.d} T=${T} S=${c.S} M2=${c.M2}`);
   let TL = getNumerologySum(c.Ly, c.Lm, c.Ld); 
   console.log(`Lunar: Y=${c.Ly} M=${c.Lm} D=${c.Ld} TL=${TL} L=${c.L} M1=${c.M1}`);
}
