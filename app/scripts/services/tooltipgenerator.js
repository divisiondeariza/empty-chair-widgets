'use strict';

/**
 * @ngdoc service
 * @name emptyChairWidgetApp.tooltipGenerator
 * @description
 * # tooltipGenerator
 * Service in the emptyChairWidgetApp.
 */
angular.module('emptyChairWidgetApp')
  .service('tooltipGenerator', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    	this.generateTalkVizTooltip  = function(e){
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
  });
