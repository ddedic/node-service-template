import logger from 'morgan';

export default () => {
  if (process.env.NODE_ENV === 'development') {
    return logger('dev');
  }

  // TODO: Tenodi - implement production logger
  return (req, res, next) => next();
};
