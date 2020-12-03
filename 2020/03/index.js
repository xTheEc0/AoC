const fs = require('fs');
const assert = require('assert');

const file = fs.readFileSync('./input.txt', 'utf8').split('\r\n');
const datagrid = file.map((x) => Array.from(x));

const traverse = (data, moveX, moveY) => {
  const mapHeight = data.length - 1;
  const maxX = data[0].length - 1;
  let treeCount = 0;

  // iX = indexX, iY = indexY.
  let iX = 0;
  let iY = 0;

  while (iY < mapHeight) {
    iX += moveX;
    iY += moveY;
    if (iX > maxX) iX -= maxX + 1;
    if (data[iY][iX] == '#') treeCount++;
  }
  return treeCount;
};

console.log(`Part 1: ${traverse(datagrid, 3, 1)}`); // 187

let mult =
  traverse(datagrid, 1, 1) *
  traverse(datagrid, 3, 1) *
  traverse(datagrid, 5, 1) *
  traverse(datagrid, 7, 1) *
  traverse(datagrid, 1, 2);
console.log(`Part 2: ${mult}`); // 4723283400

// Part 1 tests
testData = `
..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`
  .trim()
  .split('\n')
  .map((x) => Array.from(x));

assert.strictEqual(traverse(testData, 3, 1), 7);

// Part 2 tests
assert.strictEqual(traverse(testData, 1, 1), 2);
assert.strictEqual(traverse(testData, 5, 1), 3);
assert.strictEqual(traverse(testData, 7, 1), 4);
assert.strictEqual(traverse(testData, 1, 2), 2);
