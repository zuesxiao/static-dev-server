/**
 * Created by xiaoling on 25/07/2017.
 */

const path = require('path');
const express = require('express');

module.exports.init = (publicPath, publicPathex) => {
  const app = express();

  app.disable('x-powered-by');
  app.use('/', express.static(path.resolve('workspace/running'), {maxAge: 3600 * 24}));
  app.use('/', express.static(path.resolve(publicPath), {maxAge: 0}));
  if (publicPathex) {
    app.use('/', express.static(path.resolve(publicPathex), {maxAge: 3600 * 24}));
  }

  app.use(function (err, req, res, next) {
    if (!err) {
      next();
    }

    res.status(500).send(JSON.stringify(err));
  });

  app.use(function (req, res) {
    return res.redirect('/');
  });

  return app;
};
