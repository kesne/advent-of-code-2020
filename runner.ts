import signale, { Signale } from 'signale';
import fs from 'fs';

// Give ourselves a little bit of breathing room:
console.log('\n\n');

const logger = new Signale({
  types: {
    santa: {
      badge: '🎅',
      color: 'red',
      label: 'santa',
      logLevel: 'info',
    },
    solution: {
      badge: '🌟',
      color: 'green',
      label: 'solution',
      logLevel: 'info',
    },
  },
});

function guessDay() {
  const today = new Date();
  if (today.getFullYear() !== 2020 || today.getMonth() !== 11) {
    logger.fatal(
      "No day was provided, and it looks like I can't guess one either. Pass a day when starting the runner: `yarn start <day>`"
    );
    process.exit(1);
  }

  logger.debug(
    `No day was provided, but I'm assuming you wanted to run today's solutions: ${today.getDate()}`
  );

  return String(today.getDate());
}

async function main() {
  let [, , day] = process.argv;

  if (!day) {
    day = guessDay();
  }

  const { solution1, solution2 } = await import(`./solutions/${day}.ts`);
  const dayInput = fs.readFileSync(`./inputs/${day}.txt`, 'utf8');

  if (!solution1) {
    signale.warn('No solution 1 found. Make sure your module exports a "solution1" function.');
  } else {
    logger.santa('Running solution 1...');
    logger.solution(await solution1(dayInput));
    console.log();
  }

  if (!solution2) {
    signale.warn('No solution 2 found. Make sure your module exports a "solution2" function.');
  } else {
    logger.santa('Running solution 2...');
    logger.solution(await solution2(dayInput));
    console.log();
  }
}

main().catch((e) => {
  logger.error('Unexpected error occurred when running solutions.');
  logger.error(e);
});
