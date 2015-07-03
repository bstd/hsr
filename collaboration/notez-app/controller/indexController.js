var notezStore = require('../services/notezStore'),
	pageTitleHome = 'Notez App - Startseite';


// notez home page (index)
module.exports.index = function(req, res, next) {
	notezStore.allNotDone(function(err, allNotDone) {
		res.render('index', {pageTitle: pageTitleHome, items: allNotDone});
	});
};

// filtered index
module.exports.filtered = function(req, res, next) {
	notezStore.all(function(err, all) {
		res.render('filtered', {pageTitle: pageTitleHome, items: all, pageName: 'Filtered'});
	});
};

// index, sorted by due date
module.exports.sortduedate = function(req, res, next) {
	notezStore.sortedByDueDate(function(err, sortedByDueDate) {
		res.render('index', {pageTitle: pageTitleHome, items: sortedByDueDate, pageName: 'Sort-Duedate'});
	});
};

// index, sorted by creation date
module.exports.sortcreationdate = function(req, res, next) {
	notezStore.sortedByCreationDate(function(err, sortedByCreationDate) {
		res.render('index', {pageTitle: pageTitleHome, items: sortedByCreationDate, pageName: 'Sort-Creationdate'});
	});
};

// index, sorted by importance
module.exports.sortimportance = function(req, res, next) {
	notezStore.sortedByImportance(function(err, sortedByImportance) {
		res.render('index', {pageTitle: pageTitleHome, items: sortedByImportance, pageName: 'Sort-Importance'});
	});
};
