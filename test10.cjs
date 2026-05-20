const cases = [
  {y: 1981, m: 4, d: 1, M2: 15, S: 6, Ly: 1981, Lm: 2, Ld: 27, LL: 3, M1: 10 },
  {y: 1983, m: 3, d: 10, M2: 15, S: 7, Ly: 1983, Lm: 1, Ld: 26, LL: 3, M1: 11 },
  {y: 2013, m: 6, d: 24, M2: 13, S: 9, Ly: 2013, Lm: 5, Ld: 16, LL: 9, M1: 17 } // Assumed lunar date
];

function sumDigits(n) { return n.toString().split('').reduce((a, b) => a + Number(b), 0); }

const attrs = ['y', 'm', 'd', 'S', 'Ly', 'Lm', 'Ld', 'LL'];
const fs = [];

// Create simple expressions
for (let i = 1; i <= 31; i++) {
  fs.push({ f: c => Math.abs(sumDigits(c.y) + c.m + c.d - i), desc: `sum(y)+m+d - ${i}` });
  fs.push({ f: c => Math.abs(sumDigits(c.Ly) + c.Lm + c.Ld - i), desc: `sum(Ly)+Lm+Ld - ${i}` });
}

const combinations = [];
for (let a of attrs) {
  for (let b of attrs) {
    if (a===b) continue;
    fs.push({ f: c => c[a] + c[b], desc: `${a} + ${b}` });
    fs.push({ f: c => Math.abs(c[a] - c[b]), desc: `|${a} - ${b}|` });
    fs.push({ f: c => sumDigits(c[a] + c[b]), desc: `sum(${a}+${b})` });
    
    for (let d of attrs) {
      if (d===a || d===b) continue;
      fs.push({ f: c => c[a] + c[b] + c[d], desc: `${a} + ${b} + ${d}` });
      fs.push({ f: c => sumDigits(c[a] + c[b] + c[d]), desc: `sum(${a}+${b}+${d})` });
      
      for (let e of attrs) {
         if (e===a || e===b || e===d) continue;
         fs.push({ f: c => c[a] + c[b] + c[d] + c[e], desc: `${a}+${b}+${d}+${e}` });
         fs.push({ f: c => sumDigits(c[a] + c[b] + c[d] + c[e]), desc: `sum(${a}+${b}+${d}+${e})` });
      }
    }
  }
}

// Add operations with the "other" card (since M1 is under lunar, M2 is under solar)
// What if M2 = sumDigits(y+m+d) ?
fs.push({ f: c => sumDigits(c.y + c.m + c.d), desc: 'sum(y+m+d)' });
fs.push({ f: c => sumDigits(c.Ly + c.Lm + c.Ld), desc: 'sum(Ly+Lm+Ld)' });

fs.push({ f: c => {
   const sum = c.y + c.m + c.d;
   return Math.floor(sum / 10) % 10 + sum % 10;
}, desc: 'custom' });


// evaluate
const m1Cands = [];
const m2Cands = [];

fs.forEach(obj => {
  try {
     let ok1 = true;
     for (let c of cases) { if (obj.f(c) !== c.M1) ok1 = false; }
     if (ok1) m1Cands.push(obj.desc);
     
     let ok2 = true;
     for (let c of cases) { if (obj.f(c) !== c.M2) ok2 = false; }
     if (ok2) m2Cands.push(obj.desc);
  } catch (e) {}
});

console.log("M1:", [...new Set(m1Cands)]);
console.log("M2:", [...new Set(m2Cands)]);
