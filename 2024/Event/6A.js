const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let map = new Map(), dmap = new Map();
  let arr = readword(input);

  for (let edge of arr) {
    let [a, b] = edge.split(':');
    map.set(a, b.split(','));
  }

  function dfs(node, path, d) {
    if (node == '@') {
      if (!dmap.has(d))
        dmap.set(d, []);

      dmap.get(d).push(path);
      return;
    }

    for (let next of (map.get(node) || [])) {
      dfs(next, path + next, d + 1);
    }
  }

  dfs('RR', 'RR', 0);

  for (let [k, v] of dmap)
    if (v.length == 1)
      return v[0];
}

console.log(solve(input));