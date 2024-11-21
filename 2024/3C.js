const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const ddarr = [[0, 1], [0, -1], [1, 0], [-1, 0], [-1, -1], [-1, 1], [1, -1], [1, 1]];
const isIn = (r, c, R, C) => 0 <= r && r < R && 0 <= c && c < C;
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0;
  let arr = readword(input), R = arr.length, C = arr[0].length;

  let narr = [...Array(R + 2)].map(() => Array(C + 2).fill('.'));

  for (let r = 0; r < R; r++)
    for (let c = 0; c < C; c++)
      narr[r + 1][c + 1] = arr[r][c];

  arr = narr;

  R += 2, C += 2;
  let d = [...Array(R)].map(() => Array(C).fill(0));

  let q = [];

  for (let r = 0; r < R; r++)
    for (let c = 0; c < C; c++) {
      if (arr[r][c] === '#')
        d[r][c] = Infinity;

      if (arr[r][c] === '.')
        for (let [dr, dc] of ddarr) {
          let nr = r + dr, nc = c + dc;
          if (isIn(nr, nc, R, C) && arr[nr][nc] === '#')
            q.push([r, c, 0]);
        }
    }

  while (q.length) {
    let nq = [];

    for (let [r, c, dcur] of q) {
      for (let [dr, dc] of ddarr) {
        let nr = r + dr, nc = c + dc;
        if (!isIn(nr, nc, R, C) || d[nr][nc] != Infinity) continue;

        d[nr][nc] = dcur + 1;
        res += dcur + 1;
        nq.push([nr, nc, dcur + 1]);
      }
    }

    q = nq;
  }

  return res;
}

console.log(solve(input));