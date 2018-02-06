'use strict';

describe('Controller: WgFajardoConversacionCtrl', function () {

  // load the controller's module
  beforeEach(module('emptyChairWidgetApp'));

  var WgFajardoConversacionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    WgFajardoConversacionCtrl = $controller('WgFajardoConversacionCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(WgFajardoConversacionCtrl.awesomeThings.length).toBe(3);
  });
});
