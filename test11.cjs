const https = require('https');
const querystring = require('querystring');
const lunar = require('lunar-javascript');

function getCards(year, mon, day, luner) {
  return new Promise((resolve, reject) => {
    const query = querystring.stringify({ year, mon, day, luner });
    https.get('https://jotarot.com/sub1.php?' + query, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
         const cards = data.match(/0[1-9]\.jpg|[1-9][0-9]*\.jpg/g) || [];
         resolve(cards.map(c => parseInt(c.replace('.jpg',''), 10)));
      });
    });
  });
}

function getNumerologySum(y, m, d) {
  const sum = y + m + d;
  return sum.toString().split('').reduce((a, b) => a + Number(b), 0);
}

function calculateTarotNumber(y, m, d) {
  let result = getNumerologySum(y, m, d);
  if (result === 22) return 0;
  while (result > 21) {
    result = result.toString().split('').reduce((a, b) => a + Number(b), 0);
  }
  return result;
}

(async () => {
   const dates = [
     [1981, 4, 1],
     [1983, 3, 10],
     [2013, 6, 24],
     [1990, 1, 15],
     [1995, 12, 31],
     [2000, 5, 5],
     [2024, 2, 29]
   ];
   
   for(let [y, m, d] of dates) {
       const cards = await getCards(y, m, d, '양력');
       const s = lunar.Solar.fromYmd(y, m, d);
       const l = s.getLunar();
       let Ly = l.getYear();
       let Lm = l.getMonth();
       let Ld = l.getDay();
       
       let S = calculateTarotNumber(y, m, d);
       let L = calculateTarotNumber(Ly, Lm, Ld);
       
       console.log(`JSON.stringify({ y: ${y}, m: ${m}, d: ${d}, Ly: ${Ly}, Lm: ${Lm}, Ld: ${Ld}, S: ${S}, L: ${L}, M1: ${cards[2]}, M2: ${cards[3]} }),`);
   }
})();
