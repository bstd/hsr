'use strict';

var data = require('./db'),
	productData = data.products;


function Product(title, text) {
	this.title = title;
	this.text = text;
}

exports.find = function(callback) {
	productData.find({}, function(err, all) {
		if (err) {
			res.send(err);
		}

		callback(err, all);
	});
};

exports.findById = function(id, callback) {
	productData.findOne({ _id: id }, function(err, product) {
		callback(err, product);
	});
};

exports.create = function(reqBody, callback) {
	var title = reqBody.title,
		text = reqBody.text;

	var product = new Product(title, text);

	productData.insert(product, function(err, newProduct) {
		if (callback) {
			callback(err, newProduct);
		}
	});
};

exports.update = function(id, reqBody, callback) {
	var id = id,
		title = reqBody.title,
		text = reqBody.text;

	var product = new Product(title, text);

	productData.update({ _id: id }, product, {}, function(err, countUpdated) {
		if (callback) {
			callback(err, countUpdated);
		}
	});
};

exports.remove = function(id, callback) {
	productData.remove({ _id: id }, {}, function(err, countRemoved) {
		if (callback) {
			callback(err, countRemoved);
		}
	});
};




