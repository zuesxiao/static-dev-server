/**
 * Created by xiaoling on 25/07/2017.
 */

const process = require('child_process');
const fs = require('fs');
const path = require('path');
const watches = {};
const CHAGES_TO_RUN = 20;

module.exports.start = (watchPath, watchCmd) => {
  const rootPath = path.resolve(watchPath);
  fs.readdir(rootPath, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }

    files.forEach((file) => {
      const realPath = path.resolve(rootPath, file);
      watches[file] = {realPath: realPath, changes: 0, isRunning: false};
      const stats = fs.lstatSync(realPath);
      if (stats.isDirectory()) {
        fs.watch(realPath, {recursive: true}, () => {
          const watch = watches[file];
          if (!watch.isRunning && watch.changes > CHAGES_TO_RUN) {
            watch.isRunning = true;
            process.exec(`cd ${watch.realPath} && ${watchCmd}`, (err) => {
              if (err) {
                console.error(err);
                return;
              }
              watch.isRunning = false;
              watch.changes -= CHAGES_TO_RUN;
            });
          } else {
            watch.changes += 1;
          }
        });
      }
    });
  });
};
