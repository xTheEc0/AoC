import fs from 'fs';
import assert from 'assert';

const file = fs.readFileSync('./input.txt', 'utf8');

const toBorder = (line) => {
  return parseInt(line.replaceAll('.', '0').replaceAll('#', '1'), 2);
};
const reverse = (line) => {
  return line.split('').reverse().join('');
};
const topBorder = (tile) => {
  return tile[0];
};
const bottomBorder = (tile) => {
  return tile[tile.length - 1];
};
const leftBorder = (tile) => {
  return tile.map((x) => x[0]).join('');
};
const rightBorder = (tile) => {
  return tile.map((x) => x[x.length - 1]).join('');
};
const rotateRight = (tile) => {
  return tile.map((row, i) =>
    [...tile]
      .reverse()
      .map((x) => x[i])
      .join('')
  );
};
const mirrorHorizontal = (tile) => {
  return tile.map((line) => line.split('').reverse().join(''));
};

const getBorders = (tile) => {
  return [
    toBorder(topBorder(tile)),
    toBorder(bottomBorder(tile)),
    toBorder(leftBorder(tile)),
    toBorder(rightBorder(tile)),
    toBorder(reverse(bottomBorder(tile))),
    toBorder(reverse(topBorder(tile))),
    toBorder(reverse(rightBorder(tile))),
    toBorder(reverse(leftBorder(tile))),
  ];
};

const parse = (tile) => {
  let [id, ...rest] = tile.split('\r\n');
  [, id] = id.match(/^Tile (\d+):$/);
  id = +id;
  return {
    id,
    tile: rest,
    borders: getBorders([...rest]),
  };
};

const countMonsters = (image) => {
  const pattern = [/^..................#./, /^#....##....##....###/, /^.#..#..#..#..#..#.../];
  let count = 0;
  for (let index = 0; index < image.length - 2; index++) {
    for (let i = 0; i < image.length; i++) {
      if (image[index].slice(i).match(pattern[0]) && image[index + 1].slice(i).match(pattern[1]) && image[index + 2].slice(i).match(pattern[2])) {
        count++;
      }
    }
  }
  return count;
};

const findCorners = (tiles) => {
  const borderToIds = new Map();
  tiles.forEach(({ id, borders }) => {
    borders.forEach((x) => {
      borderToIds.set(x, (borderToIds.get(x) || []).concat(id));
    });
  });
  const idToNeighbors = new Map();
  for (let [, ids] of borderToIds.entries()) {
    if (ids.length === 2) {
      const neighbors = ids.map((id) => idToNeighbors.get(id) || new Set());
      idToNeighbors.set(ids[0], neighbors[0].add(ids[1]));
      idToNeighbors.set(ids[1], neighbors[1].add(ids[0]));
    }
  }
  const corners = [];
  for (let [id, neighbors] of idToNeighbors.entries()) {
    if (neighbors.size == 2) {
      corners.push(+id);
    }
  }
  return corners;
};

const Part1 = (input) => {
  const tiles = input.split('\r\n\r\n').map((x) => parse(x));
  const corners = findCorners(tiles);
  return corners.reduce((a, b) => a * b, 1);
};

const Part2 = (input) => {
  let tiles = input.split('\r\n\r\n').map((x) => parse(x));
  const corners = findCorners(tiles);

  //0:top 1:bottom 2:left 3:right
  let image = [];
  const corner = tiles.find((x) => x.id === corners[0]);
  const sides = corner.borders.map((x) => {
    return tiles.filter((tile) => tile.borders.includes(x)).length;
  });
  tiles = tiles.filter((x) => x !== corner);
  if (sides[0] === 1 && sides[2] === 1) {
    //top left
  } else if (sides[0] === 1 && sides[3] === 1) {
    //top right
    corner.tile = mirrorHorizontal(corner.tile);
  } else if (sides[1] === 1 && sides[2] === 1) {
    //bottom left
    corner.tile = rotateRight(corner.tile);
  } else if (sides[1] === 1 && sides[3] === 1) {
    //bottom right
    corner.tile = rotateRight(corner.tile);
    corner.tile = rotateRight(corner.tile);
  }

  let j = 0;
  let i = 0;
  image[0] = [corner.tile];
  while (j >= 0) {
    while (i >= 0) {
      const r = toBorder(rightBorder(image[j][i]));
      const next = tiles.find((x) => x.borders.includes(r));
      tiles = tiles.filter((x) => x !== next);
      if (!next) {
        break;
      }
      if (next.borders.indexOf(r) > 3) {
        next.borders = next.borders.slice(4);
        next.tile = rotateRight(next.tile);
        next.tile = rotateRight(next.tile);
      }
      if (next.borders[0] === r) {
        next.tile = rotateRight(next.tile);
        next.tile = mirrorHorizontal(next.tile);
      }
      if (next.borders[1] === r) {
        next.tile = rotateRight(next.tile);
      }
      if (next.borders[3] === r) {
        next.tile = mirrorHorizontal(next.tile);
      }
      image[j][i + 1] = next.tile;
      i++;
    }
    i = 0;
    const b = toBorder(bottomBorder(image[j][i]));
    const next = tiles.find((x) => x.borders.includes(b));
    tiles = tiles.filter((x) => x !== next);
    if (!next) {
      break;
    }
    if (next.borders.indexOf(b) > 3) {
      next.borders = next.borders.slice(4);
      next.tile = rotateRight(next.tile);
      next.tile = rotateRight(next.tile);
    }
    if (next.borders[1] === b) {
      next.tile = rotateRight(next.tile);
      next.tile = rotateRight(next.tile);
      next.tile = mirrorHorizontal(next.tile);
    }
    if (next.borders[2] === b) {
      next.tile = rotateRight(next.tile);
      next.tile = mirrorHorizontal(next.tile);
    }
    if (next.borders[3] === b) {
      next.tile = rotateRight(next.tile);
      next.tile = rotateRight(next.tile);
      next.tile = rotateRight(next.tile);
    }
    image[j + 1] = [next.tile];
    j++;
  }
  j;
  image = image.reduce((complete, row) => {
    return complete.concat(
      row.reduce((combine, tile) => {
        tile = tile.slice(1, -1).map((line) => line.slice(1, -1));
        return combine.map((line, i) => line + tile[i]);
      }, new Array(row[0].length - 2).fill(''))
    );
  }, []);

  const count = [
    image,
    rotateRight(image),
    rotateRight(rotateRight(image)),
    rotateRight(rotateRight(rotateRight(image))),
    mirrorHorizontal(image),
    rotateRight(mirrorHorizontal(image)),
    rotateRight(rotateRight(mirrorHorizontal(image))),
    rotateRight(rotateRight(rotateRight(mirrorHorizontal(image)))),
  ].map((x) => countMonsters(x));

  const sum = image.map((line) => line.split('').filter((c) => c === '#').length).reduce((a, b) => a + b);
  return sum - count.find((x) => x !== 0) * 15;
};

console.time('Part 1');
console.log(`Part 1: ${Part1(file)}`); // 17032646100079
console.timeEnd('Part 1'); // ~10ms

console.log();

console.time('Part 2');
console.log(`Part 2: ${Part2(file)}`); // 2006
console.timeEnd('Part 2'); // ~34ms

// Test data
const testData = fs.readFileSync('./testInput.txt', 'utf8');

// Part 1 tests
assert.strictEqual(Part1(testData), 20899048083289);

// Part 2 tests
assert.strictEqual(Part2(testData), 273);
