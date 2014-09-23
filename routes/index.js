var express = require('express');
var config = require('../config');
var i18n = require('i18n');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {
      title: res.__('i18n-test')
  });
});

/* GET to change locale. */
router.get('/changelanguage/:locale', function(req, res) {
  if (config.i18n.locales.indexOf(req.param('locale')) !== -1) {
    res.cookie(config.i18n.cookie, req.param('locale'));
  }
  res.redirect('/');
});

module.exports = router;
