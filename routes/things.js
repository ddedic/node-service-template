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

// GET /things/:id
router.get('/:id', (req, res, next) => {
  Thing.findById(req.params.id, (err, thing) => {
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

// PUT /things/:id
router.put('/:id', (req, res, next) => {
  Thing.update({ _id: req.body.id }, req.body, { upsert: true }, (err) => {
    if (err) return next(err);

    return res.status(200).end();
  });
});

// DELETE /things/:id
router.delete('/:id', (req, res, next) => {
  Thing.findByIdAndRemove(req.params.id, (err) => {
    if (err) return next(err);

    return res.status(204).end();
  });
});

module.exports = router;
