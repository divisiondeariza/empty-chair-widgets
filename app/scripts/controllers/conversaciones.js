'use strict';

/**
 * @ngdoc function
 * @name emptyChairWidgetApp.controller:ConversacionesCtrl
 * @description
 * # ConversacionesCtrl
 * Controller of the emptyChairWidgetApp
 */
angular.module('emptyChairWidgetApp')
  .controller('ConversacionesCtrl', ["$scope", "options", function ($scope, options) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.options = options;
/*    $scope.options.chart.tooltip =  {
                contentGenerator: function (e) {
                  var series = e.series[0];
                  var point = e.point;
                  if (series.value === null) return;
                  
                  var rows = 
                    "<tr>" +
                      "<td class='key'>" + 'Time: ' + "</td>" +
                      "<td class='x-value'>" + e.value + "</td>" + 
                    "</tr>" +
                    "<tr>" +
                      "<td class='key'>" + 'Voltage: ' + "</td>" +
                      "<td class='x-value'><strong>" + (series.value?series.value.toFixed(2):0) + "</strong></td>" +
                    "</tr>";

                  var header = 
                    "<thead>" + 
                      "<tr>" +
                        "<td class='legend-color-guide'><div style='background-color: " + series.color + ";'></div></td>" +
                        "<td class='key'><strong>" + point.word + "</strong></td>" +
                      "</tr>" + 
                    "</thead>";
                    
                  return "<table>" +
                      header +
                      "<tbody>" + 
                        rows + 
                      "</tbody>" +
                    "</table>";
                } 
              }*/


    $scope.data = generateData(4,40);

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
                    shape: shapes[j % 6],
                    word: "some word"
                });
            }
        }

        return data;
    }

  }]);
