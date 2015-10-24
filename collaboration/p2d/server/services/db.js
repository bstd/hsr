'use strict';

// https://github.com/louischatriot/nedb
var Datastore = require('nedb'),
	db = {};

// attention for filename, equals path and not cwd!
db.products = new Datastore({ filename: './server/data/products.db', autoload: true });

module.exports = {
	products: db.products
};
