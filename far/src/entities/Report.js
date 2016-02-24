'use strict';

var Entity = require('./Entity');

class Report extends Entity {
  constructor(year, username) {
    super();
    this.year = year;
    this.username = username;
  }

  _create() {
    return new Report(this.year, this.username);
  }
}

module.exports = Report;