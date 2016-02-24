'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _thing = require('../models/thing');

var _thing2 = _interopRequireDefault(_thing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

function generateNotFoundError() {
  var err = new Error('Resource Not Found');
  err.status = 404;
  return err;
}

// GET /things
router.get('/', function (req, res, next) {
  _thing2.default.find(function (err, things) {
    if (err) {
      return next(err);
    }

    res.json(things);
  });
});

// GET /things/:id
router.get('/:id', function (req, res, next) {
  _thing2.default.findById(req.params.id, function (err, thing) {
    if (err) {
      return next(err);
    }
    if (!thing) {
      return next(generateNotFoundError());
    }

    res.send(thing);
  });
});

// POST /things
router.post('/', function (req, res, next) {
  _thing2.default.create(req.body, function (err, thing) {
    if (err) {
      return next(err);
    }

    res.send(thing);
  });
});

// PUT /things/:id
router.put('/:id', function (req, res, next) {
  _thing2.default.findById(req.params.id, function (err, thing) {
    if (err) {
      return next(err);
    }
    if (!thing) {
      return next(generateNotFoundError());
    }

    var updated = _lodash2.default.merge(thing, req.body);
    updated.save(function (err) {
      if (err) {
        return next(err);
      }
      res.send(thing);
    });
  });
});

// PATCH /things/:id
router.patch('/:id', function (req, res, next) {
  _thing2.default.findById(req.params.id, function (err, thing) {
    if (err) {
      return next(err);
    }
    if (!thing) {
      return next(generateNotFoundError());
    }

    var updated = _lodash2.default.merge(thing, req.body);
    updated.save(function (err) {
      if (err) {
        return next(err);
      }
      res.send(thing);
    });
  });
});

// DELETE /things/:id
router.delete('/:id', function (req, res, next) {
  _thing2.default.findById(req.params.id, function (err, thing) {
    if (err) {
      return next(err);
    }
    if (!thing) {
      return next(generateNotFoundError());
    }

    thing.remove(function (err) {
      if (err) {
        return next(err);
      }
      res.status(204).end();
    });
  });
});

module.exports = router;