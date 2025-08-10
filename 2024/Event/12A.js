const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0;
  let arr = readword(input), R = arr.length, C = arr[0].length;

  let APos = [], BPos = [], CPos = [], TPos = [];

  for (let c = 0; c < C; c++)
    for (let r = 0; r < R; r++) {
      if (arr[r][c] == 'A') APos = [r, c];
      if (arr[r][c] == 'B') BPos = [r, c];
      if (arr[r][c] == 'C') CPos = [r, c];
      if (arr[r][c] == 'T') TPos.push([r, c]);
    }

  for (let [yt, xt] of TPos) {
    let p = 1, hit = false;
    let cand = [APos, BPos, CPos];

    while (!hit) {
      for (let i = 0; i < 3; i++) {
        let [y, x] = cand[i];

        let timex = xt - x - 2 * p;
        let timey = yt - y + p;

        if (timex == timey) {
          hit = true;
          res += p * (i + 1);
          break;
        }
      }

      p++;
    }
  }

  return res;
}

console.log(solve(input));