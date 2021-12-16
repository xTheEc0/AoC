import fs from 'fs';
import assert from 'assert';

const file = fs.readFileSync('./input.txt', 'utf8');

function neighbors(n, maze) {
    return [
        maze[n.point.y - 1] && maze[n.point.y - 1][n.point.x + 0],
        maze[n.point.y + 0] && maze[n.point.y + 0][n.point.x - 1],
        maze[n.point.y + 0] && maze[n.point.y + 0][n.point.x + 1],
        maze[n.point.y + 1] && maze[n.point.y + 1][n.point.x + 0],
    ]
        .filter(x => x)
        .map(p => ({ point: p, totalRisk: n.totalRisk + p.risk }));
}

function solve(maze) {
    const visited = new Map();
    const target = maze[maze.length - 1][maze[0].length - 1];
    const queue = [{ point: maze[0][0], totalRisk: 0 }];
    while (queue.length > 0) {
        const n = queue.shift();
        if (n.point.x === target.x && n.point.y === target.y) {
            return n.totalRisk;
        }
        neighbors(n, maze).forEach(o => {
            const v = visited.get(`${o.point.x},${o.point.y}`);
            if (!v || o.totalRisk < v.totalRisk) {
                if (v) queue.splice(queue.indexOf(v), 1);
                visited.set(`${o.point.x},${o.point.y}`, o);
                queue.push(o);
            }
        });
        queue.sort((a, b) => a.totalRisk - b.totalRisk);
    }
}

function parse(input) {
    return input
        .split('\n')
        .map((line, y) => line.split('').map((risk, x) => ({ x, y, risk: +risk })));
}

function inc(line, i) {
    return line.map(cell => ({
        ...cell,
        risk: cell.risk + i > 9 ? cell.risk + i - 9 : cell.risk + i,
    }));
}

function Part1(input) {
    return solve(parse(input));
}

function Part2(input) {
    const maze = parse(input);
    maze.forEach(line => {
        const base = [...line];
        for (let i = 1; i < 5; i++) {
            line.push(
                ...inc(base, i).map((cell, x) => ({ ...cell, x: x + base.length * i })),
            );
        }
    });
    const lines = maze.length;
    for (let i = 1; i < 5; i++) {
        for (let j = 0; j < lines; j++) {
            maze.push(inc(maze[j], i).map(cell => ({ ...cell, y: j + lines * i })));
        }
    }
    return solve(maze);
}

console.log(`Part 1: ${Part1(file)}`); // 811
console.log(`Part 2: ${Part2(file)}`); // 3012

// Test data
const testData = `1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581`

console.log(`\n\n ~ TESTS ~ `);
// Part 1 tests
assert.strictEqual(Part1(testData), 40);

// Part 2 tests
assert.strictEqual(Part2(testData), 315);
