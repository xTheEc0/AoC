import fs from 'fs';
import assert from 'assert';

const file = fs.readFileSync('./input.txt', 'utf8');

const findNthTerm = (input, n) => {
  numbers = input.split(',').map(Number);
  const seen = new Map(numbers.flatMap((number, index) => (index < numbers.length - 1 ? [[number, index]] : [])));

  let last = numbers[numbers.length - 1];

  for (let i = numbers.length; i < n; ++i) {
    const term = seen.has(last) ? i - seen.get(last) - 1 : 0;
    seen.set(last, i - 1);
    last = term;
  }

  return last;
};

const Part1 = (input) => {
  return findNthTerm(input, 2020);
};

const Part2 = (input) => {
  return findNthTerm(input, 30000000);
};

console.time('Part 1');
console.log(`Part 1: ${Part1(file)}`); // 447
console.timeEnd('Part 1');

console.time('Part 2');
console.log(`Part 2: ${Part2(file)}`); // 11721679
console.timeEnd('Part 2'); // ~4s

// // Part 1 tests
// assert.strictEqual(Part1('0, 3, 6'), 436);
// assert.strictEqual(Part1('1, 3, 2'), 1);
// assert.strictEqual(Part1('2, 1, 3'), 10);
// assert.strictEqual(Part1('1, 2, 3'), 27);
// assert.strictEqual(Part1('2, 3, 1'), 78);
// assert.strictEqual(Part1('3, 2, 1'), 438);
// assert.strictEqual(Part1('3, 1, 2'), 1836);
// // Part 2 tests
// assert.strictEqual(Part2('0, 3, 6'), 175594);
// assert.strictEqual(Part2('1, 3, 2'), 2578);
// assert.strictEqual(Part2('2, 1, 3'), 3544142);
// assert.strictEqual(Part2('1, 2, 3'), 261214);
// assert.strictEqual(Part2('2, 3, 1'), 6895259);
// assert.strictEqual(Part2('3, 2, 1'), 18);
// assert.strictEqual(Part2('3, 1, 2'), 362);
