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
		res.render('filtered', {items: all});
	});
};
// Get sort due date
module.exports.sortduedate= function(req, res, next) {
	notezStore.sortDueDate(function(err, sortDueDate) {
		res.render('sortduedate', {items: sortDueDate});
	});
};

// Get sort creation date
module.exports.sortcreationdate= function(req, res, next) {
	notezStore.sortCreationDate(function(err, sortCreationDate) {
		res.render('sortcreationdate', {items: sortCreationDate});
	});
};
// Get sort creation date
module.exports.sortimportance= function(req, res, next) {
	notezStore.allSortImportance(function(err, allSortImportance) {
		res.render('sortimportance', {items: allSortImportance});
	});
};