'use strict';

/**
 * @ngdoc overview
 * @name emptyChairWidgetApp
 * @description
 * # emptyChairWidgetApp
 *
 * Main module of the application.
 */
angular
  .module('emptyChairWidgetApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'nvd3',
    'ui.bootstrap',
    'ngMaterial'
  ])
  .config(["$routeProvider", "$mdThemingProvider",
    function ($routeProvider, $mdThemingProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/actionbtn', {
        templateUrl: 'views/actionbtn.html',
        controller: 'ActionbtnCtrl',
        controllerAs: 'actionbtn'
      })
      .when('/widgets/vargas-lleras-discurso', {
        templateUrl: 'views/wg-vargas-lleras-discurso.html',
        controller: 'WgVargasLlerasDiscursoCtrl',
        controllerAs: 'wgVargasLlerasDiscurso',
        resolve:{
          data: function(jsonGetter){ return jsonGetter.get('data/vargas-lleras-words');},
          options: function(jsonGetter){ return jsonGetter.get('options/wordsviz.conf');} 
        },
      })
      .when('/widgets/timochenko-discurso', {
        templateUrl: 'views/wg-timochenko-discurso.html',
        controller: 'WgVargasLlerasDiscursoCtrl',
        controllerAs: 'wgTimochenkoDiscurso',
        resolve:{
          data: function(jsonGetter){ return jsonGetter.get('data/timochenko-words');},
          options: function(jsonGetter){ return jsonGetter.get('options/wordsviz.conf');} 
        },
      })
      .when('/widgets/fajardo-conversacion', {
        templateUrl: 'views/wg-fajardo-conversacion.html',
        controller: 'TalkvizCtrl',
        controllerAs: 'talkviz',
        resolve:{
          data: function(jsonGetter){ return jsonGetter.get('data/fajardo-talk');},
          options: function(jsonGetter){ return jsonGetter.get('options/talkviz.conf');} 
        },
      })
      .otherwise({
        redirectTo: '/'
      });

      $mdThemingProvider.theme('default').dark();
  }]);
