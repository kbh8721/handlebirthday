const lunar = require('lunar-javascript');
const s = lunar.Solar.fromYmd(2013, 6, 24);
const l = s.getLunar();
console.log("2013-06-24 Solar -> Lunar:", l.getYear(), l.getMonth(), l.getDay());

const cases = [
  { S: 6, L: 3, y1: 1981, m1: 4, d1: 1, y2: 1981, m2: 2, d2: 27, M1: 10, M2: 15 },
  { S: 7, L: 3, y1: 1983, m1: 3, d1: 10, y2: 1983, m2: 1, d2: 26, M1: 11, M2: 15 },
  { S: 9, L: 9, y1: 2013, m1: 6, d1: 24, y2: 2013, m2: 5, d2: 17, M1: 17, M2: 13 }
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

const attrs = ['S', 'L', 'y1', 'm1', 'd1', 'y2', 'm2', 'd2'];
const funcs = [];
for(let a of attrs) {
  for(let b of attrs) {
    if(a===b)continue;
    funcs.push({ f: c => reduce22(c[a] + c[b]), desc: `reduce22(${a} + ${b})` });
    funcs.push({ f: c => Math.abs(c[a] - c[b]), desc: `|${a} - ${b}|`});
    for(let d of attrs) {
      if(d===a || d===b) continue;
      funcs.push({ f: c => reduce22(c[a] + c[b] + c[d]), desc: `reduce22(${a} + ${b} + ${d})`});
      funcs.push({ f: c => reduce22(Math.abs(c[a] + c[b] - c[d])), desc: `reduce22(|${a} + ${b} - ${d}|)`});
      funcs.push({ f: c => reduce22(Math.abs(c[a] - c[b] - c[d])), desc: `reduce22(|${a} - ${b} - ${d}|)`});

      for(let e of attrs) {
         if([a,b,d].includes(e)) continue;
         funcs.push({ f: c => reduce22(c[a] + c[b] + c[d] + c[e]), desc: `reduce22(${a} + ${b} + ${d} + ${e})`});
      }
    }
  }
}

// Add operations with M1 (where we assume M1 for case 3 is 17? user says "음력카드 밑에 중간수는 17번, 양력 카드 밑에 중간수는 13번")
// So M1 = 17, M2 = 13.
funcs.push({f: c=> reduce22(c.S + c.y1), desc: 'S + y1'});

let m1Found = [];
let m2Found = [];

funcs.forEach((obj) => {
  try {
    let ok1 = true;
    for(let c of cases) {
      if (obj.f(c) !== c.M1) ok1 = false;
    }
    if (ok1) m1Found.push(obj.desc);
    
    let ok2 = true;
    for(let c of cases) {
      if (obj.f(c) !== c.M2) ok2 = false;
    }
    if (ok2) m2Found.push(obj.desc);
  } catch(e) {}
});

console.log("M1 candidates:", Array.from(new Set(m1Found)));
console.log("M2 candidates:", Array.from(new Set(m2Found)));
