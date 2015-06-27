var notezStore = require('../services/notezStore');


// GET note detail (view)
module.exports.showNote = function(req, res, next) {
	notezStore.get(req.params.id, function(err, note) {
		res.render('edit', note);
	});
}

// PUT note detail (edit)
module.exports.editNote = function(req, res, next) {
	res.send('put');
}

// POST note (save new)
module.exports.addNote = function(req, res, next) {
	res.send('post');
};
