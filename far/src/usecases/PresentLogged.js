'use strict';

class PresentLogged {
  constructor() {
    this.loggedOut();
  }

  loggedIn(user) {
    this._text = 'Logout ' + user.username;
    this._route = '/logout';
  }

  loggedOut() {
    this._text = 'Login';
    this._route = '/login';
  }

  showText() {
    return this._text;
  }

  showRoute() {
    return this._route;
  }
}

//function present (user) {
//  var present = {};
//
//  if (user) {
//    present.route = '/logout';
//    present.navbar = 'Logout ' + user.username;
//    present.body = 'Logged in as: ' + user.username;
//  } else {
//    present.route = '/login';
//    present.navbar = 'Login';
//  }
//
//  return present;
//}

module.exports = new PresentLogged();