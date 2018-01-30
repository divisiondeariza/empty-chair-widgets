'use strict';

describe('Controller: ConversacionesCtrl', function () {

  // load the controller's module
  beforeEach(module('emptyChairWidgetApp'));

  var ConversacionesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ConversacionesCtrl = $controller('ConversacionesCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ConversacionesCtrl.awesomeThings.length).toBe(3);
  });
});
