const readline = require('readline');

function readSyncByRl(tips = '>') {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question(tips, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

async function questAnswer({ question, defVal }) {
  return await readSyncByRl(`${question} \r\n>`) || defVal
}

module.exports = {
  questAnswer
}