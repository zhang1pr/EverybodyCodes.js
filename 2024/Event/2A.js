const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const count = (t, p) => (t.match(new RegExp(p, 'g')) || []).length;
const readnum = (a) => a.match(/\d+/g).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let arr = readword(input);
  let words = arr[0].slice(6).split(',');
  let note = arr.at(-1);

  return words.reduce((acc, cur) => acc + count(note, cur), 0);
}

console.log(solve(input));