/**
 * Created by xiaoling on 25/07/2017.
 */

const port = process.env.PORT || 3000;
const watchPath = process.env.WATCH_PATH || 'workspace';
const watchCmd = process.env.WATHC_CMD || 'npm run build';
const publicPath = process.env.PUBLIC_PATH || 'workspace/dist';
const publicPathex = process.env.PUBLIC_PATH_EX;

const childProcess = require('child_process');
const watcher = require('./watcher');
const express = require('./express');
const logger = require('./logger');

const app = express.init(publicPath, publicPathex);

app.listen(port, () => {
  logger.magenta(`Static dev server start on port ${port}, have fun, :)\n`);
  logger.cyan('Start initialize building...');
  childProcess.exec(`cd workspace && npm run build`, (err) => {
    if (err) {
      logger.cyan('Initialize building meet some error:');
      logger.red(err);
    } else {
      logger.green('Initialize building complete...');
    }

    watcher.watch(watchPath, watchCmd);
  });
});
