'use strict';

describe('Directive: multiwordSelect', function () {

  // load the directive's module
  beforeEach(module('emptyChairWidgetApp'));
  beforeEach(module('my.templates'));

  var element,
  scope;

  beforeEach(inject(function ($rootScope, $compile) {
    scope = $rootScope.$new();
    scope.words = [{word:"alpha", category:"a"}, {word:"beta", category:"b"}];
    scope.sel = [];
    element = angular.element('<multiword-select words=words selected-words = sel></multiword-select>');
    element = $compile(element)(scope);
    scope.$digest(); 
  }));

  describe('set categoriesList correctly',function(){
    it("should set categories list correctly", function(){
      expect(element.isolateScope().categories).toEqual(["a", "b"]);
    });

    it("should not repeat categories", inject(function($compile){
      scope.words = [{word:"alpha", category:"a"}, 
                     {word:"alpha8", category:"a"}, 
                     {word:"beta", category:"b"}];
      element = angular.element('<multiword-select words=words selected-words = sel></multiword-select>');
      element = $compile(element)(scope);
      scope.$digest(); 
      expect(element.isolateScope().categories).toEqual(["a", "b"]);
    }));

  });

  describe('toggleWord(word) function',function(){

    it('should set word in selected-words', function(){
      element.isolateScope().toggleWord({word:"alpha"});
      expect(scope.sel).toContain({word:"alpha"})

    });

    it('should not set word in selected-words if not exists in words', function(){
      element.isolateScope().toggleWord("gamma");
      expect(scope.sel).not.toContain("gamma")     
    });

    it('should unset word when already in selected-words', function(){
      element.isolateScope().toggleWord({word:"alpha"});
      element.isolateScope().toggleWord({word:"alpha"});
      expect(scope.sel).not.toContain({word:"alpha"})      
    });

    it('should set more than a word', function(){
      element.isolateScope().toggleWord({word:"alpha"});
      element.isolateScope().toggleWord({word:"beta"});
      expect(scope.sel).toContain({word:"alpha"});
      expect(scope.sel).toContain({word:"beta"});
    })

  });

  describe('isSelected(word) function',function(){

    it('When word is not in selected-words is not selected', function(){
      expect(element.isolateScope().isSelected({word:"alpha"})).toBeFalsy();
    });

    it('When word is not in selected-words is not selected', function(){
      element.isolateScope().toggleWord({word:"alpha"});
      expect(element.isolateScope().isSelected({word:"alpha"})).toBeTruthy();
    });

  })


});
