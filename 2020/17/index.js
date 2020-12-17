const fs = require('fs');
const assert = require('assert');

const file = fs.readFileSync('./input.txt', 'utf8');

const cache = [];
const offsets = (dimensions) => {
  if (dimensions === 0) {
    return [[]];
  } else if (!cache[dimensions]) {
    const rest = offsets(dimensions - 1);
    cache[dimensions] = rest.flatMap((x) => [-1, 0, 1].map((n) => [n, ...x]));
  }
  return cache[dimensions];
};

const neighbors = (key) => {
  const coordinates = key.split(',').map((x) => +x);
  return offsets(coordinates.length)
    .map((x) => x.map((c, i) => coordinates[i] + c).join(','))
    .filter((x) => x !== key);
};

const Part1 = (input, dimensions = 3) => {
  let map = new Map();
  input.split('\r\n').map((line, y) => {
    line.split('').map((char, x) => {
      const coordinates = new Array(dimensions - 2).fill(0);
      map.set([x, y, ...coordinates].join(','), char === '#');
    });
  });

  let count;
  for (let i = 0; i < 6; i++) {
    let next = new Map();
    let missing = [];
    count = 0;

    for (let key of map.keys()) {
      if (map.get(key)) {
        missing = missing.concat(neighbors(key).filter((key) => !map.has(key)));
      }
    }
    missing.forEach((key) => map.set(key, false));

    for (let key of map.keys()) {
      const active = neighbors(key).filter((key) => map.get(key)).length;
      next.set(key, (map.get(key) && active === 2) || active === 3);
      if (next.get(key)) {
        count++;
      }
    }
    map = next;
  }
  return count;
};

const Part2 = (input) => {
  return Part1(input, 4);
};

console.time('Part 1');
console.log(`Part 1: ${Part1(file)}`); // 289
console.timeEnd('Part 1');

console.log();

console.time('Part 2');
console.log(`Part 2: ${Part2(file)}`); // 2084
console.timeEnd('Part 2'); // ~4s

// Part 1 tests
assert.strictEqual(Part1(['.#.', '..#', '###'].join('\r\n')), 112);

// Part 2 tests
assert.strictEqual(Part2(['.#.', '..#', '###'].join('\r\n')), 848);
