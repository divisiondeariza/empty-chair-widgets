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
    function ($scope, wordsVizDataProcessor, data, options) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    function mapForMultiwordSelect(element){
      return {word:element};
    }

    var totaldata = wordsVizDataProcessor.remap(data, "norm1");
    var marks = wordsVizDataProcessor.reindexMarks(data);
    $scope.d3data = [];
    $scope.selectedWords = wordsVizDataProcessor.getSortedWords(data, "score", false, 3)
                                                .map(mapForMultiwordSelect);

    $scope.words = wordsVizDataProcessor.getSortedWords(data, "lemma")
                                        .map(mapForMultiwordSelect);


    

    $scope.$watchCollection('selectedWords', function(){
      var words = $scope.selectedWords.map(function(e){return e.word})
      $scope.d3data = wordsVizDataProcessor.getFromRemapped(totaldata, words);
    });


    $scope.options =  options;
    $scope.options.chart.xAxis.tickFormat = wordsVizDataProcessor.formatDate;
    $scope.options
          .chart
          .interactiveLayer = { 
                  tooltip: {
                    headerFormatter: wordsVizDataProcessor.formatDateWithMarks.bind(wordsVizDataProcessor, marks),
                  },
    }

    $scope.options.chart.lines = {
                                   dispatch : {
                                    elementClick: function(e){ 
                                      var index = e[0].pointIndex;
                                      $scope.selectedWords = wordsVizDataProcessor
                                                                  .getSortedWordsBySerie(data, "norm1", index, false, 3)
                                                                  .map(mapForMultiwordSelect);;
                                      $scope.$digest();
                                      }
                                    }
                                  };
  }]);
