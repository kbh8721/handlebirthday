import https from 'https';

const data = JSON.stringify({ mbti: "ESTJ", targetCards: ["The Fool"] });
const urlStr = 'https://ais-pre-55kycslwbfp6ks7eo3ktlf-681460553821.asia-east1.run.app/api/mbti-reading';
const url = new URL(urlStr);

const req2 = https.request({
  hostname: url.hostname,
  port: 443,
  path: url.pathname,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data),
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json',
    'User-Agent': 'Mozilla/5.0'
  }
}, (res) => {
  console.log(`STATUS:`, res.statusCode);
  let body = '';
  res.on('data', d => body += d);
  res.on('end', () => console.log(`BODY:`, body.slice(0, 200)));
});
req2.on('error', console.error);
req2.write(data);
req2.end();
