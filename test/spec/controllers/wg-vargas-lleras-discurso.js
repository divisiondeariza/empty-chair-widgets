'use strict';

describe('Controller: WgVargasLlerasDiscursoCtrl', function () {

  // load the controller's module
  beforeEach(module('emptyChairWidgetApp'));

  var WgVargasLlerasDiscursoCtrl,
    scope,
    dataMock;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();

    WgVargasLlerasDiscursoCtrl = $controller('WgVargasLlerasDiscursoCtrl', {
      $scope: scope,
      data: dataMock
      // place here mocked dependencies
    });
  }));

  xit('should attach a list of awesomeThings to the scope', function () {
    expect(WgVargasLlerasDiscursoCtrl.awesomeThings.length).toBe(3);
  });
});
