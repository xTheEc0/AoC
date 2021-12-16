import fs from 'fs';
import assert from 'assert';

const file = fs.readFileSync('./input.txt', 'utf8');

function findMostCommonBit(numbers, digit) {
    const counter = numbers.filter(number => number[digit] === '1').length;
    return counter >= numbers.length / 2 ? '1' : '0';
}

function Part1(input) {
    const numbers = input.split('\n');
    const mask = parseInt('1'.repeat(numbers[0].length), 2);
    let mostCommon = '';
    for (let digit = 0; digit < numbers[0].length; digit++) {
        mostCommon += findMostCommonBit(numbers, digit);
    }
    return parseInt(mostCommon, 2) * (parseInt(mostCommon, 2) ^ mask);
}

function Part2(input) {
    let numbers = input.split('\n');
    let numbers2 = input.split('\n');
    for (let digit = 0; numbers.length > 1; digit++) {
        const bit = findMostCommonBit(numbers, digit);
        numbers = numbers.filter(number => number[digit] === bit);
    }
    for (let digit = 0; numbers2.length > 1; digit++) {
        const bit = findMostCommonBit(numbers2, digit);
        numbers2 = numbers2.filter(number => number[digit] !== bit);
    }
    return parseInt(numbers[0], 2) * parseInt(numbers2[0], 2);
}

console.log(`Part 1: ${Part1(file)}`); // 2648450
console.log(`Part 2: ${Part2(file)}`); // 2845944

// Test data
const testData = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`

console.log(`\n\n ~ TESTS ~ `);
// Part 1 tests
assert.strictEqual(Part1(testData), 198);

// Part 2 tests
assert.strictEqual(Part2(testData), 230);
