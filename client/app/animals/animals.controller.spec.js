'use strict';

describe('Component: animalsComponent', function() {

  // load the controller's module
  beforeEach(module('utahWildApp'));
  beforeEach(module('stateMock'));
  beforeEach(module('socketMock'));

  var scope;
  var animalsComponent;
  var state;
  var $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function(
    _$httpBackend_,
    $http,
    $componentController,
    $rootScope,
    $state,
    socket) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('/api/things')
        .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

      scope = $rootScope.$new();
      state = $state;
      animalsComponent = $componentController('animals', {
        $http: $http,
        $scope: scope,
        socket: socket
      });
  }));

  it('should attach a list of things to the controller', function() {
    animalsComponent.$onInit();
    $httpBackend.flush();
    expect(animalsComponent.awesomeThings.length).toBe(4);
  });
});
