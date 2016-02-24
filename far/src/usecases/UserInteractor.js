'use strict';

var User = require('../entities/User');
var Context = require('../Context');

function UserInteractor() {}

UserInteractor.prototype.createUser = function(username) {
  var newUser = new User({username: username});
  Context.userGateway.save(newUser);
};

module.exports = UserInteractor;