'use strict';

class NavbarController {
  //start-non-standard
  menu = [{
      'title': 'Animals',
      'state': 'animals'
    }, {
      'title': 'Zone',
      'state': 'zone'
    }, {
      'title': 'Notes',
      'state': 'notes'
    }];



  isCollapsed = true;
  //end-non-standard

  constructor(Auth) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
  }
}

angular.module('utahWildApp')
  .controller('NavbarController', NavbarController);
