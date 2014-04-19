"use strict";

var PikaHomeCtrl = angular.module('PikaHomeCtrl', []);

PikaHomeCtrl.controller('PikaHomeCtrl', ['$scope', 'PikaRBYSrvc', function($scope, rby) {

    $scope.player = rby.getPlayer();
    $scope.badges = rby.getBadges();
    
}]);