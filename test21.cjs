const https = require('https');
const querystring = require('querystring');
const lunar = require('lunar-javascript');

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
   const lDate = lunar.Lunar.fromYmd(2009, 12, 28);
   const sDate = lDate.getSolar();
   console.log("Solar:", sDate.getYear(), sDate.getMonth(), sDate.getDay());
   
   const html = await getHTML(sDate.getYear(), sDate.getMonth(), sDate.getDay(), '양력');
   const cards = html.match(/[0-9]+\.jpg/g);
   console.log("Cards:", cards);
})();
