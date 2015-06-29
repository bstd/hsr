var express = require('express'),
	indexController = require('../controller/indexController'),
	router = express.Router();

// index route
router.get('/', function(req, res) {
	indexController.index(req, res);
});

module.exports = router;
