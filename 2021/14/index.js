import fs from 'fs';
import assert from 'assert';

const file = fs.readFileSync('./input.txt', 'utf8');

function Part1(input, times = 10) {
  const map = {};
  let [polymer, pairs] = input.split('\n\n');
  pairs.split('\n').forEach((line) => {
    map[line.split(' -> ')[0]] = line.split(' -> ')[1];
  });
  let pairsMap = {};
  for (let i = 0; i < polymer.length - 1; i++) {
    const key = polymer[i] + polymer[i + 1];
    pairsMap[key] = (pairsMap[key] || 0) + 1;
  }
  for (let i = 0; i < times; i++) {
    let next = {};
    for (let key in pairsMap) {
      const insert = map[key];
      next[key[0] + insert] = (next[key[0] + insert] || 0) + pairsMap[key];
      next[insert + key[1]] = (next[insert + key[1]] || 0) + pairsMap[key];
    }
    pairsMap = next;
  }
  const charMap = { [polymer[0]]: 1, [polymer[polymer.length - 1]]: 1 };
  for (let key in pairsMap) {
    charMap[key[0]] = (charMap[key[0]] || 0) + pairsMap[key];
    charMap[key[1]] = (charMap[key[1]] || 0) + pairsMap[key];
  }
  const max = Math.max(...Object.values(charMap));
  const min = Math.min(...Object.values(charMap));
  return (max - min) / 2;
}

function Part2(input) {
  return Part1(input, 40);
}

console.log(`Part 1: ${Part1(file)}`); // 2223
console.log(`Part 2: ${Part2(file)}`); // 2566282754493

// Test data
const testData = `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`;

console.log(`\n\n ~ TESTS ~ `);
// Part 1 tests
assert.strictEqual(Part1(testData), 1588);

// Part 2 tests
assert.strictEqual(Part2(testData), 2188189693529);
