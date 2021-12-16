import fs from 'fs';
import assert from 'assert';

const file = fs.readFileSync('./input.txt', 'utf8');

function clean(line) {
    for (let len = 0; line.length !== len;) {
        len = line.length;
        line = line.replaceAll(/\(\)|\[\]|\{\}|<>/g, '').trim();
    }
    return line;
}

function score(line) {
    const points = { ')': 3, ']': 57, '}': 1197, '>': 25137 };
    return points[line.split('').find(c => ')]}>'.includes(c))] || 0;
}

function score2(line) {
    const points = { '(': 1, '[': 2, '{': 3, '<': 4 };
    const chars = line.split('').reverse();
    return chars.reduce((total, c) => total * 5 + points[c], 0);
}

function Part1(input) {
    const scores = input.split('\n').map(x => score(clean(x)));
    return scores.reduce((a, b) => a + b);
}

function Part2(input) {
    const incomplete = input.split('\n').filter(x => score(clean(x)) === 0);
    const scores = incomplete.map(x => score2(clean(x))).sort((a, b) => a - b);
    return scores[Math.floor(scores.length / 2)];
}

console.log(`Part 1: ${Part1(file)}`); // 166191
console.log(`Part 2: ${Part2(file)}`); // 1152088313

// Test data
const testData = `[({(<(())[]>[[{[]{<()<>>
    [(()[<>])]({[<{<<[]>>(
    {([(<{}[<>[]}>{[]{[(<()>
    (((({<>}<{<{<>}{[]{[]{}
    [[<[([]))<([[{}[[()]]]
    [{[{({}]{}}([{[{{{}}([]
    {<[[]]>}<{[{[{[]{()[[[]
    [<(<(<(<{}))><([]([]()
    <{([([[(<>()){}]>(<<{{
    <{([{{}}[<[[[<>{}]]]>[]]`

console.log(`\n\n ~ TESTS ~ `);
// Part 1 tests
assert.strictEqual(Part1(testData), 26397);

// Part 2 tests
assert.strictEqual(Part2(testData), 288957);
