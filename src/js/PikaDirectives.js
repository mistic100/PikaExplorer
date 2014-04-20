"use strict";

angular.module('PikaDirectives', [])
  .directive('customScrollbar', function() {
      return {
          link: function($scope, $elem) {
              $elem.mCustomScrollbar({
                  theme: 'dark-thick',
                  mouseWheelPixels: 500,
                  scrollButtons: {
                      enable: true
                  }
              });
              
              $scope.$on('$viewContentLoaded', function() {
                  setTimeout(function() {
                      $elem.mCustomScrollbar('scrollTo', 'top', {scrollInertia:0});
                      $elem.mCustomScrollbar('update');
                  }, 10);
              });
          }
      };
  })
  
  .directive('bsTooltip', function() {
      return {
          link: function($scope, $elem) {
              $elem.tooltip();
          }
      };
  });