'use strict';

var InMemoryGateway = require('./InMemoryGateway');

class InMemoryUserGateway extends InMemoryGateway {
  constructor() {
    super();
  }

  getUserByUsername(username) {
    for (var u of this._collection.values()) {
      if (u.username === username) {
        return u.clone();
      }
    }
    return undefined;
  }
}

module.exports = InMemoryUserGateway;