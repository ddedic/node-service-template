import express from 'express';
import { Serializer, Deserializer } from 'jsonapi-serializer';

import Thing from '../models/thing';

const router = new express.Router();

// (De)serialization should be moved to separate middleware.
// TODO: matej - find the cleanest way to do it.

const serializer = new Serializer('things', {
  id: '_id',
  attributes: ['name', 'info', 'active'],
  keyForAttribute: 'camelCase',
  pluralizeType: false,
});

const deserializer = new Deserializer();


function generateNotFoundError() {
  const err = new Error('Resource Not Found');
  err.status = 404;
  return err;
}

// GET /things
router.get('/', (req, res, next) => {
  Thing.find((err, things) => {
    if (err) return next(err);

    return res.json(serializer.serialize(things));
  });
});

// GET /things/:thingsId
router.get('/:thingsId', (req, res, next) => {
  Thing.findById(req.params.thingsId, (err, thing) => {
    if (err) return next(err);
    if (!thing) return next(generateNotFoundError());

    return res.json(serializer.serialize(thing));
  });
});

// POST /things
router.post('/', (req, res, next) => {
  deserializer.deserialize(req.body, (err, result) => {
    if (err) return next(err);

    return Thing.create(result, (dbError, thing) => {
      if (dbError) return next(dbError);

      return res.json(serializer.serialize(thing));
    });
  });
});

// PUT /things/:id
router.put('/:id', (req, res, next) => {
  deserializer.deserialize(req.body, (err, result) => {
    if (err) return next(err);

    return Thing.update({ _id: req.body.id }, result, { upsert: true }, (dbError) => {
      if (dbError) return next(dbError);

      return res.status(200).end();
    });
  });
});

// DELETE /things/:thingsId
router.delete('/:thingsId', (req, res, next) => {
  Thing.findByIdAndRemove(req.params.thingsId, (err) => {
    if (err) return next(err);

    return res.status(204).end();
  });
});

module.exports = router;
