'use strict';

var PresentLogged = require('../../src/usecases/PresentLogged');

function shouldAskToLogin() {
  expect(PresentLogged.showText()).toEqual('Login');
  expect(PresentLogged.showRoute()).toEqual('/login');
}

function shouldAskToLogout(user) {
  expect(PresentLogged.showText()).toEqual('Logout ' + user.username);
  expect(PresentLogged.showRoute()).toEqual('/logout');
}

describe('Present User Tests', function () {
  var user = {
    username: 'username',
    password: 'password'
  };

  it ('by default, present the login text and the login route', function(done) {
    shouldAskToLogin();
    done();
  });

  it('when presenting a logged in user, then display the logout text and the logout route', function (done) {
    PresentLogged.loggedIn(user);
    shouldAskToLogout(user);
    done();
  });

  it('when presenting a guest, then present the login text and the login route', function (done) {
    PresentLogged.loggedIn(user);
    PresentLogged.loggedOut();
    shouldAskToLogin();
    done();
  });
});