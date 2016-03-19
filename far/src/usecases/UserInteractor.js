'use strict';

var Entity = require('../Entities/Entity');
var Context = require('../Context');

class UserInteractor {
  createUser(username) {
    var newUser = Entity.create('User', {username: username});
    Context.userGateway.save(newUser);
  }
}

module.exports = UserInteractor;