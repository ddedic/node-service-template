/**
 * Created by Tommz on 24/02/16.
 */
import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello world!');
});

// Load other routes
router.use('/things', require('./things'));

module.exports = router;
