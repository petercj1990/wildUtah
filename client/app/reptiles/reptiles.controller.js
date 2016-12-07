'use strict';

(function() {

class ReptileController {
  // this.newAnimal= {

  // }

  constructor($http, $scope, $state,socket) {
    this.$http = $http;
    this.socket = socket;
    this.livesIn = [];
    this.animals = [];
    this.reptile=[];
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
      this.reptile = response.data;
      console.log(this.reptile)
      for(var x = 0; x < this.reptile.length; x++){
          var totPop = 0;
          for(var y = 0; y < this.livesIn.length; y++){
            console.log(this.livesIn[y].AID, this.reptile[x].AID)
            if(this.livesIn[y].AID === this.reptile[x].AID){
              totPop = totPop + this.livesIn[y].population;
              console.log(totPop)
            }
          }
          this.reptile[x].population = totPop;
          for(var y = 0; y < this.animals.length; y++){
            if(this.animals[y]._id === this.reptile[x].AID){
              this.reptile[x].name = this.animals[y].name;
              this.reptile[x].family = this.animals[y].family;
              this.reptile[x].genus = this.animals[y].genus;
              this.reptile[x].diet = this.animals[y].diet;
              this.reptile[x].reproduction = this.animals[y].reproduction;
            }
          }
      }
      this.socket.syncUpdates('reptile', this.reptile);
    });
  }

  


}




angular.module('utahWildApp')
  .component('reptile', {
    templateUrl: 'app/reptile/reptile.html',
    controller: ReptileController
  });

})();