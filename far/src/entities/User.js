'use strict';

var Entity = require('./Entity');

class User extends Entity {
  constructor(profile) {
    super();
    this.username = profile.username;
  }

  create() {
    return new User({username: this.username});
  }
}

module.exports = User;