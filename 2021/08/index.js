import fs from 'fs';
import assert from 'assert';

const file = fs.readFileSync('./input.txt', 'utf8');

function getMap(digits) {
    digits = digits.map(d => d.split('').sort().join(''));
    const one = digits.find(d => d.length === 2);
    const seven = digits.find(d => d.length === 3);
    const four = digits.find(d => d.length === 4);
    const eight = digits.find(d => d.length === 7);
    const six = [
        eight
            .split('')
            .filter(d => d !== one[0])
            .sort()
            .join(''),
        eight
            .split('')
            .filter(d => d !== one[1])
            .sort()
            .join(''),
    ].find(d => digits.indexOf(d) !== -1);
    const five = digits.find(d => {
        const l = six.split('').filter(x => d.indexOf(x) === -1).length;
        return d.length === 5 && l === 1;
    });
    const nine = [...new Set((one + five).split(''))].sort().join('');
    const zero = digits.find(d => d.length === 6 && d !== six && d !== nine);
    const two = digits.find(
        d =>
            (d.indexOf(one[0]) === -1 || d.indexOf(one[1]) === -1) &&
            d.length === 5 &&
            d !== five,
    );
    const three = digits.find(d => d.length === 5 && d !== five && d !== two);

    const map = {
        [one]: 1,
        [seven]: 7,
        [four]: 4,
        [eight]: 8,
        [five]: 5,
        [six]: 6,
        [nine]: 9,
        [two]: 2,
        [three]: 3,
        [zero]: 0,
    };
    return map;
}

function calcNum(output, map) {
    return +output
        .map(d => {
            return map[d.split('').sort().join('')];
        })
        .join('');
}

function guess(line) {
    const map = getMap(line[0].concat(line[1]));
    return calcNum(line[1], map);
}

function Part1(input) {
    const lines = input.split('\n').map(x => x.split(' | ')[1].split(' '));
    return lines
        .map(x => x.filter(x => x.length !== 5 && x.length !== 6))
        .map(x => x.length)
        .reduce((a, b) => a + b, 0);
}

function Part2(input) {
    const lines = input.split('\n').map(x => x.split(' | ').map(x => x.split(' ')));
    return lines.reduce((prev, line) => guess(line) + prev, 0);
}

console.log(`Part 1: ${Part1(file)}`); // 390
console.log(`Part 2: ${Part2(file)}`); // 1011785

// Test data
const testData = `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`

console.log(`\n\n ~ TESTS ~ `);
// Part 1 tests
assert.strictEqual(Part1(testData), 26);

// Part 2 tests
assert.strictEqual(Part2(testData), 61229);
