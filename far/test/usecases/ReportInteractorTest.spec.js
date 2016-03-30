//'use strict';
//
//var ReportInteractor = require('../../src/usecases/ReportInteractor');
//
//var UserInteractor = require('../../src/usecases/UserInteractor');
//
//var Context = require('../../src/Context');
//var SetupContext = require('../SetupContext');
//
//describe('Report Interactor Test', function () {
//  beforeEach(function () {
//    SetupContext();
//
//    this.reportInteractor = new ReportInteractor();
//
//    this.presenter = {
//      present: function (response) {
//        this.response = response;
//      }
//    };
//
//    this.reportInteractor.setContractor({
//      REPORT_ALREADY_CREATED: function (request, response) {
//        response.message = request.year +
//          '_REPORT_ALREADY_EXISTS_FOR_' + request.username.toUpperCase();
//      },
//      USER_DOESNT_EXIST: function (request, response) {
//        response.message = 'USER_DOESNT_EXIST';
//      },
//      REPORT_CREATED: function (request, response) {
//        response.message = request.year +
//          '_REPORT_ASSIGNED_TO_' + request.username.toUpperCase();
//      },
//      REPORT_FETCHED: function (request, response) {
//        response.message = 'REPORT_FETCHED';
//      },
//      UNKNOWN_REPORT: function (request, response) {
//        response.message = 'UNKNOWN_REPORT';
//      },
//      SECTION_ADDED: function (request, response) {
//        response.message = request.sections.title.toUpperCase() + '_ADDED_TO_' +
//          request.year + '_REPORT_FOR_' +
//          request.username.toUpperCase();
//      }
//    });
//
//    this.reportInteractor.setPresenter(this.presenter);
//  });
//
//  describe('Reports', function () {
//    it('an unknown user and unknown report', function (done) {
//      var request = {year: '2016', username: 'unknownUsername'};
//
//      this.reportInteractor.getNumberOfSections(request);
//
//      expect(this.presenter.response.message).toEqual('UNKNOWN_REPORT');
//      done();
//    });
//
//    it('known user and an unknown report', function (done) {
//      this.userInteractor = new UserInteractor();
//      this.userInteractor.createUser('ifell');
//      var request = {year: '2016', username: 'ifell'};
//
//      this.reportInteractor.getNumberOfSections(request);
//
//      expect(this.presenter.response.message).toEqual('UNKNOWN_REPORT');
//      done();
//    });
//
//    it('will get the number of sections for a known user and a known report', function (done) {
//      this.userInteractor = new UserInteractor();
//      this.userInteractor.createUser('ifell');
//      var request = {year: '2016', username: 'ifell'};
//      this.reportInteractor.createReportFor(request);
//
//      expect(this.presenter.response.message).toEqual('2016_REPORT_ASSIGNED_TO_IFELL');
//      //expect(this.presenter.response.count).toEqual(0);
//      done();
//    });
//
//    it('does not create report if the user does not exist', function (done) {
//      this.reportInteractor.createReportFor('2016', 'nonExistentUser');
//      expect(this.presenter.response.message).toEqual('USER_DOESNT_EXIST');
//      done();
//    });
//
//    it('creates a report', function (done) {
//      this.userInteractor = new UserInteractor();
//      this.userInteractor.createUser('ifell');
//      var request = {year: '2016', username: 'ifell'};
//
//      this.reportInteractor.createReportFor(request);
//
//      expect(this.presenter.response.message).toEqual('2016_REPORT_ASSIGNED_TO_IFELL');
//      done();
//    });
//
//    it('does not create a report of the same year for the same user', function (done) {
//      this.userInteractor = new UserInteractor();
//      this.userInteractor.createUser('ifell');
//      var request = {year: '2016', username: 'ifell'};
//
//      this.reportInteractor.createReportFor(request);
//      this.reportInteractor.createReportFor(request);
//
//      expect(this.presenter.response.message).toEqual('2016_REPORT_ALREADY_EXISTS_FOR_IFELL');
//      done();
//    });
//  });
//
//  describe('Sections', function () {
//    beforeEach(function () {
//      this.userInteractor = new UserInteractor();
//      this.userInteractor.createUser('ifell');
//      this.report = {year: '2016', username: 'ifell'};
//
//      this.reportInteractor.createReportFor(this.report);
//    });
//
//    var section = {
//      title: 'name',
//      body: {
//        fullName: {
//          first: 'Ian',
//          middle: 'Edward',
//          last: 'Fell'
//        }
//      }
//    };
//
//    it ('can not add a new section to a nonexisting report', function (done) {
//      this.reportInteractor.addSectionTo({}, section);
//
//      expect(this.presenter.response.message).toEqual('UNKNOWN_REPORT');
//      done();
//    });
//
//    it('can add a new section to an existing report', function (done) {
//      this.reportInteractor.addSectionTo(this.report, section);
//
//      var fetchedSections = Context.reportGateway.getSections(this.report);
//
//      expect(fetchedSections[section.title]).toEqual(section);
//      expect(this.presenter.response.message).toEqual('NAME_ADDED_TO_2016_REPORT_FOR_IFELL');
//      done();
//    });
//  });
//});