'use strict';

angular.module('utahWildApp.auth', [
  'utahWildApp.constants',
  'utahWildApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
