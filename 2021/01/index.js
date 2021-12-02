import fs from 'fs';
import assert from 'assert';

const file = fs.readFileSync('./input.txt', 'utf8').split(/\r?\n/).map(Number);

const Part1 = (data) => {
  let last = data[0];
  let counter = 0;

  data.forEach(p => {
    if (p > last) counter++;
    last = p;
  });
  return counter;
};

const Part2 = (data) => {
  let lastSum = 0;
  let counter = 0;

  for (let i = 0; i < data.length - 3; i++) {
    let sum = data[i] + data[i + 1] + data[i + 2];
    if (sum > lastSum) counter++;
    lastSum = sum;
  }
  return counter
};

console.log(`Part 1: ${Part1(file)}`); // 1688
console.log(`Part 2: ${Part2(file)}`); // 1728

// Test data
const testData = `199
200
208
210
200
207
240
269
260
263`
  .split('\n')
  .map(Number);

// Part 1 tests
assert.strictEqual(Part1(testData), 7);

// Part 2 tests
assert.strictEqual(Part2(testData), 5);
