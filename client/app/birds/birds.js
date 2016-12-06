'use strict';

angular.module('utahWildApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('birds', {
        url: '/birds',
        template: '<birds></birds>'
      });
  });
