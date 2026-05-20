const cases = [
  { y: 1981, m: 4, d: 1, Ly: 1981, Lm: 2, Ld: 27, S: 6, L: 3, M1: 10, M2: 15 },
  { y: 1983, m: 3, d: 10, Ly: 1983, Lm: 1, Ld: 26, S: 7, L: 3, M1: 11, M2: 15 },
  { y: 2013, m: 6, d: 24, Ly: 2013, Lm: 5, Ld: 16, S: 9, L: 9, M1: 17, M2: 13 }
];

function sumDigits(n) { return n.toString().split('').reduce((a, b) => a + Number(b), 0); }
function reduce22(n) {
  let r = n;
  if (r === 22) return 0;
  while (r > 21) r = sumDigits(r);
  return r;
}

const ops = [
  (a, b) => a + b,
  (a, b) => Math.abs(a - b),
];

const variables = ['y', 'm', 'd', 'Ly', 'Lm', 'Ld', 'S', 'L'];
let m1_matches = [];
let m2_matches = [];

for (let v1 of variables) {
  for (let v2 of variables) {
    for (let op1 of ops) {
      let desc1 = `${op1.name}(${v1}, ${v2})`;
      let f1 = c => op1(c[v1], c[v2]);
      
      for (let v3 of variables) {
        for (let op2 of ops) {
          let desc2 = `${op2.name}(${desc1}, ${v3})`;
          let f2 = c => op2(f1(c), c[v3]);

          let ok1 = true, ok2 = true;
          for (let c of cases) {
            if (reduce22(f2(c)) !== c.M1) ok1 = false;
            if (reduce22(f2(c)) !== c.M2) ok2 = false;
          }
          if (ok1) m1_matches.push(desc2);
          if (ok2) m2_matches.push(desc2);
          
          for (let v4 of variables) {
            for (let op3 of ops) {
              let f3 = c => op3(f2(c), c[v4]);
              let ok1_3 = true, ok2_3 = true;
              for (let c of cases) {
                if (reduce22(f3(c)) !== c.M1) ok1_3 = false;
                if (reduce22(f3(c)) !== c.M2) ok2_3 = false;
              }
              if (ok1_3) m1_matches.push(`${op3.name}(${desc2}, ${v4})`);
              if (ok2_3) m2_matches.push(`${op3.name}(${desc2}, ${v4})`);
            }
          }
        }
      }
    }
  }
}

console.log("M1:", [...new Set(m1_matches)].slice(0, 5));
console.log("M2:", [...new Set(m2_matches)].slice(0, 5));
