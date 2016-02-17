'use strict';

var InMemoryUtilities = require('./InMemoryGateway');

class InMemoryUserGateway extends InMemoryUtilities {
  constructor(messageReceiver) {
    super('USER', messageReceiver);
  }

  getUserByUsername(username) {
    for (var u of this._collection.values()) {
      if (u.username === username) {
        this._messageReceiver.userFetched();
        return u.clone();
      }
    }

    return undefined;
  }
}

module.exports = InMemoryUserGateway;