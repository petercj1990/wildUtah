'use strict';

(function() {

class AnimalsController {

  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;
    this.awesomeThings = [];

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });
  }

  $onInit() {
    this.$http.get('/api/things').then(response => {
      this.awesomeThings = response.data;
      this.socket.syncUpdates('thing', this.awesomeThings);
    });
  }

  addThing() {
    if (this.newAnimal) {
      this.$http.post('/api/Animal', { 
        /*
          name
          genus
          diet
          family
          reproduction
          sub-family:
        */

      });
      this.newAnimal = '';
    }
  }

  deleteThing(thing) {
    this.$http.delete('/api/things/' + thing._id);
  }
}

angular.module('utahWildApp')
  .component('animals', {
    templateUrl: 'app/animals/animals.html',
    controller: AnimalsController
  });

})();
