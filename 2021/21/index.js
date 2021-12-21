import fs from 'fs';
import assert from 'assert';

const file = fs.readFileSync('./input.txt', 'utf8');

function Part1(input) {
    const players = input.split('\n').map(line => +line.split(': ')[1]);
    const score = [0, 0];
    let i = 1;
    let player = 0;
    while (score[0] < 1000 && score[1] < 1000) {
        const x = i % 100;
        players[player] += (3 * (x + 1)) % 10;
        if (players[player] > 10) players[player] -= 10;
        score[player] += players[player];
        player = (player + 1) % 2;
        i += 3;
    }
    return Math.min(...score) * (i - 1);
}

function play(position1, position2, score1, score2, memory = new Map()) {
    const key = [position1, position2, score1, score2].join(',');
    const result = memory.get(key);
    if (result) return result;
    if (score2 >= 21) return [0, 1];

    const wins = [0, 0];
    const odds = { 3: 1, 9: 1, 4: 3, 8: 3, 5: 6, 7: 6, 6: 7 };
    for (const key in odds) {
        let pos = position1 + +key;
        if (pos > 10) pos -= 10;
        const next = play(position2, pos, score2, score1 + pos, memory);
        wins[0] += next[1] * odds[key];
        wins[1] += next[0] * odds[key];
    }

    memory.set(key, wins);
    return wins;
}

function Part2(input) {
    const players = input.split('\n').map(line => +line.split(': ')[1]);
    const wins = play(players[0], players[1], 0, 0);
    return Math.max(wins[0], wins[1]);
}

console.log(`Part 1: ${Part1(file)}`); // 920079
console.log(`Part 2: ${Part2(file)}`); // 56852759190649

// Test data
const testData = `Player 1 starting position: 4
Player 2 starting position: 8`

console.log(`\n\n ~ TESTS ~ `);
// Part 1 tests
assert.strictEqual(Part1(testData), 739785);

// Part 2 tests
assert.strictEqual(Part2(testData), 444356092776315);
