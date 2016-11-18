'use strict';

describe('Component: notesComponent', function() {

  // load the controller's module
  beforeEach(module('utahWildApp'));
  beforeEach(module('stateMock'));
  beforeEach(module('socketMock'));

  var scope;
  var notesComponent;
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
      notesComponent = $componentController('notes', {
        $http: $http,
        $scope: scope,
        socket: socket
      });
  }));

  it('should attach a list of things to the controller', function() {
    notesComponent.$onInit();
    $httpBackend.flush();
    expect(notesComponent.awesomeThings.length).toBe(4);
  });
});
