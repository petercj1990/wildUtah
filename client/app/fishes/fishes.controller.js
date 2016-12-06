'use strict';

(function() {

class FishesController {
  // this.newAnimal= {

  // }

  constructor($http, $scope, $state,socket) {
    this.$http = $http;
    this.socket = socket;
    this.awesomeThings = [];
    this.fishes;
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
      this.fishes = response.data;
      this.socket.syncUpdates('fishes', this.fishes);;
    });
  }





}




angular.module('utahWildApp')
  .component('fishes', {
    templateUrl: 'app/fishes/fishes.html',
    controller: FishesController
  });

})();
