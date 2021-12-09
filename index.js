// Create template index.js and input.txt files inside the current day folder for todays Advent of Code challenge.

import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

// Current date / day
const currentDate = new Date();
const day = String(currentDate.getDate()).padStart(2, '0');
const month = String(currentDate.getMonth() + 1).padStart(2, '0');
const year = String(currentDate.getFullYear());

// Setup readline to read user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Ask user if he wants to create a AoC file structure for today
rl.question('Do you want to create a new AoC Day? (y/n) ', (answer) => {
    if (answer === 'y' || answer === 'Y' || answer === 'yes' || answer === 'Yes' || answer === 'YES') {
        CreateTodaysFileStructure();
    } else {
        console.log('Exiting...');
    }
    rl.close();
});


// Check if it is December
function CreateTodaysFileStructure() {
    if (month === '12') {
        console.log('It is December...');

        // Create a current year folder if it does not exist yet
        if (!fs.existsSync(year)) {
            fs.mkdirSync(year);
            console.log(`Created ${year} folder`);
        }
        else { console.log(`Year ${year} folder already exists`); }

        // Create a current day folder if it does not exist yet
        if (!fs.existsSync(`${year}/${day}`)) {
            fs.mkdirSync(`${year}/${day}`);
            console.log(`Created ${year}/${day} folder`);
        }
        else { console.log(`Year ${year}, Day ${day} folder already exists`); }

        // Move index.js from utils/templates to current day folder if it does not exist yet
        if (!fs.existsSync(`${year}/${day}/index.js`)) {
            const __dirname = dirname(fileURLToPath(import.meta.url));
            fs.copyFileSync(`${__dirname}/utils/templates/index.js`, `${__dirname}/${year}/${day}/index.js`);
            console.log(`Created index.js file for ${year}/${day}`);
        }
        else { console.log(`index.js already exists for ${year}/${day}`); }

        // Create an empty input.txt file if it does not exist yet
        if (!fs.existsSync(`${year}/${day}/input.txt`)) {
            fs.writeFileSync(`${year}/${day}/input.txt`, '');
            console.log(`Created input.txt for ${year}/${day}`);
        }
        else { console.log(`input.txt already exists for ${year}/${day}`); }

        console.log(`Done with AoC ${year} Day ${day} setup! : )`);
    }
    else {
        console.log(`It is ${currentDate.toLocaleString('default', {month: 'long'})}, not December, so no points in creating stuff yet, right? Exiting...`)
    }
}
