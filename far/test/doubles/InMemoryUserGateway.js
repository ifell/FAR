'use strict';

var Chance = require('chance');
var chance = new Chance();

var users = {};

function InMemoryUserGateway() {
}

InMemoryUserGateway.prototype.save = function(user) {
  user.id = chance.hash({length: 20});
  users[user.id] = user;
};

InMemoryUserGateway.prototype.getUsers = function() {
  // TODO - IEF - should return a clone, not the actual object
  return users;
};

module.exports = InMemoryUserGateway;