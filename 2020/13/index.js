import fs from 'fs';
import assert from 'assert';

const file = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

function Part1(input) {
  const findEarliest = (id, earliestTimestamp) => {
    let wait = id;
    while (wait < earliestTimestamp) {
      wait += id;
    }
    return wait;
  };

  const earliestTimestamp = parseInt(input[0].trim());
  const busses = input[1]
    .split(',')
    .filter((id) => id !== 'x')
    .map((id) => parseInt(id))
    .map((id) => ({ id, earliest: findEarliest(id, earliestTimestamp) }));

  const diff = busses.reduce((earliest, current) => (current.earliest < earliest.earliest ? current : earliest), busses[0]);
  return (diff.earliest - earliestTimestamp) * diff.id;
};

function Part2(input) {
  const solveMMI = (a, mod) => {
    const b = a % mod;
    for (let x = 1n; x < mod; x++) {
      if ((b * x) % mod === 1n) {
        return x;
      }
    }
    return 1n;
  };

  function solveCRT(system) {
    const prod = system.reduce((p, con) => p * con.n, 1n);
    return (
      system.reduce((sm, con) => {
        const p = prod / con.n;
        return sm + con.a * solveMMI(p, con.n) * p;
      }, 0n) % prod
    );
  };

  const congruences = input
    .split(',')
    .map((id, i) => ({ id, i }))
    .filter((eq) => eq.id !== 'x')
    .map((eq) => {
      const n = parseInt(eq.id.trim());
      return {
        n: BigInt(n),
        i: eq.i,
        a: BigInt(n - eq.i),
      };
    });

  return solveCRT(congruences);
};

console.log(`Part 1: ${Part1(file)}`); // 3464
console.log(`Part 2: ${Part2(file[1])}`); // 760171380521445.

// Test data
const testData = `
939
7,13,x,x,59,x,31,19`
  .trim()
  .split('\n');

// Part 1 tests
assert.strictEqual(Part1(testData), 295);

// Part 2 tests
assert.strictEqual(Part2(`7,13,x,x,59,x,31,19`), 1068781n);
assert.strictEqual(Part2(`17,x,13,19`), 3417n);
assert.strictEqual(Part2(`67,7,59,61`), 754018n);
assert.strictEqual(Part2(`67,x,7,59,61`), 779210n);
assert.strictEqual(Part2(`67,7,x,59,61`), 1261476n);
assert.strictEqual(Part2(`1789,37,47,1889`), 1202161486n);
