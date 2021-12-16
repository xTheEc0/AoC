import fs from 'fs';
import assert from 'assert';
import { gol } from '../../utils/game-of-life.js';

const file = fs.readFileSync('./input.txt', 'utf8');

const cache = [];
function offsets(dimensions) {
  if (dimensions === 0) {
    return [[]];
  } else if (!cache[dimensions]) {
    const rest = offsets(dimensions - 1);
    cache[dimensions] = rest.flatMap((x) => [-1, 0, 1].map((n) => [n, ...x]));
  }
  return cache[dimensions];
};

function neighbors(key) {
  const coordinates = key.split(',').map((x) => +x);
  return offsets(coordinates.length)
    .map((x) => x.map((c, i) => coordinates[i] + c).join(','))
    .filter((x) => x !== key);
};

function Part1(input, dimensions = 3) {
  let map = new Map();
  input.split('\r\n').map((line, y) => {
    line.split('').map((char, x) => {
      const coordinates = new Array(dimensions - 2).fill(0);
      map.set([x, y, ...coordinates].join(','), char === '#');
    });
  });

  return gol(map, neighbors, (current, active) => (current && active === 2) || active === 3, 6).count;
};

function Part2(input) {
  return Part1(input, 4);
};

console.time('Part 1');
console.log(`Part 1: ${Part1(file)}`); // 289
console.timeEnd('Part 1');

console.log();

console.time('Part 2');
console.log(`Part 2: ${Part2(file)}`); // 2084
console.timeEnd('Part 2'); // ~2s

// Part 1 tests
assert.strictEqual(Part1(['.#.', '..#', '###'].join('\r\n')), 112);

// Part 2 tests
assert.strictEqual(Part2(['.#.', '..#', '###'].join('\r\n')), 848);
