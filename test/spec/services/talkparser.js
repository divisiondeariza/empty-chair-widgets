'use strict';

describe('Service: talkParser', function () {

  // load the service's module
  beforeEach(module('emptyChairWidgetApp'));

  // instantiate service
  var talkParser;
  beforeEach(inject(function (_talkParser_) {
    talkParser = _talkParser_;
  }));
  describe("tags", function(){
    var talkWordObjects;
    beforeEach(function(){
      talkWordObjects = {
                        "word1":{tags:["tag1"]},
                        "word2":{tags:["tag2"]},
                        "word3":{tags:["tag1", "tag2"]},
                      }
    });

    it('should classify by tag', function(){
      var expectedClassifiedWords = {"tag1": ["word1", "word3"],
                                     "tag2": ["word2", "word3"],};
      expect(talkParser.classifyByTag(talkWordObjects)).toEqual(expectedClassifiedWords);
    });

    it('should get tags', function(){
      expect(talkParser.getTags(talkWordObjects)).toEqual(["tag1", "tag2"]);
    })
  });

  describe("remapForGraph", function(){
    var talkWordObjects;
    beforeEach(function(){
      talkWordObjects = {
                        "word1": {activity:Math.random(),
                                  effectivity: Math.random(),
                                  sentiment: Math.random(),
                                  magnitude: Math.random(),
                                  tags: ["tag1", "tag2"] },
                        "word2": {activity:Math.random(),
                                  effectivity: Math.random(),
                                  sentiment: Math.random(),
                                  magnitude: Math.random(),
                                  tags: ["tag1", "tag3"]  },
                        "word3": {activity:Math.random(),
                                  effectivity: Math.random(),
                                  sentiment: Math.random(),
                                  magnitude: Math.random(),
                                  tags: ["tag2", "tag3"]  },
                      }
    });

    it("should remap all data in talkWordObjects", function(){
      var remapped = talkParser.remapAll(talkWordObjects);
      var expectedRemmaped = [
                              {x:talkWordObjects.word1.sentiment,
                               y:talkWordObjects.word1.magnitude, 
                               size: talkWordObjects.word1.activity,
                               shape:"circle",
                               word: "word1", },
                              {x:talkWordObjects.word2.sentiment,
                               y:talkWordObjects.word2.magnitude, 
                               size: talkWordObjects.word2.activity,
                               shape:"circle",
                               word: "word2", },
                              {x:talkWordObjects.word3.sentiment,
                               y:talkWordObjects.word3.magnitude, 
                               size: talkWordObjects.word3.activity,
                               shape:"circle",
                               word: "word3" }
      ];
      expect(remapped).toEqual(expectedRemmaped);
    });

    it("should remap only data of words given of talkWordObjects", function(){
      var remapped = talkParser.remapChosenWords(talkWordObjects, ["word1", "word3"]);
      var expectedRemmaped = [
                              {x:talkWordObjects.word1.sentiment,
                               y:talkWordObjects.word1.magnitude, 
                               size: talkWordObjects.word1.activity,
                               shape:"circle",
                               word: "word1", },
                              {x:talkWordObjects.word3.sentiment,
                               y:talkWordObjects.word3.magnitude, 
                               size: talkWordObjects.word3.activity,
                               shape:"circle",
                               word: "word3" }
      ];
      expect(remapped).toEqual(expectedRemmaped);
    });

    it("should remap only data of tag given of talkWordObjects", function(){
      var remapped = talkParser.remapWordsWithTag(talkWordObjects, "tag1")
      var expectedRemmaped = [
                              {x:talkWordObjects.word1.sentiment,
                               y:talkWordObjects.word1.magnitude, 
                               size: talkWordObjects.word1.activity,
                               shape:"circle",
                               word: "word1", },
                              {x:talkWordObjects.word2.sentiment,
                               y:talkWordObjects.word2.magnitude, 
                               size: talkWordObjects.word2.activity,
                               shape:"circle",
                               word: "word2" }
      ];
      expect(remapped).toEqual(expectedRemmaped);
    });

    it("should remap and regroup by tag", function(){
      var remapped = talkParser.remapAndRegroupByTags(talkWordObjects);
      var expectedRemmaped = [
                              {key: "tag1", values: talkParser.remapWordsWithTag(talkWordObjects, "tag1")},
                              {key: "tag2", values: talkParser.remapWordsWithTag(talkWordObjects, "tag2")},
                              {key: "tag3", values: talkParser.remapWordsWithTag(talkWordObjects, "tag3")},
                              ]
      expect(remapped).toEqual(expectedRemmaped);                       
    })

  })
});
