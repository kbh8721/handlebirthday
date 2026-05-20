const https = require('https');

const checkUrl = (url) => new Promise(res => {
  https.request(url, {method: 'HEAD'}, (r) => res(r.statusCode)).on('error', ()=>res(0)).end();
});

(async () => {
    let code = await checkUrl('https://raw.githubusercontent.com/howarder3/tarot-json/master/cards/ar00.jpg');
    console.log(code);
})();
