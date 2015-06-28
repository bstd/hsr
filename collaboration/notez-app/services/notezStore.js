var Datastore = require('nedb'),
	db = new Datastore({ filename: '../data/notez.db', autoload: true });


// TODO note properties
// nedb automatically generates index (_id)!
function Note(title, text, importance, dueDate, done) {
	this.title = title;
	this.text = text;
	this.importance = importance;
	this.creationDate = JSON.stringify(new Date());
	this.dueDate = dueDate;
	this.done = false;
}


// add note
// TODO 
function publicAdd(inpTitle, inpDescription, importance, inpDue, inpDone, callback) {
	// map req.body (form fields) to our short note properties
	var title = inpTitle,
		text = inpDescription,
		importance = importance,
		dueDate = inpDue,
		done = inpDone;

	var note = new Note(title, text, importance, dueDate, done);

console.log(note);
	/*db.insert(note, function(err, newNote) {
		if (callback) {
			callback(err, newNote);
		}
	});*/
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
