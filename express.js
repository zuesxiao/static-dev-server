/**
 * Created by xiaoling on 25/07/2017.
 */

const path = require('path');
const express = require('express');

module.exports.init = (publicPath) => {
  const app = express();

  app.disable('x-powered-by');
  app.use('/', express.static(path.resolve(publicPath), {maxAge: 0}));

  app.use(function (err, req, res, next) {
    if (!err) {
      next();
    }

    res.status(500).send(JSON.stringify(err));
  });

  app.use(function (req, res) {
    return res.redirect('/index.html');
  });

  return app;
};
