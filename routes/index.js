import express from 'express';
import debug from 'debug';
import { authenticate } from '../middleware/auth';

const log = debug('skeleton:routes');
const router = new express.Router();


// This route will be authenticated
router.get('/', authenticate(), (req, res) => {
  log('Entered / route handler.');
  log(`Object req.user equals to ${JSON.stringify(req.user, null, 2)}.`);
  res.send('Hello world!');
});

// Load other routes
router.use('/things', require('./things'));
router.use('/', authenticate(), require('./auth'));

module.exports = router;
