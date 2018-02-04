'use strict';

describe('Directive: talkViz', function () {

  // load the directive's module
  beforeEach(module('emptyChairWidgetApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  beforeEach(inject(function ($rootScope, $compile) {
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

  })

});
