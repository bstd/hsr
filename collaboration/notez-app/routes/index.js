var express = require('express');
var router = express.Router();

// GET notez home page
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Notez Startseite' });
});

module.exports = router;
