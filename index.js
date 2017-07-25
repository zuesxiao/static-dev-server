/**
 * Created by xiaoling on 25/07/2017.
 */

const port = process.env.PORT || 8080;
const watchPath = process.env.WATCH_PATH || 'workspace';
const watchCmd = process.env.WATHC_CMD || 'npm run build';
const publicPath = process.env.PUBLIC_PATJ || 'workspace/dist';

const watcher = require('./watcher');
const express = require('./express');

const app = express.init(publicPath);

app.listen(port, () => {
  watcher.start(watchPath, watchCmd);
});
