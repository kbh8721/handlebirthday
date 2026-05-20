const https = require('https');
const querystring = require('querystring');

function getCards(year, mon, day, luner) {
  return new Promise((resolve, reject) => {
    const query = querystring.stringify({ year, mon, day, luner });
    https.get('https://jotarot.com/sub1.php?' + query, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
         // let's grab the card numbers.
         // In jotarot, they might show images or text.
         const cards = data.match(/0[1-9]\.jpg|[1-9][0-9]*\.jpg/g) || [];
         resolve(cards);
      });
    });
  });
}

(async () => {
   const c1 = await getCards(1981, 4, 1, '양력');
   console.log("C1:", c1);
   
   const c2 = await getCards(1983, 3, 10, '양력');
   console.log("C2:", c2);
   
   const c3 = await getCards(2013, 6, 24, '양력');
   console.log("C3:", c3);
})();
