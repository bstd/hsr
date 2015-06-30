var express = require('express'),
	indexController = require('../controller/indexController'),
	router = express.Router();

// index route
router.get('/', function(req, res) {
	indexController.index(req, res);
});

// route filtered
router.get('/filtered', function(req, res) {
	indexController.filtered(req, res);
});

// route sort due date
router.get('/sortduedate', function(req, res) {
	indexController.sortduedate(req, res);
});

// route sort creation date
router.get('/sortcreationdate', function(req, res) {
	indexController.sortcreationdate(req, res);
});

// route sort importance
router.get('/sortimportance', function(req, res) {
	indexController.sortimportance(req, res);
});


module.exports = router;
