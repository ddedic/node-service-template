import express from 'express';
import bodyParser from 'body-parser';
import favicon from './middleware/favicon';
import logger from './middleware/logger';
import auth from './middleware/auth';
import Cache from './services/cache';

const app = express();

// Middlewares
app.use(logger());
app.use(bodyParser.json());
app.use(favicon());
app.use(auth());

// Set cache
app.set('cache', Cache.instance);

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
if (process.env.NODE_ENV !== 'production') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err,
    });
  });
}

// Production error handler, no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {},
  });
});

export default app;
