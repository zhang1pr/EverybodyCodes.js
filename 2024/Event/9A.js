const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let arr = readnum(input);
  let max = Math.max(...arr);

  let dp = Array(max + 1).fill(Infinity);
  let beetle = [1, 3, 5, 10];
  for (let x of beetle)
    dp[x] = 1;

  for (let val = 1; val <= max; val++)
    for (let subval of beetle)
      if (val > subval)
        dp[val] = Math.min(dp[val], dp[val - subval] + 1);

  return arr.reduce((acc, cur) => acc + dp[cur], 0);
}

console.log(solve(input));