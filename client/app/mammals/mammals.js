'use strict';

angular.module('utahWildApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('mammals', {
        url: '/mammals',
        template: '<mammals></mammals>'
      });
  });
