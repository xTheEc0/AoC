import fs from 'fs';
import assert from 'assert';

const file = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

function Part1(input) {
  const memory = new Map();

  let bitmask;

  function mask(value) {
    const bits = value.toString(2).padStart(36, '0').split('');
    const result = bitmask.map((bit, i) => (bit === 'X' ? bits[i] : bit));

    return parseInt(result.join(''), 2);
  };

  for (const line of input) {
    if (/mask/.test(line)) {
      bitmask = /mask = (.*)/.exec(line)[1].split('');
    } else if (/mem/.test(line)) {
      const [, address, value] = /mem\[(\d+)\] = (\d+)/.exec(line);

      memory.set(+address, mask(+value));
    }
  }

  return [...memory.values()].reduce((a, b) => a + b, 0);
};

function Part2(input) {
  const memory = new Map();

  let bitmask;

  function mask(value) {
    const address = value.toString(2).padStart(36, '0').split('');
    const result = bitmask.map((bit, i) => (bit === 'X' ? 'X' : bit === '0' ? address[i] : bit));
    const numberOfFloats = result.filter((bit) => bit === 'X').length;

    const floats = Array.from({ length: Math.pow(2, numberOfFloats) }).map((_, i) => {
      const combination = i.toString(2).padStart(numberOfFloats, '0').split('');
      const float = result.map((bit) => (bit === 'X' ? combination.shift() : bit));

      return parseInt(float.join(''), 2);
    });

    return floats;
  };

  for (const line of input) {
    if (/mask/.test(line)) {
      bitmask = /mask = (.*)/.exec(line)[1].split('');
    } else if (/mem/.test(line)) {
      const [, address, value] = /mem\[(\d+)\] = (\d+)/.exec(line);
      const addresses = mask(+address);

      addresses.forEach((address) => memory.set(address, +value));
    }
  }

  return [...memory.values()].reduce((a, b) => a + b, 0);
};

//console.log(`Part 1: ${Part1(file)}`); // 2346881602152
//console.log(`Part 2: ${Part2(file)}`); // 3885232834169

// Test data
const testData1 = `
mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
mem[8] = 11
mem[7] = 101
mem[8] = 0`
  .trim()
  .split('\n');

const testData2 = `
mask = 000000000000000000000000000000X1001X
mem[42] = 100
mask = 00000000000000000000000000000000X0XX
mem[26] = 1`
  .trim()
  .split('\n');

// Part 1 tests
assert.strictEqual(Part1(testData1), 165);

// Part 2 tests
assert.strictEqual(Part2(testData2), 208);
