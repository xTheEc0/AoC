import fs from 'fs';
import assert from 'assert';

const file = fs.readFileSync('./input.txt', 'utf8');

const open = -1;
const close = -2;

function run(snail, split) {
  let depth = 0;
  let last, next;
  for (let i = 0; i < snail.length; i++) {
    if (split && snail[i] >= 10) {
      const number = snail[i] / 2;
      snail.splice(i, 1, open, Math.floor(number), Math.ceil(number), close);
    }
    if (depth === 4 && snail[i] === open) {
      for (next = i + 4; next < snail.length && snail[next] < 0; next++);
      if (snail[last] !== undefined) snail[last] += snail[i + 1];
      if (snail[next] !== undefined) snail[next] += snail[i + 2];
      snail.splice(i, 4, 0);
      return true;
    }
    if (snail[i] === open) depth++;
    if (snail[i] === close) depth--;
    if (snail[i] >= 0) last = i;
  }
}

function add(a, b) {
  const snail = [open, ...a, ...b, close];
  while (run(snail, false));
  while (run(snail, true));
  return snail;
}

function magnitude(snail) {
  const sum = (i) => 3 * snail[i + 1] + 2 * snail[i + 2];
  const pair = (i) => snail[i + 1] >= 0 && snail[i + 2] >= 0;
  while (snail.length > 1) {
    const next = snail.findIndex((x, i) => pair(i));
    snail.splice(next, 4, sum(next));
  }
  return snail[0];
}

function parse(str) {
  const snail = str.replaceAll(',', '').split('');
  return snail.map((x) => (x === '[' ? open : x === ']' ? close : +x));
}

function Part1(input) {
  return magnitude(input.split('\n').map(parse).reduce(add));
}

function Part2(input) {
  const lines = input.split('\n').map(parse);
  let max = 0;
  for (let a of lines) {
    for (let b of lines) {
      max = Math.max(max, a !== b ? magnitude(add(a, b)) : 0);
    }
  }
  return max;
}

console.log(`Part 1: ${Part1(file)}`); // 3551
console.log(`Part 2: ${Part2(file)}`); // 4555

// Test data
const testData = `[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]
[[[5,[2,8]],4],[5,[[9,9],0]]]
[6,[[[6,2],[5,6]],[[7,6],[4,7]]]]
[[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]
[[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]
[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]
[[[[5,4],[7,7]],8],[[8,3],8]]
[[9,3],[[9,9],[6,[4,9]]]]
[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]
[[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]`;

console.log(`\n\n ~ TESTS ~ `);
// Part 1 tests
assert.strictEqual(Part1(testData), 4140);

// Part 2 tests
assert.strictEqual(Part2(testData), 3993);
