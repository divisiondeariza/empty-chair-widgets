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
    expect(scope.htmlTooltipGenerator(eventMock)).toEqual(expectedHtml);
  });
  describe("select nodes", function(){
    var element, event;
    beforeEach(inject(function($compile){
      var html = "<svg>" +
                    "<g class='nv-group nv-series-1'>" +
                      "<path class='nv-point nv-point-1 selected'></path>" +
                      "<path class='nv-point nv-point-2'></path>" +
                    "</g>" +
                    "<g class='nv-group nv-series-2'>" +
                      "<path class='nv-point nv-point-3'></path>" +
                      "<path class='nv-point nv-point-4'></path>" +
                    "</g>" +
                 "</svg>"     
      element = angular.element(html);
      event = {seriesIndex: 2, pointIndex:4, point:{word: "selected-word"}};
    }));

    it('should toggle the select class given the directive DOM and the event', inject(function($compile){
      scope.select(element, event)
      var elementFound = element.find(".selected")[0];
      expect(elementFound.className.baseVal).toEqual('nv-point nv-point-4 selected')

    }))

    it('should set word of selected in scope', function(){
      scope.select(element, event)
      expect(scope.selectedWord).toEqual(event.point.word);
    })

  })

});
