const cases = [
  { S: 6, L: 3, y1: 1981, m1: 4, d1: 1, y2: 1981, m2: 2, d2: 27, M1: 10, M2: 15 },
  { S: 7, L: 3, y1: 1983, m1: 3, d1: 10, y2: 1983, m2: 1, d2: 26, M1: 11, M2: 15 },
  // Let's add hypothetical 
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
// Generate combinations of attributes to add and reduce
const attrs = ['S', 'L', 'y1', 'm1', 'd1', 'y2', 'm2', 'd2', 'M1'];
for(let a of attrs) {
  for(let b of attrs) {
    if(a===b)continue;
    funcs.push({ f: c => reduce22(c[a] + c[b]), desc: `reduce22(${a} + ${b})` });
    funcs.push({ f: c => c[a] + c[b], desc: `${a} + ${b}` });
    for(let d of attrs) {
      if(a===d || b===d) continue;
      funcs.push({ f: c => reduce22(c[a] + c[b] + c[d]), desc: `reduce22(${a} + ${b} + ${d})` });
      funcs.push({ f: c => reduce22(sumDigits(c[a]) + sumDigits(c[b]) + sumDigits(c[d])), desc: `reduce22(sum(${a}) + sum(${b}) + sum(${d}))` });
    }
  }
}

let m2Found = [];

funcs.forEach((obj) => {
  try {
    let ok2 = true;
    for(let c of cases) {
      if (obj.f(c) !== c.M2) ok2 = false;
    }
    if (ok2) m2Found.push(obj.desc);
  } catch(e) {}
});

console.log("M2 candidates:", Array.from(new Set(m2Found)));
