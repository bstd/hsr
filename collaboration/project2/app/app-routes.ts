///<reference path='../typings/tsd.d.ts' />
module projekt2 {
  'use strict';

  angular
    .module('projekt2')
    .config(config);

  function config($routeProvider: ng.route.IRouteProvider) {
    $routeProvider.otherwise({
      redirectTo: '/home'
    });
  }
}
