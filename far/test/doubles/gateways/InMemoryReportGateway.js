'use strict';

var Chance = require('chance');
var chance = new Chance();

class InMemoryReportGateway {
  constructor(messageReceiver) {
    this._reports = new Map();
    this._messageReceiver = messageReceiver;
  }

  save(report) {
    if (!this._reports.has(report.id))
      report.id = chance.hash({length: 20});

    this._reports.set(report.id, report.clone());
    this._messageReceiver.reportSaved();
  }
}

module.exports = InMemoryReportGateway;