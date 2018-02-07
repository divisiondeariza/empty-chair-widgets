'use strict';

/**
 * @ngdoc function
 * @name emptyChairWidgetApp.controller:WgFajardoConversacionCtrl
 * @description
 * # WgFajardoConversacionCtrl
 * Controller of the emptyChairWidgetApp
 */
angular.module('emptyChairWidgetApp')
  .controller('WgFajardoConversacionCtrl', ["$scope", 
                                            "talkParser",
                                            "options",
                                            "data",
                                            "tooltipGenerator", function ($scope, talkParser, options, data, tooltipGenerator) {

    $scope.selectPoint = function(id, event){
    	var element = angular.element("#" + id);
        element.find(".nv-point").removeClass("selected");
        var subElement = element.find(".nv-series-"+event.seriesIndex + " .nv-point-" + event.pointIndex);
        angular.element(subElement).addClass("selected");
        $scope.slaveWords = [{key:"respuestas", values: talkParser.remapAll(data[event.point.word])}];
        $scope.$digest();

	}
    $scope.masterOptions =  options;
    $scope.masterOptions.chart.xAxis.tickFormat = d3.format('.02f');
    $scope.masterOptions.chart.yAxis.tickFormat = d3.format('.02f');
    $scope.masterOptions.chart.tooltip.contentGenerator = tooltipGenerator.generateTalkVizTooltip;
    $scope.slaveOptions = angular.copy(options)
    $scope.masterOptions.chart.scatter = {
          dispatch:{
            elementClick: function(event){
            	$scope.selectPoint("said-words-viz", event);
            }
          }
	}


    $scope.masterWords = talkParser.remapAndRegroupByTags(data._words);
    
    //NOT TESTED
    $scope.slaveWords = [];
    



  }]);
