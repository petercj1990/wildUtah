'use strict';

(function() {

class NotesController {

  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;
    this.awesomeThings = [];

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });
  }

  $onInit() {
    this.$http.get('/api/animal').then(response => {
      this.animals = response.data;
      console.log(this.animals)
      this.socket.syncUpdates('animal', this.animals);
    });

    this.$http.get('/api/zone').then(response => {
      this.zones = response.data;
      console.log(this.zones)
      this.socket.syncUpdates('zone', this.zones);
    });
    this.$http.get('/api/note').then(response => {
      this.notes = response.data;
      console.log(this.notes)
      this.socket.syncUpdates('note', this.note);
    });
  }

  addNote() {
    if (this.newAnimal) {
      this.$http.post('/api/note', { name: this.newNote });
      this.newNote= '';
    }
  }

  deleteNote(note) {
    this.$http.delete('/api/animal/' + animal._id);
  }
}

angular.module('utahWildApp')
  .component('notes', {
    templateUrl: 'app/notes/notes.html',
    controller: NotesController
  });

})();
