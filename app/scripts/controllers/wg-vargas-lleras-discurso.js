'use strict';

/**
 * @ngdoc function
 * @name emptyChairWidgetApp.controller:WgVargasLlerasDiscursoCtrl
 * @description
 * # WgVargasLlerasDiscursoCtrl
 * Controller of the emptyChairWidgetApp
 */
angular.module('emptyChairWidgetApp')
  .controller('WgVargasLlerasDiscursoCtrl', ["$scope", "wordsVizDataProcessor" ,"data", "options", 
    function ($scope, w, data, options) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

//            Global
    $scope.data = data;
    $scope.options = options;
    $scope.selectedWords = w.getSortedWords(data, "score", false, 3);

    $scope.$watchCollection('selectedWordTuples', function(){
      $scope.selectedWords  = $scope.selectedWordTuples.map(function(e){return e.word})
    });
    $scope.$watchCollection('selectedWords', function(){
      console.log($scope.selectedWords);
      $scope.selectedWordTuples = $scope.selectedWords.map(mapForMultiwordSelect);;
    });


//            ControlBox
    function mapForMultiwordSelect(element){
      return {word:element};
    }
    $scope.wordTuples = w.getSortedWords(data, "lemma")
                                        .map(mapForMultiwordSelect);
    $scope.selectedWordTuples = $scope.selectedWords.map(mapForMultiwordSelect);

  }]);
