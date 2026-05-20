const https = require('https');

https.get('https://jotarot.com/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const scripts = data.match(/<script.*?src=["'](.*?)["'].*?>/g) || [];
    console.log(scripts);
    scripts.forEach(scriptTag => {
      const src = scriptTag.match(/src=["'](.*?)["']/)[1];
      const url = src.startsWith('http') ? src : `https://jotarot.com${src.startsWith('/') ? '' : '/'}${src}`;
      https.get(url, (sRes) => {
        let sData = '';
        sRes.on('data', chunk => sData += chunk);
        sRes.on('end', () => {
          if (sData.includes('calc') || sData.includes('tarot')) {
            console.log('--- ' + url + ' ---');
            console.log(sData.substring(0, 1000));
            // try to find calculation logic
            const calc = sData.match(/function.*?\{[\s\S]*?\}/g);
            if (calc) {
              calc.forEach(f => {
                if (f.includes('%') || f.includes('22') || f.includes('21')) {
                  console.log(f);
                }
              });
            }
          }
        });
      });
    });
  });
});
