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
    	Object.keys(talkWordsObject).forEach(function(word){
    		talkWordsObject[word].tags.forEach(function(tag){
    			if (classifiedWords[tag] == undefined) 
    				classifiedWords[tag] = [];
    			classifiedWords[tag].push(word);

    		})
    	});

    	return classifiedWords;
    }
  });
