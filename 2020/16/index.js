const fs = require('fs');
const assert = require('assert');

const file = fs.readFileSync('./input.txt', 'utf8');

const Part1 = (input) => {
  const blocks = input.split(/[\r\n]{3,}/g);

  const fields = blocks[0].split('\r\n').map((field) => {
    const [, r1min, r1max, r2min, r2max] = /: (\d+)-(\d+) or (\d+)-(\d+)/.exec(field);

    return [parseInt(r1min), parseInt(r1max), parseInt(r2min), parseInt(r2max)];
  });

  const nearbyTickets = blocks[2]
    .split('\r\n')
    .slice(1)
    .map((line) => line.split(',').map(Number));

  return nearbyTickets.flat().reduce((errorRate, ticket) => {
    if (!fields.some(([r1min, r1max, r2min, r2max]) => (ticket >= r1min && ticket <= r1max) || (ticket >= r2min && ticket <= r2max))) {
      errorRate += ticket;
    }

    return errorRate;
  }, 0);
};

const Part2 = (input) => {
  const blocks = input.split(/[\r\n]{3,}/g);

  let fields = blocks[0].split('\r\n').map((field) => {
    const [, name, r1min, r1max, r2min, r2max] = /(.*): (\d+)-(\d+) or (\d+)-(\d+)/.exec(field);

    return [name.trim(), parseInt(r1min), parseInt(r1max), parseInt(r2min), parseInt(r2max)];
  });

  const myTicket = blocks[1]
    .split('\r\n')
    .slice(1)
    .map((line) => line.split(',').map(Number))[0];

  const nearbyTickets = blocks[2]
    .split('\r\n')
    .slice(1)
    .map((line) => line.split(',').map(Number))
    .filter((ticket) => {
      return ticket.every((number) =>
        fields.some(([, r1min, r1max, r2min, r2max]) => (number >= r1min && number <= r1max) || (number >= r2min && number <= r2max))
      );
    });

  const columns = Array.from({ length: myTicket.length }).map((_, i) => [i, nearbyTickets.map((numbers) => numbers[i])]);

  let result = 1;

  while (columns.length) {
    const [column, numbers] = columns.shift();

    const matches = fields.filter(([, r1min, r1max, r2min, r2max]) => {
      return numbers.every((number) => (number >= r1min && number <= r1max) || (number >= r2min && number <= r2max));
    });

    if (matches.length === 1) {
      fields = fields.filter(([name]) => name !== matches[0][0]);

      if (/departure/.test(matches[0][0])) {
        result *= myTicket[column];
      }
    } else {
      columns.push([column, numbers]);
    }
  }

  return result;
};

console.log(`Part 1: ${Part1(file)}`); // 21978
console.log(`Part 2: ${Part2(file)}`); // 1053686852011

// Test data
const testData1 = fs.readFileSync('./testInput1.txt', 'utf8');
const testData2 = fs.readFileSync('./testInput2.txt', 'utf8');

// Part 1 tests
assert.strictEqual(Part1(testData1), 71);

// Part 2 tests
assert.strictEqual(Part2(testData2), 1);
