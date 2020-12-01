const fs = require('fs');
const path = require('path');
const assert = require('assert');

const file = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split(',').map(v => Number.parseInt(v));
file[1] = 12;
file[2] = 2;

const opcode = (inp) => {
  let a = [...inp];
  for (let p = 0; p <= a.length; p += 4) {
    switch (a[p]) {
      case 1:
        a[a[p+3]] = a[a[p+1]] + a[a[p+2]]; 
        break;
      case 2:
				a[a[p+3]] = a[a[p+1]] * a[a[p+2]];
				break;
			case 99:
				return a;
			default:
				return -1;
    }
  }
  if (a[a.length - 1] == 99)
    return a;
  else
    return -2;
};

assert.deepEqual(opcode([1, 0, 0, 0, 99]), [2, 0, 0, 0, 99]);
assert.deepEqual(opcode([2, 3, 0, 3, 99]), [2, 3, 0, 6, 99]);
assert.deepEqual(opcode([2, 4, 4, 5, 99, 0]), [2, 4, 4, 5, 99, 9801]);
assert.deepEqual(opcode([1, 1, 1, 4, 99, 5, 6, 0, 99]), [30, 1, 1, 4, 2, 5, 6, 0, 99]); 
console.log(`2-1 answer: ${opcode(file)[0]}`)


const find = (inp, r) => {
  for (let n = 0; n < 100; ++n) {
    for (let v = 0; v < 100; ++v) {
      let a = [...inp];
      a[1] = n;
      a[2] = v;
      let res = opcode(a)[0];
      if (res == r)
      {
        console.log(`\n100 * ${n} + ${v} = ${100 * n + v}`);
        return 100 * n + v;
      }
    }
  }
  return 'Not Found';
};

console.log(`2-2 answer: ${find(file, 19690720)}`);