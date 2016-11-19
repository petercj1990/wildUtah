'use strict';

angular.module('utahWildApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('notes', {
        url: '/observations',
        template: '<notes></notes>'
      });
  });
