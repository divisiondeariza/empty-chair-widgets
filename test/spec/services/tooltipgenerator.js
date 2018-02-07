'use strict';

describe('Service: tooltipGenerator', function () {

  // load the service's module
  beforeEach(module('emptyChairWidgetApp'));

  // instantiate service
  var tooltipGenerator;
  beforeEach(inject(function (_tooltipGenerator_) {
    tooltipGenerator = _tooltipGenerator_;
  }));

  it("Should return html for tooltip when generateTalkVizTooltip is called", function(){
    var eventMock = {
      value: Math.PI * 2,
      series:[
        {value: Math.PI,
         color: "red"
        }],
      point:{
        word:"some-word"
      }
    }
    var expectedHtml = "<table>" +
                        "<thead>" + 
                        "<tr>" +
                        "<td class='legend-color-guide'><div style='background-color: red;'></div></td>" +
                        "<td class='key'><strong>some-word</strong></td>" +
                        "</tr>" + 
                        "</thead>" +
                        "<tbody>" + 
                        "<tr>" +
                        "<td class='key'>" + 'Sentimiento: ' + "</td>" +
                        "<td class='x-value'>6.28</td>" + 
                        "</tr>" +
                        "<tr>" +
                        "<td class='key'>" + 'Magnitud: ' + "</td>" +
                        "<td class='x-value'><strong>3.14</strong></td>" +
                        "</tr>" + 
                        "</tbody>" +
                        "</table>"
    expect(tooltipGenerator.generateTalkVizTooltip(eventMock)).toEqual(expectedHtml);    
  })

});
