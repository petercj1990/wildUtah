'use strict';

(function() {

class NotesController {

  constructor($http, $scope, Auth, socket) {
    this.$http = $http;
    this.socket = socket;
    this.notes = [];
    this.weatherType = ['Sun', 'Rain', 'Overcast', 'Snowing', 'Hail'];

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });
  }

  $onInit() {
    this.$http.get('/api/animal').then(response => {
      console.log(this.animals)
      this.socket.syncUpdates('animal', this.animals);
    });

    this.$http.get('/api/zone').then(response => {
      this.zones = response.data;
      //console.log(this.zones)
      this.socket.syncUpdates('zone', this.zones);
    });
    this.$http.get('/api/observation').then(response => {
      this.observations = response.data;
      //console.log(this.observations)
      this.socket.syncUpdates('observations', this.observations);
    });
    this.$http.get('/api/weather').then(response => {
      this.weather = response.data;
      //console.log(this.weather)
      this.socket.syncUpdates('weather', this.weather);
    });
  }

  addNote(newnote) {
    if (this.newNote) {
      this.$http.post('/api/observation', { 
        note: newnote,
        date: new Date(dateString)
      }).then(response => {
      var obsId = response.data.id;
        this.$http.post('/api/event',{

        }).then(response => {
          var eventId = response.data._id;
          this.$http.post('/api/weather').then(response => {
            var weatherId = response.data._id;
            
          });
        });
    });
    this.newNote= '';
    }
  }
}

angular.module('utahWildApp')
  .component('notes', {
    templateUrl: 'app/notes/notes.html',
    controller: NotesController
  });

})();
