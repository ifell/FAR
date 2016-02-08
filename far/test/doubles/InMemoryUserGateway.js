'use strict';

var Chance = require('chance');
var chance = new Chance();

var _ = require('underscore');

var User = require('../../src/entities').User;

var users, thisMessageReceiver;

function InMemoryUserGateway(messageReceiver) {
  users = new Map();
  thisMessageReceiver = messageReceiver;
}

InMemoryUserGateway.prototype.save = function(user) {
  for (var u of users.values()) {
    if (u.username === user.username) {
      thisMessageReceiver.sameUsernameSaveError();
      return;
    }
  }

  if (!users.has(user.id)) {
    user.id = chance.hash({length: 20});
    users.set(user.id, user);
    thisMessageReceiver.userSaved();
  }
};

InMemoryUserGateway.prototype.size = function() {
  return users.size;
};

InMemoryUserGateway.prototype.getUsers = function() {

};

module.exports = InMemoryUserGateway;