const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let arr = [['A', 0], ['B', 1], ['C', 3], ['D', 5], ['x', 0]];
  let map = new Map(arr);
  let res = 0;

  for (let i = 0; i < input.length; i += 2) {
    res += map.get(input[i]) + map.get(input[i + 1]);

    if (input[i] != 'x' && input[i + 1] != 'x')
      res += 2;
  }

  return res;
}

console.log(solve(input));