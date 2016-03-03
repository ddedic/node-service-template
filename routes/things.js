import express from 'express';
import Thing from '../models/thing';

const router = new express.Router();

function generateNotFoundError() {
  const err = new Error('Resource Not Found');
  err.status = 404;
  return err;
}

// GET /things
router.get('/', (req, res, next) => {
  Thing.find((err, things) => {
    if (err) return next(err);

    return res.json(things);
  });
});

// GET /things/:thingsId
router.get('/:thingsId', (req, res, next) => {
  Thing.findById(req.params.thingsId, (err, thing) => {
    if (err) return next(err);
    if (!thing) return next(generateNotFoundError());

    return res.send(thing);
  });
});

// POST /things
router.post('/', (req, res, next) => {
  Thing.create(req.body, (err, thing) => {
    if (err) return next(err);

    return res.status(201).send(thing);
  });
});

// PUT /things/:thingsId
router.put('/:thingsId', (req, res, next) => {
  Thing.update({ _id: req.params.thingsId }, req.body, { upsert: true }, (err) => {
    if (err) return next(err);

    return res.status(200).end();
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
