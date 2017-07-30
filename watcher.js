/**
 * Created by xiaoling on 25/07/2017.
 */

const childProcess = require('child_process');
const path = require('path');
const fs = require('fs');
const chokidar = require('chokidar');

const logger = require('./logger');

const watches = {};

const createHandler = (folder) => (eventType, path) => {
  logger.blue(`${eventType} : ${path}`);
  watches[folder].changes += 1;
};

module.exports.watch = (watchPath, watchCmd) => {
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
        const handler = createHandler(file);
        chokidar.watch(realPath, {ignored: /node_modules|git|idea|log/, ignoreInitial: true})
          .on('add', handler)
          .on('change', handler)
          .on('unlink', handler);
      }
    });
  });

  setInterval(() => {
    Object.keys(watches).forEach((key) => {
      const watch = watches[key];
      if (watch.isRunning) {
        logger.yellow(`Building for ${key} is still running...`);
      } else if (watch.changes <= 0) {
        if (process.env.SHOW_NO_CHANGES) {
          logger.gray(`No changes for ${key} to be built.`);
        }
      } else {
        watch.isRunning = true;
        logger.cyan(`Start build for ${key}, wait a moment...`);
        childProcess.exec(`cd ${watch.realPath} && ${watchCmd}`, (err) => {
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
