'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _db = require('./data/db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var opts = {
  db: {
    safe: true
  }
};

// Connect to Database
_mongoose2.default.connect(_db2.default.getURI(), opts, function (err) {
  if (err) {
    console.log('ERROR connecting to: ' + _db2.default.getURI() + '. ' + err);
  } else {
    console.log('Successfully connected to: ' + _db2.default.getURI());
  }
});

exports.mongoose = _mongoose2.default;