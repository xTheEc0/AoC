const fs = require('fs');
const assert = require('assert');

const file = fs.readFileSync('./input.txt', 'utf8').split('\n').map(Number);

let pairA, pairB, pairC;
const search = 2020;

const sum2 = () => {
  for (i = 0; i < file.length - 1; i++) {
    for (j = 1; j < file.length; j++) {
      if (i === j) continue;
      if (file[i] + file[j] == search) {
        return [file[i], file[j]];
      }
    }
  }
};

const sum3 = () => {
  for (i = 0; i < file.length - 2; i++) {
    for (j = 1; j < file.length - 1; j++) {
      for (n = 2; n < file.length; n++) {
        if (new Set([i, j, n]).size !== 3) continue;
        if (file[i] + file[j] + file[n] == search) {
          return [file[i], file[j], file[n]];
        }
      }
    }
  }
};

[pairA, pairB] = sum2();
console.log(`${pairA} + ${pairB} = ${search}; = ${pairA * pairB}`);

[pairA, pairB, pairC] = sum3();
console.log(`${pairA} + ${pairB} + ${pairC} = ${search}; = ${pairA * pairB * pairC}`);
