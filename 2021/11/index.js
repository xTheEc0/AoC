import fs from 'fs';
import assert from 'assert';

const file = fs.readFileSync('./input.txt', 'utf8');

function inc(octopai, i, j) {
    if (octopai[i] !== undefined && octopai[i][j] !== undefined) {
        octopai[i][j]++;
        if (octopai[i][j] === 10) {
            inc(octopai, i - 1, j - 1);
            inc(octopai, i - 1, j + 0);
            inc(octopai, i - 1, j + 1);
            inc(octopai, i + 0, j - 1);
            inc(octopai, i + 0, j + 1);
            inc(octopai, i + 1, j - 1);
            inc(octopai, i + 1, j + 0);
            inc(octopai, i + 1, j + 1);
        }
    }
}

function run(input, steps) {
    const octopai = input.split('\n').map(line => line.split('').map(x => +x));
    let flashes = 0;
    for (let n = 0; n < steps; n++) {
        if (octopai.every(line => line.every(octopus => octopus === 0))) {
            return n;
        }
        octopai.forEach((l, i) => l.forEach((o, j) => inc(octopai, i, j)));
        octopai.forEach((l, i) =>
            l.forEach((o, j) => o > 9 && ++flashes && (octopai[i][j] = 0)),
        );
    }
    return flashes;
}

function Part1(input) {
    return run(input, 100);
}

function Part2(input) {
    return run(input, Infinity);
}

console.log(`Part 1: ${Part1(file)}`); // 1691
console.log(`Part 2: ${Part2(file)}`); // 216

// Test data
const testData = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`

console.log(`\n\n ~ TESTS ~ `);
// Part 1 tests
assert.strictEqual(Part1(testData), 1656);

// Part 2 tests
assert.strictEqual(Part2(testData), 195);
