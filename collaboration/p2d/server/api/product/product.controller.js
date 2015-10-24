/**
 * GET     /products              ->  index
 * POST    /products              ->  create
 * GET     /products/:id          ->  show
 * PUT     /products/:id          ->  update
 * DELETE  /products/:id          ->  destroy
 */

'use strict';

var _ = require('lodash'),
	Product = require('../../services/products');


// Get list of products
exports.index = function(req, res) {
	Product.find(function(err, products) {
		if (err) { return handleError(res, err); }

		return res.status(200).json(products);
	});
};

// Get a single product
exports.show = function(req, res) {
	Product.findById(req.params.id, function(err, product) {
		if (err) { return handleError(res, err); }

		if (!product) { return res.status(404).send('Not Found'); }

		return res.json(product);
	});
};

// Creates a new product in the DB.
exports.create = function(req, res) {
	Product.create(req.body, function(err, product) {
		if (err) { return handleError(res, err); }

		return res.status(201).json(product);
	});
};

// Updates an existing product in the DB.
exports.update = function(req, res) {
	if (req.body._id) { delete req.body._id; }

	Product.findById(req.params.id, function(err, product) {
		if (err) { return handleError(res, err); }

		if (!product) { return res.status(404).send('Not Found'); }

		var updated = _.merge(product, req.body);
		Product.update(req.params.id, req.body, function (err) {
			if (err) { return handleError(res, err); }

			return res.status(200).json(product);
		});
	});
};

// Deletes a product from the DB.
exports.destroy = function(req, res) {
	Product.findById(req.params.id, function(err, product) {
		if (err) { return handleError(res, err); }

		if (!product) { return res.status(404).send('Not Found'); }

		Product.remove(req.params.id, function(err) {
			if(err) { return handleError(res, err); }

			return res.status(204).send('No Content');
		});
	});
};

function handleError(res, err) {
	return res.send(500, err);
}