const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let mul = +input, mod = 10, total = 202400000;

  let thickness = 1, layer = -1;
  let arr = [];

  while (total >= 0) {
    layer += 2;
    arr.push(thickness);
    total -= thickness * layer;
    thickness = (thickness * mul) % mod + mod;
  }

  total = -total;

  let sum = arr.at(-1);
  mul %= mod;
  layer %= mod;

  for (let i = arr.length - 2; i >= 0; i--) {
    sum = (sum + arr[i]) % mod;

    let cnt = mul * layer * sum % mod;
    total -= cnt;
    if (i > 0)
      total -= cnt;
  }

  return total;
}

console.log(solve(input));