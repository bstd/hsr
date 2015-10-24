'use strict';

angular.module('projekt2App')
.controller('ProductsCtrl', ['$scope', '$http', 'ProductFactory', function($scope, $http, ProductFactory) {
	//$scope.products = ProductFactory.query();
	$scope.products = [];

	$http.get('/api/products').success(function(products) {
		$scope.products = products;
	});
}]);
