'use strict';

var User = require('../../src/entities/User');
var Report = require('../../src/entities/Report');

var doubles = require('../doubles');
var GateKeeper = require('../../src/GateKeeper');
var MessageReceiver = require('../TestMessageReceiver');

function PresentReports() {
  this.messageReceiver = new MessageReceiver();
  this.userGateway = new doubles.InMemoryUserGateway(this.messageReceiver);

  this.gateKeeper = new GateKeeper();
}

PresentReports.prototype.createUser = function(username) {
  var user = new User({username: username});
  this.userGateway.save(user);

  return this.messageReceiver.messages.has('USER_SAVED');
};

PresentReports.prototype.logInUser = function(username) {
  var user = this.userGateway.getUserByUsername(username);
  this.gateKeeper.setLoggedInUser(user);

  return this.messageReceiver.messages.has('USER_FETCHED');
};

PresentReports.prototype.createReportBelongingTo = function(reportYear, username) {
  var report = new Report(username, reportYear);
  this.reportGateway.save(report);

  return this.messageReceiver.messages.has('REPORT_SAVED');
};

PresentReports.prototype.userCanView = function(username, reportYear) {
  return;
};

PresentReports.prototype.userCanEdit = function(username, reportYear) {
  return;
};

PresentReports.prototype.createSectionBelongingToReport = function(section, report) {

};

PresentReports.prototype.grantPermissionToView = function(user, report) {

};

PresentReports.prototype.grantPermissionToEdit = function(user, report) {

};

module.exports = PresentReports;