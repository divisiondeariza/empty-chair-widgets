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
    'restangular'
  ])
  .config(["RestangularProvider", "$routeProvider",
    function (RestangularProvider, $routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
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
        resolve:{"data": function(Restangular){
          return Restangular.one("vargas-lleras-words").get()
          } 
        },
        resolveAs:"data",
      })
      .otherwise({
        redirectTo: '/'
      });

    RestangularProvider.setBaseUrl("/data/");
    RestangularProvider.setRequestSuffix('.json');
  }]);
