'use strict';

var ReportInteractor = require('../../src/usecases/ReportInteractor');
var UserInteractor = require('../../src/usecases/UserInteractor');

var SetupContext = require('../SetupContext');

var Context = require('../../src/Context');

describe('Report Interactor Test', function() {
  beforeEach(function() {
    SetupContext();

    var userInteractor = new UserInteractor();
    userInteractor.createUser('ifell');

    this.reportInteractor = new ReportInteractor();
  });

  it ('does not create report if the user does not exist', function(done) {
    this.reportInteractor.createReportFor('2016', 'nonExistentUser');
    expect(Context.presenter.response.message).toEqual('UNKNOWN_USER');
    done();
  });

  it ('creates a new report', function(done) {
    this.reportInteractor.createReportFor('2016', 'ifell');
    expect(Context.presenter.response.message).toEqual('2016_REPORT_ASSIGNED_TO_IFELL');
    done();
  });
});