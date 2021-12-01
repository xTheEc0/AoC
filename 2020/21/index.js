import fs from 'fs';
import assert from 'assert';

const file = fs.readFileSync('./input.txt', 'utf8');

const parse = (input) => {
  let allIngredients = new Map();
  const allAllergens = new Set();
  const foods = input
    .split('\r\n')
    .map((line) => line.replace(')', '').split(' (contains '))
    .map(([ingredients, allergens]) => ({
      ingredients: ingredients.split(' '),
      allergens: allergens.split(', '),
    }));
  foods.forEach((food) => {
    food.ingredients.forEach((x) => {
      const ingredient = allIngredients.get(x);
      if (ingredient) {
        ingredient.count++;
      } else {
        allIngredients.set(x, { count: 1, mightContain: new Set(), name: x });
      }
    });
    food.allergens.forEach((x) => allAllergens.add(x));
  });
  allIngredients = [...allIngredients.values()];
  allIngredients.forEach((ingredient) => (ingredient.mightContain = new Set(allAllergens)));
  foods.forEach((food) => {
    allIngredients.forEach((ingredient) => {
      if (!food.ingredients.includes(ingredient.name)) {
        food.allergens.forEach((x) => ingredient.mightContain.delete(x));
      }
    });
  });
  return allIngredients;
};

const Part1 = (input) => {
  const allIngredients = parse(input).filter((x) => x.mightContain.size === 0);
  return allIngredients.reduce((sum, { count }) => sum + count, 0);
};

const Part2 = (input) => {
  const allIngredients = parse(input).filter((x) => x.mightContain.size !== 0);
  let done;
  while (done !== allIngredients.length) {
    done = 0;
    allIngredients.forEach((ingredient) => {
      if (ingredient.contains) {
        done++;
      } else if (ingredient.mightContain.size === 1) {
        ingredient.contains = [...ingredient.mightContain.values()].pop();
        allIngredients.forEach((x) => x.mightContain.delete(ingredient.contains));
      }
    });
  }
  return allIngredients
    .sort((a, b) => a.contains.localeCompare(b.contains))
    .map((x) => x.name)
    .join(',');
};

console.time('Part 1');
console.log(`Part 1: ${Part1(file)}`); // 2302
console.timeEnd('Part 1'); // ~13ms

console.log();

console.time('Part 2');
console.log(`Part 2: ${Part2(file)}`); // smfz,vhkj,qzlmr,tvdvzd,lcb,lrqqqsg,dfzqlk,shp
console.timeEnd('Part 2'); // ~19ms

// Test data
const testData = fs.readFileSync('./testInput.txt', 'utf8');

// Part 1 tests
assert.strictEqual(Part1(testData), 5);

// Part 2 tests
assert.strictEqual(Part2(testData), 'mxmxvkd,sqjhc,fvjkl');
