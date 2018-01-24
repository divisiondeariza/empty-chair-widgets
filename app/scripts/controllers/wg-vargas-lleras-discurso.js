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

//             WordsViz

    $scope.d3data = [];
    $scope.options =  options;
    $scope.options.chart.xAxis.tickFormat = w.formatDate;


    var marks = w.reindexMarks(data);    
    $scope.options
          .chart
          .interactiveLayer = { 
                  tooltip: {
                    headerFormatter: w.formatDateWithMarks.bind(w, marks),
                  },
    };
    var totaldata = w.remap(data, "norm1");                              
    $scope.$watchCollection('selectedWords', function(){
      $scope.d3data = w.getFromRemapped(totaldata, $scope.selectedWords);
    });

    $scope.options.chart.lines = {
                                   dispatch : {
                                    elementClick: function(e){ 
                                      var index = e[0].pointIndex;
                                      $scope.selectedWords = w.getSortedWordsBySerie(data, "norm1", index, false, 3)
                                      $scope.$digest();
                                      }
                                    }
                                  };


//            ControlBox
    function mapForMultiwordSelect(element){
      return {word:element};
    }
    $scope.wordTuples = w.getSortedWords(data, "lemma")
                                        .map(mapForMultiwordSelect);
    $scope.selectedWordTuples = $scope.selectedWords.map(mapForMultiwordSelect);

  }]);
