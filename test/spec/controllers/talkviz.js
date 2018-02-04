'use strict';

describe('Controller: TalkvizCtrl', function () {

  // load the controller's module
  beforeEach(module('emptyChairWidgetApp'));

  var TalkvizCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TalkvizCtrl = $controller('TalkvizCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('Should return html for tooltip when htmlTooltipGenerator is called',function(){
    var elementMock = {
      value: 5,
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
                      "<td class='key'>" + 'Time: ' + "</td>" +
                      "<td class='x-value'>5</td>" + 
                    "</tr>" +
                    "<tr>" +
                      "<td class='key'>" + 'Voltage: ' + "</td>" +
                      "<td class='x-value'><strong>3.14</strong></td>" +
                    "</tr>" + 
                      "</tbody>" +
                    "</table>"
    expect(scope.htmlTooltipGenerator(elementMock)).toEqual(expectedHtml);
  })
});
