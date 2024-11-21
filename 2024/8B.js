const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let mul = +input, mod = 1111, total = 20240000;

  let thickness = 1, layer = -1;

  while (total >= 0) {
    layer += 2;
    total -= thickness * layer;
    thickness = (thickness * mul) % mod;
  }

  return -total * layer;
}

console.log(solve(input));