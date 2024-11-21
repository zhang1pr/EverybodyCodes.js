const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let map = new Map();
  let arr = readword(input).map(a => a.split(':'));

  let cand = new Set();

  for (let [u, v] of arr) {
    let vs = v.split(',');
    map.set(u, vs);
    cand.add(...vs);
    cand.add(u);
  }

  cand = [...cand];

  let min = Infinity, max = 0;

  for (let x of cand) {
    let qmap = new Map().set(x, 1);

    for (let t = 0; t < 20; t++) {
      let nq = [], nmap = new Map();
      for (let [k, v] of qmap)
        for (let nei of map.get(k))
          nmap.set(nei, (nmap.get(nei) || 0) + v);

      qmap = nmap;
    }

    let sum = [...qmap.values()].reduce((a, b) => a + b, 0);

    min = Math.min(min, sum);
    max = Math.max(max, sum);
  }

  return max - min;
}

console.log(solve(input));