'use strict';

var LoginInteractor = require('../../src/usecases/LoginInteractor');
var Context = require('../../src/Context');

function Session() {
  this.loginInteractor = new LoginInteractor();
}

Session.prototype.logIn = function(username) {
  var request = {
    username: username
  };
  this.loginInteractor.login(request);
};

Session.prototype.logOut = function() {
  this.loginInteractor.logout();
};

Session.prototype.messageWasReceived = function(msg) {
  return Context.presenter.response.message === msg;
};

module.exports = Session;