import fs from 'fs';
import assert from 'assert';

const file = fs.readFileSync('./input.txt', 'utf8');

function shoot(xVelocity, yVelocity, xRange, yRange) {
    let x = 0;
    let y = 0;
    let maxY = 0;
    while (x < xRange[1] && y > yRange[0]) {
        x += xVelocity;
        y += yVelocity;
        maxY = Math.max(maxY, y);
        if (x >= xRange[0] && x <= xRange[1] && y >= yRange[0] && y <= yRange[1]) {
            return maxY;
        }
        xVelocity = Math.max(0, xVelocity - 1);
        yVelocity--;
    }
}

function calculate(input) {
    const [xRange, yRange] = input.split(', ').map(x =>
        x
            .split('=')
            .pop()
            .split('..')
            .map(x => +x),
    );
    const deepY = Math.min(...yRange);
    const farX = Math.max(...xRange);
    let results = [];
    for (let xVelocity = 0; xVelocity <= farX; xVelocity++) {
        for (let yVelocity = deepY; yVelocity <= Math.abs(deepY); yVelocity++) {
            const maxY = shoot(xVelocity, yVelocity, xRange, yRange);
            if (maxY !== undefined) results.push(maxY);
        }
    }
    return results;
}

function Part1(input) {
    return Math.max(...calculate(input));
}

function Part2(input) {
    return calculate(input).length;
}

console.log(`Part 1: ${Part1(file)}`); // 10296
console.log(`Part 2: ${Part2(file)}`); // 2371

// Test data
const testData = `target area: x=20..30, y=-10..-5`

console.log(`\n\n ~ TESTS ~ `);
// Part 1 tests
assert.strictEqual(Part1(testData), 45);

// Part 2 tests
assert.strictEqual(Part2(testData), 112);
