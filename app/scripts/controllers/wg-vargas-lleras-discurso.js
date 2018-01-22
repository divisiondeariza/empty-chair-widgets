'use strict';

/**
 * @ngdoc function
 * @name emptyChairWidgetApp.controller:WgVargasLlerasDiscursoCtrl
 * @description
 * # WgVargasLlerasDiscursoCtrl
 * Controller of the emptyChairWidgetApp
 */
angular.module('emptyChairWidgetApp')
  .controller('WgVargasLlerasDiscursoCtrl', ["$scope", "$http", "$window", "wordsVizDataProcessor" ,"data", "options", 
    function ($scope, $http, $window, wordsVizDataProcessor, data, options) {
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
      $scope.d3data = $scope.selectedWords.map(

        function(wordData) {
           return totaldata[wordData.word];
            }
        );
    });


    $scope.options =  options;
    $scope.options.chart.xAxis.tickFormat = function(d) {
                        return d3.time.format('%Y-%m-%d')(new Date(d));
                    };
    $scope.options.chart.interactiveLayer = { 
      "tooltip": {

      headerFormatter: function (d) {
                          var date = new Date(d);
                          date.setTime( date.getTime() + date.getTimezoneOffset()*60*1000 );
                          var formatedDate = $scope.options.chart.xAxis.tickFormat(date);
                          var mark = "";
                          if(marks[formatedDate])
                            mark = "<p>" + marks[formatedDate] + "</p>"
                          return formatedDate + mark;
                      }
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
