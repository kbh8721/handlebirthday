const lunar = require('lunar-javascript');
for(let y=1980; y<2025; y++) {
  for(let m=1; m<=12; m++) {
    for(let d=1; d<=28; d++) {
       let sum = y + m + d;
       let l = sum.toString().split('').reduce((a, b) => a + Number(b), 0);
       if (l === 22) l = 0;
       while (l > 21) l = l.toString().split('').reduce((a, b) => a + Number(b), 0);
       
       if (l === 15) {
          console.log(`Lunar: ${y}-${m}-${d}`);
          return;
       }
    }
  }
}
