"use strict";

angular.module('PikaFilters', [])
  .filter('ucfirst', function() {
      return function(str) {
          return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
      };
  });