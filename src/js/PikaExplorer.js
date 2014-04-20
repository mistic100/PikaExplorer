"use strict";

var PikaExplorer = angular.module('PikaExplorer', [
    'ngRoute',
    
    'PikaNavCtrl',
    'PikaHomeCtrl',
    'PikaUploadCtrl',
    
    'PikaRBYSrvc',
    
    'PikaFilters',
    'PikaDirectives'
]);

PikaExplorer
  .config(['$routeProvider', function($routeProvider) {
      $routeProvider.
        when('/home', {
            templateUrl: 'template/home.htm',
            controller: 'PikaHomeCtrl',
            needData: true
        })
        .when('/about', {
            templateUrl: 'template/about.htm'
        })
        .when('/upload', {
            templateUrl: 'template/upload.htm',
            controller: 'PikaUploadCtrl'
        })
        .otherwise({
            redirectTo: '/home'
        });
  }])

  .run(['$rootScope', '$location', '$route', 'PikaRBYSrvc',
  function($rootScope, $location, $route, rby) {
      $rootScope.$on('$routeChangeStart', function(e, n, c) {
          var needsData = !!($location.path()) && ($route.routes[$location.path()].needData || false);
          
          if (needsData && !rby.hasData()) {
              $location.path('/upload');
          }
      });
  }]);