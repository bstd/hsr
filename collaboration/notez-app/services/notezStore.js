var Datastore = require('nedb'),
	db = new Datastore({ filename: '../data/notez.db', autoload: true });


// TODO: note properties
// nedb automatically generates index (_id)!
function Note(title, text, importance, dueDate, done) {
	this.title = title;
	this.text = text;
	this.importance = importance;
	this.creationDate = JSON.stringify(new Date());// always new
	this.dueDate = dueDate;
	this.done = false;// initially false
}


// add note
function publicAdd(reqBody, callback) {
	// map req.body (form fields) to our short note properties
	var title = reqBody.inpTitle,
		text = reqBody.inpDescription,
		importance = reqBody.importance,
		dueDate = reqBody.inpDue,
		done = reqBody.inpDone;

	var note = new Note(title, text, importance, dueDate, done);

	db.insert(note, function(err, newNote) {
		if (callback) {
			callback(err, newNote);
		}
	});
}


// edit note
function publicEdit(id, reqBody, callback) {
	var id = id,
		title = reqBody.inpTitle,
		text = reqBody.inpDescription,
		importance = reqBody.importance,
		dueDate = reqBody.inpDue,
		done = reqBody.inpDone;

	var note = new Note(title, text, importance, dueDate, done);

	db.update({ _id: id }, note, {}, function (err, count) {
		if (callback) {
			callback(err, count);
		}
	});
}


// get single note
function publicGet(id, callback) {
	db.findOne({ _id: id }, function(err, note) {
		callback(err, note);
	});
}


// get all notes
function publicAll(callback) {
	db.find({}, function(err, all) {
		if (err) {
			res.send(err);
		}
		callback(err, all);
	});
}

module.exports = { add: publicAdd, edit: publicEdit, get: publicGet, all: publicAll };