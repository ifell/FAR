'use strict';

var Entity = require('../Entity');
var Context = require('../Context');

class UserInteractor {
  createUser(username) {
    var newUser = Entity.create('User', {username: username});
    Context.userGateway.save(newUser);
  }
}

module.exports = UserInteractor;