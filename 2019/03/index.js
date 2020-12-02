const fs = require('fs');
const assert = require('assert');

const file = fs.readFileSync('./input.txt', 'utf8').split(',').map(Number);
