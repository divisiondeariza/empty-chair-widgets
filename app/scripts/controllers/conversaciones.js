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

    $scope.options = options;
    $scope.data = generateData(4,5);
    $scope.selectedWord = "Kraftwerk"

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
                    word: "some word"
                });
            }
        }

        return data;
    }

  }]);
