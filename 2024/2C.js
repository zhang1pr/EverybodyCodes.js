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

  for (let r = 0; r < notes.length; r++) {
    let note = notes[r];
    let MOD = note.length;
    note += note;
    let rnote = note.split('').reverse().join('');

    for (let i = 0; i < note.length; i++) {
      for (let word of words) {
        if (note.slice(i).startsWith(word))
          for (let c = i; c < i + word.length; c++)
            set.add(r + ',' + c % MOD);

        if (rnote.slice(i).startsWith(word)) {
          for (let c = i; c < i + word.length; c++)
            set.add(r + ',' + (note.length - 1 - c) % MOD);
        }
      }
    }
  }

  let notes2 = [...Array(notes[0].length)].map(() => []);

  for (let i = 0; i < notes.length; i++)
    for (let j = 0; j < notes[i].length; j++)
      notes2[j][i] = notes[i][j];

  for (let r = 0; r < notes2.length; r++) {
    let note = notes2[r].join('');
    let MOD = note.length;
    let rnote = note.split('').reverse().join('');

    for (let i = 0; i < note.length; i++) {
      for (let word of words) {
        if (note.slice(i).startsWith(word))
          for (let c = i; c < i + word.length; c++)
            set.add(c % MOD + ',' + r);
        if (rnote.slice(i).startsWith(word))
          for (let c = i; c < i + word.length; c++)
            set.add((note.length - 1 - c) % MOD + ',' + r);
      }
    }
  }

  return set.size;
}

console.log(solve(input));