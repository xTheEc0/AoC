import fs from 'fs';
import assert from 'assert';

const file = fs
  .readFileSync('./input.txt', 'utf8')
  .split('\r\n')
  .map(Number)
  .sort((a, b) => a - b);

const Part1 = (input) => {
  const jolts = input.reduce(
    (acc, jolt, idx, all) => {
      const prev = all[idx - 1];
      const diff = jolt - (prev || 0);
      acc[diff] += 1;
      return acc;
    },
    { 1: 0, 3: 1 }
  );
  return jolts['1'] * jolts['3'];
};

const Part2 = (input) => {
  return input
    .reduce(
      (computed, jolt) => {
        computed[jolt] = (computed[jolt - 3] || 0) + (computed[jolt - 2] || 0) + (computed[jolt - 1] || 0);
        return computed;
      },
      [1]
    )
    .pop();
};

console.log(`Part 1: ${Part1(file)}`); // 1984
console.log(`Part 2: ${Part2(file)}`); // 3543369523456

// Test data
const testData1 = fs
  .readFileSync('./testInput1.txt', 'utf8')
  .split('\r\n')
  .map(Number)
  .sort((a, b) => a - b);

const testData2 = fs
  .readFileSync('./testInput2.txt', 'utf8')
  .split('\r\n')
  .map(Number)
  .sort((a, b) => a - b);

// Part 1 tests
assert.strictEqual(Part1(testData1), 35);
assert.strictEqual(Part1(testData2), 220);
// Part 2 tests
assert.strictEqual(Part2(testData1), 8);
assert.strictEqual(Part2(testData2), 19208);
