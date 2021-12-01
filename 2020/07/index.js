import fs from 'fs';
import assert from 'assert';

const file = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

const Part1 = (input) => {
  const rules = input.reduce((rules, line) => {
    const [, color, otherColors] = /(\w+ \w+) bags contain (.*)\./.exec(line);

    const compatibleWith = otherColors !== 'no other bags' ? otherColors.split(', ').map((other) => /(\w+ \w+) bags?/.exec(other)[1]) : [];

    rules[color] = new Set();

    compatibleWith.forEach((otherColor) => rules[color].add(otherColor));

    return rules;
  }, {});

  const expand = (bag) => {
    const colors = [...rules[bag].values()];

    for (const color of rules[bag].values()) {
      colors.push(...expand(color));
    }

    return colors;
  };

  return Object.keys(rules).filter((key) => expand(key).includes('shiny gold')).length;
};

const Part2 = (input) => {
  const rules = input.reduce((rules, line) => {
    const [, color, otherColors] = /(\w+ \w+) bags contain (.*)\./.exec(line);

    const compatibleWith =
      otherColors !== 'no other bags'
        ? otherColors.split(', ').map((other) => {
            const [, units, color] = /(\d+) (\w+ \w+) bags?/.exec(other);

            return { units: parseInt(units), color };
          })
        : [];

    rules.set(color, []);

    compatibleWith.forEach((otherColor) => rules.get(color).push(otherColor));

    return rules;
  }, new Map());

  const traverse = (bag) => {
    let total = 0;

    for (const { color, units } of rules.get(bag)) {
      total += units + units * traverse(color);
    }

    return total;
  };

  return traverse('shiny gold');
};

console.log(`Part 1: ${Part1(file)}`); // 161
console.log(`Part 2: ${Part2(file)}`); // 30899

// Test data
const testData1 = fs.readFileSync('./testInput1.txt', 'utf8').split('\r\n');
const testData2 = fs.readFileSync('./testInput2.txt', 'utf8').split('\r\n');

// Part 1 tests
assert.strictEqual(Part1(testData1), 4);

// Part 2 tests
assert.strictEqual(Part2(testData2), 126);
