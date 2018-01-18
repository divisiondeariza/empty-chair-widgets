'use strict';

describe('Service: timeSeriesParser', function () {

  // load the service's module
  beforeEach(module('emptyChairWidgetApp'));

  // instantiate service
  var timeSeriesParser, timeSeries;
  beforeEach(inject(function (_timeSeriesParser_) {
    timeSeriesParser = _timeSeriesParser_;
    timeSeries = {
                  dates: ["2015-06-03", "2015-06-04", "2015-06-05"],
                  sets: {
                    set1:{
                      serie1: [0,1,2],
                      serie2: [0,0.1,0.2],
                      property1: "alpha"
                    },
                     set2:{
                      serie1: [3,4,5],
                      serie2: [0.3,0.4,0.5],
                      property1: "beta"
                    }
                  }

    }
  }));


  it('should get names of sets of series', function(){
    var names = timeSeriesParser.getNames(timeSeries, "sets");
    expect(names).toEqual(["set1", "set2"]);
  });

  it('should get list of dates', function(){
    var dates = timeSeriesParser.getDates(timeSeries, "dates");
    var expectedDates = [(new Date("2015-06-03")), (new Date("2015-06-04")), (new Date("2015-06-05"))];
    expect(dates).toEqual(expectedDates);
  });

  xit('should remap as an array of {x:value, y:date} a serie', function(){
    var serieTuples = timeSeriesParser.getDateValueTuples(timeSeries, "dates", "sets", "set1", "serie1");
    var expectedSerieTuples = [ {y:0, x:(new Date("2015-06-03"))},
                                {y:1, x:(new Date("2015-06-04"))},
                                {y:2, x:(new Date("2015-06-05"))}];
    expect(serieTuples).toEqual(expectedSerieTuples);
  })


  


});

