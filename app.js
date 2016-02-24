import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import normalizePort from './helpers/normalizePort';
import favicon from './middlewares/favicon';

const app = express();

// Middlwares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(favicon);

// Get port from environment and store in Express.
app.set('port', normalizePort(process.env.PORT || '3000'));

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
