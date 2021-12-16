import fs from 'fs';
import assert from 'assert';

const file = fs.readFileSync('./input.txt', 'utf8');

function neighbors(map, point)
[
    map[point.i - 1] && map[point.i - 1][point.j + 0],
    map[point.i + 1] && map[point.i + 1][point.j + 0],
    map[point.i + 0] && map[point.i + 0][point.j - 1],
    map[point.i + 0] && map[point.i + 0][point.j + 1],
].filter(x => x !== undefined);

function markBasin(map, point) {
    if (point.basin || point.val === 9) {
        return 0;
    } else {
        point.basin = true;
        const sizes = neighbors(map, point).map(p => markBasin(map, p));
        return sizes.reduce((a, b) => a + b) + 1;
    }
}

function findBasins(input) {
    const basins = [];
    const map = input
        .split('\n')
        .map((line, i) => line.split('').map((x, j) => ({ val: +x, i, j })));
    for (const line of map) {
        for (const point of line) {
            if (neighbors(map, point).every(x => x.val > point.val)) {
                basins.push({ risk: point.val + 1, size: markBasin(map, point) });
            }
        }
    }
    return basins.sort((a, b) => b.size - a.size);
}

function Part1(input) {
    return findBasins(input).reduce((prev, x) => prev + x.risk, 0);
}

function Part2(input) {
    return findBasins(input)
        .slice(0, 3)
        .reduce((prev, x) => prev * x.size, 1);
}

console.log(`Part 1: ${Part1(file)}`); // 526
console.log(`Part 2: ${Part2(file)}`); // 1123524

// Test data
const testData = `2199943210
3987894921
9856789892
8767896789
9899965678`

console.log(`\n\n ~ TESTS ~ `);
// Part 1 tests
assert.strictEqual(Part1(testData), 15);

// Part 2 tests
assert.strictEqual(Part2(testData), 1134);
