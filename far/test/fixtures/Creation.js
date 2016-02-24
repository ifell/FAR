'use strict';

var UserInteractor = require('../../src/usecases/UserInteractor');
var ReportInteractor = require('../../src/usecases/ReportInteractor');
var Context = require('../../src/Context');

function Creation() {
  this.userInteractor = new UserInteractor();
  this.reportInteractor = new ReportInteractor();
}

Creation.prototype.createUser = function(username) {
  this.userInteractor.createUser(username);
};

Creation.prototype.createReport = function(year) {
  this.year = year;
};

Creation.prototype.andAssignTo = function(username) {
  this.reportInteractor.createReportFor(this.year, username);
};

module.exports = Creation;