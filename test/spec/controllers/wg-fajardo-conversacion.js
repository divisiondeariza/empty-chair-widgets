'use strict';

describe('Controller: WgFajardoConversacionCtrl', function () {

  // load the controller's module
  beforeEach(module('emptyChairWidgetApp'));

  var WgFajardoConversacionCtrl,
    scope,
    options,
    data,
    $document,
    talkParser,
    tooltopGenerator,
    tagsMock,
    remappedMock;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $compile, _talkParser_, _tooltipGenerator_) {
    scope = $rootScope.$new();
    options = {chart:{
      scatter:{},
      somevalue: "generic",
      xAxis:{
        tickFormat: function(v){return v}
      },      
      yAxis:{
        tickFormat: function(v){return v}
      },
      tooltip: {},
      color:["#fff"]
    }};
    data = {_words:{}};
    tagsMock = ["a", "b"];
    talkParser = _talkParser_;
    tooltopGenerator = _tooltipGenerator_;
    remappedMock = {};
    spyOn(talkParser, "remapAndRegroupByTags").and.returnValue(remappedMock);
    spyOn(talkParser, "getTags").and.returnValue(tagsMock);
    spyOn(tooltopGenerator, "generateTalkVizTooltip");
    var html =  "<div id='some-id'>" +
            "<svg>" +
              "<g class='nv-group nv-series-1'>" +
                "<path class='nv-point nv-point-1 selected'></path>" +
                "<path class='nv-point nv-point-2'></path>" +
              "</g>" +
              "<g class='nv-group nv-series-2'>" +
                "<path class='nv-point nv-point-3'></path>" +
                "<path class='nv-point nv-point-4'></path>" +
              "</g>" +
           "</svg>" +
           "<div>"     
    $document = angular.element(document);
    $document.find('body').append(html);
    WgFajardoConversacionCtrl = $controller('WgFajardoConversacionCtrl', {
      $scope: scope,
      options: options,
      data: data
      // place here mocked dependencies
    });
  }));
  describe("select nodes", function(){
    var event;
    beforeEach(inject(function($compile){
      event = {seriesIndex: 2, pointIndex:4, point:{word: "selected-word"}};
      data["selected-word"] = {};
    }));

    it('should toggle the select class given the directive id and the event', inject(function($compile){
      scope.selectPoint('some-id', event);
      var elementFound = $document.find(".selected")[0];
      expect(elementFound.className.baseVal).toEqual('nv-point nv-point-4 selected')

    }));

    it('should update slaveWords', function(){
      var remappedMock = {remapped: Math.random()}
      spyOn(talkParser, "remapAll").and.returnValue(remappedMock);
      scope.selectPoint('some-id', event);
      expect(talkParser.remapAll).toHaveBeenCalledWith(data["selected-word"]);
      expect(scope.slaveWords).toEqual([{key:"selected-word", values: remappedMock}]);
    })

  });

  describe("option settings", function(){
    var options;
    describe("master option", function(){
      beforeEach(function(){
        options = scope.masterOptions;
      });

      it("should set defaults", function(){
        expect(scope.masterOptions.chart.somevalue).toEqual("generic");
      });

      it("should set xAxis.tickFormat", function(){
        var formater = options.chart.xAxis.tickFormat
        expect(formater(Math.PI)).toEqual(d3.format('.02f')(Math.PI));
      });

      it("should set xAxis.tickFormat", function(){
        var formater = options.chart.yAxis.tickFormat
        expect(formater(Math.PI)).toEqual(d3.format('.02f')(Math.PI));
      });

      it("should set tooltop.contentGenerator", function(){
        var eventMock = {};
        options.chart.tooltip.contentGenerator(eventMock);
        expect(tooltopGenerator.generateTalkVizTooltip).toHaveBeenCalledWith(eventMock);
      });

      it("should call selectPoint when clicked", function(){
        var eventMock = {}
        spyOn(scope, "selectPoint");
        options.chart.scatter.dispatch.elementClick(eventMock);
        expect(scope.selectPoint).toHaveBeenCalledWith("said-words-viz", eventMock);
      });

      it("should only set first group of words enabled by default", function(){
        var chartMock = {dispatch:{changeState:function(state){}}}
        spyOn(chartMock.dispatch, "changeState");
        options.chart.callback(chartMock);
        expect(chartMock.dispatch.changeState).toHaveBeenCalledWith({disabled: [0,1,1,1]});
      })
    });

    describe("slave option", function(){
      beforeEach(function(){
        options = scope.slaveOptions;
      });

      it("should set defaults", function(){
        expect(options.chart.somevalue).toEqual("generic");
      });     

      it("should set xAxis.tickFormat", function(){
        var formater = options.chart.xAxis.tickFormat
        expect(formater(Math.PI)).toEqual(d3.format('.02f')(Math.PI));
      });

      it("should set xAxis.tickFormat", function(){
        var formater = options.chart.yAxis.tickFormat
        expect(formater(Math.PI)).toEqual(d3.format('.02f')(Math.PI));
      });

      it("should set tooltop.contentGenerator", function(){
        var eventMock = {};
        options.chart.tooltip.contentGenerator(eventMock);
        expect(tooltopGenerator.generateTalkVizTooltip).toHaveBeenCalledWith(eventMock);
      });

      it("should not be defined chart.scatter.dispatch", function(){
        expect(options.chart.scatter.dispatch).not.toBeDefined();
      });

      it("should define noData text", function(){
        expect(options.chart.noData).toEqual("Seleccione una de las palabras a la izquierda");
      });      

      it("First color should be 831dc6", function(){
        expect(options.chart.color[0]).toEqual("#831dc6");
      });
    })
  });

  describe('parsing words', function(){
    it("Should set masterWords correcty when scope.selectedTag changes", function(){
      expect(talkParser.remapAndRegroupByTags).toHaveBeenCalledWith(data._words);
      expect(scope.masterWords).toEqual(remappedMock);
    });

  })
});
