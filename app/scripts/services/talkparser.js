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

});
