'use strict';

describe('Service: talkParser', function () {

  // load the service's module
  beforeEach(module('emptyChairWidgetApp'));

  // instantiate service
  var talkParser;
  beforeEach(inject(function (_talkParser_) {
    talkParser = _talkParser_;
  }));

  it('should do something', function () {
    expect(!!talkParser).toBe(true);
  });

  it('should classify by tag', function(){
    var talkWordObjects = {
                      "word1":{tags:["tag1"]},
                      "word2":{tags:["tag2"]},
                      "word3":{tags:["tag1", "tag2"]},
                    }
    var expectedClassifiedWords = {
      "tag1": ["word1", "word3"],
      "tag2": ["word2", "word3"],
                                   };
    expect(talkParser.classifyByTag(talkWordObjects)).toEqual(expectedClassifiedWords);
  })

});
