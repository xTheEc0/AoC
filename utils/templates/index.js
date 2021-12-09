import fs from 'fs';
import assert from 'assert';

const file = fs.readFileSync('./input.txt', 'utf8');

const Part1 = (input) => {
    return 0;
}

const Part2 = (input) => {
    return 0;
}

console.log(`Part 1: ${Part1(file)}`); // Answer
console.log(`Part 2: ${Part2(file)}`); // Answer

// Test data
const testData = `FILL IN THE TEST DATA HERE`

console.log(`\n\n ~ TESTS ~ `);
// Part 1 tests
assert.strictEqual(Part1(testData), EXPECTED_RESULT_HERE);

// Part 2 tests
assert.strictEqual(Part2(testData), EXPECTED_RESULT_HERE);
