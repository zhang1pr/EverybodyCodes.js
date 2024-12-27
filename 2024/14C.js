const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const dmap = new Map([['U', [1, 0, 0]], ['D', [-1, 0, 0]], ['L', [0, -1, 0]], ['R', [0, 1, 0]], ['F', [0, 0, 1]], ['B', [0, 0, -1]]]);
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let set = new Set(), res = Infinity;
  let arr = readword(input).map(a => a.split(','));
  let h = 0;

  let leaf = new Set();
  for (let tree of arr) {
    let x = 0, y = 0, z = 0;

    for (let op of tree) {
      let dir = op[0], num = +op.slice(1);
      let [dx, dy, dz] = dmap.get(dir);

      for (let i = 0; i < num; i++) {
        x += dx, y += dy, z += dz;
        set.add(x + ',' + y + ',' + z);

        if (y == 0 && z == 0) h = Math.max(x, h);
      }
    }

    leaf.add(x + ',' + y + ',' + z);
  }

  for (let i = 1; i <= h; i++) {
    let d = 0;
    let q = [[i, 0, 0]], visited = new Set();
    let total = 0, leafCP = new Set(leaf);

    while (leafCP.size) {
      d++;
      let nq = [];

      for (let [x, y, z] of q) {
        for (let [dx, dy, dz] of dmap.values()) {
          let nx = x + dx, ny = y + dy, nz = z + dz;
          let key = nx + ',' + ny + ',' + nz;

          if (!set.has(key) || visited.has(key)) continue;
          visited.add(key);

          if (leafCP.has(key)) {
            leafCP.delete(key);
            total += d;
          }

          nq.push([nx, ny, nz]);
        }
      }

      q = nq;
    }

    res = Math.min(res, total);
  }

  return res;
}

console.log(solve(input));