/**
 * Created by xiaoling on 25/07/2017.
 */

const process = require('child_process');
const path = require('path');
const fs = require('fs');
const chokidar = require('chokidar');

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
        console.log(`Start to watch ${realPath}`);
        chokidar.watch(realPath, {ignored: /node_modules|git|idea/, ignoreInitial: true}).on('all', (eventType, path) => {
          console.log(`${eventType} : ${path}`);
          const watch = watches[file];
          if (!watch.isRunning) {
            watch.isRunning = true;
            console.log(`Start build for ${file}`);
            process.exec(`cd ${watch.realPath} && ${watchCmd}`, (err) => {
              if (err) {
                console.error(err);
                return;
              }
              console.log(`Build for ${file} complete`);
              watch.isRunning = false;
            });
          }
        })
      }
    });
  });
};
