import fs from 'fs';
import assert from 'assert';

const file = fs.readFileSync('./input.txt', 'utf8').split(/\r?\n/);

const Part1 = (data) => {
    let posH = 0;
    let posV = 0;

    data.forEach(line => {
        let command = line.split(' ')[0];
        let power = parseInt(line.split(' ')[1]);
        switch (command) {
            case 'forward':
                posH += power;
                break;
            case 'down':
                posV += power;
                break;
            case 'up':
                posV -= power;
                break;
        }
    });
    return posH * posV;
};

const Part2 = (data) => {
    let posH = 0;
    let posV = 0;
    let aim = 0;

    data.forEach(line => {
        let command = line.split(' ')[0];
        let power = parseInt(line.split(' ')[1]);
        switch (command) {
            case 'forward':
                posH += power;
                posV += aim * power;
                break;
            case 'down':
                aim += power;
                break;
            case 'up':
                aim -= power;
                break;
        }
    });
    return posH * posV;
};

console.log(`Part 1: ${Part1(file)}`); // 1580000
console.log(`Part 2: ${Part2(file)}`); // 1251263225

// Test data
const testData = `forward 5
down 5
forward 8
up 3
down 8
forward 2`
    .split('\n')

console.log(`\n\n ~ TESTS ~ `);
// Part 1 tests
assert.strictEqual(Part1(testData), 150);

// Part 2 tests
assert.strictEqual(Part2(testData), 900);
