const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let arr = readnum(input);

  arr.sort((a, b) => a - b);
  let mid = arr[Math.floor(arr.length / 2)];

  return arr.reduce((acc, cur) => acc + Math.abs(cur - mid), 0);
}

console.log(solve(input));