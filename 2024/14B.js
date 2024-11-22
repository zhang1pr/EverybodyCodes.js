const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const dmap = new Map([['U', [1, 0, 0]], ['D', [-1, 0, 0]], ['L', [0, -1, 0]], ['R', [0, 1, 0]], ['F', [0, 0, 1]], ['B', [0, 0, -1]]]);
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let set = new Set(), res = 0;
  let arr = readword(input).map(a => a.split(','));

  for (let tree of arr) {
    let x = 0, y = 0, z = 0;

    for (let op of tree) {
      let dir = op[0], num = +op.slice(1);
      let [dx, dy, dz] = dmap.get(dir);

      for (let i = 0; i < num; i++) {
        x += dx, y += dy, z += dz;
        set.add(x + ',' + y + ',' + z);
      }
    }
  }

  return set.size;
}

console.log(solve(input));