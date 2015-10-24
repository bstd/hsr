'use strict';

angular.module('projekt2App')
.controller('AdminProductListCtrl', ['$scope', '$http', 'ProductFactory', function($scope, $http) {
	$scope.products = [];

	$http.get('/api/products').success(function(products) {
		$scope.products = products;
	});
}]);