'use strict';

module.exports = function(app) {

  // Insert routes below
  app.use('/things', require('./api/thing'));
};
