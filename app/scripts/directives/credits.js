'use strict';

/**
 * @ngdoc directive
 * @name emptyChairWidgetApp.directive:credits
 * @description
 * # credits
 */
angular.module('emptyChairWidgetApp')
  .directive('credits', function () {
    return {
      templateUrl:'templates/directives/credits.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
/*        element.text('this is the credits directive');*/
      }
    };
  });
