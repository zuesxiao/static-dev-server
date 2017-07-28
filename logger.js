/**
 * Created by xiaoling on 28/07/2017.
 */

const chalk = require('chalk');
const log = console.log;

module.exports.log = log;

module.exports.red = function (content) {
  log(chalk.red(content));
};

module.exports.green = function (content) {
  log(chalk.green(content));
};

module.exports.blue = function (content) {
  log(chalk.red(content));
};

module.exports.yellow = function (content) {
  log(chalk.yellow(content));
};

module.exports.magenta = function (content) {
  log(chalk.magenta(content));
};

module.exports.cyan = function (content) {
  log(chalk.cyan(content));
};
