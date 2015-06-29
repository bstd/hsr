var notezStore = require('../services/notezStore');


// GET note detail (view)
module.exports.showNote = function(req, res, next) {
	notezStore.get(req.params.id, function(err, note) {
		// provide different formats
		res.format({
			'text/html': function(){
				res.render('edit', note);
			},
			'application/json': function(){
				res.json(note);
			}
		});
	});
}

// PUT note detail (edit)
module.exports.editNote = function(req, res, next) {
	notezStore.edit(req.params.id, req.body, function(err, note) {
		res.format({
			'text/html': function(){
				res.redirect('/');
			},
			'application/json': function(){
				res.end();;// no redirect for json typed calls
			}
		});
	});
}

// POST note (save new)
module.exports.addNote = function(req, res, next) {
	notezStore.add(req.body, function(err) {
		res.redirect('/');
	});
};
