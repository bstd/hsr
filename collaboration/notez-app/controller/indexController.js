var notezStore = require('../services/notezStore');


// GET notez home page
module.exports.index = function(req, res, next) {
	notezStore.all(function(err, all) {
		res.render('index', {items: all});
	});
};
// Get Filter
module.exports.filtered= function(req, res, next) {
	notezStore.all(function(err, all) {
		res.render('filtered', {items: all, pageName: 'Filtered'});
	});
};
// Get sort due date
module.exports.sortduedate= function(req, res, next) {
	notezStore.sortDueDate(function(err, sortDueDate) {
		res.render('index', {items: sortDueDate, pageName: 'Sort-Duedate'});
	});
};

// Get sort creation date
module.exports.sortcreationdate= function(req, res, next) {
	notezStore.sortCreationDate(function(err, sortCreationDate) {
		res.render('index', {items: sortCreationDate, pageName: 'Sort-Creationdate'});
	});
};
// Get sort creation date
module.exports.sortimportance= function(req, res, next) {
	notezStore.allSortImportance(function(err, allSortImportance) {
		res.render('index', {items: allSortImportance, pageName: 'Sort-Importance'});
	});
};