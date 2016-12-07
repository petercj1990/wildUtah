'use strict';

(function() {

class BirdsController {
  // this.newAnimal= {

  // }

  constructor($http, $scope, $state,socket) {
    this.$http = $http;
    this.socket = socket;
    this.livesIn = [];
    this.animals = [];
    this.birds=[];
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
      this.birds = response.data;
      console.log(this.birds)
      for(var x = 0; x < this.birds.length; x++){
          var totPop = 0;
          for(var y = 0; y < this.livesIn.length; y++){
            console.log(this.livesIn[y].AID, this.birds[x].AID)
            if(this.livesIn[y].AID === this.birds[x].AID){
              totPop = totPop + this.livesIn[y].population;
              console.log(totPop)
            }
          }
          this.birds[x].population = totPop;
          for(var y = 0; y < this.animals.length; y++){
            if(this.animals[y]._id === this.birds[x].AID){
              this.birds[x].name = this.animals[y].name;
              this.birds[x].family = this.animals[y].family;
              this.birds[x].genus = this.animals[y].genus;
              this.birds[x].diet = this.animals[y].diet;
              this.birds[x].reproduction = this.animals[y].reproduction;
            }
          }
      }
      this.socket.syncUpdates('birds', this.birds);
    });
  }

  


}




angular.module('utahWildApp')
  .component('birds', {
    templateUrl: 'app/birds/birds.html',
    controller: BirdsController
  });

})();