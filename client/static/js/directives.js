'use strict';

/* Directives */

angular.module('myApp.directives', []).
  directive('angularVersion', function (version) {
    return function(scope, elm, attrs) {
      elm.text(angular.version.full);
    };
  });
