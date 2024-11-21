const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const darr = [[0, 1], [0, -1], [1, 0], [-1, 0]];
const isIn = (r, c, R, C) => 0 <= r && r < R && 0 <= c && c < C;
const gcd = (x, y) => (y == 0 ? x : gcd(y, x % y));
const lcm = (x, y) => (x * y) / gcd(x, y);
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0;
  let rival = input.split(':')[1].split(',');

  let track = readword(
    `S+= +=-== +=++=     =+=+=--=    =-= ++=     +=-  =+=++=-+==+ =++=-=-=--
    - + +   + =   =     =      =   == = - -     - =  =         =-=        -
    = + + +-- =-= ==-==-= --++ +  == == = +     - =  =    ==++=    =++=-=++
    + + + =     +         =  + + == == ++ =     = =  ==   =   = =++=
    = = + + +== +==     =++ == =+=  =  +  +==-=++ =   =++ --= + =
    + ==- = + =   = =+= =   =       ++--          +     =   = = =--= ==++==
    =     ==- ==+-- = = = ++= +=--      ==+ ==--= +--+=-= ==- ==   =+=    =
    -               = = = =   +  +  ==+ = = +   =        ++    =          -
    -               = + + =   +  -  = + = = +   =        +     =          -
    --==++++==+=+++-= =-= =-+-=  =+-= =-= =--   +=++=+++==     -=+=++==+++-`
  ).map(a => a.trim());

  track = BFS(track);
  let goal = calc(rival, track);

  function DFS(ops, plus, equal, minus) {
    if (plus < 0 || equal < 0 || minus < 0) return;

    if (plus == 0 && equal == 0 && minus == 0) {
      let val = calc(ops, track);

      if (val > goal) res++;
      return;
    }

    DFS(ops + '+', plus - 1, equal, minus);
    DFS(ops + '=', plus, equal - 1, minus);
    DFS(ops + '-', plus, equal, minus - 1);
  }

  DFS('', 5, 3, 3);

  return res;
}

function BFS(track) {
  let r = 0, c = 0, dirr = 0, dirc = 1, R = track.length, C = track[0].length;
  let str = '';

  while (true) {
    r += dirr, c += dirc;
    str += track[r][c];

    if (track[r][c] == 'S') break;

    for (let [dr, dc] of darr) {
      if (
        dr + dirr == 0 && dc + dirc == 0
        || !isIn(r + dr, c + dc, R, C)
        || track[r + dr][c + dc] == ' '
        || track[r + dr][c + dc] == null
      )
        continue;

      dirr = dr, dirc = dc;
      break;
    }
  }

  return str;
}

function calc(ops, track) {
  let cur = 0, sum = 0;

  for (let i = 0; i < 11 * track.length; i++) {
    let trackPos = i % track.length;
    let opPos = i % ops.length;

    if (track[trackPos] == '+') cur++;
    else if (track[trackPos] == '-') cur--;
    else if (ops[opPos] == '+') cur++;
    else if (ops[opPos] == '-') cur--;

    sum += cur;
  }

  return sum;
}

console.log(solve(input));