'use strict';

var express = require('express'),
    _ = require('lodash'),
    controller = {},
    thingsStorage = [];

var createNotFoundError = function(message) {
  var err = new Error(message);
  err.status = 404;
  return err;
};

// Get list of things
controller.index = function(req, res, next) {
  return res.status(200).json(thingsStorage);
};

// Get a single thing
controller.show = function(req, res, next) {
  var thing =_.find(thingsStorage, {id: req.params.id});
  if(thing){
    return res.status(200).json(thing);
  }

  next(createNotFoundError('Thing Not found'));
};

// Creates a new thing.
controller.create = function(req, res, next) {
  thingsStorage = _.union(thingsStorage, [req.body]);
  return res.status(201).json(req.body);
};

// Updates an existing thing.
controller.update = function(req, res, next) {
  var thing =_.find(thingsStorage, {id: req.params.id});
  if(thing){
    _.merge(thing, req.body);
    return res.status(200).json(thing);
  }

  next(createNotFoundError('Thing Not found'));
};

// Deletes a thing.
controller.destroy = function(req, res, next) {
  var removed = _.remove(thingsStorage, {id: req.params.id});
  if(removed.length > 0){
    return res.status(204).end();
  }

  next(createNotFoundError('Thing Not found'));
};

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
