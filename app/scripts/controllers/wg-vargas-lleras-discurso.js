'use strict';

/**
 * @ngdoc function
 * @name emptyChairWidgetApp.controller:WgVargasLlerasDiscursoCtrl
 * @description
 * # WgVargasLlerasDiscursoCtrl
 * Controller of the emptyChairWidgetApp
 */
angular.module('emptyChairWidgetApp')
  .controller('WgVargasLlerasDiscursoCtrl', ["$scope", "$http", "vlldata", 
    function ($scope, $http, vlldata) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    //$scope.data = Restangular.one("vargas-lleras-words").get();
    $scope.selectedWords = [];
    $scope.words = Object.keys(vlldata.words)
    .map(function(element){
      return {word:element, category:Math.floor(Math.random() * 4) + 1} ;
    });
/*    $scope.words = [
    				{word:"alpha", category:"a"}, 
    				{word:"alpha8", category:"a"}, 
    				{word:"beta", category:"b"},
    				{word:"betacaroteno", category:"b"},
    				{word:"gamma", category:"c"},
    				{word:"delta", category:"c"},
    				{word:"epsilon", category:"d"},
    				{word:"omega", category:"d"},
    				{word:"omega10", category:"d"},

    				];*/
  }]);
