import fs from 'fs';
import assert from 'assert';

const file = fs.readFileSync('./input.txt', 'utf8');

function Part1(input) {
  let [x, y] = [0, 0];
  const lines = input.split('\n').map((line) => {
    const [direction, value] = line.split(' ');
    return { direction, value: +value };
  });
  for (const line of lines) {
    if (line.direction === 'forward') {
      x += line.value;
    }
    if (line.direction === 'down') {
      y += line.value;
    }
    if (line.direction === 'up') {
      y -= line.value;
    }
  }
  return x * y;
}

function Part2(input) {
  let [aim, x, y] = [0, 0, 0];
  const lines = input.split('\n').map((line) => {
    const [direction, value] = line.split(' ');
    return { direction, value: +value };
  });
  for (const line of lines) {
    if (line.direction === 'forward') {
      x += line.value;
      y += line.value * aim;
    }
    if (line.direction === 'down') {
      aim += line.value;
    }
    if (line.direction === 'up') {
      aim -= line.value;
    }
  }
  return x * y;
}

console.log(`Part 1: ${Part1(file)}`); // 1580000
console.log(`Part 2: ${Part2(file)}`); // 1251263225

// Test data
const testData = `forward 5
down 5
forward 8
up 3
down 8
forward 2`;

console.log(`\n\n ~ TESTS ~ `);
// Part 1 tests
assert.strictEqual(Part1(testData), 150);

// Part 2 tests
assert.strictEqual(Part2(testData), 900);
