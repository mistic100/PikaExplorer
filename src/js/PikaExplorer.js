"use strict";

var PikaExplorer = angular.module('PikaExplorer', [
    'ngRoute',
    
    'PikaHomeCtrl',
    'PikaUploadCtrl',
    
    'PikaRBYSrvc'
]);

PikaExplorer
  .config(['$routeProvider', function($routeProvider) {
      $routeProvider.
        when('/home', {
            templateUrl: 'template/home.htm',
            controller: 'PikaHomeCtrl',
            needData: true
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
      var routesNeedingData = [];
      angular.forEach($route.routes, function(route, path) {
          route.needData && routesNeedingData.push(path);
      });
      
      $rootScope.$on('$routeChangeStart', function(e, n, c) {
          var needsData = routesNeedingData.indexOf($location.path()) != -1;
          
          if (needsData && !rby.hasData()) {
              $location.path('/upload');
          }
      });
    
      $rootScope.foo = function() {
          rby.deleteData();
          $location.path('/upload');
      };
  }]);