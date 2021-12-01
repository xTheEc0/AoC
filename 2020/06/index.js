import fs from 'fs';
import assert from 'assert';

const file = fs
  .readFileSync('./input.txt', 'utf8')
  .split('\r\n\r\n')
  .filter((x) => x);

const Part1 = (input) => {
  let sum = 0;
  input.forEach((el) => {
    sum += new Set([...el.replace(/[\r\n]{1,2}/g, '')]).size;
  });
  return sum;
};

const Part2 = (input) => {
  let sum = 0;
  input.forEach((el) => {
    sum += [...new Set([...el.replace(/[\r\n]{1,2}/g, '')])].filter((char) =>
      el
        .split('\n')
        .filter((x) => x)
        .every((form) => form.includes(char))
    ).length;
  });
  return sum;
};

console.log(`Part 1: ${Part1(file)}`); // 6726
console.log(`Part 2: ${Part2(file)}`); // 3316

// Test data
const testData = `
abc

a
b
c

ab
ac

a
a
a
a

b`
  .trim()
  .split('\n\n')
  .filter((x) => x);

// Part 1 tests
assert.strictEqual(Part1(testData), 11);

// Part 2 tests
assert.strictEqual(Part2(testData), 6);
