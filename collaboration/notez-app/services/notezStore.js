var Datastore = require('nedb'),
	db = new Datastore({ filename: '../data/notez.db', autoload: true });


// note properties
// nedb automatically generates index (_id)!
function Note(title, text, importance, dueDate, done) {
	this.title = title;
	this.text = text;
	this.importance = importance;
	this.creationDate = JSON.stringify(new Date());// always new
	this.dueDate = dueDate;
	this.done = done;
}


// add note
function publicAdd(reqBody, callback) {
	// map req.body (form fields) to our short note properties
	var title = reqBody.inpTitle,
		text = reqBody.inpDescription,
		importance = reqBody.importance,
		dueDate = reqBody.inpDue,
		done = false;// initially false

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


// SORTING
// get sort creation date
function publicSortDueDate(callback) {
	db.find({}).sort({ dueDate: -1 }).skip(1).exec(function (err, dueDate) {
		if (err) {
			res.send(err);
		}
		callback(err, dueDate);
	});
}

// get sort creation date
function publicSortCreationDate(callback) {
	db.find({}).sort({ creationDate: -1 }).skip(1).exec(function (err, creationDate) {
		if (err) {
			res.send(err);
		}
		callback(err, creationDate);
	});
}

// get sort importance
function publicSortImportance(callback) {
	db.find({}).sort({ importance: -1 }).skip(1).exec(function (err, sortImportance) {
		if (err) {
			res.send(err);
		}
		callback(err, sortImportance);
	});
}


module.exports = {
	add: publicAdd,
	edit: publicEdit,
	get: publicGet,
	all: publicAll,
	allSortImportance: publicSortImportance,
	sortCreationDate: publicSortCreationDate,
	sortDueDate: publicSortDueDate
};
