'use strict';

var Chance = require('chance');
var chance = new Chance();

class InMemoryUtilities {
  constructor() {
    this._collection = new Map();
  }

  save(document) {
    if (!this._collection.has(document.getId()))
      document.setId(chance.hash({length: 20}));

    this._collection.set(document.getId(), document.clone());
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