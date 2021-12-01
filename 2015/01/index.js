import fs from 'fs';
import assert from 'assert';

const file = fs.readFileSync('./input.txt', 'utf8');

const Part1 = (input) => {
  return Array.from(input).reduce((acc, cur) => {
    return acc + (cur === '(' ? 1 : -1);
  }, 0);
};

const Part2 = (input) => {
  const array = Array.from(input);
  let currentFloor = 0;

  for (let i = 0; i < array.length; i++) {
    currentFloor += array[i] === '(' ? 1 : -1;

    if (currentFloor === -1) {
      return i + 1;
    }
  }
};

console.log(`Part 1: ${Part1(file)}`); // 232
console.log(`Part 2: ${Part2(file)}`); // 1783

// Part 1 tests
assert.strictEqual(Part1('(())'), 0);
assert.strictEqual(Part1('()()'), 0);

assert.strictEqual(Part1('((('), 3);
assert.strictEqual(Part1('(()(()('), 3);
assert.strictEqual(Part1('))((((('), 3);

assert.strictEqual(Part1('())'), -1);
assert.strictEqual(Part1('))('), -1);

assert.strictEqual(Part1(')))'), -3);
assert.strictEqual(Part1(')())())'), -3);

// Part 2 tests
assert.strictEqual(Part2(')'), 1);
assert.strictEqual(Part2('()())'), 5);
