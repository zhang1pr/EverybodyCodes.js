const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const dmap = new Map([['U', [1, 0]], ['D', [-1, 0]], ['L', [0, -1]], ['R', [0, 1]]]);
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0;
  let x = 0, y = 0;

  for (let op of input.split(',')) {
    let dir = op[0], num = +op.slice(1);
    let [dx] = dmap.get(dir) || [0];

    x += dx * num;

    res = Math.max(res, x);
  }

  return res;
}

console.log(solve(input));