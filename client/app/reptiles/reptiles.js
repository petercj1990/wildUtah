'use strict';

angular.module('utahWildApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('reptiles', {
        url: '/reptiles',
        template: '<reptiles></reptiles>'
      });
  });
