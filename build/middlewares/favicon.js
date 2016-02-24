'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// There's no favicon.ico by default on the server and those
// requests are ignored. If you need it favicon.ico, use
// https://www.npmjs.com/package/serve-favicon

exports.default = function (req, res, next) {
  if (req.originalUrl === '/favicon.ico') {
    res.status(404).end();
  }

  next();
};