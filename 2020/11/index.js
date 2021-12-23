import fs from 'fs';
import assert from 'assert';

const file = fs
  .readFileSync('./input.txt', 'utf8')
  .split('\r\n')
  .map((line) => line.split(''));

// prettier-ignore
const adjacencyMatrix = [
  [-1, -1], [0, -1], [1, -1],
  [-1, 0], /* X */[1, 0],
  [-1, 1], [0, 1], [1, 1],
];

const print = (state) => state.map((row) => row.join('')).join('\n');

function Part1(input) {
  const cycle = (state) =>
    state.map((row, y) =>
      row.map((column, x) => {
        const occupiedNeighbors = adjacencyMatrix
          .map(([dx, dy]) => (state[y + dy] || [])[x + dx] || '.')
          .filter((seat) => seat === '#');

        return column === 'L' && occupiedNeighbors.length === 0
          ? '#'
          : column === '#' && occupiedNeighbors.length >= 4
          ? 'L'
          : column;
      })
    );

  let lastState = [];
  let currentState = input;

  while (print(lastState) !== print(currentState)) {
    lastState = currentState;
    currentState = cycle(currentState);
  }

  return currentState.flat().filter((seat) => seat === '#').length;
}

function Part2(input) {
  const marcher =
    (state, x, y) =>
    ([dx, dy]) => {
      let steps = 1;

      while (true) {
        const [px, py] = [x + dx * steps, y + dy * steps];

        if (!state[py] || !state[py][py]) {
          return '.';
        }

        if (state[py][px] !== '.') {
          return state[py][px];
        }

        steps++;
      }
    };

  const cycle = (state) =>
    state.map((row, y) =>
      row.map((column, x) => {
        const occupiedNeighbors = adjacencyMatrix
          .map(marcher(state, x, y))
          .filter((seat) => seat === '#');

        return column === 'L' && occupiedNeighbors.length === 0
          ? '#'
          : column === '#' && occupiedNeighbors.length >= 5
          ? 'L'
          : column;
      })
    );

  let lastState = [];
  let currentState = input;

  while (print(lastState) !== print(currentState)) {
    lastState = currentState;
    currentState = cycle(currentState);
  }

  return currentState.flat().filter((seat) => seat === '#').length;
}

console.log(`Part 1: ${Part1(file)}`); // 2251
console.log(`Part 2: ${Part2(file)}`); // 2019

// Test data
const testData = `
L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`
  .trim()
  .split('\n')
  .map((line) => line.split(''));

// Part 1 tests
assert.strictEqual(Part1(testData), 37);

// Part 2 tests
assert.strictEqual(Part2(testData), 26);
