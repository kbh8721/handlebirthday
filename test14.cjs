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

(async () => {
   const cards = await getCards(1981, 4, 1, '양력'); // Using Solar 1981-04-01
   console.log("Jotarot 1981, 4, 1 (Solar):", cards);
   
   const cards2 = await getCards(1981, 4, 1, '음력'); // What if it was Lunar 1981-04-01?
   console.log("Jotarot 1981, 4, 1 (Lunar input):", cards2);
})();
