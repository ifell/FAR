'use strict';

var Entity = require('./Entity');

class Report extends Entity {
  constructor(user, reportYear) {
    super();
    this._user = user;
    this._reportYear = reportYear;
  }

  create() {
    return new Report(this._user, this._reportYear);
  }
}

module.exports = Report;