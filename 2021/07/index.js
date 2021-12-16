import fs from 'fs';
import assert from 'assert';

const file = fs.readFileSync('./input.txt', 'utf8')

function Part1(input, cost = (a, b) => Math.abs(a - b)) {
    const positions = input.split(',').map(x => +x);
    const min = Math.min(...positions);
    const max = Math.max(...positions);
    const distances = [];
    for (let i = min; i <= max; i++) {
        distances.push(positions.reduce((prev, x) => prev + cost(x, i), 0));
    }
    return Math.min(...distances);
}

function Part2(input) {
    return Part1(input, (a, b) => (Math.abs(a - b) * (Math.abs(a - b) + 1)) / 2);
}

console.log(`Part 1: ${Part1(file)}`); // 348996
console.log(`Part 2: ${Part2(file)}`); // 98231647

// Test data
const testData = `16,1,2,0,4,2,7,1,2,14`

console.log(`\n\n ~ TESTS ~ `);
// Part 1 tests
assert.strictEqual(Part1(testData), 37);

// Part 2 tests
assert.strictEqual(Part2(testData), 168);
