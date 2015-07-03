var notezStore = require('../services/notezStore'),
	pageTitleHome = 'Notez App - Startseite';


// notez home page (index)
module.exports.index = function(req, res, next) {
	notezStore.all(function(err, all) {
		res.render('index', {pageTitle: pageTitleHome, items: all});
	});
};

// filtered index
module.exports.filtered = function(req, res, next) {
	notezStore.all(function(err, all) {
		res.render('filtered', {pageTitle: pageTitleHome, items: all, pageName: 'Filtered'});
	});
};

// index, sorted by due date
module.exports.sortduedate= function(req, res, next) {
	notezStore.sortDueDate(function(err, sortDueDate) {
		res.render('index', {pageTitle: pageTitleHome, items: sortDueDate, pageName: 'Sort-Duedate'});
	});
};

// index, sorted by creation date
module.exports.sortcreationdate= function(req, res, next) {
	notezStore.sortCreationDate(function(err, sortCreationDate) {
		res.render('index', {pageTitle: pageTitleHome, items: sortCreationDate, pageName: 'Sort-Creationdate'});
	});
};

// index, sorted by creation date
module.exports.sortimportance= function(req, res, next) {
	notezStore.allSortImportance(function(err, allSortImportance) {
		res.render('index', {pageTitle: pageTitleHome, items: allSortImportance, pageName: 'Sort-Importance'});
	});
};
