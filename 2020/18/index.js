import fs from 'fs';
import assert from 'assert';

const file = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

function simple(formula) {
  let result = 0;
  let operation = '+';
  formula.split(' ').forEach((x) => {
    if (x === '+' || x === '*') {
      operation = x;
    } else if (operation === '+') {
      result += +x;
    } else if (operation === '*') {
      result *= +x;
    }
  });
  return result;
}

function solve(formula, precedence) {
  while (
    formula.includes('(') ||
    (precedence && formula.includes('+') && formula.includes('*'))
  ) {
    if (precedence) {
      formula = formula.replace(/(\d+ \+ )+\d+/g, (x) => simple(x));
    }
    formula = formula.replace(/\(([^()]*)\)/g, (a, x) => simple(x));
  }
  return simple(formula);
}

function Part1(input) {
  return input.map((x) => solve(x)).reduce((a, b) => a + b);
}

function Part2(input) {
  return input.map((x) => solve(x, true)).reduce((a, b) => a + b);
}

console.time('Part 1');
console.log(`Part 1: ${Part1(file)}`); // 75592527415659
console.timeEnd('Part 1'); // ~8ms

console.log();

console.time('Part 2');
console.log(`Part 2: ${Part2(file)}`); // 360029542265462
console.timeEnd('Part 2'); // ~6ms

// Part 1 tests
assert.strictEqual(Part1(['1 + 2 * 3 + 4 * 5 + 6']), 71);
assert.strictEqual(Part1(['1 + (2 * 3) + (4 * (5 + 6))']), 51);
assert.strictEqual(Part1(['2 * 3 + (4 * 5)']), 26);
assert.strictEqual(Part1(['5 + (8 * 3 + 9 + 3 * 4 * 3)']), 437);
assert.strictEqual(Part1(['5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))']), 12240);
assert.strictEqual(
  Part1(['((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2']),
  13632
);

// Part 2 tests
assert.strictEqual(Part2(['1 + 2 * 3 + 4 * 5 + 6']), 231);
assert.strictEqual(Part2(['1 + (2 * 3) + (4 * (5 + 6))']), 51);
assert.strictEqual(Part2(['2 * 3 + (4 * 5)']), 46);
assert.strictEqual(Part2(['5 + (8 * 3 + 9 + 3 * 4 * 3)']), 1445);
assert.strictEqual(
  Part2(['5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))']),
  669060
);
assert.strictEqual(
  Part2(['((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2']),
  23340
);
