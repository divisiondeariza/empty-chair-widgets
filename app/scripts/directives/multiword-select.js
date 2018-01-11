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
      templateUrl:'templates/directives/multiword-select.html',
      restrict: 'E',
      scope: {
         words: '<',
         selectedWords: "="
      },
      link: postLink,
    };

    function postLink(scope, element) {
      	scope.categories = scope.words.map(function(element){
      		return element.category;
      	}).filter(function(value, index, self) { 
				    return self.indexOf(value) === index;
				}
      	)

      	scope.toggleWord  = function(wordData){
      		if(getIndexOfWord(scope.words, wordData)!=-1){
      			var index = getIndexOfWord(scope.selectedWords, wordData);
      			if(index == -1){
		      		scope.selectedWords.push(wordData);
      			}
		      	else{
		      		scope.selectedWords.splice(index,1);
		      	}
      		}
      	};
      	scope.isSelected = function(wordData){
      		return getIndexOfWord(scope.selectedWords, wordData) > -1;
      	};

      	function getIndexOfWord(array, wordData){
      		var word = wordData.word;
      		var wordsArray = array.map(function(element){
      			return element.word;
      		})
      		return wordsArray.indexOf(word);
      	};



      }
  });
