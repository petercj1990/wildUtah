'use strict';

(function() {

class ReptilesController {
  // this.newAnimal= {

  // }

  constructor($http, $scope, $state,socket) {
    this.$http = $http;
    this.socket = socket;
    this.awesomeThings = [];
    this.reptiles;
    this.animal;
    this.amphibian;
    this.bird;
    this.fish;
    this.insect;
    this.mammal;
    this.reptile;
    this.first =true;
    $scope.types = ['amphibian','bird','fish','insect','mammal','reptile'];

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });
  }

  $onInit() {
    this.$http.get('/api/things').then(response => {
      this.awesomeThings = response.data;
      this.socket.syncUpdates('thing', this.awesomeThings);
    });
    this.$http.get('/api/Animal').then(response => {
      this.reptiles = response.data;
      this.socket.syncUpdates('reptiles', this.reptiles);;
    });
  }

}




angular.module('utahWildApp')
  .component('reptiles', {
    templateUrl: 'app/reptiles/reptiles.html',
    controller: ReptilesController
  });

})();
