const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0;
  let arr = readword(input), RRunic = arr.length, CRunic = arr[0].length;

  for (let rRunic = 0; rRunic < RRunic; rRunic += 9) {
    for (let cRunic = 0; cRunic < CRunic; cRunic += 9) {
      let str = '';

      for (let r = rRunic + 2; r < rRunic + 6; r++) {
        for (let c = cRunic + 2; c < cRunic + 6; c++) {
          let set = new Set();
          let cand = [];

          for (let i of [0, 1]) {
            cand.push(arr[rRunic + i][c]);
            cand.push(arr[rRunic + 7 - i][c]);
            cand.push(arr[r][cRunic + i]);
            cand.push(arr[r][cRunic + 7 - i]);
          }

          for (let x of cand) {
            if (set.has(x)) {
              str += x;
              break;
            }
            set.add(x);
          }
        }
      }

      for (let i = 0; i < str.length; i++) {
        let ch = str[i];
        res += (ch.charCodeAt(0) - 'A'.charCodeAt(0) + 1) * (i + 1);
      }
    }
  }

  return res;
}

console.log(solve(input));