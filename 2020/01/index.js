import fs from 'fs';
import assert from 'assert';

const file = fs.readFileSync('./input.txt', 'utf8').split('\r\n').map(Number);

function Part1(data) {
  for (i = 0; i < data.length - 1; i++) {
    for (j = 1; j < data.length; j++) {
      if (i === j) continue;
      if (data[i] + data[j] == 2020) {
        return data[i] * data[j];
      }
    }
  }
};

function Part2(data) {
  for (i = 0; i < data.length - 2; i++) {
    for (j = 1; j < data.length - 1; j++) {
      for (n = 2; n < data.length; n++) {
        if (new Set([i, j, n]).size !== 3) continue;
        if (data[i] + data[j] + data[n] == 2020) {
          return data[i] * data[j] * data[n];
        }
      }
    }
  }
};

console.log(`Part 1: ${Part1(file)}`); // 974304
console.log(`Part 2: ${Part2(file)}`); // 236430480

// Test data
const testData = `1721
979
366
299
675
1456`
  .split('\n')
  .map(Number);

// Part 1 tests
assert.strictEqual(Part1(testData), 514579);

// Part 2 tests
assert.strictEqual(Part2(testData), 241861950);
