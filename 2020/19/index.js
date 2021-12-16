import fs from 'fs';
import assert from 'assert';

const file = fs.readFileSync('./input.txt', 'utf8');

function parse(rules) {
  const map = new Map();
  rules.forEach((x) => {
    const [id, str] = x.split(': ');
    map.set(id, str);
  });
  let pattern = map.get('0');
  while (pattern.match(/\d+(?!})/)) {
    pattern = pattern.replace(/\d+(?!})/g, (x) => `(${map.get(x)})`);
  }
  pattern = pattern.replace(/\("([^"]*)"\)/g, '$1').replace(/[\s"]/g, '');
  return new RegExp(`^${pattern}$`);
};

function Part1(input) {
  const [rules, messages] = input.split('\r\n\r\n').map((x) => x.split('\r\n'));
  const pattern = parse(rules);
  return messages.filter((message) => message.match(pattern)).length;
};

function Part2(input) {
  const rule = new Array(10).fill().map((x, i) => `42{${i + 1}} 31{${i + 1}}`);
  input = input.replace(/^8: 42$/m, '8: 42+').replace(/^11: 42 31$/m, `11: ${rule.join('|')}`);
  return Part1(input);
};

console.time('Part 1');
console.log(`Part 1: ${Part1(file)}`); // 75592527415659
console.timeEnd('Part 1'); // ~8ms

console.log();

console.time('Part 2');
console.log(`Part 2: ${Part2(file)}`); // 360029542265462
console.timeEnd('Part 2'); // ~6ms

// Test data
const testData1 = fs.readFileSync('./testInput1.txt', 'utf8');
const testData2 = fs.readFileSync('./testInput2.txt', 'utf8');

// Part 1 tests
assert.strictEqual(Part1(testData1), 2);

// Part 2 tests
assert.strictEqual(Part2(testData2), 12);
