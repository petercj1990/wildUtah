'use strict';

angular.module('utahWildApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('animals', {
        url: '/animals',
        template: '<animals></animals>'
      });
  });
