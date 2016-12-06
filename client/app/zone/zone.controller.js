'use strict';

(function() {

class ZoneController {

  constructor($http, $scope, socket) {
    this.$http = $http;
    this.$scope = $scope;
    this.socket = socket;
    this.awesomeThings = [];
    this.searchResults = [{}];
    this.searchShow = false;
    this.population;


  }

  $onInit() {
    this.$http.get('/api/animal').then(response => {
      this.$scope.animals = response.data;
      //console.log(this.$scope.animals);
    });
    this.$http.get('/api/zone').then(response => {
      this.$scope.zones = response.data;
      //console.log(this.$scope.zones);
    });
    this.$http.get('/api/livesIn').then(response => {
      this.$scope.livesIn = response.data;
      //console.log(this.$scope.livesIn);
      this.socket.syncUpdates('livesIn', this.livesIn);
    });
    this.socket.syncUpdates('searchResults', this.$scope.searchResults);
  }

  addAnimaltoZone(selectedZone, selectedAnimal) {
    //console.log('bupppp');
    if (selectedZone && selectedAnimal) {
      this.$http.post('/api/livesIn', 
        { 
          AID: selectedAnimal._id,
          ZID: selectedZone._id,
          population: this.population
        }).then(response =>{
        console.log(response.data);
        });
      alert("you have added: " + selectedAnimal.name +" to zone " + selectedZone._id);
    }
  }

  // addZone(){
  //   this.$http.post('/api/zone', 
  //       { 
  //         habitat: ["mountians", "plains"]
  //       });
  // }


  searchGo(searchBox){
    this.searchShow = true;
    this.searchResults = [];
    console.log('im here', searchBox, this.$scope.livesIn);

    for (var x =0; x < this.$scope.livesIn.length; x++){
      console.log("iterating", this.$scope.livesIn[x].ZID, searchBox._id);
      if(this.$scope.livesIn[x].ZID == searchBox._id){
        console.log("matching1", this.$scope.livesIn[x])
          for(var y = 0; y < this.$scope.animals.length; y++){
              if(this.$scope.livesIn[x].AID == this.$scope.animals[y]._id){
                this.$scope.animals[y].pop=this.$scope.livesIn[x].population;
                this.searchResults.push(this.$scope.animals[y]);
                console.log("matching2", this.$scope.animals[y])
              }
          }
      }
    }
    console.log(this.searchResults);
    console.log(this.$scope);

    this.searchShow = true;
    return this.searchResults;
  }
}

angular.module('utahWildApp')
  .component('zone', {
    templateUrl: 'app/zone/zone.html',
    controller: ZoneController
  });

})();


