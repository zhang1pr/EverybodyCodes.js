const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let arr = readword(input).map(a => a.split(':'));
  let rank = [];

  let track = readword(
    `S-=++=-==++=++=-=+=-=+=+=--=-=++=-==++=-+=-=+=-=+=+=++=-+==++=++=-=-=--
    -                                                                     -
    =                                                                     =
    +                                                                     +
    =                                                                     +
    +                                                                     =
    =                                                                     =
    -                                                                     -
    --==++++==+=+++-=+=-=+=-+-=+-=+-=+=-=+=--=+++=++=+++==++==--=+=++==+++-`
  );

  let ntrack = track[0].slice(1);
  for (let i = 1; i < track.length - 1; i++)
    ntrack += track[i].at(-1);
  ntrack += track.at(-1).trim().split('').reverse().join('');
  for (let i = track.length - 2; i >= 0; i--)
    ntrack += track[i].trim().at(0);

  track = ntrack;

  for (let [letter, ops] of arr) {
    ops = ops.split(',');

    let cur = 10, sum = 0;

    for (let i = 0; i < track.length * 10; i++) {
      let trackPos = i % track.length;
      let opPos = i % ops.length;

      if (track[trackPos] == '+') cur++;
      else if (track[trackPos] == '-') cur--;
      else if (ops[opPos] == '+') cur++;
      else if (ops[opPos] == '-') cur--;

      sum += cur;
    }

    rank.push([letter, sum]);
  }

  return rank.sort((a, b) => b[1] - a[1]).map(a => a[0]).join('');
}

console.log(solve(input));