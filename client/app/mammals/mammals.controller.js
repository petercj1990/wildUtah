'use strict';

(function() {

class MammalController {
  // this.newAnimal= {

  // }

  constructor($http, $scope, $state,socket) {
    this.$http = $http;
    this.socket = socket;
    this.livesIn = [];
    this.animals = [];
    this.mammal=[];
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
      this.mammal = response.data;
      console.log(this.mammal)
      for(var x = 0; x < this.mammal.length; x++){
          var totPop = 0;
          for(var y = 0; y < this.livesIn.length; y++){
            console.log(this.livesIn[y].AID, this.mammal[x].AID)
            if(this.livesIn[y].AID === this.mammal[x].AID){
              totPop = totPop + this.livesIn[y].population;
              console.log(totPop)
            }
          }
          this.mammal[x].population = totPop;
          for(var y = 0; y < this.animals.length; y++){
            if(this.animals[y]._id === this.mammal[x].AID){
              this.mammal[x].name = this.animals[y].name;
              this.mammal[x].family = this.animals[y].family;
              this.mammal[x].genus = this.animals[y].genus;
              this.mammal[x].diet = this.animals[y].diet;
              this.mammal[x].reproduction = this.animals[y].reproduction;
            }
          }
      }
      this.socket.syncUpdates('mammal', this.mammal);
    });
  }

  


}




angular.module('utahWildApp')
  .component('mammal', {
    templateUrl: 'app/mammal/mammal.html',
    controller: MammalController
  });

})();