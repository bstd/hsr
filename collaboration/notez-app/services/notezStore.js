var Datastore = require('nedb'),
	db = new Datastore({ filename: '/data/notez.db', autoload: true });


// TODO note properties
function Note(id, title, text, importance, creationDate, dueDate, done) {
	this.id = id;
	this.title = title;
	this.text = text;
	this.importance = importance;
	this.creationDate = JSON.stringify(new Date());
	this.dueDate = dueDate;
	this.done = false;
}


// add note
function publicAdd(id, title, text, importance, creationDate, dueDate, done, callback) {
	var note = new Note(id, title, text, importance, creationDate, dueDate, done);

	db.insert(note, function(err, newNote) {
		if (callback) {
			callback(err, newNote);
		}
	});
}


// TODO edit note (db.update)


// get note
function publicGet(id, callback) {
	db.findOne({ _id: id }, function(err, note) {
		callback(err, note);
	});
}


// GET all
function publicAll(callback) {
	db.find({}, function(err, all) {
		if (err) {
			res.send(err);
		}
		callback(err, all);
	});
}

module.exports = { add: publicAdd, get: publicGet, all: publicAll };
