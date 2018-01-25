'use strict';

describe('Controller: WgTimochenkoDiscursoCtrl', function () {

  // load the controller's module
  beforeEach(module('emptyChairWidgetApp'));

  var WgTimochenkoDiscursoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    WgTimochenkoDiscursoCtrl = $controller('WgTimochenkoDiscursoCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(WgTimochenkoDiscursoCtrl.awesomeThings.length).toBe(3);
  });
});
