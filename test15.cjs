const cases = [
  { S: 6, L: 3, y1: 1981, m1: 4, d1: 1, y2: 1981, m2: 2, d2: 27, M1: 10, M2: 15 },
  { S: 7, L: 3, y1: 1983, m1: 3, d1: 10, y2: 1983, m2: 1, d2: 26, M1: 11, M2: 15 },
  { S: 9, L: 9, y1: 2013, m1: 6, d1: 24, y2: 2013, m2: 5, d2: 16, M1: 17, M2: 13 }
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

const funcs = [];
const attrs = ['S', 'L', 'y1', 'm1', 'd1', 'y2', 'm2', 'd2'];
for(let a of attrs) {
  for(let b of attrs) {
      funcs.push({ f: c => reduce22(c[a] + c[b]), desc: `reduce22(${a} + ${b})` });
      funcs.push({ f: c => Math.abs(c[a] - c[b]), desc: `|${a} - ${b}|` });
      funcs.push({ f: c => reduce22(Math.abs(c[a] - c[b])), desc: `reduce22(|${a} - ${b}|)` });
      funcs.push({ f: c => sumDigits(c[a] + c[b]), desc: `sumDigits(${a} + ${b})` });
      funcs.push({ f: c => reduce22(sumDigits(c[a]) + sumDigits(c[b])), desc: `reduce22(sum(${a}) + sum(${b}))` });
      
      for(let d of attrs) {
         funcs.push({ f: c => reduce22(c[a] + c[b] + c[d]), desc: `reduce22(${a} + ${b} + ${d})` });
         funcs.push({ f: c => reduce22(c[a] + c[b] - c[d]), desc: `reduce22(${a} + ${b} - ${d})` });
      }
      
      for(let i=1; i<=31; i++) {
         funcs.push({ f: c => reduce22(c[a] + c[b] + i), desc: `reduce22(${a} + ${b} + ${i})` });
         funcs.push({ f: c => Math.abs(c[a] - c[b]) + i, desc: `|${a} - ${b}| + ${i}` });
         // Could M1 or M2 be just an absolute value difference plus something?
      }
  }
}

// Add fixed values
funcs.push({ f: c => 15, desc: '15' });
funcs.push({ f: c => reduce22(c.S + c.L + 1), desc: 'S + L + 1' });
funcs.push({ f: c => reduce22(c.S + c.m1 + 5), desc: 'S + m1 + 5' });

// Add custom functions combining S, L, M1, M2
// Evaluate
let m1Cands = [];
let m2Cands = [];

funcs.forEach(obj => {
  try {
     let ok1 = true;
     let ok2 = true;
     for (let c of cases) {
         if (obj.f(c) !== c.M1) ok1 = false;
         if (obj.f(c) !== c.M2) ok2 = false;
     }
     if (ok1) m1Cands.push(obj.desc);
     if (ok2) m2Cands.push(obj.desc);
  } catch(e) {}
});

console.log("M1:", [...new Set(m1Cands)]);
console.log("M2:", [...new Set(m2Cands)]);
