const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src/components');

function replaceColors(content) {
  return content
    .replace(/bg-midnight-light/g, 'bg-amber-100')
    .replace(/bg-midnight/g, 'bg-amber-50')
    .replace(/bg-slate-900/g, 'bg-amber-50')
    .replace(/bg-slate-800\/80/g, 'bg-amber-200/80')
    .replace(/bg-slate-800/g, 'bg-white')
    .replace(/bg-slate-700/g, 'bg-amber-200')
    .replace(/border-slate-700/g, 'border-amber-300')
    .replace(/border-slate-600/g, 'border-amber-300')
    .replace(/border-slate-500/g, 'border-amber-400')
    .replace(/text-slate-100/g, 'text-stone-800')
    .replace(/text-slate-200/g, 'text-stone-700')
    .replace(/text-slate-300/g, 'text-stone-600')
    .replace(/text-slate-400/g, 'text-stone-500')
    .replace(/text-slate-500/g, 'text-stone-500')
    .replace(/text-slate-600/g, 'text-stone-400')
    .replace(/bg-\[url\('https:\/\/www\.transparenttextures\.com\/patterns\/stardust\.png'\)\]/g, "bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]")
    .replace(/shadow-\[0_0_10px_rgba\(212,175,55,0\.3\)\]/g, "shadow-xl border-amber-300")
    .replace(/rgba\(212,175,55,/g, "rgba(217, 119, 6,"); // gold RGB changed to amber-600 RGB
}

fs.readdirSync(directoryPath).forEach(file => {
  if (file.endsWith('.tsx')) {
    const fullPath = path.join(directoryPath, file);
    let content = fs.readFileSync(fullPath, 'utf8');
    content = replaceColors(content);
    fs.writeFileSync(fullPath, content);
  }
});
console.log('Colors replaced successfully');
