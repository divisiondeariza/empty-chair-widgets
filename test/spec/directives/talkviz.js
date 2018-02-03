'use strict';

describe('Directive: talkViz', function () {

  // load the directive's module
  beforeEach(module('emptyChairWidgetApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

    describe("test render", function(){

      beforeEach(inject(function ($rootScope, _wordsVizDataProcessor_) {
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

      }));

      it('should have set the correct template', inject(function ($compile) {
        element = angular.element('<talk-viz options=options data=data></talk-viz>');
        element = $compile(element)(scope);       
        expect(element.html()).toBe('<nvd3 class="talk-viz ng-isolate-scope" options="options" data="data"></nvd3>');
      }));

    })

/*  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<talk-viz></talk-viz>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the talkViz directive');
  }));*/
});
