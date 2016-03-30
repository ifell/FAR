'use strict';

var Context = require('../src/Context');

var UserGateway = require('./doubles/gateways/InMemoryUserGateway');
var ReportGateway = require('./doubles/gateways/InMemoryReportGateway');
var SectionGateway = require('./doubles/gateways/InMemorySectionGateway');

module.exports = function Setup() {
  Context.userGateway = new UserGateway();
  Context.reportGateway = new ReportGateway();
  Context.sectionGateway = new SectionGateway();
};