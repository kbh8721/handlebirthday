const https = require('https');

const checkUrl = (url) => new Promise(res => {
  https.get(url, {headers: {'User-Agent': 'Mozilla/5.0'}}, (r) => res(r.statusCode)).on('error', ()=>res(0)).end();
});

(async () => {
    console.log('6(d/db):', await checkUrl('https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_06_Lovers.jpg'));
    console.log('20(d/dd):', await checkUrl('https://upload.wikimedia.org/wikipedia/commons/d/dd/RWS_Tarot_20_Judgement.jpg'));
})();
