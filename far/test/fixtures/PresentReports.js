'use strict';

var User = require('../../src/entities/User');

var doubles = require('../doubles');

function PresentReports() {}

PresentReports.prototype.createUser = function(user) {
  this.userGateway = new doubles.InMemoryUserGateway;

  this.user = User.create({username: 'ianfell', password: 'password'});
  this.userGateway.save(this.user);
};

PresentReports.prototype.logInUser = function(user) {

};

PresentReports.prototype.createReportBelongingTo = function(user, report) {

};

PresentReports.prototype.userCanView = function(user, report) {
  return;
};

PresentReports.prototype.userCanEdit = function(user, report) {
  return;
};

PresentReports.prototype.createSectionBelongingToReport = function(section, report) {

};

PresentReports.prototype.grantPermissionToView = function(user, report) {

};

PresentReports.prototype.grantPermissionToEdit = function(user, report) {

};

module.exports = PresentReports;