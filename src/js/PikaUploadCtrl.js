"use strict";

var PikaUploadCtrl = angular.module('PikaUploadCtrl', []);

PikaUploadCtrl.controller('PikaUploadCtrl', ['$scope', '$location', 'PikaRBYSrvc',
function($scope, $location, rby) {
    $scope.file = null;
    
    $scope.uploadFile = function() {
        if ($scope.file) {
            var reader = new FileReader();
            
            reader.onload = function(e) {
                if (rby.setData(e.target.result)) {
                    localStorage.data = e.target.result;
                    $location.path('/home');
                    $scope.$apply();
                }
                else {
                    console.error('invalid file');
                }
            };
            
            reader.readAsBinaryString($scope.file);
        }
    };
    
}]);

PikaUploadCtrl.directive('validFile', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        
        link: function ($scope, el, attrs, ngModel) {
            el.filestyle({
                classButton: 'btn btn-sm btn-default'
            });
            
            el.on('change', function(e) {
                $scope.file = (e.srcElement || e.target).files[0];
                $scope.$apply(function() {
                    ngModel.$render();
                });
            });
        }
    };
});