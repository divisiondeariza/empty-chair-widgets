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
         selectedWords: "=",
         selectLimit: "<",
         limitReachedMsg: "@",
      },
      link: postLink,
    };

    function postLink(scope, element) {
    	scope.alerts = [];

      	scope.categories = scope.words.map(getCategory)
      								  .filter(uniqueFilter)

      	scope.closeAlert = function(index){
      		scope.alerts.splice(index, 1)
      	}

      	scope.toggleWord  = function(wordData){
      		if(getIndexOfWord(scope.words, wordData)!=-1){
      			toggleExistentWordInWords(wordData);
      		}
      	};
      	scope.isSelected = function(wordData){
      		return getIndexOfWord(scope.selectedWords, wordData) > -1;
      	};

      	function toggleExistentWordInWords(wordData){
			var index = getIndexOfWord(scope.selectedWords, wordData);
			if(index == -1){
				selectWord(wordData);
			}
			else{
				scope.selectedWords.splice(index,1);
			}      		
      	}

      	function getIndexOfWord(array, wordData){
      		var word = wordData.word;
      		var wordsArray = array.map(getWord);
      		return wordsArray.indexOf(word);
      	};

      	function uniqueFilter(value, index, self) { 
		    return self.indexOf(value) === index;
		}

		function getCategory(wordData){
			return wordData.category;
		}		

		function getWord(wordData){
			return wordData.word;
		}

      	function selectWord(wordData){
			if(!scope.selectLimit || scope.selectedWords.length < parseInt(scope.selectLimit)) {
				scope.selectedWords.push(wordData);
			}else{
				setAlert();
			}      		
      	}

      	function setAlert(){
			if(scope.alerts.length == 0){
				scope.alerts.push({msg:scope.limitReachedMsg});
			}
      	}


      }
  });
