const fs = require('fs');
const assert = require('assert');

const file = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

const parse = (input) => {
  return input.map((x) => {
    const measurements = x.trim().split('x');
    return { length: measurements[0], width: measurements[1], height: measurements[2] };
  });
};

const Part1 = (input) => {
  return parse(input).reduce((acc, cur) => {
    const { length, width, height } = cur;
    const frontBack = width * height;
    const topBottom = width * length;
    const sides = height * length;

    const smallestSide = Math.min(frontBack, topBottom, sides);
    return acc + 2 * frontBack + 2 * topBottom + 2 * sides + smallestSide;
  }, 0);
};

const Part2 = (input) => {
  return parse(input).reduce((acc, cur) => {
    const { length, width, height } = cur;
    const frontBack = 2 * width + 2 * height;
    const topBottom = 2 * width + 2 * length;
    const sides = 2 * height + 2 * length;

    const smallestPerimeter = Math.min(frontBack, topBottom, sides);
    return acc + smallestPerimeter + length * width * height;
  }, 0);
};

console.log(`Part 1: ${Part1(file)}`); // 1588178
console.log(`Part 2: ${Part2(file)}`); // 3783758

// Part 1 tests
assert.strictEqual(Part1(['2x3x4']), 58);
assert.strictEqual(Part1(['1x1x10']), 43);

// Part 2 tests
assert.strictEqual(Part2(['2x3x4']), 34);
assert.strictEqual(Part2(['1x1x10']), 14);
