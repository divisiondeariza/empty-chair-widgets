'use strict';

/**
 * @ngdoc function
 * @name emptyChairWidgetApp.controller:WgVargasLlerasDiscursoCtrl
 * @description
 * # WgVargasLlerasDiscursoCtrl
 * Controller of the emptyChairWidgetApp
 */
angular.module('emptyChairWidgetApp')
  .controller('WgVargasLlerasDiscursoCtrl', ["$scope", '$window', "wordsVizDataProcessor" ,"data", "options", 
    function ($scope, $window, w, data, options) {
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
      $scope.selectedWordTuples = $scope.selectedWords.map(mapForMultiwordSelect);;
    });


//            ControlBox
    var top10Words = w.getSortedWords(data, "score", false, 10);
    function mapForMultiwordSelect(element){
      return {word:element};
    };

    function filterFotTop(element){
      return top10Words.indexOf(element) != -1;
    }


    $scope.wordTuples = w.getSortedWords(data, "lemma")
                                        .map(mapForMultiwordSelect);

    if($window.innerWidth < 600){
      $scope.wordTuples = w.getSortedWords(data, "lemma")
                                          .filter(filterFotTop)
                                          .map(mapForMultiwordSelect);      
    } 

    $scope.selectedWordTuples = $scope.selectedWords.map(mapForMultiwordSelect);

  }]);
