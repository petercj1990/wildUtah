'use strict';

(function() {

class InsectController {
  // this.newAnimal= {

  // }

  constructor($http, $scope, $state,socket) {
    this.$http = $http;
    this.socket = socket;
    this.livesIn = [];
    this.animals = [];
    this.insect=[];
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
      this.insect = response.data;
      console.log(this.insect)
      for(var x = 0; x < this.insect.length; x++){
          var totPop = 0;
          for(var y = 0; y < this.livesIn.length; y++){
            console.log(this.livesIn[y].AID, this.insect[x].AID)
            if(this.livesIn[y].AID === this.insect[x].AID){
              totPop = totPop + this.livesIn[y].population;
              console.log(totPop)
            }
          }
          this.insect[x].population = totPop;
          for(var y = 0; y < this.animals.length; y++){
            if(this.animals[y]._id === this.insect[x].AID){
              this.insect[x].name = this.animals[y].name;
              this.insect[x].family = this.animals[y].family;
              this.insect[x].genus = this.animals[y].genus;
              this.insect[x].diet = this.animals[y].diet;
              this.insect[x].reproduction = this.animals[y].reproduction;
            }
          }
      }
      this.socket.syncUpdates('insect', this.insect);
    });
  }

  


}




angular.module('utahWildApp')
  .component('insect', {
    templateUrl: 'app/insect/insect.html',
    controller: InsectController
  });

})();