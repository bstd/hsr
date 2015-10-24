'use strict';

angular.module('projekt2App')
.factory('ProductFactory', ['$resource', function($resource) {
	return $resource('products/:id', {}, {
		query: {method:'GET', params:{id:'products'}, isArray:true}
	});
}]);
