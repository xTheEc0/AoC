import fs from 'fs';
import assert from 'assert';

const file = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

function Part1(input) {
  const rotate = (origin, degrees) => (origin + degrees + 360) % 360;

  const ship = input.reduce(
    (ship, line) => {
      const action = line.trim()[0];
      const value = parseInt(line.trim().slice(1));
      const heading = ship.heading;

      ship.x += action === 'E' ? value : action === 'W' ? -value : 0;
      ship.y += action === 'N' ? value : action === 'S' ? -value : 0;

      ship.heading = rotate(
        heading,
        action === 'L' ? value : action === 'R' ? -value : 0
      );

      if (action === 'F') {
        ship.x += heading === 0 ? value : heading === 180 ? -value : 0;
        ship.y += heading === 90 ? value : heading === 270 ? -value : 0;
      }

      return ship;
    },
    { heading: 0, x: 0, y: 0 }
  );

  return Math.abs(ship.x) + Math.abs(ship.y);
}

function Part2(input) {
  const rotate = ([dx, dy], degrees) => {
    const rotations = {
      0: [dx, dy],
      90: [-dy, dx],
      180: [-dx, -dy],
      270: [dy, -dx],
    };

    return rotations[(degrees + 360) % 360];
  };

  const ship = input.reduce(
    (ship, line) => {
      const action = line.trim()[0];
      const value = parseInt(line.trim().slice(1));

      ship.wx += action === 'E' ? value : action === 'W' ? -value : 0;
      ship.wy += action === 'N' ? value : action === 'S' ? -value : 0;

      const [wx, wy] = rotate(
        [ship.wx, ship.wy],
        action === 'L' ? value : action === 'R' ? -value : 0
      );

      ship.wx = wx;
      ship.wy = wy;

      ship.x += action === 'F' ? ship.wx * value : 0;
      ship.y += action === 'F' ? ship.wy * value : 0;

      return ship;
    },
    { x: 0, y: 0, wx: 10, wy: 1 }
  );

  return Math.abs(ship.x) + Math.abs(ship.y);
}

console.log(`Part 1: ${Part1(file)}`); // 2847
console.log(`Part 2: ${Part2(file)}`); // 29839

// Test data
const testData = `
F10
N3
F7
R90
F11`
  .trim()
  .split('\n');

// Part 1 tests
assert.strictEqual(Part1(testData), 25);

// Part 2 tests
assert.strictEqual(Part2(testData), 286);
