'use strict';

var express = require('express'),
  Router = express.Router,
  Thing = require('./../models/thing'),
  _ = require('lodash'),
  controller = {};

function createNotFoundError(message) {
  var err = new Error(message);
  err.status = 404;
  return err;
}

// Get list of things
controller.index = function(req, res, next) {
  Thing.find(function(err, things){
    if(err) {
      return next(err);
    }

    res.status(200).json(things);
  });
};

// Get a single thing
controller.show = function(req, res, next) {
  Thing.findById(req.params.id, function (err, thing) {
    if(err) {
      return next(err);
    }
    if(!thing) {
      return next(createNotFoundError('Resource Not Found'));
    }

    res.status(200).json(thing);
  });
};

// Creates a new thing.
controller.create = function(req, res, next) {
  Thing.create(req.body, function(err, thing) {
    if(err) {
      return next(err);
    }

    res.status(200).json(thing);
  });
};

// Updates an existing thing.
controller.update = function(req, res, next) {
  Thing.findById(req.params.id, function (err, thing) {
    if (err) {
      return next(err);
    }
    if(!thing) {
      return next(createNotFoundError('Resource Not Found'));
    }

    var updated = _.merge(thing, req.body);
    updated.save(function (err) {
      if (err) {
        return next(err);
      }
      res.status(200).json(thing);
    });
  });
};

// Deletes a thing.
controller.destroy = function(req, res, next) {
  Thing.findById(req.params.id, function (err, thing) {
    if(err) {
      return next(err);
    }
    if(!thing) {
      return next(createNotFoundError('Resource Not Found'));
    }

    thing.remove(function(err) {
      if(err) {
        return next(err);
      }
      res.status(204).send();
    });
  });
};

var router = Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
