var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.set('Content-Type', 'text/plain');
  res.send('respond with a user resource');
});

module.exports = router;
