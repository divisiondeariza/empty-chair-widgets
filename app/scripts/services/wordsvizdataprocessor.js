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
    	Object.keys(data.words)
    		  .forEach(populateRemapedObject, {totaldata:totaldata, serieName:serieName, data:data});
    	return totaldata
    };

    this.getSortedWords = function(data, propertyName, isAscending, end){
    	var compareFunction = compareByProperty.bind(null, data, propertyName, isAscending);
    	return getSortedWordsBase(compareFunction, data, end);    	
    };

    this.getSortedWordsBySerie = function(data, serieName, index, isAscending, end){
    	var compareFunction = compareBySerie.bind(null, data, serieName, index, isAscending)
    	return getSortedWordsBase(compareFunction, data, end);
    };

    this.reindexMarks = function(data){
    	var dates =  getDates(data);
    	console.log(dates);
    	var reindexed  = {};

    	Object.keys(data.marks)
    				 .forEach(function(strdate){
    				 	var index = getClosestIndex((new Date(strdate)), dates);
    				 	reindexed[data.dates[index]] = data.marks[strdate];

    				 });
    	return reindexed;

    }

    // Could be done faster
    function getClosestIndex(num, arr){
        var curr = arr[0];
        var index = 0;
        var diff = Math.abs (num - curr);
        for (var val = 0; val < arr.length; val++) {
            var newdiff = Math.abs (num - arr[val]);
            if (newdiff < diff) {
                diff = newdiff;
                curr = arr[val];
                index = val;
            }
        }
        return index;    	
    }

    function getSortedWordsBase(compareFunction, data, end){
		var wordsList = Object.keys(data.words)
						.sort(compareFunction);
	    if(end)
	    	return wordsList.slice(0,end);
	    return wordsList;
    }

    function compareByProperty(data, propertyName, isAscending, a, b){
    	var sign = isAscending?1:-1;
		return (data.words[a][propertyName] - data.words[b][propertyName]) * sign;
    }

    function compareBySerie(data, serieName, index, isAscending, a, b){
    	var sign = isAscending?1:-1;
    	return (data.words[a][serieName][index] - data.words[b][serieName][index]) * sign;
    }

    function populateRemapedObject(word){
		var rawvalues = this.data.words[word][this.serieName];
		var dates =  getDates(this.data);
		this.totaldata[word] = remapForSingleWord(dates, rawvalues, word)   	
    }

    function remapForSingleWord(xvalues, yvalues, key){
    	return  {values: yvalues.map(remapSingleDatumToXY, {xvalues:xvalues}),
    	key: key}
    }

    function remapSingleDatumToXY(yvalue, index){
    	return {x: this.xvalues[index], y: yvalue};   	
    }

    function getDates(data){
    	return data.dates.map(parseStrToDate); 
    }

    function parseStrToDate(strdate){
    	return new Date(strdate);
    }
});
