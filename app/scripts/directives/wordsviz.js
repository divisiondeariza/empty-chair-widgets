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
        var totaldata = w.remap(scope.data, "norm2");   
        scope.$watchCollection('selectedWords', function(){
          scope.graphData = w.getFromRemapped(totaldata, scope.selectedWords);
        });
        scope.options.chart.lines = {
                                   dispatch : {
                                    elementClick: elementClick
                                    }
                                  };
        scope.options.chart.xAxis.axisLabel = scope.axisLabelX;
        scope.options.chart.yAxis.axisLabel = scope.axisLabelY;
        scope.options.caption.text = scope.caption;

        function elementClick(e){ 
            var index = e[0].pointIndex;
            scope.selectedWords = w.getSortedWordsBySerie(scope.data, "norm2", index, false, 3);
            scope.$apply();
            }
    };


    return {
      template: '<nvd3 options="options" data="graphData"></nvd3>',
      restrict: 'E',
      scope: {
      	options: "<",
      	data:    "<",
      	selectedWords: "=",
        axisLabelX: "@",
        axisLabelY: "@",
        caption: "@",
      },
      link: postLink
      }
    }]);
