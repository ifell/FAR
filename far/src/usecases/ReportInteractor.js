'use strict';

var Entity = require('../Entity');
let Context = require('../Context');

class ReportInteractor {
  constructor() {
  }

  createReportFor(year, username) {
    var response = {};

    var user = Context.userGateway.getUserByUsername(username);
    if (!user) {
      response.message = Context.UNKNOWN_USER();
    } else if (Context.reportGateway.getReportByUsernameAndReportYear(username, year)) {
      response.message = Context.REPORT_ALREADY_CREATED(year, username);
    } else {
      var newReport = Entity.create('Report', {year:year, username:username});
      Context.reportGateway.save(newReport);

      response.message = Context.REPORT_CREATED(username, year);
    }

    Context.presenter.present(response);
  }
}

module.exports = ReportInteractor;