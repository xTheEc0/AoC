import fs from 'fs';
import assert from 'assert';

const file = fs.readFileSync('./input.txt', 'utf8').split('\r\n').map(Number);

function Part1(input, preamble = 25) {
  for (let i = preamble; i < input.length; i++) {
    if (!contains(input[i], new Set(input.slice(i - preamble, i)))) {
      return input[i];
    }
  }
}

function Part2(input, preamble = 25) {
  for (let i = preamble; i < input.length; i++) {
    if (!contains(input[i], new Set(input.slice(i - preamble, i)))) {
      return contiguous(input, input[i]);
    }
  }
}

function contiguous(numbers, sum) {
  for (let i = 0; i < numbers.length; i++) {
    let total = numbers[i];

    for (let j = i + 1; j < numbers.length; j++) {
      const subTotal = total + numbers[j];

      if (subTotal > sum) {
        break;
      } else if (subTotal === sum) {
        const range = numbers.slice(i, j);

        return Math.min(...range) + Math.max(...range);
      } else {
        total += numbers[j];
      }
    }
  }
}

function contains(sum, range) {
  return [...range.values()].some((number) => range.has(sum - number));
}

console.log(`Part 1: ${Part1(file)}`); // 400480901
console.log(`Part 2: ${Part2(file)}`); // 67587168

// Test data
const testData = `35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`
  .trim()
  .split('\n')
  .map(Number);

// Part 1 tests
assert.strictEqual(Part1(testData, 5), 127);

// Part 2 tests
assert.strictEqual(Part2(testData, 5), 62);
