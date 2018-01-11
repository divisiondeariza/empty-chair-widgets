'use strict';

/**
 * @ngdoc function
 * @name emptyChairWidgetApp.controller:WgVargasLlerasDiscursoCtrl
 * @description
 * # WgVargasLlerasDiscursoCtrl
 * Controller of the emptyChairWidgetApp
 */
angular.module('emptyChairWidgetApp')
  .controller('WgVargasLlerasDiscursoCtrl', ["$scope", function ($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.selectedWords = [];
    $scope.words = [
    				{word:"alpha", category:"a"}, 
    				{word:"alpha8", category:"a"}, 
    				{word:"beta", category:"b"},
    				{word:"betacaroteno", category:"b"},
    				{word:"gamma", category:"c"},
    				{word:"delta", category:"c"},
    				{word:"epsilon", category:"d"},
    				{word:"omega", category:"d"},
    				{word:"omega10", category:"d"},

    				];
  }]);
