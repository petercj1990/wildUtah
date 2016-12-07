'use strict';

(function() {

class FishController {
  // this.newAnimal= {

  // }

  constructor($http, $scope, $state,socket) {
    this.$http = $http;
    this.socket = socket;
    this.livesIn = [];
    this.animals = [];
    this.fish=[];
    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });
  }

  $onInit() {
    this.$http.get('/api/livesIn').then(response => {
      this.livesIn = response.data;
      this.socket.syncUpdates('livesIn', this.livesIn);
    });
    this.$http.get('/api/animal').then(response => {
      this.animals = response.data;
      this.socket.syncUpdates('animals', this.animals);
    });
    this.$http.get('/api/amphibian').then(response => {
      this.fish = response.data;
      console.log(this.fish)
      for(var x = 0; x < this.fish.length; x++){
          var totPop = 0;
          for(var y = 0; y < this.livesIn.length; y++){
            console.log(this.livesIn[y].AID, this.fish[x].AID)
            if(this.livesIn[y].AID === this.fish[x].AID){
              totPop = totPop + this.livesIn[y].population;
              console.log(totPop)
            }
          }
          this.fish[x].population = totPop;
          for(var y = 0; y < this.animals.length; y++){
            if(this.animals[y]._id === this.fish[x].AID){
              this.fish[x].name = this.animals[y].name;
              this.fish[x].family = this.animals[y].family;
              this.fish[x].genus = this.animals[y].genus;
              this.fish[x].diet = this.animals[y].diet;
              this.fish[x].reproduction = this.animals[y].reproduction;
            }
          }
      }
      this.socket.syncUpdates('fish', this.fish);
    });
  }

  


}




angular.module('utahWildApp')
  .component('fish', {
    templateUrl: 'app/fish/fish.html',
    controller: FishController
  });

})();