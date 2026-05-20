const https = require('https');

https.get('https://jotarot.com/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // See if there's a form
    const forms = data.match(/<form.*?<\/form>/gs) || [];
    console.log(forms);
  });
});
