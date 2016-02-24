'use strict';

var Context = require('../src/Context');

var UserGateway = require('./doubles/gateways/InMemoryUserGateway');
var ReportGateway = require('./doubles/gateways/InMemoryReportGateway');
var GateKeeper = require('../src/GateKeeper');

var Presenter = require('./PresenterSpy');

module.exports = function Setup() {
  Context.presenter = new Presenter();

  Context.userGateway = new UserGateway();
  Context.reportGateway = new ReportGateway();
  Context.gateKeeper = new GateKeeper();
};