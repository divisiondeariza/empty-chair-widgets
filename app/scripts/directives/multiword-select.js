'use strict';

/**
 * @ngdoc directive
 * @name emptyChairWidgetApp.directive:multiwordSelect
 * @description
 * # multiwordSelect
 */
angular.module('emptyChairWidgetApp')
  .directive('multiwordSelect', function () {
    return {
      template: '<div></div>',
      
      //templateUrl:'templates/directives/multiword-select.html',
      restrict: 'E',
      scope: {
         words: '<',
         selected: "="
      },
      link: function postLink(scope, element) {
      	scope.toggleWord  = function(word){
      		if(scope.words.indexOf(word)!=-1){
      			var index = scope.selected.indexOf(word);
      			if(index == -1){
		      		scope.selected.push(word);
      			}
		      	else{
		      		scope.selected.splice(index,1);
		      	}
      		}
      	};
        // element.text('this is the multiwordSelect directive');
      }
    };
  });
