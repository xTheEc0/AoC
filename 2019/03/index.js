const fs = require('fs');
const path = require('path');
const assert = require('assert');

const file = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split(',').map(v => Number.parseInt(v));
