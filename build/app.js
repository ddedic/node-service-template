'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _normalizePort = require('./helpers/normalizePort');

var _normalizePort2 = _interopRequireDefault(_normalizePort);

var _favicon = require('./middlewares/favicon');

var _favicon2 = _interopRequireDefault(_favicon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

// Middlwares
app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.json());
app.use(_favicon2.default);

// Get port from environment and store in Express.
app.set('port', (0, _normalizePort2.default)(process.env.PORT || '3000'));

// Register routes
app.use('/', require('./routes'));

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handlers
// Development error handler, will print stacktrace
if (app.get('NODE_ENV') === 'dev') {
  app.use(function (err, req, res) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// Production error handler, no stacktraces leaked to user
app.use(function (err, req, res) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});

exports.default = app;