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

    var totaldata = wordsVizDataProcessor.remap(data, "norm1");

    $scope.words = Object.keys(data.words)
    .sort()
    .map(function(element, index){
      return {word:element} ;
    });
    var scoreSortedWords = $scope.words.map(function(e){return e}).sort(function(a, b){
      return data.words[b.word].score - data.words[a.word].score;
    });
    $scope.selectedWords = scoreSortedWords.slice(0,3);
    $scope.d3data = [];

    $scope.$watchCollection('selectedWords', function(){
      $scope.d3data = $scope.selectedWords.map(

        function(wordData) {
           return totaldata[wordData.word];
            }
        );
    });


    $scope.options =  options;
/*    $scope.options.chart.xAxis.tickValues = Object.keys(data.marks)
                                              .map(function(d){
                                                var date = new Date(d);
                                                date.setTime( date.getTime() + date.getTimezoneOffset()*60*1000 );
                                                return new Date(date);
                                              })*/
    $scope.options.chart.xAxis.tickFormat = function(d) {
                        //return data.marks[d3.time.format('%Y-%m-%d')(new Date(d))];
                        return d3.time.format('%Y-%m-%d')(new Date(d));
                    };    
    $scope.options.chart.yAxis.tickFormat = function(d) {
                        return Math.round(d * 100)/100;
                    };


    $scope.options.chart.lines = {
                                   dispatch : {
                                    elementClick: function(e){ 
                                      var index = e[0].pointIndex;
                                      var top3 = $scope.words
                                                  .map(function(e){return e})
                                                  .sort(function(a, b){
                                                      return data.words[b.word].norm1[index] - data.words[a.word].norm1[index];
                                                    })
                                                  .slice(0,3);
                                      $scope.selectedWords = top3;
                                      $scope.$digest();
                                      }
                                    }
                                  };
  }]);
