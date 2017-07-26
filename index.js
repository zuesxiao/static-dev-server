/**
 * Created by xiaoling on 25/07/2017.
 */

const port = process.env.PORT || 3000;
const watchPath = process.env.WATCH_PATH || 'workspace';
const watchCmd = process.env.WATHC_CMD || 'npm run build';
const publicPath = process.env.PUBLIC_PATH || 'workspace/dist';
const publicpathex = process.env.PUBLIC_PATH_EX;

const watcher = require('./watcher');
const express = require('./express');

const app = express.init(publicPath, publicpathex);

app.listen(port, () => {
  watcher.watch(watchPath, watchCmd);
});
