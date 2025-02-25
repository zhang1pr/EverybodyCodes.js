const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let arr = readword(input).map(a => a.split(':'));
  let rank = [];

  for (let [letter, ops] of arr) {
    ops = ops.split(',');

    let cur = 10, sum = 0;
    for (let op of ops) {
      if (op == '+') cur++;
      else if (op == '-') cur--;
      sum += cur;
    }

    rank.push([letter, sum]);
  }

  return rank.sort((a, b) => b[1] - a[1]).map(a => a[0]).join('');
}

console.log(solve(input));