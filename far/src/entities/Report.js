'use strict';

class Report {
  constructor(user, reportYear) {
    this._user = user;
    this._reportYear = reportYear;
    this.id = undefined;
  }

  clone() {
    var cloned_user = new Report(this);
    if (this.id)
      cloned_user.id = this.id;
    return cloned_user;
  }

  getUser() {
    return this._user;
  }

  getReportYear() {
    return this._reportYear;
  }
}

module.exports = Report;