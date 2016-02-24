'use strict';

function ReportFormat() {}

ReportFormat.prototype.hasHeaderIn = function(report) {
  return false;
};

ReportFormat.prototype.hasFooterIn = function(report) {
  return false;
};

ReportFormat.prototype.countOfSectionsPresentedIn = function(report) {
  return 1;
};

ReportFormat.prototype.createSectionBelongingToReport = function(section, report) {
  return false;
};

module.exports = ReportFormat;