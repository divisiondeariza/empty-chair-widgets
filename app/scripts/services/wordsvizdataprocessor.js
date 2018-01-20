'use strict';

/**
 * @ngdoc service
 * @name emptyChairWidgetApp.wordsVizDataProcessor
 * @description
 * # wordsVizDataProcessor
 * Service in the emptyChairWidgetApp.
 */
angular.module('emptyChairWidgetApp')
  .service('wordsVizDataProcessor', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.remap = function(data,serieName){
    	var totaldata = {};
	    Object.keys(data.words).forEach(function(word){
	      var rawvalues = data.words[word][serieName];
	      var dates =   data.dates.map(function(strdate){
						      return new Date(strdate);
						    }); 
	      totaldata[word] = {values: rawvalues.map(function(value, index){
									                            return {x: dates[index], 
									                                    y: value};
									                          }),
	                        key:word}
	    });
    	return totaldata
    }
  });
