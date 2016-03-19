'use strict';

let ReportInteractor = require('../../src/usecases/ReportInteractor');
let Context = require('../../src/Context');

function ReportFormat() {
  this.reportInteractor = new ReportInteractor();
}

ReportFormat.prototype.hasHeaderIn = function(report) {
  return false;
};

ReportFormat.prototype.hasFooterIn = function(report) {
  return false;
};

ReportFormat.prototype.countOfSectionsPresentedIn = function(input) {
  var inputs = input.split(',');
  this.reportInteractor.getNumberOfSections(inputs[0],inputs[1]);
  return Context.presenter.response.count;
};

ReportFormat.prototype.createSectionBelongingToReport = function(section, report) {
  return false;
};

module.exports = ReportFormat;