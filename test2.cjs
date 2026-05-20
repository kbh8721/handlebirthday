const https = require('https');
https.get('https://jotarot.com/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const scripts = data.match(/<script[\s\S]*?<\/script>/g) || [];
    scripts.forEach(s => {
      if (s.includes('22') || s.includes('21') || s.includes('Math')) {
        console.log(s);
      }
    });
  });
});
