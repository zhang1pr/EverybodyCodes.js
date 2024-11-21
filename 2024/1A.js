const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  return [...input].reduce((acc, cur) => {
    if (cur == 'A') return acc;
    if (cur == 'B') return acc + 1;
    if (cur == 'C') return acc + 3;
  }, 0);
}

console.log(solve(input));