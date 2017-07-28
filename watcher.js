/**
 * Created by xiaoling on 25/07/2017.
 */

const process = require('child_process');
const path = require('path');
const fs = require('fs');
const chokidar = require('chokidar');
const chalk = require('chalk');

const watches = {};

module.exports.watch = (watchPath, watchCmd) => {
  const rootPath = path.resolve(watchPath);
  fs.readdir(rootPath, (err, files) => {
    if (err) {
      console.log(err);
      return;
    }

    files.forEach((file) => {
      const realPath = path.resolve(rootPath, file);
      watches[file] = {realPath: realPath, changes: 0, isRunning: false};
      const stats = fs.lstatSync(realPath);
      if (stats.isDirectory()) {
        console.log(chalk.yellow(`Start to watch ${realPath}`));
        chokidar.watch(realPath, {ignored: /node_modules|git|idea/, ignoreInitial: true}).on('all', (eventType, path) => {
          console.log(chalk.blue(`${eventType} : ${path}`));
          const watch = watches[file];
          if (!watch.isRunning) {
            watch.isRunning = true;
            console.log(chalk.yellow(`Start build for ${file}`));
            process.exec(`cd ${watch.realPath} && ${watchCmd}`, (err) => {
              if (err) {
                console.log(chalk.red(`Build for ${file} with error`));
                console.log(chalk.red(err));
                watch.isRunning = false;
                return;
              }
              console.log(chalk.green(`Build for ${file} complete`));
              watch.isRunning = false;
            });
          }
        })
      }
    });
  });
};
