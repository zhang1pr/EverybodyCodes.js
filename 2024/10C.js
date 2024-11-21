const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const readnum = (a) => (a.match(/\d+/g) || []).map(a => Number(a));
const readnum2d = (a) => a.split('\n').map(a => readnum(a));
const readword = (a) => a.split('\n');
const readword2d = (a) => a.split('\n').map(a => a.split(/\s+/));

function solve(input) {
  let res = 0;
  let arr = readword(input).map(a => a.split('')), RRunic = arr.length, CRunic = arr[0].length;
  let improved = true;

  while (improved) {
    improved = false;

    for (let rRunic = 0; rRunic + 6 < RRunic; rRunic += 6) {
      for (let cRunic = 0; cRunic + 6 < CRunic; cRunic += 6) {
        let chmap = new Map(), leftSet = new Set(), valid = true;
        let good = new Set();

        for (let r = rRunic + 2; r < rRunic + 6; r++)
          for (let c = cRunic + 2; c < cRunic + 6; c++) {
            let set = new Set();

            for (let i of [0, 1]) {
              for (let [cr, cc] of [[rRunic + i, c], [rRunic + 7 - i, c], [r, cRunic + i], [r, cRunic + 7 - i]]) {
                if (arr[cr][cc] == '?') continue;

                if (set.has(arr[cr][cc]))
                  good.add(r + ',' + c);
                set.add(arr[cr][cc]);

                chmap.set(arr[cr][cc], (chmap.get(arr[cr][cc]) || 0) + 1);
                if (chmap.get(arr[cr][cc]) > 8)
                  valid = false;
              }
            }
          }

        if (chmap.size > 16)
          valid = false;

        if (!valid || good.size == 16) continue;

        for (let [k, v] of chmap)
          if (v == 4)
            leftSet.add(k);

        for (let r = rRunic + 2; r < rRunic + 6; r++) {
          for (let c = cRunic + 2; c < cRunic + 6; c++) {
            if (good.has(r + ',' + c)) continue;

            let lrMap = new Map(), udMap = new Map();
            let leftSetCP = new Set(leftSet);

            for (let i of [0, 1]) {
              for (let [cr, cc] of [[rRunic + i, c], [rRunic + 7 - i, c], [r, cRunic + i], [r, cRunic + 7 - i]]) {
                let targetMap = cr == r ? lrMap : udMap;

                if (!targetMap.has(arr[cr][cc]))
                  targetMap.set(arr[cr][cc], []);
                targetMap.get(arr[cr][cc]).push([cr, cc]);
              }
            }

            for (let k of leftSetCP)
              if (!udMap.has(k) && !lrMap.has(k))
                leftSetCP.delete(k);

            if (leftSetCP.size != 1) continue;
            let ch = [...leftSetCP.keys()][0];

            let lrQ = [...lrMap.get('?') || []];
            let udQ = [...udMap.get('?') || []];

            if (lrQ.length == 1 && udMap.has(ch)) {
              let [qr, qc] = lrQ[0];
              arr[qr][qc] = ch;

              improved = true;
              leftSet.delete(ch);
            } else if (udQ.length == 1 && lrMap.has(ch)) {
              let [qr, qc] = udQ[0];
              arr[qr][qc] = ch;
              improved = true;

              leftSet.delete(ch);
            }
          }
        }
      }
    }
  }

  for (let rRunic = 0; rRunic + 6 < RRunic; rRunic += 6) {
    for (let cRunic = 0; cRunic + 6 < CRunic; cRunic += 6) {
      let str = '';

      for (let r = rRunic + 2; r < rRunic + 6; r++) {
        for (let c = cRunic + 2; c < cRunic + 6; c++) {
          let set = new Set();

          let lrSet = new Set(), udSet = new Set();

          for (let i of [0, 1]) {
            udSet.add(arr[rRunic + i][c]);
            udSet.add(arr[rRunic + 7 - i][c]);
            lrSet.add(arr[r][cRunic + i]);
            lrSet.add(arr[r][cRunic + 7 - i]);
          }

          for (let x of udSet)
            if (x != '?' && lrSet.has(x))
              str += x;
        }
      }

      if (str.length != 16) continue;

      for (let i = 0; i < str.length; i++) {
        let ch = str[i];
        res += (ch.charCodeAt(0) - 'A'.charCodeAt(0) + 1) * (i + 1);
      }
    }
  }

  return res;
}

console.log(solve(input));