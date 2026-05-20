const https = require('https');
const querystring = require('querystring');

function getHTML(year, mon, day, luner) {
  return new Promise((resolve, reject) => {
    const query = querystring.stringify({ year, mon, day, luner });
    https.get('https://jotarot.com/sub2.php?' + query, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
         resolve(data);
      });
    });
  });
}

(async () => {
   const html = await getHTML(1990, 1, 2, '양력');
   const snippets = html.match(/.{0,30}[0-9]+\.jpg.{0,30}/g) || [];
   snippets.forEach(s => console.log(s));
})();
