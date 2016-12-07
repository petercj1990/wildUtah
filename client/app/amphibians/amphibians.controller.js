'use strict';

(function() {

class AmphibiansController {
  // this.newAnimal= {

  // }

  constructor($http, $scope, $state,socket) {
    this.$http = $http;
    this.socket = socket;
    this.livesIn = [];
    this.animals = [];
    this.amphibians=[];
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
      this.amphibians = response.data;
      console.log(this.amphibians)
      for(var x = 0; x < this.amphibians.length; x++){
          var totPop = 0;
          for(var y = 0; y < this.livesIn.length; y++){
            console.log(this.livesIn[y].AID, this.amphibians[x].AID)
            if(this.livesIn[y].AID === this.amphibians[x].AID){
              totPop = totPop + this.livesIn[y].population;
              console.log(totPop)
            }
          }
          this.amphibians[x].population = totPop;
          for(var y = 0; y < this.animals.length; y++){
            if(this.animals[y]._id === this.amphibians[x].AID){
              this.amphibians[x].name = this.animals[y].name;
              this.amphibians[x].family = this.animals[y].family;
              this.amphibians[x].genus = this.animals[y].genus;
              this.amphibians[x].diet = this.animals[y].diet;
              this.amphibians[x].reproduction = this.animals[y].reproduction;
            }
          }
      }
      this.socket.syncUpdates('amphibians', this.amphibians);
    });
  }

  


}




angular.module('utahWildApp')
  .component('amphibians', {
    templateUrl: 'app/amphibians/amphibians.html',
    controller: AmphibiansController
  });

})();
