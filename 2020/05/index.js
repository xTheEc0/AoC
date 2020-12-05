const fs = require('fs');
const assert = require('assert');

const file = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

const findSeatID = (input) => {
  return parseInt(input.replace(/[BR]/g, '1').replace(/[FL]/g, '0'), 2);
};

const Part1 = (input) => {
  const SeatIDs = input.map((x) => findSeatID(x));
  return Math.max(...SeatIDs);
};

const Part2 = (input) => {
  const SeatIDs = input.map((x) => findSeatID(x));
  let highest = Math.max(...SeatIDs);
  let lowest = Math.min(...SeatIDs);
  let sum = SeatIDs.reduce((acc, cur) => acc + cur);

  return ((input.length + 1) / 2) * (lowest + highest) - sum;
};

console.log(`Part 1: ${Part1(file)}`); // 901
console.log(`Part 2: ${Part2(file)}`); // 661

// Test data
const testData = ['FBFBBFFRLR', 'BFFFBBFRRR', 'FFFBBBFRRR', 'BBFFBBFRLL'];

// Part 1 tests
assert.strictEqual(findSeatID(testData[0]), 357);
assert.strictEqual(findSeatID(testData[1]), 567);
assert.strictEqual(findSeatID(testData[2]), 119);
assert.strictEqual(findSeatID(testData[3]), 820);
assert.strictEqual(Part1(testData), 820);
