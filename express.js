/**
 * Created by xiaoling on 25/07/2017.
 */

const path = require('path');
const express = require('express');
const history = require('connect-history-api-fallback');
const logger = require('./logger');

module.exports.init = (publicPath, publicPathex) => {
  const app = express();

  app.disable('x-powered-by');
  app.use(history({
    index: '/'
  }));
  app.use('/', express.static(path.resolve('workspace/running'), {maxAge: 3600 * 24}));
  app.use('/', express.static(path.resolve(publicPath), {maxAge: 0}));
  if (publicPathex) {
    app.use('/', express.static(path.resolve(publicPathex), {maxAge: 3600 * 24}));
  }

  app.use(function (err, req, res, next) {
    if (!err) {
      logger.red(err);
      next();
    }
    res.status(500).send(JSON.stringify(err));
  });

  return app;
};
