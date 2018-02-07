'use strict';

/**
 * @ngdoc function
 * @name emptyChairWidgetApp.controller:WgFajardoConversacionCtrl
 * @description
 * # WgFajardoConversacionCtrl
 * Controller of the emptyChairWidgetApp
 */
angular.module('emptyChairWidgetApp')
  .controller('WgFajardoConversacionCtrl', ["$scope", "talkParser", "options", "data", function ($scope, talkParser, options, data) {

    $scope.selectPoint = function(id, event){
    	var element = angular.element("#" + id);
        element.find(".nv-point").removeClass("selected");
        var subElement = element.find(".nv-series-"+event.seriesIndex + " .nv-point-" + event.pointIndex);
        angular.element(subElement).addClass("selected");
        $scope.word =  event.point.word;
	}
    $scope.masterOptions =  options;
    $scope.masterOptions.chart.xAxis.tickFormat = d3.format('.02f');
    $scope.masterOptions.chart.yAxis.tickFormat = d3.format('.02f');
    $scope.slaveOptions = angular.copy(options)
    $scope.masterOptions.chart.scatter = {
          dispatch:{
            elementClick: function(event){
            	$scope.selectPoint("said-words-viz", event);
            }
          }
	}
    $scope.tags = talkParser.getTags(data._words);

// NOT TESTED

    $scope.data = generateData(5,5);

    /* Random Data Generator (took from nvd3.org) */
    function generateData(groups, points) { //# groups,# points per group
        var data = [],
            shapes = ['circle'],
            random = d3.random.normal();



        for (var i = 0; i < groups; i++) {
            data.push({
                key: 'Group ' + i,
                values: [],
            });

            for (var j = 0; j < points; j++) {
                data[i].values.push({
                    x: Math.random()*2 -1,
                    y: Math.random() - 0.1,
                    size: Math.random() * 5,
                    shape: shapes[0],
                    word: "some word" + i
                });
            }
        }

        return data;
	}
  }]);
