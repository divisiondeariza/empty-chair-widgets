'use strict';

/**
 * @ngdoc directive
 * @name emptyChairWidgetApp.directive:talkViz
 * @description
 * # talkViz
 */
angular.module('emptyChairWidgetApp')
  .directive('talkViz', function () {
    return {
      scope: {
      	options: "<",
      	data:    "<",      	
      },
      template: '<nvd3 class="talk-viz" options="options" data="data"></nvd3>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
      	scope.options.chart.yAxis.tickFormat = d3.format('.02f');
      	scope.options.chart.xAxis.tickFormat = d3.format('.02f');
        //element.text('this is the talkViz directive');
      }
    };
  });
