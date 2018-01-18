'use strict';

/**
 * @ngdoc function
 * @name emptyChairWidgetApp.controller:WgVargasLlerasDiscursoCtrl
 * @description
 * # WgVargasLlerasDiscursoCtrl
 * Controller of the emptyChairWidgetApp
 */
angular.module('emptyChairWidgetApp')
  .controller('WgVargasLlerasDiscursoCtrl', ["$scope", "$http", "$window", "timeSeriesParser" ,"data", "options", 
    function ($scope, $http, $window, timeSeriesParser, data, options) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var dates = timeSeriesParser.getDates(data, "dates");

    var totaldata = {};

    Object.keys(data.words).forEach(function(word){
      var rawvalues = data.words[word].norm1;
      totaldata[word] = {values: rawvalues
                                  //.slice(300,400)
                                  .map(function(value, index){
                                    return {x: dates[index], 
                                            y: value};
                                  }),
                        key:word}
    });

    $scope.data = data;

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
      $scope.options.chart.height = $scope.options.chart.height;
    });

/*    angular.element($window).on('resize', function () {
        if($window.innerWidth<576){
          $scope.options.chart.height =  400;
        } else{
          $scope.options.chart.height = 250;
        };
    });*/


    $scope.options =  options;
    $scope.options.chart.xAxis.tickFormat = function(d) {
                        return d3.time.format('%Y-%m-%d')(new Date(d))
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
