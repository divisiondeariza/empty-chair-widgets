'use strict';

/**
 * @ngdoc function
 * @name emptyChairWidgetApp.controller:ConversacionesCtrl
 * @description
 * # ConversacionesCtrl
 * Controller of the emptyChairWidgetApp
 */
angular.module('emptyChairWidgetApp')
  .controller('ConversacionesCtrl', ["$scope", function ($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
 $scope.options = {
            chart: {
                type: 'scatterChart',
                height: 450,
                color: d3.scale.category10().range(),
                scatter: {
                    onlyCircles: false
                },
                showDistX: false,
                showDistY: false,
                tooltipContent: function(key) {
                    return '<h3>' + key + '</h3>';
                },
                duration: 350,
                xAxis: {
                    axisLabel: 'X Axis',
                    tickFormat: function(d){
                        return d3.format('.02f')(d);
                    },
                    tickValues:[0]

                },
                yAxis: {
                    axisLabel: 'Y Axis',
                    tickFormat: function(d){
                        return d3.format('.02f')(d);
                    },
                    axisLabelDistance: 30,
                    tickValues:[0]

                },
                zoom: {
                    //NOTE: All attributes below are optional
                    enabled: false,
                    scaleExtent: [1, 10],
                    useFixedDomain: true,
                    useNiceScale: false,
                    horizontalOff: false,
                    verticalOff: false,
                    unzoomEventType: 'dblclick.zoom'
                }
            }
        };


        $scope.data = generateData(4,40);

        /* Random Data Generator (took from nvd3.org) */
        function generateData(groups, points) { //# groups,# points per group
                            console.log(d3.random);
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
                        y: Math.random(),
                        size: Math.random() * 5,
                        shape: shapes[j % 6]
                    });
                }
            }

            data.push({
                    key: 'rect',
                    values: [],
                    slope: 1,
                    intercept: Number.MIN_VALUE, // Fucking awful hack
                    color: 'white',
                });

            data.push({
                    key: 'rect',
                    values: [],
                    slope: -1,
                    intercept: Number.MIN_VALUE, // Fucking awful hack
                    color: 'white',
                });
            console.log(Math.MIN_VALUE);
            return data;
        }



  }]);
