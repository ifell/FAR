'use strict';

var InMemoryGateway = require('./InMemoryGateway');

class InMemoryUserGateway extends InMemoryGateway {
  constructor() {
    super();
  }

  getUserByUsername(username, callback) {
    for (var u of this._collection.values()) {
      if (u.username === username) {
        return callback(u.clone());
      }
    }
    return callback(undefined);
  }
}

module.exports = InMemoryUserGateway;