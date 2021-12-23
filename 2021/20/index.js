import fs from 'fs';
import assert from 'assert';

const file = fs.readFileSync('./input.txt', 'utf8');

function buffer(image, c) {
  image = image.map((line) => [c, c, ...line, c, c]);
  const e = new Array(image[0].length).fill(c);
  return [e, e, ...image, e, e];
}

function enhance(image, algorithm) {
  const next = new Array(image.length).fill().map(() => []);
  const get = (i, j) => (image[i] && image[i][j]) || image[0][0];
  for (let i = 0; i < image.length; i++) {
    for (let j = 0; j < image[0].length; j++) {
      const area = [
        get(i - 1, j - 1),
        get(i - 1, j + 0),
        get(i - 1, j + 1),
        get(i + 0, j - 1),
        get(i + 0, j + 0),
        get(i + 0, j + 1),
        get(i + 1, j - 1),
        get(i + 1, j + 0),
        get(i + 1, j + 1),
      ].join('');
      const pixel = area.replaceAll('#', '1').replaceAll('.', '0');
      next[i][j] = algorithm[parseInt(pixel, 2)];
    }
  }
  return next;
}
function Part1(input, times = 2) {
  let [algorithm, image] = input.split('\n\n');
  image = image.split('\n').map((line) => line.split(''));
  for (let i = 0; i < times; i++) {
    image = buffer(image, i === 0 ? '.' : image[0][0]);
    image = enhance(image, algorithm);
  }
  return image.flat().filter((x) => x === '#').length;
}

function Part2(input) {
  return Part1(input, 50);
}

console.log(`Part 1: ${Part1(file)}`); // 5354
console.log(`Part 2: ${Part2(file)}`); // 18269

// Test data
const testData = `..#.#..#####.#.#.#.###.##.....###.##.#..###.####..#####..#....#..#..##..###..######.###...####..#..#####..##..#.#####...##.#.#..#.##..#.#......#.###.######.###.####...#.##.##..#..#..#####.....#.#....###..#.##......#.....#..#..#..##..#...##.######.####.####.#.#...#.......#..#.#.#...####.##.#......#..#...##.#.##..#...##.#.##..###.#......#.#.......#.#.#.####.###.##...#.....####.#..#..#.##.#....##..#.####....##...##..#...#......#.#.......#.......##..####..#...#.#.#...##..#.#..###..#####........#..####......#..#

#..#.
#....
##..#
..#..
..###`;

console.log(`\n\n ~ TESTS ~ `);
// Part 1 tests
assert.strictEqual(Part1(testData), 35);

// Part 2 tests
assert.strictEqual(Part2(testData), 3351);
