/**
 * Created by xiaoling on 28/07/2017.
 */

const readline = require('readline');

module.exports = (message, amountOfDots) => {
  if (typeof amountOfDots !== 'number') {
    amountOfDots = 5;
  }

  let i = 0;
  return setInterval(function () {
    readline.cursorTo(process.stdout, 0);
    i = (i + 1) % (amountOfDots + 1);
    const dots = new Array(i + 1).join('.');
    process.stdout.write(message + dots);
  }, 500);
};
