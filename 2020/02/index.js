const fs = require('fs');
const assert = require('assert');

const file = fs.readFileSync('./input.txt', 'utf8').split('\r\n');
const data = file.map((str) => {
  let arr = str.split(' ');
  let range = arr[0].split('-').map(Number);
  let letter = arr[1][0];
  let policy = { min: range[0], max: range[1], letter };
  let password = arr[2];

  return { policy, password };
});

const countOccurances = (string, letter) => {
  let regex = new RegExp(letter, 'g');
  return (string.match(regex) || []).length;
};

const countOnlyOnce = (password, policy) => {
  if (password[policy.min - 1] == policy.letter || password[policy.max - 1] == policy.letter) {
    if (password[policy.min - 1] == policy.letter && password[policy.max - 1] == policy.letter) {
      return false;
    } else {
      return true;
    }
  }
  return false;
};

const Part1 = () => {
  let counter = 0;
  data.forEach((el) => {
    let hits = countOccurances(el.password, el.policy.letter);
    if (hits >= el.policy.min && hits <= el.policy.max) counter++;
  });
  return counter;
};

const Part2 = () => {
  let counter = 0;
  data.forEach((el) => {
    if (countOnlyOnce(el.password, el.policy)) counter++;
  });
  return counter;
};

console.log(`Valid Passwords: ${Part1()}`); // 519
console.log(`Valid Passwords: ${Part2()}`); // 708

// Part 1 tests
assert.strictEqual(countOccurances('abcabc', 'a'), 2);
assert.strictEqual(countOccurances('ccccccccc', 'c'), 9);

// Part 2 tests
assert.strictEqual(countOnlyOnce('abcde', { min: 1, max: 3, letter: 'a' }), true);
assert.strictEqual(countOnlyOnce('cdefg', { min: 1, max: 3, letter: 'b' }), false);
assert.strictEqual(countOnlyOnce('ccccccccc', { min: 2, max: 9, letter: 'c' }), false);
