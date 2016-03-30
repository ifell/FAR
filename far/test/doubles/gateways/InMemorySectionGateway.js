'use strict';

var InMemoryGateway = require('./InMemoryGateway');

class InMemorySectionGateway extends InMemoryGateway {
  constructor() {
    super();
  }

  getSectionByTitle(title, callback) {
    for (var s of this._collection.values()) {
      if (s.title === title) {
        return callback(s.clone());
      }
    }
    return callback(undefined);
  }
}

module.exports = InMemorySectionGateway;