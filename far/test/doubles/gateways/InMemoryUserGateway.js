'use strict';

var Chance = require('chance');
var chance = new Chance();

var util = require('util');

class InMemoryUserGateway {
  constructor(messageReceiver) {
    this._users = new Map();
    this._messageReceiver = messageReceiver;
  }

  getUserById(userid) {
    return this._users.get(userid);
  }

  getUserByUsername(username) {
    for (var u of this._users.values()) {
      if (u.username === username) {
        this._messageReceiver.userFetched();
        return u;
      }
    }

    return undefined;
  }

  save(user) {
    if (!this._users.has(user.id))
      user.id = chance.hash({length: 20});

    this._users.set(user.id, user.clone());
    this._messageReceiver.userSaved();
  }

  size() {
    return this._users.size;
  }

  getUsers() {
    var cloned_users = [];

    for (var u of this._users.values()) {
      cloned_users.push(u.clone());
    }

    return cloned_users;
  }
}

module.exports = InMemoryUserGateway;