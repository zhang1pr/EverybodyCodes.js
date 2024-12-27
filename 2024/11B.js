const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let map = new Map();
  let arr = readword(input).map(a => a.split(':'));

  for (let [u, v] of arr)
    map.set(u, v.split(','));

  let q = ['Z'];
  for (let t = 0; t < 10; t++) {
    let nq = [];
    for (let cur of q) {
      nq.push(...map.get(cur));
    }
    q = nq;
  }

  return q.length;
}

console.log(solve(input));