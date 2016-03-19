'use strict';

var Entity = require('../Entities/Entity');
let Context = require('../Context');

class ReportInteractor {
  constructor() {
  }

  setPresenter(presenter) {
    this.presenter = presenter;
  }

  setContractor(contractor) {
    this._contractor = contractor;
  }

  createReportFor(request) {
    var response = {};
    var self = this;

    Context.userGateway.getUserByUsername(request.username, function (user) {
      if (!user) {
        self._contractor.USER_DOESNT_EXIST(request, response);
      } else if (Context.reportGateway.getReportByUsernameAndReportYear(request.username, request.year)) {
        self._contractor.REPORT_ALREADY_CREATED(request, response);
      } else {
        var newReport = Entity.create('Report', request);
        Context.reportGateway.save(newReport);

        self._contractor.REPORT_CREATED(request, response);
      }

      self.presenter.present(response);
    });
  }

  getNumberOfSections(request) {
    var response = {};

    var report =
      Context.reportGateway.getReportByUsernameAndReportYear(request.username, request.year);
    if (!report) {
      response.count = 0;
      this._contractor.UNKNOWN_REPORT(request, response);
    } else {
      response.count = report.getNumberOfSections(request.year, request.username);
      this._contractor.REPORT_FETCHED(request, response);
    }

    this.presenter.present(response);
  }

  addSectionTo(reportRequest, section) {
    var request = Object.assign(reportRequest, {sections: section});

    var response = {};

    var report =
      Context.reportGateway.getReportByUsernameAndReportYear(reportRequest.username, reportRequest.year);

    if (!report) {
      this._contractor.UNKNOWN_REPORT(request, response);
    } else {
      report.addSection(section);
      Context.reportGateway.save(report);
      this._contractor.SECTION_ADDED(request, response);
    }

    this.presenter.present(response);
  }
}

module.exports = ReportInteractor;