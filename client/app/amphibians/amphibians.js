'use strict';

angular.module('utahWildApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('amphibians', {
        url: '/amphibians',
        template: '<amphibians></amphibians>'
      });
  });
