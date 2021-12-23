// Create template index.js and input.txt files inside the current day folder for todays Advent of Code challenge.

import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();
const { SESSION_SECRET } = process.env;

// Current date / day
const currentDate = new Date();
const currentDay = String(currentDate.getDate()).padStart(2, '0');
const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
const currentYear = String(currentDate.getFullYear());

// cli args
const args = process.argv.slice(2);
const [year, day] = args;

// Setup readline to read user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Ask user if he wants to create a AoC file structure for today
rl.question('Do you want to create a new AoC Day? (y/n) ', (answer) => {
  if (
    answer === 'y' ||
    answer === 'Y' ||
    answer === 'yes' ||
    answer === 'Yes' ||
    answer === 'YES'
  ) {
    if (year && day) {
      CreateTodaysFileStructure(year, day);
    } else {
      CreateTodaysFileStructure(currentYear, currentDay, currentMonth);
    }
  } else {
    console.log('Exiting...');
  }
  rl.close();
});

// Check if it is December
function CreateTodaysFileStructure(year, day, month = 12) {
  if (month == '12' && day <= '25') {
    console.log('It is December...');

    // Create a current year folder if it does not exist yet
    if (!fs.existsSync(year)) {
      fs.mkdirSync(year);
      console.log(`Created ${year} folder`);
    } else {
      console.log(`Year ${year} folder already exists`);
    }

    // Create a current day folder if it does not exist yet
    if (!fs.existsSync(`${year}/${day}`)) {
      fs.mkdirSync(`${year}/${day}`);
      console.log(`Created ${year}/${day} folder`);
    } else {
      console.log(`Year ${year} Day ${day} folder already exists`);
    }

    // Move index.js from utils/templates to current day folder if it does not exist yet
    if (!fs.existsSync(`${year}/${day}/index.js`)) {
      const __dirname = dirname(fileURLToPath(import.meta.url));
      fs.copyFileSync(
        `${__dirname}/utils/templates/index.js`,
        `${__dirname}/${year}/${day}/index.js`
      );
      console.log(`Created index.js file for ${year}/${day}`);
    } else {
      console.log(`index.js already exists for ${year}/${day}`);
    }

    // Create an empty input.txt file if it does not exist yet
    if (!fs.existsSync(`${year}/${day}/input.txt`)) {
      downloadInputFile(year, day);
      console.log(`Created input.txt for ${year}/${day}`);
    } else {
      console.log(`input.txt already exists for ${year}/${day}`);
    }

    console.log(`Done with AoC ${year} Day ${day} setup! : )`);
  } else {
    console.log(
      `It is ${currentDate.toLocaleString('default', {
        month: 'long',
      })}, not December, so no points in creating stuff yet, right? Exiting...`
    );
  }
}

async function downloadInputFile(year, day) {
  const inputFileUrl = `https://adventofcode.com/${year}/day/${day}/input`;
  const inputFilePath = `${year}/${day}/input.txt`;

  let response = null;
  console.log(`Downloading input file for ${year} Day ${day}...`);
  try {
    response = await axios.get(inputFileUrl, {
      headers: {
        Cookie: `session=${SESSION_SECRET}`,
      },
    });
  } catch (error) {
    return console.error(`\n\n${error.message}\n\n`);
  }
  if (response) {
    fs.writeFileSync(inputFilePath, response.data.trim());
  }
}
