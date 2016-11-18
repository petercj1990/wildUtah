'use strict';

angular.module('utahWildApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('notes', {
        url: '/notes',
        template: '<notes></notes>'
      });
  });
