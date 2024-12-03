const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const darr = [[0, 1], [0, -1], [1, 0], [-1, 0]];
const isIn = (r, c, R, C) => 0 <= r && r < R && 0 <= c && c < C;
class Heap { constructor() { this.array = []; } peek() { return 0 === this.array.length ? null : this.array[0]; } poll() { if (0 === this.array.length) return null; if (1 === this.array.length) return this.array.pop(); const r = this.array[0]; return this.array[0] = this.array.pop(), this.heapifyDown(0), r; } add(r) { return this.array.push(r), this.heapifyUp(this.array.length - 1), this; } isEmpty() { return 0 == this.array.length; } heapifyUp(r) { let a = Math.floor((r - 1) / 2); for (; a >= 0 && !this.checkInvariant(this.array[a], this.array[r]);) [this.array[a], this.array[r]] = [this.array[r], this.array[a]], r = a, a = Math.floor((a - 1) / 2); } heapifyDown(r) { let a, t = 2 * r + 1, h = 2 * r + 2; for (; t < this.array.length && (a = h < this.array.length && this.checkInvariant(this.array[h], this.array[t]) ? h : t, !this.checkInvariant(this.array[r], this.array[a]));) [this.array[r], this.array[a]] = [this.array[a], this.array[r]], r = a, t = 2 * a + 1, h = 2 * a + 2; } checkInvariant(r, a) { return r[2] <= a[2]; } }
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let map = new Map();
  let arr = readword(input).map(a => a.split('')), R = arr.length, C = arr[0].length;

  let S = [], E = [];
  for (let r = 0; r < R; r++)
    for (let c = 0; c < C; c++) {
      if (arr[r][c] == 'S') S = [r, c], arr[r][c] = 0;
      if (arr[r][c] == 'E') E = [r, c], arr[r][c] = 0;
      if (arr[r][c] >= '0' && arr[r][c] <= '9') arr[r][c] = +arr[r][c];
    }

  let pq = new Heap().add([S[0], S[1], 0]);
  map = new Map().set(S.join(','), 0);

  while (!pq.isEmpty()) {
    let [i, j, w] = pq.poll();

    let str = i + ',' + j;
    if (i == E[0] && j == E[1]) return w;
    if (map.has(str) && map.get(str) < w) continue;

    for (let [di, dj] of darr) {
      let ni = i + di, nj = j + dj;
      if (!isIn(ni, nj, R, C) || arr[ni][nj] == '#') continue;

      let sw = arr[i][j];
      let ew = arr[ni][nj];
      let nw = Math.min(Math.abs(sw - ew), 10 - sw + ew, 10 - ew + sw) + 1;
      let w2 = w + nw;
      let nstr = ni + ',' + nj;

      if ((map.get(nstr) ?? Infinity) <= w2) continue;

      pq.add([ni, nj, w2]);
      map.set(nstr, w2);
    }
  }
}

console.log(solve(input));