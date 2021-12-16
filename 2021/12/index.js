import fs from 'fs';
import assert from 'assert';

const file = fs.readFileSync('./input.txt', 'utf8');

function Part1(input, twice = false) {
  const connections = {};
  input.split('\n').forEach(x => {
    const [src, dest] = x.split('-');
    connections[src] = (connections[src] || []).concat(dest);
    connections[dest] = (connections[dest] || []).concat(src);
  });
  let paths = 0;
  const queue = [{ point: 'start', path: ['start'], twice: !twice }];
  while (queue.length > 0) {
    const next = queue.shift();
    if (next.point === 'end') {
      paths++;
    } else {
      const neighbors = connections[next.point].filter(p => p !== 'start');
      neighbors.forEach(point => {
        if (point.toLowerCase() !== point || !next.path.includes(point)) {
          queue.push({ point, path: [...next.path, point], twice: next.twice });
        } else if (!next.twice) {
          queue.push({ point, path: [...next.path, point], twice: true });
        }
      });
    }
  }
  return paths;
}

function Part2(input) {
  return Part1(input, true);
}

console.log(`Part 1: ${Part1(file)}`); // 5333
console.log(`Part 2: ${Part2(file)}`); // 146553

// Test data
const testData = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`

console.log(`\n\n ~ TESTS ~ `);
// Part 1 tests
assert.strictEqual(Part1(testData), 10);

// Part 2 tests
assert.strictEqual(Part2(testData), 36);
