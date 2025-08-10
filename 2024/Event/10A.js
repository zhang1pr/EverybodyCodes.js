const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = '';
  let arr = readword(input), R = arr.length, C = arr[0].length;

  for (let r = 2; r < R - 2; r++) {
    for (let c = 2; c < C - 2; c++) {
      let set = new Set();
      let cand = [];

      for (let i of [0, 1]) {
        cand.push(arr[i][c]);
        cand.push(arr[R - i - 1][c]);
        cand.push(arr[r][i]);
        cand.push(arr[r][C - i - 1]);
      }

      for (let x of cand) {
        if (set.has(x)) {
          res += x;
          break;
        }
        set.add(x);
      }
    }
  }

  return res;
}

console.log(solve(input));