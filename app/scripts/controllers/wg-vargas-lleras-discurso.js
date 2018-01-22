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
    $scope.selectedWords = w.getSortedWords(data, "score", false, 3)
    $scope.$watchCollection('selectedWordTuples', function(){
      $scope.selectedWords  = $scope.selectedWordTuples.map(function(e){return e.word})
    });


//            ControlBox
    function mapForMultiwordSelect(element){
      return {word:element};
    }
    $scope.wordTuples = w.getSortedWords(data, "lemma")
                                        .map(mapForMultiwordSelect);
    $scope.selectedWordTuples = $scope.selectedWords.map(mapForMultiwordSelect);



//             WordsViz
    var totaldata = w.remap(data, "norm1");
    var marks = w.reindexMarks(data);
    $scope.d3data = [];
    $scope.$watchCollection('selectedWords', function(){
      $scope.d3data = w.getFromRemapped(totaldata, $scope.selectedWords);
    });
    $scope.options =  options;
    $scope.options.chart.xAxis.tickFormat = w.formatDate;
    $scope.options
          .chart
          .interactiveLayer = { 
                  tooltip: {
                    headerFormatter: w.formatDateWithMarks.bind(w, marks),
                  },
    }

    $scope.options.chart.lines = {
                                   dispatch : {
                                    elementClick: function(e){ 
                                      var index = e[0].pointIndex;
                                      $scope.selectedWords = w.getSortedWordsBySerie(data, "norm1", index, false, 3)
                                      $scope.$digest();
                                      }
                                    }
                                  };
  }]);
