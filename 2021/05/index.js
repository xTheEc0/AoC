import fs from 'fs';
import assert from 'assert';

const file = fs.readFileSync('./input.txt', 'utf8');

function mark(points, x, y) {
    points[`${x},${y}`] = (points[`${x},${y}`] || 0) + 1;
};

function direction(a, b) {
    return a === b ? 0 : a < b ? 1 : -1;
};

function Part1(input, diagonal = false) {
    const lines = input.split('\n').map(line => {
        const [from, to] = line.split(' -> ').map(x => x.split(',').map(x => +x));
        return { from, to };
    });

    const points = {};
    for (const line of lines) {
        let [i, j] = line.from;
        const iDirection = direction(i, line.to[0]);
        const jDirection = direction(j, line.to[1]);
        if (diagonal || iDirection === 0 || jDirection === 0) {
            while (i !== line.to[0] || j !== line.to[1]) {
                mark(points, i, j);
                i += iDirection;
                j += jDirection;
            }
            mark(points, line.to[0], line.to[1]);
        }
    }
    return Object.values(points).filter(x => x > 1).length;
};

function Part2(input) {
    return Part1(input, true);
}

console.log(`Part 1: ${Part1(file)}`); // 5197
console.log(`Part 2: ${Part2(file)}`); // 18605

// Test data
const testData = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`;

// Part 1 tests
assert.strictEqual(Part1(testData), 5);

// Part 2 tests
assert.strictEqual(Part2(testData), 12);
