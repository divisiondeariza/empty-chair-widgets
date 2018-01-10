'use strict';

describe('Controller: WgVargasLlerasDiscursoCtrl', function () {

  // load the controller's module
  beforeEach(module('emptyChairWidgetApp'));

  var WgVargasLlerasDiscursoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    WgVargasLlerasDiscursoCtrl = $controller('WgVargasLlerasDiscursoCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(WgVargasLlerasDiscursoCtrl.awesomeThings.length).toBe(3);
  });
});
