'use strict';

/**
 * @ngdoc function
 * @name emptyChairWidgetApp.controller:WgVargasLlerasDiscursoCtrl
 * @description
 * # WgVargasLlerasDiscursoCtrl
 * Controller of the emptyChairWidgetApp
 */
angular.module('emptyChairWidgetApp')
  .controller('WgVargasLlerasDiscursoCtrl', ["$scope", "$http", "$window", "data", "options", 
    function ($scope, $http, $window, data, options) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    console.log($window);
    var dates = data.dates.map(function(strdate){
      return new Date(strdate);
    })

    var totaldata = {};

    Object.keys(data.words).forEach(function(word){
      var rawvalues = data.words[word].norm1;
      totaldata[word] = {values: rawvalues.map(function(value, index){
                                    return {x: dates[index], 
                                            y: value};
                                }),
                        key:word}
    });
    console.log(totaldata);
    //$scope.data = data;
    $scope.selectedWords = [];
    $scope.words = Object.keys(data.words)
    .map(function(element, index){
      return {word:element, category:data.words[element].tag} ;
    });
    $scope.d3data = [];

    $scope.$watchCollection('selectedWords', function(){
      $scope.d3data = $scope.selectedWords.map(

        function(wordData) {
           return totaldata[wordData.word];
            }
        );
      $scope.options.chart.height = $scope.options.chart.height;
    });

    angular.element($window).on('resize', function () {
        if($window.innerWidth<576){
          $scope.options.chart.height =  400;
        } else{
          $scope.options.chart.height = 250;
        };
    });


    $scope.options =  options;
    $scope.options.chart.xAxis.tickFormat = function(d) {
                        return d3.time.format('%Y-%m-%d')(new Date(d))
                    };    
    $scope.options.chart.yAxis.tickFormat = function(d) {
                        return Math.round(d * 100)/100;
                    };
                  
  }]);
