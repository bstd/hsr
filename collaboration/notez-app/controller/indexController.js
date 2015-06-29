var notezStore = require('../services/notezStore');


// GET notez home page
module.exports.index = function(req, res, next) {
	notezStore.all(function(err, all) {
		res.render('index', {items: all});
	});
};
