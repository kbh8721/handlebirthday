const https = require('https');
const querystring = require('querystring');
const fs = require('fs');

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
   const html = await getHTML(1981, 4, 1, '양력');
   fs.writeFileSync('sub2_out.html', html);
})();
