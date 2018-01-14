'use strict';

describe('Service: jsonGetter', function () {
  var $httpBackend, 
      authRequestHandler,
      mockResponse,
      jsonGetter;

  // load the service's module
  beforeEach(module('emptyChairWidgetApp'));


  beforeEach(inject(function($injector) {
    mockResponse = {"some": "object"};
    jsonGetter = $injector.get('jsonGetter');
    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.when('GET', 'views/main.html').respond(''); // Ignore GET views/main.html. I know, is aful as hell
    authRequestHandler = $httpBackend
      .whenRoute('GET', '/data/filename.json')
      .respond(function(method, url, data, headers, params) {
        return [200, mockResponse];
      });
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });


  it('Should get requested Json', function(){
    $httpBackend.expectGET('/data/filename.json');
    jsonGetter.get("filename");
    $httpBackend.flush();
  })

  it('Should return object in json', inject(function($rootScope){
    $httpBackend.expectGET('/data/filename.json');
    var promise = jsonGetter.get("filename");
    $httpBackend.flush();
    expect(promise.$$state.value).toEqual(mockResponse);

  }))


});
