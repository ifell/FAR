'use strict';

var Chance = require('chance');
var chance = new Chance();

var util = require('util');
var UserGateway = require('../../src/gateways/UserGateway');

let users = new WeakMap();
let thisMessageReceiver = new WeakMap();

class InMemoryUserGateway extends UserGateway {
  constructor(messageReceiver) {
    super();
    users.set(this, new Map());
    thisMessageReceiver.set(this, messageReceiver);
  }

  getUserById(userid) {
    var map = users.get(this);
    return map.get(userid);
  }

  getUserByUsername(username) {
    for (var u of users.get(this).values()) {
      if (u.username === username) {
        thisMessageReceiver.get(this).userFetched();
        return u;
      }
    }

    return undefined;
  }

  save(user) {
    if (!users.get(this).has(user.id))
      user.id = chance.hash({length: 20});

    users.get(this).set(user.id, user.clone());
    thisMessageReceiver.get(this).userSaved();
  }

  size() {
    return users.get(this).size;
  }

  getUsers() {
    var cloned_users = [];

    for (var u of users.get(this).values()) {
      cloned_users.push(u.clone());
    }

    return cloned_users;
  }
}

module.exports = InMemoryUserGateway;