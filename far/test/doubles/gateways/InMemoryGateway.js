'use strict';

var Chance = require('chance');
var chance = new Chance();

class InMemoryUtilities {
  constructor(name, messageReceiver) {
    this._name = name;
    this._collection = new Map();
    this._messageReceiver = messageReceiver;
  }

  save(document) {
    if (!this._collection.has(document.getId()))
      document.setId(chance.hash({length: 20}));

    this._collection.set(document.getId(), document.clone());
    this._messageReceiver.saved(this._name);
  }

  size() {
    return this._collection.size;
  }

  get() {
    var cloned_users = [];

    for (var c of this._collection.values()) {
      cloned_users.push(c.clone());
    }

    return cloned_users;
  }

  getById(id) {
    return this._collection.get(id).clone();
  }
}

module.exports = InMemoryUtilities;