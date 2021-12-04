import fs from 'fs';
import assert from 'assert';

const file = fs.readFileSync('./input.txt', 'utf8')

let [inputStr, ...boardsStr] = file.split('\n\n');
let input = inputStr.split(',');
let boards = boardsStr.map(b => b.split('\n').map(l => l.trim().split(/\s+/).map(Number)));

const isWin = board => {
    for (let i = 0; i < 5; i++) {
        if (board[i].filter(v => v == 'x').length == board[i].length) {
            return true;
        }
        let win = true;
        for (let j = 0; j < 5; j++) {
            if (board[j][i] != 'x') {
                win = false;
            }
        }
        if (win) {
            return true;
        }
    }
    return false;
}

const markBoard = (board, val) => {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] == val) {
                board[i][j] = 'x';
            }
        }
    }
}

const sumBoard = board => board.reduce((c, l) => l.reduce((c, v) => v == 'x' ? c : c + v, 0) + c, 0);

const run = () => {
    for (let i = 0; i < input.length; i++) {
        let val = input[i];
        for (let j = 0; j < boards.length; j++) {
            let board = boards[j];

            markBoard(board, val);

            if (isWin(board)) {
                return [board, val];
            }
        }
    }
}

const run2 = () => {
    let totalWin = 0;
    let won = [];
    for (let i = 0; i < input.length; i++) {
        let val = input[i];
        for (let j = 0; j < boards.length; j++) {
            let board = boards[j];

            markBoard(board, val);

            if (isWin(board) && !won[j]) {
                totalWin++;
                won[j] = true;

                if (totalWin == boards.length) {
                    return [board, val];
                }
            }
        }
    }
}

const Part1 = () => {

    let [winBoard, winVal] = run();
    return sumBoard(winBoard) * winVal;
};

const Part2 = () => {

    let [lastBoard, lastVal] = run2();
    return sumBoard(lastBoard) * lastVal;
};

console.log(`Part 1: ${Part1()}`); // 10680
console.log(`Part 2: ${Part2()}`); // 31892

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
 2  0 12  3  7`

console.log(`\n\n ~ TESTS ~ `);
// Part 1 tests
//assert.strictEqual(Part1(testData), 4512);

// Part 2 tests
//assert.strictEqual(Part2(testData), 1924);
