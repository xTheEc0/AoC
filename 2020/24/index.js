import fs from 'fs';
import { gol } from '../../utils/game-of-life.js';

const file = fs.readFileSync('./input.txt', 'utf8');

const go = {
  w: ({ x, y }) => ({ x: x - 1, y }),
  e: ({ x, y }) => ({ x: x + 1, y }),
  nw: ({ x, y }) => ({ x: x - 0.5, y: y - 1 }),
  ne: ({ x, y }) => ({ x: x + 0.5, y: y - 1 }),
  sw: ({ x, y }) => ({ x: x - 0.5, y: y + 1 }),
  se: ({ x, y }) => ({ x: x + 0.5, y: y + 1 }),
};

function parse(input) {
  const instructions = input
    .split('\r\n')
    .map((line) => line.match(/(w|e|nw|ne|sw|se)/g));
  const map = new Map();
  instructions.forEach((x) => {
    let position = { x: 0, y: 0 };
    x.forEach((direction) => (position = go[direction](position)));
    const key = `${position.x},${position.y}`;
    map.set(key, !map.get(key));
  });
  return map;
}

function Part1(input) {
  const map = parse(input);
  return [...map.values()].filter((x) => x).length;
}

function neighbors(key) {
  const [x, y] = key.split(',').map((x) => +x);
  return Object.values(go)
    .map((f) => f({ x, y }))
    .map((p) => `${p.x},${p.y}`);
}

function Part2(input) {
  let map = parse(input);
  return gol(
    map,
    neighbors,
    (current, active) => (current && active === 1) || active === 2,
    100
  ).count;
}

console.time('Part 1');
console.log(`Part 1: ${Part1(file)}`); // 228
console.timeEnd('Part 1'); // ~8ms

console.log();

console.time('Part 2');
console.log(`Part 2: ${Part2(file)}`); // 3672
console.timeEnd('Part 2'); // ~1.6s
