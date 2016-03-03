import express from 'express';
const router = new express.Router();

router.get('/', (req, res) => {
  res.send('Hello world!');
});

// Load other routes
router.use('/things', require('./things'));

module.exports = router;
