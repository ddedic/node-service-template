import express from 'express';
import _ from 'lodash';
import Thing from '../models/thing';

const router = express.Router();

function generateNotFoundError() {
  var err = new Error('Resource Not Found');
  err.status = 404;
  return err;
}

// GET /things
router.get('/', (req, res, next) => {
  Thing.find((err, things) => {
    if (err) {
      return next(err);
    }

    res.json(things);
  });
});

// GET /things/:id
router.get('/:id', (req, res, next) => {
  Thing.findById(req.params.id, (err, thing) => {
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
router.post('/', (req, res, next) => {
  Thing.create(req.body, (err, thing) => {
    if (err) {
      return next(err);
    }

    res.send(thing);
  });
});

// PUT /things/:id
router.put('/:id', (req, res, next) => {
  Thing.findById(req.params.id, (err, thing) => {
    if (err) {
      return next(err);
    }
    if (!thing) {
      return next(generateNotFoundError());
    }

    var updated = _.merge(thing, req.body);
    updated.save((err) => {
      if (err) {
        return next(err);
      }
      res.send(thing);
    });
  });
});

// PATCH /things/:id
router.patch('/:id', (req, res, next) => {
  Thing.findById(req.params.id, (err, thing) => {
    if (err) {
      return next(err);
    }
    if (!thing) {
      return next(generateNotFoundError());
    }

    var updated = _.merge(thing, req.body);
    updated.save((err) => {
      if (err) {
        return next(err);
      }
      res.send(thing);
    });
  });
});

// DELETE /things/:id
router.delete('/:id', (req, res, next) => {
  Thing.findById(req.params.id, (err, thing) => {
    if (err) {
      return next(err);
    }
    if (!thing) {
      return next(generateNotFoundError());
    }

    thing.remove((err) => {
      if (err) {
        return next(err);
      }
      res.status(204).end();
    });
  });
});

module.exports = router;
