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
   // Solar 2000-01-05 -> Lunar 1999-11-29 ? Let's check
   const lDate = lunar.Lunar.fromYmd(1999, 11, 29);
   const sDate = lDate.getSolar();
   console.log("Solar date:", sDate.getYear(), sDate.getMonth(), sDate.getDay());
   
   const cards = await getCards(sDate.getYear(), sDate.getMonth(), sDate.getDay(), '양력');
   console.log("Cards:", cards);
})();
