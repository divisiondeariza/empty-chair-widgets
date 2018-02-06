'use strict';

/**
 * @ngdoc function
 * @name emptyChairWidgetApp.controller:TalkvizCtrl
 * @description
 * # TalkvizCtrl
 * Controller of the emptyChairWidgetApp
 */
angular.module('emptyChairWidgetApp')
  .controller('TalkvizCtrl', ["$scope", function ($scope) {
    $scope.htmlTooltipGenerator = function(e){
                  var series = e.series[0];
                  var point = e.point;
                  if (series.value === null) return;
                  
                  var rows = 
                    "<tr>" +
                      "<td class='key'>" + 'Sentimiento: ' + "</td>" +
                      "<td class='x-value'>" + e.value.toFixed(2) + "</td>" + 
                    "</tr>" +
                    "<tr>" +
                      "<td class='key'>" + 'Magnitud: ' + "</td>" +
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

    $scope.selectPoint = function(element, event){
        element.find(".nv-point").removeClass("selected");
        // element.find(".nv-point").removeClass("hover");
        var subElement = element[0].querySelector(".nv-series-"+event.seriesIndex + " .nv-point-" + event.pointIndex);
        angular.element(subElement).addClass("selected");
    }

    $scope.getWord = function(event){
      return event.point.word;
    }
  }]);
