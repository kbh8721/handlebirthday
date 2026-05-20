const cases = [
  { S: 6, L: 3, y1: 1981, m1: 4, d1: 1, y2: 1981, m2: 2, d2: 27, M1: 10, M2: 15 },
  { S: 7, L: 3, y1: 1983, m1: 3, d1: 10, y2: 1983, m2: 1, d2: 26, M1: 11, M2: 15 }
];

function sumDigits(n) { return n.toString().split('').reduce((a, b) => a + Number(b), 0); }

const funcs = [];
const attrs = ['S', 'L', 'y1', 'm1', 'd1', 'y2', 'm2', 'd2'];
for(let a of attrs) {
  for(let b of attrs) {
    if(a===b)continue;
    funcs.push({ f: c => c[a] + c[b], desc: `${a} + ${b}` });
    funcs.push({ f: c => Math.abs(c[a] - c[b]), desc: `|${a} - ${b}|` });
    funcs.push({ f: c => sumDigits(c[a]) + sumDigits(c[b]), desc: `sum(${a}) + sum(${b})` });
    funcs.push({ f: c => c[a] * c[b], desc: `${a} * ${b}` });
    for(let i=1; i<=31; i++) {
        funcs.push({ f: c => c[a] + c[b] + i, desc: `${a} + ${b} + ${i}` });
        funcs.push({ f: c => c[a] + c[b] - i, desc: `${a} + ${b} - ${i}` });
    }
  }
}

// Add formulas with M1 
for(let a of attrs) {
    funcs.push({ f: c => c.M1 + c[a], desc: `M1 + ${a}`});
    funcs.push({ f: c => Math.abs(c.M1 - c[a]), desc: `|M1 - ${a}|`});
    funcs.push({ f: c => sumDigits(c.M1) + sumDigits(c[a]), desc: `sum(M1) + sum(${a})`});
    funcs.push({ f: c => Math.abs(c.M1 + c[a] - 22), desc: `|M1 + ${a} - 22|`});
    funcs.push({ f: c => (c.M1 + c[a]) % 22, desc: `(M1 + ${a}) % 22`});
    
    for(let b of attrs) {
       funcs.push({ f: c => c.M1 + c[a] + c[b], desc: `M1 + ${a} + ${b}`});
       funcs.push({ f: c => Math.abs(c.M1 - c[a] - c[b]), desc: `|M1 - ${a} - ${b}|`});
    }
}

// Fixed 15 check
funcs.push({ f: c => 15, desc: `15`});

let m1Found = [];
let m2Found = [];

funcs.forEach((obj) => {
  try {
    let ok1 = true, ok2 = true;
    for(let c of cases) {
      if (obj.f(c) !== c.M1) ok1 = false;
      if (obj.f(c) !== c.M2) ok2 = false;
    }
    if (ok1) m1Found.push(obj.desc);
    if (ok2) m2Found.push(obj.desc);
  } catch(e) {}
});

console.log("M1 candidates:", m1Found);
console.log("M2 candidates:", m2Found);
