import https from 'https';

const data = JSON.stringify({
  mbti: "ESTJ",
  targetCards: ["The Fool", "The Magician"]
});

function testUrl(urlStr: string) {
  const url = new URL(urlStr);
  const req = https.request({
    hostname: url.hostname,
    port: 443,
    path: url.pathname,
    method: 'OPTIONS', // let's test CORS
    headers: {
      'Origin': 'http://localhost',
      'Access-Control-Request-Method': 'POST',
      'Access-Control-Request-Headers': 'content-type'
    }
  }, (res) => {
    console.log(`[OPTIONS] ${urlStr} - STATUS:`, res.statusCode);
    console.log('[OPTIONS] HEADERS:', res.headers);
  });
  req.on('error', console.error);
  req.end();
  
  const req2 = https.request({
    hostname: url.hostname,
    port: 443,
    path: url.pathname,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(data)
    }
  }, (res) => {
    console.log(`[POST] ${urlStr} - STATUS:`, res.statusCode);
    let body = '';
    res.on('data', d => body += d);
    res.on('end', () => console.log(`[POST] ${urlStr} - BODY:`, body.slice(0, 100)));
  });
  req2.on('error', console.error);
  req2.write(data);
  req2.end();
}

testUrl('https://ais-pre-55kycslwbfp6ks7eo3ktlf-681460553821.asia-east1.run.app/api/mbti-reading');
testUrl('https://ais-dev-55kycslwbfp6ks7eo3ktlf-681460553821.asia-east1.run.app/api/mbti-reading');
