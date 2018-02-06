'use strict';

describe('Directive: talkViz', function () {

  // load the directive's module
  beforeEach(module('emptyChairWidgetApp'));

  var element,
    scope,
    TalkvizCtrl;

  beforeEach(inject(function ($rootScope, $compile, _$controller_) {
    scope = $rootScope.$new();
    scope.options = {
      chart: {
        xAxis:           {tickFormat: null, axisLabel: "any label"},
        yAxis:           {tickFormat: null, axisLabel: "any label"},  
        interactiveLayer: null,
        lines:            null  
      },
      caption: {text: "any caption"} 
    };
    TalkvizCtrl = _$controller_('TalkvizCtrl', {$scope: scope} );
    element = angular.element('<talk-viz options=options data=data></talk-viz>');
    element = $compile(element)(scope);     

  }));

  describe("test render", function(){
    it('should have set the correct template', function(){
      expect(element.html()).toBe('<nvd3 class="talk-viz ng-isolate-scope" options="options" data="data"></nvd3>');
    });

  });

  describe("Options setting", function(){
    it('should set yAxis tickFormat to format to two decimal places',  function() {
      var options = element.isolateScope().options;
      expect(options.chart.yAxis.tickFormat(Math.PI)).toEqual('3.14')
    });

    it('should set xAxis tickFormat to format to two decimal places',  function() {
      var options = element.isolateScope().options;
      expect(options.chart.xAxis.tickFormat(Math.PI)).toEqual('3.14')
    });

    it('should set TalkvizCtrl.htmlTooltipGenerator to chart.tooltip.contentGenerator',  function() {
      var eventMock = {
                        value: 5,
                        series:[
                          {value: Math.PI,
                           color: "red"
                          }],
                        point:{
                          word:"some-word"
                        }
                      };
      var options = element.isolateScope().options;
      expect(scope.htmlTooltipGenerator(eventMock)).toEqual(options.chart.tooltip.contentGenerator(eventMock));
    });

  });

  describe("On click in nodes", function(){
    var wordMock = "the-word";
    beforeEach(function(){
      spyOn(element.isolateScope(), "selectPoint");
      spyOn(element.isolateScope(), "getWord").and.returnValue(wordMock);
    });

    it("should call scope.selected correctly", function(){
      var options = element.isolateScope().options;
      var eventMock = {};
      options.chart.scatter.dispatch.elementClick(event);
      expect(element.isolateScope().selectPoint).toHaveBeenCalledWith(element, event)
    });

    it("should set word as value returned by getWords", function(){
      var options = element.isolateScope().options;
      var eventMock = {};
      options.chart.scatter.dispatch.elementClick(event);
      expect(element.isolateScope().word).toEqual(wordMock);      
    })
  })

});
