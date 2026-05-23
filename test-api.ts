import http from 'http';

const data = JSON.stringify({
  mbti: "ESTJ",
  targetCards: ["양력 카드: The Fool", "음력 카드: The Magician", "첫번째 중간수: The Lovers", "두번째 중간수: The Star"]
});

const req = http.request({
  hostname: 'localhost',
  port: 3000,
  path: '/api/mbti-reading',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
}, (res) => {
  let body = '';
  res.on('data', d => body += d);
  res.on('end', () => console.log('STATUS:', res.statusCode, 'BODY:', body));
});

req.on('error', console.error);
req.write(data);
req.end();
