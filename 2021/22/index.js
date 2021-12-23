import fs from 'fs';
import assert from 'assert';

const file = fs.readFileSync('./input.txt', 'utf8');

function overlaps(a, b) {
  return (
    a.x[0] < b.x[1] &&
    a.x[1] > b.x[0] &&
    a.y[0] < b.y[1] &&
    a.y[1] > b.y[0] &&
    a.z[0] < b.z[1] &&
    a.z[1] > b.z[0]
  );
}

function subtract(a, b) {
  const points = (d1, d2) => {
    const p = d2.filter((x) => x > d1[0] && x < d1[1]);
    return [d1[0], ...p, d1[1]];
  };
  const xPoints = points(a.x, b.x);
  const yPoints = points(a.y, b.y);
  const zPoints = points(a.z, b.z);

  const areas = [];
  for (let i = 0; i < xPoints.length - 1; i++) {
    for (let j = 0; j < yPoints.length - 1; j++) {
      for (let k = 0; k < zPoints.length - 1; k++) {
        areas.push({
          x: xPoints.slice(i, i + 2),
          y: yPoints.slice(j, j + 2),
          z: zPoints.slice(k, k + 2),
        });
      }
    }
  }
  return areas.filter((x) => !overlaps(x, b));
}

function calculateAreas(input) {
  const commands = input.split('\n').map((line) => {
    const [operation, rest] = line.split(' ');
    let [x, y, z] = rest
      .split(',')
      .map((x) => x.slice(2).split('..').map(Number));
    return {
      operation,
      x: [x[0], x[1] + 1],
      y: [y[0], y[1] + 1],
      z: [z[0], z[1] + 1],
    };
  });

  let areas = [];
  for (const command of commands) {
    areas = areas.flatMap((x) =>
      overlaps(x, command) ? subtract(x, command) : [x]
    );
    if (command.operation === 'on') areas.push(command);
  }
  return areas;
}

function volume(areas) {
  let total = 0;
  for (const { x, y, z } of areas) {
    total += (x[1] - x[0]) * (y[1] - y[0]) * (z[1] - z[0]);
  }
  return total;
}

function Part1(input) {
  const areas = calculateAreas(input);
  const rest = calculateAreas(`${input}\noff x=-50..50,y=-50..50,z=-50..50`);
  return volume(areas) - volume(rest);
}

function Part2(input) {
  const areas = calculateAreas(input);
  return volume(areas);
}

console.log(`Part 1: ${Part1(file)}`); // 600458
console.log(`Part 2: ${Part2(file)}`); // 1334275219162622

// Test data
const testData = `on x=-20..26,y=-36..17,z=-47..7
on x=-20..33,y=-21..23,z=-26..28
on x=-22..28,y=-29..23,z=-38..16
on x=-46..7,y=-6..46,z=-50..-1
on x=-49..1,y=-3..46,z=-24..28
on x=2..47,y=-22..22,z=-23..27
on x=-27..23,y=-28..26,z=-21..29
on x=-39..5,y=-6..47,z=-3..44
on x=-30..21,y=-8..43,z=-13..34
on x=-22..26,y=-27..20,z=-29..19
off x=-48..-32,y=26..41,z=-47..-37
on x=-12..35,y=6..50,z=-50..-2
off x=-48..-32,y=-32..-16,z=-15..-5
on x=-18..26,y=-33..15,z=-7..46
off x=-40..-22,y=-38..-28,z=23..41
on x=-16..35,y=-41..10,z=-47..6
off x=-32..-23,y=11..30,z=-14..3
on x=-49..-5,y=-3..45,z=-29..18
off x=18..30,y=-20..-8,z=-3..13
on x=-41..9,y=-7..43,z=-33..15
on x=-54112..-39298,y=-85059..-49293,z=-27449..7877
on x=967..23432,y=45373..81175,z=27513..53682`;

console.log(`\n\n ~ TESTS ~ `);
// Part 1 tests
assert.strictEqual(Part1(testData), 590784);

// Part 2 tests
assert.strictEqual(Part2(testData), 39769202357779);
