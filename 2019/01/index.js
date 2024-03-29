import fs from 'fs';
import assert from 'assert';

const file = fs.readFileSync('./input.txt', 'utf8').split('\n').map(Number);

function fuel(mass) {
  return Math.floor(mass / 3) - 2;
}

assert(fuel(12) == 2);
assert(fuel(14) == 2);
assert(fuel(1969) == 654);
assert(fuel(100756) == 33583);

console.log(
  `1-1 answer: ${file.reduce((total, mass) => total + fuel(mass), 0)}`
);

// --- // --- //

function fuelForFuel(mass) {
  let total = 0;
  let nextFuel = fuel(mass);

  while (nextFuel > 0) {
    total += nextFuel;
    nextFuel = fuel(nextFuel);
  }
  return total;
}

assert.strictEqual(fuelForFuel(14), 2);
assert.strictEqual(fuelForFuel(1969), 966);
assert.strictEqual(fuelForFuel(100756), 50346);

console.log(
  `1-2 answer: ${file.reduce((total, mass) => total + fuelForFuel(mass), 0)}`
);
