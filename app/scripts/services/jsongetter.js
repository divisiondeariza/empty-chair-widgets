'use strict';

/**
 * @ngdoc service
 * @name emptyChairWidgetApp.jsonGetter
 * @description
 * # jsonGetter
 * Service in the emptyChairWidgetApp.
 */
angular.module('emptyChairWidgetApp')
  .service('jsonGetter', ["$http", function ($http) {
  	this.get = function(filename){
  		return $http({method: 'GET', url: 'files/' + filename+'.json'})
					.then(function(response){
                        return response.data;
                      });
  	}
    // AngularJS will instantiate a singleton by calling "new" on this function
  }]);
