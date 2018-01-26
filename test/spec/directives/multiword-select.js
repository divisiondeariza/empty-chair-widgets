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

  describe('set isCategorized correctly',function(){
    it("should set true when there are categories", function(){
      expect(element.isolateScope().isCategorized).toBeTruthy();
    });

    it("should set false when there are categories", inject(function($compile){
      scope.words = [{word:"alpha"}, 
                     {word:"alpha8"}, 
                     {word:"beta"}];
      element = angular.element('<multiword-select words=words selected-words = sel></multiword-select>');
      element = $compile(element)(scope);
      scope.$digest(); 
      expect(element.isolateScope().isCategorized).toBeFalsy();
    }));

  });

  describe('set classes correctly',function(){
    it("should set true when there are categories", function(){
      expect(element.isolateScope().isCategorized).toBeTruthy();
    });

    it("should set false when there are categories", inject(function($compile){
      scope.words = [{word:"alpha", class:"some-class"}, 
                     {word:"alpha8"}, 
                     {word:"beta"}];
      element = angular.element('<multiword-select words=words selected-words = sel></multiword-select>');
      element = $compile(element)(scope);
      scope.$digest(); 
      expect(element[0].querySelector('.some-class').text).toEqual("alpha");
      //expect(element.isolateScope().isCategorized).toBeFalsy();
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

  });

  describe('Only allow select up to limit', function(){
    beforeEach(inject(function ($rootScope, $compile) {
      scope = $rootScope.$new();
      scope.words = [{word:"alpha", category:"a"}, 
                     {word:"beta", category:"b"},
                     {word:"gamma", category:"b"},
                     {word:"delta", category:"b"}];
      scope.sel = [];
      scope.error="mal hermano";
      element = angular.element('<multiword-select words=words selected-words = sel select-limit=2 limit-reached-msg="error"></multiword-select>');
      element = $compile(element)(scope);
      scope.$digest(); 
    }));

    it("should not add more elements when reached limit", function(){
        element.isolateScope().toggleWord({word:"alpha"});
        element.isolateScope().toggleWord({word:"beta"});
        element.isolateScope().toggleWord({word:"gamma"});
        expect(scope.sel.length).toBe(2);
    });

    it("should send alert when limit reached",function(){
        element.isolateScope().toggleWord({word:"alpha"});
        element.isolateScope().toggleWord({word:"beta"});
        element.isolateScope().toggleWord({word:"gamma"});
        expect(element.isolateScope().alerts[0]).toEqual({msg:'error'});      
    });

    it("should send only one alert",function(){
        element.isolateScope().toggleWord({word:"alpha"});
        element.isolateScope().toggleWord({word:"beta"});
        element.isolateScope().toggleWord({word:"gamma"});
        element.isolateScope().toggleWord({word:"gamma"});
        expect(element.isolateScope().alerts.length).toBe(1);      
    })

    it("should not send alert when limit not reached",function(){
        element.isolateScope().toggleWord({word:"alpha"});
        element.isolateScope().toggleWord({word:"beta"});
        expect(element.isolateScope().alerts.length).toBe(0);      
    })

    it("should delete alert when closeAlert Called",function(){
        element.isolateScope().toggleWord({word:"alpha"});
        element.isolateScope().toggleWord({word:"beta"});
        element.isolateScope().toggleWord({word:"gamma"});
        element.isolateScope().closeAlert(0);
        expect(element.isolateScope().alerts.length).toBe(0);      

            
    })


    it("should not limit selected if not limit given", inject(function($compile){
      element = angular.element('<multiword-select words=words selected-words = sel></multiword-select>');
      element = $compile(element)(scope);
      scope.$digest();      
      element.isolateScope().toggleWord({word:"alpha"});
      element.isolateScope().toggleWord({word:"beta"});
      element.isolateScope().toggleWord({word:"gamma"});
      expect(scope.sel).toContain({word:"gamma"});
    }));
  });
});
