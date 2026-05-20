const cases = [
  { S: 6, L: 3, y1: 1981, m1: 4, d1: 1, y2: 1981, m2: 2, d2: 27, M1: 10, M2: 15 },
  { S: 7, L: 3, y1: 1983, m1: 3, d1: 10, y2: 1983, m2: 1, d2: 26, M1: 11, M2: 15 }
];

function sumDigits(n) { return n.toString().split('').reduce((a, b) => a + Number(b), 0); }

let count = 0;
for (let key = 0; key < 100; key++) {
  // Try combinations of operations
  // We want f(c) = c.M1, g(c) = c.M2
}

console.log("Starting brute force...");

const funcs = [];
// M1
funcs.push(c => c.S + c.m1);
funcs.push(c => c.S + c.m1 + c.d1);
funcs.push(c => (c.S + c.L + 1));
funcs.push(c => Math.abs(c.S - c.L) + c.d1);
funcs.push(c => sumDigits(c.S + c.L + 1));
funcs.push(c => Math.floor((c.m1 + c.d1) / 2) + c.S);


// Let's generate a ton of functions
const attrs = ['S', 'L', 'y1', 'm1', 'd1', 'y2', 'm2', 'd2'];
for(let a of attrs) {
  for(let b of attrs) {
    if(a===b)continue;
    funcs.push(c => c[a] + c[b]);
    funcs.push(c => Math.abs(c[a] - c[b]));
    funcs.push(c => sumDigits(c[a]) + sumDigits(c[b]));
    for(let i=1; i<=31; i++) {
      funcs.push(c => c[a] + c[b] + i);
      funcs.push(c => c[a] + c[b] - i);
      funcs.push(c => sumDigits(c[a] + c[b]) + i);
    }
  }
}

let m1Found = [];
let m2Found = [];

funcs.forEach((f, idx) => {
  try {
    let ok1 = true, ok2 = true;
    for(let c of cases) {
      if (f(c) !== c.M1) ok1 = false;
      if (f(c) !== c.M2) ok2 = false;
    }
    if (ok1) m1Found.push(idx);
    if (ok2) m2Found.push(idx);
  } catch(e) {}
});

console.log("M1 candidates:", m1Found.map(i => funcs[i].toString()));
console.log("M2 candidates:", m2Found.map(i => funcs[i].toString()));

