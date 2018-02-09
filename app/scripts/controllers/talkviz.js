'use strict';

/**
 * @ngdoc function
 * @name emptyChairWidgetApp.controller:TalkvizCtrl
 * @description
 * # TalkvizCtrl
 * Controller of the emptyChairWidgetApp
 */
angular.module('emptyChairWidgetApp')
  .controller('TalkvizCtrl', ["$scope", "talkParser", "options", "data","tooltipGenerator", 
  	function ($scope, talkParser, options, data, tooltipGenerator) {
	    $scope.selectPoint = function(id, event){
	    	var element = angular.element("#" + id);
	        element.find(".nv-point").removeClass("selected");
	        var subElement = element.find(".nv-series-"+event.seriesIndex + " .nv-point-" + event.pointIndex);
	        angular.element(subElement).addClass("selected");
	        $scope.slaveWords = [{key:event.point.word, values: talkParser.remapAll(data[event.point.word])}];
	        $scope.$digest();

		}
	    $scope.masterOptions =  options;
	    $scope.masterOptions.chart.xAxis.tickFormat = d3.format('.02f');
	    $scope.masterOptions.chart.yAxis.tickFormat = d3.format('.02f');
	    $scope.masterOptions.chart.tooltip.contentGenerator = tooltipGenerator.generateTalkVizTooltip;
	    $scope.slaveOptions = angular.copy(options)
	    $scope.slaveOptions.chart.noData = "Seleccione una de las palabras a la izquierda";
	    $scope.slaveOptions.chart.color.unshift("#831dc6");
	    $scope.masterOptions.chart.scatter = {
	          dispatch:{
	            elementClick: function(event){
	            	$scope.selectPoint("said-words-viz", event);
	            }
	          }
		}
	    $scope.masterOptions.chart.callback = function(chart){
	        chart.dispatch.changeState({disabled: [0,1,1,1]});
	    }

	    $scope.masterWords = talkParser.remapAndRegroupByTags(data._words);
	    $scope.masterOptions.chart.forceY = [0]; 
	    
	    //NOT TESTED

	    $scope.slaveWords = [];
    



  }]);
