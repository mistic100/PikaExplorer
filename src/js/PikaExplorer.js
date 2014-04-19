"use strict";

var PikaExplorer = angular.module('PikaExplorer', [
    'ngRoute',
    
    'PikaHomeCtrl',
    
    'PikaRBYSrvc'
]);

PikaExplorer
  .config(['$routeProvider', function($route) {
      $route.
        when('/home', {
            templateUrl: 'template/home.htm',
            controller: 'PikaHomeCtrl'
        })
        .otherwise({
            redirectTo: '/home'
        });
  }]);