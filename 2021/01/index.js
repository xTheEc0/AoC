import fs from 'fs';
import assert from 'assert';

const file = fs.readFileSync('./input.txt', 'utf8');

function Part1(input) {
  return input
    .split('\n')
    .map(Number)
    .filter((x, i, a) => i > 0 && x > a[i - 1]).length;
}

function Part2(input) {
  return input
    .split('\n')
    .map(Number)
    .filter((x, i, a) => i > 2 && x > a[i - 3]).length;
}

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

// Part 1 tests
assert.strictEqual(Part1(testData), 7);

// Part 2 tests
assert.strictEqual(Part2(testData), 5);
