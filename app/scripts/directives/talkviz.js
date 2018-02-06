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
        word: "="      	
      },
      template: '<nvd3 class="talk-viz" options="options" data="data"></nvd3>',
      restrict: 'E',
      controller: "TalkvizCtrl",
      link: function postLink(scope, element, attrs, ctrl) {
      	scope.options.chart.yAxis.tickFormat = d3.format('.02f');
      	scope.options.chart.xAxis.tickFormat = d3.format('.02f');
      	scope.options.chart.tooltip =  {
      		contentGenerator: scope.htmlTooltipGenerator,
      	}
        scope.options.chart.scatter = {
          dispatch:{
            elementClick: function(event){
              scope.word = scope.getWord(event);
              // scope.$digest(); 
              scope.selectPoint(element, event);
            }
          }
        }
      }
    };
  });
