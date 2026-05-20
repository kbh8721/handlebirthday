const cases = [
  { y: 1981, m: 4, d: 1, Ly: 1981, Lm: 2, Ld: 27, S: 6, L: 3, M1: 11, M2: 16 },
  { y: 1983, m: 3, d: 10, Ly: 1983, Lm: 1, Ld: 26, S: 7, L: 3, M1: 11, M2: 15 },
  { y: 2013, m: 6, d: 24, Ly: 2013, Lm: 5, Ld: 17, S: 9, L: 9, M1: 17, M2: 13 },
  { y: 1990, m: 1, d: 15, Ly: 1989, Lm: 12, Ld: 19, S: 8, L: 4, M1: 12, M2: 14 },
  { y: 1995, m: 12, d: 31, Ly: 1995, Lm: 11, Ld: 10, S: 13, L: 9, M1: 17, M2: 9 },
  { y: 2000, m: 5, d: 5, Ly: 2000, Lm: 4, Ld: 2, S: 3, L: 8, M1: 16, M2: 19 },
  { y: 2024, m: 2, d: 29, Ly: 2024, Lm: 1, Ld: 20, S: 12, L: 11, M1: 19, M2: 10 }
];

function sumDigits(n) { return n.toString().split('').reduce((a, b) => a + Number(b), 0); }
function reduce22(n) {
  let r = n;
  if(r === 22) return 0;
  while(r > 21) {
     r = sumDigits(r);
  }
  return r;
}

const fs = [];

// Look for M2 pattern
let attrs = ['y', 'm', 'd', 'S'];

// combinations for M2
for (let a of attrs) {
  for (let b of attrs) {
     fs.push({ f: c => reduce22(c[a] + c[b]), desc: `${a} + ${b}` });
     fs.push({ f: c => reduce22(Math.abs(c[a] - c[b])), desc: `|${a} - ${b}|` });
     fs.push({ f: c => sumDigits(c[a] + c[b]), desc: `sum(${a}+${b})` });

     for (let d of attrs) {
        fs.push({ f: c => reduce22(c[a] + c[b] + c[d]), desc: `${a}+${b}+${d}` });
        fs.push({ f: c => sumDigits(c[a] + c[b] + c[d]), desc: `sum(${a}+${b}+${d})` });
        
        fs.push({ f: c => reduce22(c.S + c[a] + sumDigits(c[b])), desc: `S+${a}+sum(${b})` });
        fs.push({ f: c => reduce22(c.S + sumDigits(c[a]) + sumDigits(c[b])), desc: `S+sum(${a})+sum(${b})` });
        fs.push({ f: c => reduce22(c.S + Math.abs(c[a] - c[b])), desc: `S+|${a}-${b}|` });
     }
  }
}

// Generate all small integers to add to S
for(let i=1; i<=31; i++) {
  fs.push({ f: c => reduce22(sumDigits(c.y) + c.m + c.d + i), desc: `sum(y)+m+d + ${i}` });
  fs.push({ f: c => reduce22(sumDigits(c.y + i) + c.m + c.d), desc: `sum(y+${i})+m+d` });
}

// M2 candidates
const m2Cands = [];
fs.forEach(obj => {
  try {
     let ok2 = true;
     for (let c of cases) { if (obj.f(c) !== c.M2) ok2 = false; }
     if (ok2) m2Cands.push(obj.desc);
  } catch(e){}
});

console.log("M2 candidates:", [...new Set(m2Cands)]);
