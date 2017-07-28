/**
 * Created by xiaoling on 25/07/2017.
 */

const childProcess = require('child_process');
const path = require('path');
const fs = require('fs');
const chokidar = require('chokidar');

const logger = require('./logger');
const progress = require('./progress');

const watches = {};

module.exports.watch = (watchPath, watchCmd) => {
  const rootPath = path.resolve(watchPath);
  fs.readdir(rootPath, (err, files) => {
    if (err) {
      logger.red(err);
      return;
    }

    files.forEach((file) => {
      const realPath = path.resolve(rootPath, file);
      watches[file] = {realPath: realPath, changes: 0, isRunning: false};
      const stats = fs.lstatSync(realPath);
      if (stats.isDirectory()) {
        logger.cyan(`Start to watch ${realPath}`);
        chokidar.watch(realPath, {ignored: /node_modules|git|idea/, ignoreInitial: true}).on('all', (eventType, path) => {
          logger.blue(`${eventType} : ${path}`);
          const watch = watches[file];
          if (!watch.isRunning) {
            watch.isRunning = true;
            logger.cyan(`Start build for ${file}`);
            const interval = progress('');
            childProcess.exec(`cd ${watch.realPath} && ${watchCmd}`, (err) => {
              watch.isRunning = false;
              clearInterval(interval);
              if (err) {
                logger.red(`Build for ${file} with error`);
                logger.red(err);
                return;
              }
              logger.green(`Build for ${file} complete`);
            });
          }
        })
      }
    });
  });
};
