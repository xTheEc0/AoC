import fs from 'fs';
import assert from 'assert';

const file = fs.readFileSync('./input.txt', 'utf8')

const Part1 = (input, days = 80) => {
    const fish = input.split(',').map(x => +x);
    let map = {};
    for (let i = 0; i < fish.length; i++) {
        map[fish[i]] = (map[fish[i]] || 0) + 1;
    }
    for (let i = 0; i < days; i++) {
        const next = {};
        for (let key in map) {
            if (key === '0') {
                next[6] = (next[6] || 0) + map[key];
                next[8] = (next[8] || 0) + map[key];
            } else {
                next[+key - 1] = (next[+key - 1] || 0) + map[key];
            }
        }
        map = next;
    }
    return Object.values(map).reduce((a, b) => a + b, 0);
}

const Part2 = (input) => {
    return Part1(input, 256);
}

console.log(`Part 1: ${Part1(file)}`); // 390011
console.log(`Part 2: ${Part2(file)}`); // 1746710169834

// Test data
const testData = `3,4,3,1,2`

console.log(`\n\n ~ TESTS ~ `);
// Part 1 tests
assert.strictEqual(Part1(testData), 5934);

// Part 2 tests
assert.strictEqual(Part2(testData), 26984457539);
