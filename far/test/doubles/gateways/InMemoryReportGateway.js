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

  getSections(request) {
    var sections = {};

    for (var u of this._collection.values()) {
      if (u.username === request.username && u.year === request.year) {
        u.sections.forEach(function(value, key) {
          sections[key] = value;
        });
      }
    }

    return sections;
  }
}

module.exports = InMemoryReportGateway;