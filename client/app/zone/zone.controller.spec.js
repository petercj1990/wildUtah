'use strict';

describe('Component: zoneComponent', function() {

  // load the controller's module
  beforeEach(module('utahWildApp'));
  beforeEach(module('stateMock'));
  beforeEach(module('socketMock'));

  var scope;
  var zoneComponent;
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
      zoneComponent = $componentController('zone', {
        $http: $http,
        $scope: scope,
        socket: socket
      });
  }));

  it('should attach a list of things to the controller', function() {
    zoneComponent.$onInit();
    $httpBackend.flush();
    expect(zoneComponent.awesomeThings.length).toBe(4);
  });
});
