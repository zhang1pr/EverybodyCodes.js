const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0;
  let arr = readnum2d(input);

  let APos = [0, 0], BPos = [0, 1], CPos = [0, 2];

  for (let [xt, yt] of arr) {
    let p = 1;
    let cand = [APos, BPos, CPos];
    let hity = -1, rank = Infinity;

    while (p <= yt) {
      for (let i = 0; i < 3; i++) {
        let [candx, candy] = cand[i];
        let x = candx, y = candy;
        let nx = (xt - x) / 2 + x, ny = (yt - y) / 2 + y;

        if (
          nx - x <= p
          && xt - x == yt - y
          && nx == Math.floor(nx) && ny == Math.floor(ny)
        ) {
          if (ny == hity) rank = Math.min(rank, p * (i + 1));

          if (ny > hity) {
            hity = ny;
            rank = p * (i + 1);
          }
        }

        x = candx + p;
        y = candy + p;
        if (x >= xt || y >= yt) continue;
        [nx, ny] = findIntersection(x, y, 0, xt, yt, 1);

        if (
          nx - x <= p
          && xt - nx >= nx - candx
          && nx > x && nx < xt && ny == y && ny < yt
          && nx == Math.floor(nx) && ny == Math.floor(ny)
        ) {
          if (ny == hity) rank = Math.min(rank, p * (i + 1));

          if (ny > hity) {
            hity = ny;
            rank = p * (i + 1);
          }
        }

        x = candx + 2 * p;
        y = candy + p;
        [nx, ny] = findIntersection(x, y, -1, xt, yt, 1);

        if (
          xt - nx >= nx - candx
          && nx > x && nx < xt && ny < y && ny < yt
          && nx == Math.floor(nx) && ny == Math.floor(ny)
        ) {
          if (ny == hity) rank = Math.min(rank, p * (i + 1));

          if (ny > hity) {
            hity = ny;
            rank = p * (i + 1);
          }
        }
      }

      p++;
    }

    res += rank;
  }

  return res;
}

function findIntersection(x1, y1, m1, x2, y2, m2) {
  const x = (m2 * x2 - m1 * x1 + y1 - y2) / (m2 - m1);
  const y = m1 * (x - x1) + y1;
  return [x, y];
}

console.log(solve(input));