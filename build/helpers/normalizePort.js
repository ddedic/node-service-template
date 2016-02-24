"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Normalize a port into a number, string, or false.

exports.default = function (val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};