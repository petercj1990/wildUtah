'use strict';

(function() {

class AnimalsController {
  // this.newAnimal= {

  // }

  constructor($http, $scope, $state, socket) {
    this.$http = $http;
    this.$state = $state;
    this.socket = socket;
    this.awesomeThings = [];
    this.animals;
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
      this.animals = response.data;
      this.socket.syncUpdates('animals', this.animals);;
    });
  }


  choseType(choseType) {
    console.log("making and animal");
    console.log(choseType);
    this.selectedType = choseType;
    if(this.selectedType == 'amphibian'){
      this.amphibian = true;
    }
    if(this.selectedType == 'bird'){
      this.bird = true;
    }
    if(this.selectedType == 'fish'){
      //console.log("imma fish");
      this.fish = true;
      console.log(this.fish);
    }
    if(this.selectedType == 'insect'){
      this.insect = true;
    }
    if(this.selectedType == 'mammal'){
      this.mammal = true;
    }
    if(this.selectedType == 'reptile'){
      this.reptile = true;
    }
    if(this.first===true){
      console.log(this.first)
      this.first = false;
    }

  };
  createAnimal(newAnimal) {
    this.newAnimal={};
    if (newAnimal) {
      this.$http.post('/api/animal', { 
        family: newAnimal.family,
        genus: newAnimal.genus,
        name: newAnimal.name,
        diet: newAnimal.diet,
        reproduction: newAnimal.reproduction
      }).then(response =>{
        console.log(this.fish);
        console.log(response.data);
        var _id = response.data._id
         if(this.amphibian === true){
            this.$http.post('/api/amphibian', { 
              AID: _id,
              isWet: newAnimal.isWet
            })
            console.log("amphibian");
          }
          if(this.bird  === true){
            console.log("bird");
            this.$http.post('/api/bird', { 
              AID: _id,
              migration: newAnimal.migration,
              huntType: newAnimal.huntType,
              nestingType: newAnimal.nestingType
            })
          }
          if(this.fish  === true){
            console.log("fish");
            this.$http.post('/api/fish', { 
              AID: _id,
              migration: newAnimal.migration,
              waterStagnation: newAnimal.waterStagnation
            })
          }
          
          if(this.insect  === true){
            console.log("insect"); 
            this.$http.post('/api/insect', { 
              AID: _id,
              community: newAnimal.community
            })
          }
          if(this.mammal  === true){
            console.log("mammal");
            this.$http.post('/api/mammal', { 
              AID: _id,
              migration: newAnimal.migration,
              hibernation: newAnimal.hibernation
            })
          }
          if(this.reptile  === true){
            console.log("reptile"); 
            this.$http.post('/api/reptile', { 
              AID: _id,
              venom: newAnimal.venom
            })
          }
      });
      
    }
    this.first =true;
  }
  //$scope.types = ['amphibian','bird','fish','insect','mammal','reptile'];
  typeSearch(searchType){
         if (searchType){ 
          if(searchType === "amphibian"){
               this.$state.go("amphibians")
             }
             if(searchType === "bird"){
               this.$state.go("birds")
             }
             if(searchType === "fish"){
               this.$state.go("fishes")
             }
             
             if(searchType === "insect"){
               this.$state.go("insects")
             }
             if(searchType === "mammal"){
               this.$state.go("mammals")
             }
             if(searchType === "reptile"){
               this.$state.go("reptiles")
             }
           }
}




}




angular.module('utahWildApp')
  .component('animals', {
    templateUrl: 'app/animals/animals.html',
    controller: AnimalsController
  });

})();
