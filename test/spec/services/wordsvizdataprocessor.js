'use strict';

describe('Service: wordsVizDataProcessor', function () {

  // load the service's module
  beforeEach(module('emptyChairWidgetApp'));

  // instantiate service
  var wordsVizDataProcessor, timeSeriesParser, datamock;
  beforeEach(inject(function (_wordsVizDataProcessor_) {
    wordsVizDataProcessor = _wordsVizDataProcessor_;
/*    datamock = {
              dates: ["2015-06-03", "2015-06-13"],
              sets: {
                set1:{
                  serie1: [0,1],
                  serie2: [0,0.1],
                  score: 10
                },
                 set3:{
                  serie1: [3,4],
                  serie2: [0.3,0.4],
                  score: 100
                },
                 set2:{
                  serie1: [8,7,6],
                  serie2: [0.8,0.7,0.6],
                  score: 30
                },
                 set4:{
                  serie1: [9,9,9],
                  serie2: [0.9,0.9,0.9],
                  score: 1
                }
              },
              marks: {
                "2015-06-05":"fact 1",
                "2015-06-14":"fact 2"
              }

    }*/
  }));

  it('should do something', function () {
    expect(!!wordsVizDataProcessor).toBe(true);
  });

  describe('remapping', function(){
    beforeEach(function(){
    datamock = {
              dates: ["2015-06-03", "2015-06-13"],
              words: {
                set1:{
                  serie1: [0,1],
                  serie2: [0,0.1],
                  score: 10
                },
                 set3:{
                  serie1: [3,4],
                  serie2: [0.3,0.4],
                  score: 100
                }
              },
              marks: {
                "2015-06-05":"fact 1",
                "2015-06-14":"fact 2"
              }

    }
    })
    it('should remap AllData given a serie', function(){
      var remappedData = wordsVizDataProcessor.remap(datamock, "serie1");
      var expectedRemappedData = {set1: {
                                    values:[{y:0, x:(new Date("2015-06-03"))},
                                            {y:1, x:(new Date("2015-06-13"))},],
                                    key: "set1"
                                  },
                                  set3: {
                                    values:[{y:3, x:(new Date("2015-06-03"))},
                                            {y:4, x:(new Date("2015-06-13"))},],
                                    key: "set3",}
                                   };
      expect(remappedData).toEqual(expectedRemappedData);
    })
  })


});
