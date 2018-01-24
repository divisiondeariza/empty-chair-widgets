'use strict';

/**
 * @ngdoc directive
 * @name emptyChairWidgetApp.directive:wordsViz
 * @description
 * # wordsViz
 */
angular.module('emptyChairWidgetApp')
  .directive('wordsViz', ["wordsVizDataProcessor", function (w) {
    function postLink(scope, element, attrs) {
        scope.graphData = [];
        scope.options.chart.xAxis.tickFormat = w.formatDate;
        var marks = w.reindexMarks(scope.data);    
        scope.options
              .chart
              .interactiveLayer = { 
                      tooltip: {
                        headerFormatter: w.formatDateWithMarks.bind(w, marks),
                      },
        };
        var totaldata = w.remap(scope.data, "norm1");   
        scope.$watchCollection('selectedWords', function(){
          scope.graphData = w.getFromRemapped(totaldata, scope.selectedWords);
        });
        scope.options.chart.lines = {
                                   dispatch : {
                                    elementClick: elementClick
                                    }
                                  };
        function elementClick(e){ 
            var index = e[0].pointIndex;
            scope.selectedWords = w.getSortedWordsBySerie(scope.data, "norm1", index, false, 3);
            scope.$apply();
            }
        };

    return {
      template: '<nvd3 options="options" data="graphData"></nvd3>',
      restrict: 'E',
      scope: {
      	options: "<",
      	data:    "<",
      	selectedWords: "="
      },
      link: postLink
      }
    }]);
