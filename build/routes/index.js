'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); /**
                                          * Created by Tommz on 24/02/16.
                                          */


router.get('/', function (req, res) {
  res.send('Hello world!');
});

// Load other routes
router.use('/things', require('./things'));

module.exports = router;