'use strict';

describe('Directive: wordsViz', function () {

  // load the directive's module
  beforeEach(module('emptyChairWidgetApp'));


    var element,
    wordsVizDataProcessor,
    scope,
    marksMock,
    remapedDataMock;



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
        wordsVizDataProcessor = _wordsVizDataProcessor_;
        spyOn(wordsVizDataProcessor, "reindexMarks");
        spyOn(wordsVizDataProcessor, "remap");

      }));
      it('should have set the correct template', inject(function ($compile) {
        element = angular.element('<words-viz options=options data=data selected-words=selectedWords></words-viz>');
        element = $compile(element)(scope);       
        expect(element.html()).toBe('<nvd3 options="options" data="graphData" class="ng-isolate-scope"></nvd3>');
      }));

    })



    describe("with mocked nvd3 directive", function(){
      beforeEach(module('emptyChairWidgetApp', function($compileProvider) {
          $compileProvider.directive('nvd3', function() {
            var fake = {
              priority: 100,
              terminal: true,
              restrict: 'E',
              template: '<div class="fake">Not the real thing.</div>',
            };
            return fake;
          });
        }));

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
          scope.data = {"some": "data"};
          scope.selectedWords = ["Some", "words"]; 
          wordsVizDataProcessor = _wordsVizDataProcessor_;
          marksMock = {marks:"marks"};
          remapedDataMock = {data: "data"};
          spyOn(wordsVizDataProcessor, "reindexMarks").and.returnValue(marksMock);
          spyOn(wordsVizDataProcessor, "remap").and.returnValue(remapedDataMock);

      }));

      describe("Test bind data correctly with scope", function(){
        beforeEach(inject(function ($compile) {
          spyOn(wordsVizDataProcessor, "formatDateWithMarks");
          element = angular.element('<words-viz options=options data=data selected-words=selectedWords></words-viz>');
          element = $compile(element)(scope);    
        }));

        it("should set graphData as an empty array by default", function(){
          expect(element.isolateScope().graphData).toEqual([]);
        });

        it("should bind options.chart.xAxis.tickFormat to wordsVizDataProcessor.formatDate", function(){
          var options = element.isolateScope().options;
          expect(options.chart.xAxis.tickFormat).toBe(wordsVizDataProcessor.formatDate);
        });

        it("should set formatDateWithMarks as headerFormatter", function(){
          var marks = wordsVizDataProcessor.reindexMarks(scope.data);
          var dateMock = new Date();
          scope.options.chart.interactiveLayer.tooltip.headerFormatter(dateMock);
          expect(wordsVizDataProcessor.formatDateWithMarks).toHaveBeenCalledWith(marks, dateMock);
        });

      });

      describe("set options from params", function(){
        beforeEach(inject(function ($compile) {
          element = angular.element('<words-viz options=options\
                                                data=data\
                                                axis-label-x="Label for xAxis"\
                                                axis-label-y="Label for yAxis"\
                                                caption="text for caption"\
                                                selected-words=selectedWords></words-viz>');
          element = $compile(element)(scope);    
        }));

        it("should set xAxisLabel correctly", function(){
          var options = element.isolateScope().options;
          expect(options.chart.xAxis.axisLabel).toEqual("Label for xAxis")
        });

        it("should set yAxisLabel correctly", function(){
          var options = element.isolateScope().options;
          expect(options.chart.yAxis.axisLabel).toEqual("Label for yAxis")
        });
        
        it("should set caption correctly", function(){
          var options = element.isolateScope().options;
          expect(options.caption.text).toEqual("text for caption");
        });

      })

      describe("Test asynchronous calls", function(){
        var dataFromRemapedMock;
        beforeEach(inject(function ($compile, $httpBackend) {
        element = angular.element('<words-viz options=options data=data selected-words=selectedWords></words-viz>');
        element = $compile(element)(scope); 
        dataFromRemapedMock = {"another": "data"};
        spyOn(wordsVizDataProcessor, "getFromRemapped").and.returnValue(dataFromRemapedMock); 
        $httpBackend.when('GET', 'views/main.html').respond({});  // No sé, Ernesto, no sé.
      }));    

        it("should update data when updated selected words", function(){
          scope.selectedWords = ["alpha", "beta", "gamma"];
          scope.$digest();
          expect(wordsVizDataProcessor.getFromRemapped).toHaveBeenCalledWith(remapedDataMock, scope.selectedWords);
          expect(element.isolateScope().graphData).toBe(dataFromRemapedMock);
        });

        it("should update selectedWords with three most high values for that index, and then updates graphData", function(){  
        var eventMock = [{"pointIndex": Math.floor(Math.random() * 1000)}]; // Maybe I'm doing it fucking wrong, but if there's something wrong this gonna fall for sure
        var sortedWordsMock = ["alpha", "beta", "gamma"];
        var options = element.isolateScope().options;
        spyOn(wordsVizDataProcessor, "getSortedWordsBySerie").and.returnValue(sortedWordsMock);
        options.chart.lines.dispatch.elementClick(eventMock);
        expect(wordsVizDataProcessor.getSortedWordsBySerie).toHaveBeenCalledWith(scope.data, "norm1", eventMock[0].pointIndex, false, 3);
        expect(element.isolateScope().graphData).toBe(dataFromRemapedMock);
        expect(scope.selectedWords).toBe(sortedWordsMock);



      })

      });

    });

  });
