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
    this.classifyByTag = function(talkWordsObject){
    	var classifiedWords = {};
    	this.getTags(talkWordsObject).forEach(function(tag){
    		classifiedWords[tag] = [];
    	})
    	Object.keys(talkWordsObject).forEach(function(word){
    		talkWordsObject[word].tags.forEach(function(tag){
    			classifiedWords[tag].push(word);
    		})
    	});
    	return classifiedWords;
    }

    this.getTags = function(talkWordsObject){
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

    this.remapAll = function(talkWordsObject){
    	return this.remapChosenWords(talkWordsObject, Object.keys(talkWordsObject))
    };

    this.remapWordsWithTag=  function(talkWordsObject, tag){
    	var words = this.classifyByTag(talkWordsObject)[tag];
    	return this.remapChosenWords(talkWordsObject, words)
    }

    this.remapChosenWords = function(talkWordsObject, words){
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
