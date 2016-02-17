'use strict';

var InMemoryUtilities = require('./InMemoryGateway');

class InMemoryReportGateway extends InMemoryUtilities {
  constructor(messageReceiver) {
    super('REPORT', messageReceiver);
  }
}

module.exports = InMemoryReportGateway;