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
   const html = await getHTML(2000, 1, 5, '양력');
   const cards = html.match(/[0-9]+\.jpg/g);
   console.log("Cards:", cards);
})();
