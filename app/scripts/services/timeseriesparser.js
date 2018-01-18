'use strict';

/**
 * @ngdoc service
 * @name emptyChairWidgetApp.timeSeriesParser
 * @description
 * # timeSeriesParser for time series in the form:
 * {dates: [...],
 *  sets: {
 *	        ...
 *			set_n: {
 *				...	
 *				serie_n: [...]
 *					}
 *			}
 *  }
 * Service in the emptyChairWidgetApp.
 */
angular.module('emptyChairWidgetApp')
  .service('timeSeriesParser', function () {
  	this.getDateValueTuples  = function(timeSeries, datesName, setsName, singleSetName, serieName){
  		var rawvalues = timeSeries[setsName][singleSetName][serieName];
  		var dates = this.getDates(timeSeries, datesName);
  		return rawvalues.map(function(value, index){
	                            return {x: dates[index], 
	                                    y: value};
	                          })

  	};

  	this.getDates = function(timeSeries, datesName){
  		return timeSeries["dates"].map(function(strdate){
						      return new Date(strdate);
						    }); 
  	}
  	this.getNames = function(timeSeries, setsName){
  		return Object.keys(timeSeries[setsName]);
  	};

    // AngularJS will instantiate a singleton by calling "new" on this function
  });
