'use strict';

angular.module('projekt2App', [
	'ngCookies',
	'ngResource',
	'ngSanitize',
	'ui.router'
])
.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
	$urlRouterProvider.otherwise('/'); // default route
/*
	$stateProvider.state('home', {
		url: '/home',
		templateUrl: 'home.tpl.html',
		controller: 'HomeCtrl',
		controllerAs: 'home'
	})
	.state('terms', {// vorkasse only
		url: '/terms',
		templateUrl: 'terms.tpl.html',
		controller: 'TermsCtrl',
		controllerAs: 'terms'
	})
	.state('search', {
		url: '/search',
		templateUrl: 'search.tpl.html',
		controller: 'SearchCtrl',
		controllerAs: 'search'
	})
	.state('products', {
		url: '/products',
		templateUrl: 'products.tpl.html',
		controller: 'ProductsCtrl',
		controllerAs: 'products'
	})
	.state('product.detail', {
		url: '/product/detail',
		templateUrl: 'product.detail.tpl.html',
		controller: 'ProductDetailCtrl',
		controllerAs: 'productdetail'
	})
	.state('login', {// logout redirect to home?
		url: '/login',
		templateUrl: 'login.tpl.html',
		controller: 'LoginCtrl',
		controllerAs: 'login'
	})
	.state('signup', {
		url: '/signup',
		templateUrl: 'signup.tpl.html',
		controller: 'SignupCtrl',
		controllerAs: 'signup'
	})
	.state('account',{// list, edit
		url: '/account',
		templateUrl: 'account.tpl.html',
		controller: 'AccountCtrl',
		controllerAs: 'account'
	}).
	state('ratings', {// list, edit, delete
		url: '/ratings',
		templateUrl: 'ratings.tpl.html',
		controller: 'RatingsCtrl',
		controllerAs: 'ratings'
	}).
	state('basket', {
		url: '/basket',
		templateUrl: 'basket.tpl.html',
		controller: 'BasketCtrl',
		controllerAs: 'basket'
	}).
	state('checkout', {
		url: '/checkout',
		templateUrl: 'checkout.tpl.html',
		controller: 'CheckoutCtrl',
		controllerAs: 'checkout'
	}).
	state('confirmation', {
		url: '/home',
		templateUrl: 'admin.tpl.html',
		controller: 'AdminCtrl',
		controllerAs: 'admin'
	}).
	state('admin.dashboard', {
		url: '/admin',
		templateUrl: 'home.tpl.html',
		controller: 'HomeCtrl',
		controllerAs: 'home'
	}).
	state('admin.users', {// list, edit, delete
		url: '/admin/users',
		templateUrl: 'admin.users.tpl.html',
		controller: 'AdminUsersCtrl',
		controllerAs: 'home'
	}).
	state('admin.orders', {// list, edit, delete
		url: '/admin/orders',
		templateUrl: 'admin.orders.tpl.html',
		controller: 'AdminOrdersCtrl',
		controllerAs: 'adminorders'
	}).
	state('admin.products', {// list, edit, delete
		url: '/admin/products',
		templateUrl: 'admin.products.tpl.html',
		controller: 'AdminProductsCtrl',
		controllerAs: 'adminproducts'
	});
*/
	$locationProvider.html5Mode(true);
});
