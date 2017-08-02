/**
 * Created by xiaoling on 25/07/2017.
 */

const childProcess = require('child_process');
const path = require('path');
const fs = require('fs');
const chokidar = require('chokidar');

const logger = require('./logger');

const EVENT_TYPES = ['add', 'change', 'unlink'];
const watches = {};

module.exports.watch = (watchPath, watchCmd, workPath) => {
  const rootPath = path.resolve(watchPath);
  fs.readdir(rootPath, (err, files) => {
    if (err) {
      logger.red(err);
      return;
    }

    files.forEach((file) => {
      const realPath = path.resolve(rootPath, file);
      const stats = fs.lstatSync(realPath);
      if (stats.isDirectory()) {
        logger.cyan(`Start to watch ${realPath}`);
        watches[file] = {
          realPath,
          changes: 0,
          isRunning: false
        };
        chokidar.watch(realPath, {ignored: /node_modules|git|idea|log|dist/, ignoreInitial: true})
          .on('all', (eventType, path) => {
            if (EVENT_TYPES.indexOf(eventType) >= 0) {
              logger.blue(`${eventType} : ${path}`);
              watches[file].changes += 1;
            }
          });
      }
    });
  });

  setInterval(() => {
    Object.keys(watches).forEach((key) => {
      const watch = watches[key];
      if (watch.isRunning) {
        logger.gray(`Building for ${key} is still running...`);
      } else if (watch.changes <= 0) {
        if (process.env.SHOW_NO_CHANGES) {
          logger.gray(`No changes for ${key} to be built.`);
        }
      } else {
        watch.isRunning = true;
        logger.cyan(`Start build for ${key}, wait a moment...`);
        childProcess.exec(`cd ${watch.realPath} && ${watchCmd} -- -d ${path.resolve(workPath)}`, (err) => {
          watch.isRunning = false;
          if (err) {
            logger.red(`Build for ${key} with error`);
            logger.red(err);
            return;
          }
          logger.green(`Build for ${key} complete`);
          watch.changes = 0;
        });
      }
    });
  }, 1000);
};
