'use strict';

var Context = require('../src/Context');

var UserGateway = require('./doubles/gateways/InMemoryUserGateway');
var ReportGateway = require('./doubles/gateways/InMemoryReportGateway');
var GateKeeper = require('../src/GateKeeper');

module.exports = function Setup() {
  Context.userGateway = new UserGateway();
  Context.reportGateway = new ReportGateway();
  Context.gateKeeper = new GateKeeper();
};