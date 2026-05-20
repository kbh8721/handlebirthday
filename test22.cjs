const https = require('https');
const querystring = require('querystring');

function getHTML(year, mon, day, luner) {
  return new Promise((resolve, reject) => {
    const query = querystring.stringify({ year, mon, day, luner });
    https.get('https://jotarot.com/sub1.php?' + query, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
         resolve(data);
      });
    });
  });
}

(async () => {
   // Solar 1990-01-02 -> sum: 1990+1+2 = 1993 -> 1+9+9+3 = 22 -> 0.
   const html = await getHTML(1990, 1, 2, '양력');
   const cards = html.match(/[0-9]+\.jpg/g);
   console.log("Cards:", cards);
})();
