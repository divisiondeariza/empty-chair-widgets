'use strict';

describe('Directive: multiwordSelect', function () {

  // load the directive's module
  beforeEach(module('emptyChairWidgetApp'));

  var element,
  scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  describe('toggleWord(word) function',function(){
    beforeEach(inject(function($compile){
      scope.words = ["alpha", "beta"];
      scope.sel = [];
      element = angular.element('<multiword-select words=words selected = sel></multiword-select>');
      element = $compile(element)(scope);
      scope.$digest(); 

    }));

    it('should set word in selected-words', function(){
      element.isolateScope().toggleWord("alpha");
      expect(scope.sel).toContain("alpha")

    });

    it('should not set word in selected-words if not exists in words', function(){
      element.isolateScope().toggleWord("gamma");
      expect(scope.sel).not.toContain("gamma")     
    });

    it('should unset word when already in selected-words', function(){
      element.isolateScope().toggleWord("alpha");
      element.isolateScope().toggleWord("alpha");
      expect(scope.sel).not.toContain("alpha")      
    });

    it('should set more than a word', function(){
      element.isolateScope().toggleWord("alpha");
      element.isolateScope().toggleWord("beta");
      expect(scope.sel).toContain("alpha");
      expect(scope.sel).toContain("beta");
    })

  });
});
