var notezStore = require('../services/notezStore'),
	pageTitleHome = 'Notez App - Startseite';


// GET notez home page
module.exports.index = function(req, res, next) {
	notezStore.all(function(err, all) {
		res.render('index', {pageTitle: pageTitleHome, items: all});
	});
};

// Get Filter
module.exports.filtered= function(req, res, next) {
	notezStore.all(function(err, all) {
		res.render('filtered', {pageTitle: pageTitleHome, items: all, pageName: 'Filtered'});
	});
};

// Get sort due date
module.exports.sortduedate= function(req, res, next) {
	notezStore.sortDueDate(function(err, sortDueDate) {
		res.render('index', {pageTitle: pageTitleHome, items: sortDueDate, pageName: 'Sort-Duedate'});
	});
};

// Get sort creation date
module.exports.sortcreationdate= function(req, res, next) {
	notezStore.sortCreationDate(function(err, sortCreationDate) {
		res.render('index', {pageTitle: pageTitleHome, items: sortCreationDate, pageName: 'Sort-Creationdate'});
	});
};

// Get sort creation date
module.exports.sortimportance= function(req, res, next) {
	notezStore.allSortImportance(function(err, allSortImportance) {
		res.render('index', {pageTitle: pageTitleHome, items: allSortImportance, pageName: 'Sort-Importance'});
	});
};
