'use strict';

describe('Directive: credits', function () {

  // load the directive's module
  beforeEach(module('emptyChairWidgetApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  xit('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<credits></credits>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the credits directive');
  }));
});
