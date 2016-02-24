'use strict';

var InMemoryUtilities = require('./InMemoryGateway');

class InMemoryReportGateway extends InMemoryUtilities {
  constructor() {
    super();
  }

  getReportByUsernameAndReportYear(username, reportYear) {
    for (var u of this._collection.values()) {
      if (u.username === username && u.year === reportYear) {
        return u.clone();
      }
    }
    return undefined;
  }
}

module.exports = InMemoryReportGateway;