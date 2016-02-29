import express from 'express';
import bodyParser from 'body-parser';
import favicon from './middlewares/favicon';
import logger from './middlewares/logger';

const app = express();

// Middlwares
app.use(logger());
app.use(bodyParser.json());
app.use(favicon());

// Register routes
app.use('/', require('./routes'));

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handlers
// Development error handler, will print stacktrace
if (app.get('NODE_ENV') === 'dev') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err,
    });
  });
}

// Production error handler, no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {},
  });
});

export default app;
