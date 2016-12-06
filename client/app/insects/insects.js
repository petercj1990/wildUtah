'use strict';

angular.module('utahWildApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('insects', {
        url: '/insects',
        template: '<insects></insects>'
      });
  });
