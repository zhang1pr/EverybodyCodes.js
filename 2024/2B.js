const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let set = new Set();
  let arr = readword(input);
  let words = arr[0].slice(6).split(',');
  let notes = arr.slice(2);
  let res = 0;

  for (let note of notes) {
    let rnote = note.split('').reverse().join('');

    for (let i = 0; i < note.length; i++) {
      for (let word of words) {
        if (note.slice(i).startsWith(word))
          for (let j = i; j < i + word.length; j++)
            set.add(j);
        if (rnote.slice(i).startsWith(word))
          for (let j = i; j < i + word.length; j++)
            set.add(note.length - 1 - j);
      }
    }

    res += set.size;
  }

  return res;
}

console.log(solve(input));