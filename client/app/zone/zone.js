'use strict';

angular.module('utahWildApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('zone', {
        url: '/zone',
        template: '<zone></zone>'
      });
  });
