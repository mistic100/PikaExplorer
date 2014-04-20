"use strict";

var PikaNavCtrl = angular.module('PikaNavCtrl', []);

PikaNavCtrl.controller('PikaNavCtrl', ['$scope', '$location', 'PikaRBYSrvc',
function($scope, $location, rby) {

    $scope.isActive = function(viewLocation) { 
        return viewLocation === $location.path();
    };
    
    $scope.reset = function() {
        rby.deleteData();
        $location.path('/upload');
    };
    
}]);