'use strict';

/**
 * @ngdoc service
 * @name emptyChairWidgetApp.talkParser
 * @description
 * # talkParser
 * Service in the emptyChairWidgetApp.
 */
angular.module('emptyChairWidgetApp')
  .service('talkParser', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.classifyByTag = classifyByTag;
    this.getTags = getTags;
    this.remapAndRegroupByTags = remapAndRegroupByTags
    this.remapAll = remapAll;
    this.remapWordsWithTag =  remapWordsWithTag;
    this.remapChosenWords = remapChosenWords;

	function classifyByTag(talkWordsObject){
    	var classifiedWords = {};
    	getTags(talkWordsObject).forEach(function(tag){
    		classifiedWords[tag] = [];
    	})
    	Object.keys(talkWordsObject).forEach(function(word){
    		talkWordsObject[word].tags.forEach(function(tag){
    			classifiedWords[tag].push(word);
    		})
    	});
    	return classifiedWords;
    };

    function getTags(talkWordsObject){
    	var tags = []
    	Object.keys(talkWordsObject).forEach(function(word){
    		talkWordsObject[word].tags.forEach(function(tag){
    			if(tags.indexOf(tag)==-1){
    				tags.push(tag);
    			}
    		})
    	})
    	return tags;
    };

    function remapAndRegroupByTags(talkWordsObject){
    	var tags = getTags(talkWordsObject);
    	var remapped = []
    	return tags.map(function(tag){
    		return {values: remapWordsWithTag(talkWordsObject, tag),
    				key:tag}
    	})

    }

	function remapAll(talkWordsObject){
    	return remapChosenWords(talkWordsObject, Object.keys(talkWordsObject))
    };

  	function remapWordsWithTag(talkWordsObject, tag){
    	var words = classifyByTag(talkWordsObject)[tag];
    	return remapChosenWords(talkWordsObject, words)
    }  

    function remapChosenWords(talkWordsObject, words){
     	var remapped = [];
    	words.forEach(function(word){
    		remapped.push(remapWord(talkWordsObject, word));
    	})
    	return remapped;   	
    }

    function remapWord(talkWordsObject, word){
    	return	{
	    			x:talkWordsObject[word].sentiment,
	    			y:talkWordsObject[word].magnitude,
	    			size:talkWordsObject[word].activity,
	    			shape:"circle",
	    			word: word
    			}
    };
});
