'use strict';

angular.module('utahWildApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('fishes', {
        url: '/fishes',
        template: '<fishes></fishes>'
      });
  });
