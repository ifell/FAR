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

Creation.prototype.createReportAndAssignTo = function(input) {
  var inputs = input.split(',');
  this.reportInteractor.createReportFor(inputs[0], inputs[1]);
};

module.exports = Creation;