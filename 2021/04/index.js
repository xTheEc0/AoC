import fs from 'fs';
import assert from 'assert';

const file = fs.readFileSync('./input.txt', 'utf8');

function mark(board, number) {
  board.forEach((row) =>
    row.forEach((slot) => slot.number === number && (slot.marked = true))
  );
}

function winner(board) {
  const winnerRow = board.some((row) => row.every((slot) => slot.marked));
  const winnerCol = board[0].some((s, i) =>
    board.every((row) => row[i].marked)
  );
  return winnerRow || winnerCol;
}

function calc(board) {
  let sum = 0;
  board.forEach((row) =>
    row.forEach((slot) => !slot.marked && (sum += slot.number))
  );
  return sum;
}

function Part1(input, win = true) {
  let [numbers, ...boards] = input.split('\n\n');
  numbers = numbers.split(',').map((n) => +n);
  boards = boards.map((board) =>
    board.split('\n').map((row) =>
      row
        .trim()
        .split(/\s+/)
        .map((n) => ({ marked: false, number: +n }))
    )
  );
  for (const number of numbers) {
    for (const board of boards) {
      mark(board, number);
      if (winner(board)) {
        if (win || boards.length === 1) {
          return number * calc(board);
        } else {
          boards = boards.filter((b) => b !== board);
        }
      }
    }
  }
}

function Part2(input) {
  return Part1(input, false);
}

console.log(`Part 1: ${Part1(file)}`); // 10680
console.log(`Part 2: ${Part2(file)}`); // 31892

// Test data
const testData = `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`;

console.log(`\n\n ~ TESTS ~ `);
// Part 1 tests
assert.strictEqual(Part1(testData), 4512);

// Part 2 tests
assert.strictEqual(Part2(testData), 1924);
