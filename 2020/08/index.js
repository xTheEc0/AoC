const fs = require('fs');
const assert = require('assert');

const file = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

const parse = (input) => {
  return input.map((line) => {
    const [, operation, value] = /(\w+) ([+-]\d+)/.exec(line.trim());

    return [operation, parseInt(value)];
  });
};

const Part1 = (input) => {
  const instructions = parse(input);

  let acc = 0;
  let i = 0;

  const executed = new Set();

  while (!executed.has(i)) {
    executed.add(i);

    const [operation, argument] = instructions[i];

    switch (operation) {
      case 'acc':
        acc += argument;
        i++;
        break;
      case 'jmp':
        i += argument;
        break;
      case 'nop':
        i++;
        break;
    }
  }

  return acc;
};

const Part2 = (input) => {
  const instructions = parse(input);

  for (let i = 0; i < instructions.length; i++) {
    const patched = instructions.map(([operation, value]) => [operation, value]);

    if (instructions[i][0] === 'jmp') {
      patched[i][0] = 'nop';
    } else if (instructions[i][0] === 'nop') {
      patched[i][0] = 'jmp';
    } else {
      continue;
    }

    const executed = new Set();

    let acc = 0;
    let p = 0;

    while (!executed.has(p)) {
      executed.add(p);

      const [operation, argument] = patched[p];

      switch (operation) {
        case 'acc':
          acc += argument;
          p++;
          break;
        case 'jmp':
          p += argument;
          break;
        case 'nop':
          p++;
          break;
      }

      if (p >= patched.length) {
        return acc;
      }
    }
  }
};

console.log(`Part 1: ${Part1(file)}`); // 1584
console.log(`Part 2: ${Part2(file)}`); // 920

// Test data
const testData = `
nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`
  .trim()
  .split('\n');

// Part 1 tests
assert.strictEqual(Part1(testData), 5);

// Part 2 tests
assert.strictEqual(Part2(testData), 8);
