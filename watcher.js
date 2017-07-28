/**
 * Created by xiaoling on 25/07/2017.
 */

const childProcess = require('child_process');
const path = require('path');
const fs = require('fs');
const chokidar = require('chokidar');

const looger = require('./logger')

const watches = {};

module.exports.watch = (watchPath, watchCmd) => {
  const rootPath = path.resolve(watchPath);
  fs.readdir(rootPath, (err, files) => {
    if (err) {
      looger.red(err);
      return;
    }

    files.forEach((file) => {
      const realPath = path.resolve(rootPath, file);
      watches[file] = {realPath: realPath, changes: 0, isRunning: false};
      const stats = fs.lstatSync(realPath);
      if (stats.isDirectory()) {
        looger.cyan(`Start to watch ${realPath}`);
        chokidar.watch(realPath, {ignored: /node_modules|git|idea/, ignoreInitial: true}).on('all', (eventType, path) => {
          looger.blue(`${eventType} : ${path}`);
          const watch = watches[file];
          if (!watch.isRunning) {
            watch.isRunning = true;
            looger.cyan(`Start build for ${file}`);
            childProcess.exec(`cd ${watch.realPath} && ${watchCmd}`, (err) => {
              watch.isRunning = false;
              if (err) {
                looger.red(`Build for ${file} with error`);
                looger.red(err);
                return;
              }
              looger.green(`Build for ${file} complete`);
            });
          }
        })
      }
    });
  });
};
