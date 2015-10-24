'use strict';

angular.module('projekt2App')
.config(function($stateProvider) {
	$stateProvider
	.state('admin', {
		/*views: {
			'admin': {*/
				url: '/admin',
				templateUrl: 'app/admin/admin.html',
				controller: 'AdminCtrl',
				controllerAs: 'admin'
			/*}
		}*/
	})
	.state('admin.product-list', {
		/*views: {
			'admin.product-list': {*/
				url: '/products',
				templateUrl: 'app/admin/product/list.html',
				controller: 'AdminProductListCtrl',
				controllerAs: 'admin.product.list'
			/*}
		}*/
	})/*
	.state('admin.product-add', {
		url: '/product/create',
		templateUrl: 'app/admin/product/add.html',
		controller: 'AdminProductAddCtrl'
	})
	.state('admin.product-edit', {
		url: '/admin/product/:id/update',
		templateUrl: 'app/admin/product/product-update.html',
		controller: 'AdminProductUpdateCtrl'
	})*/;
});