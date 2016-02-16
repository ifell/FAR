'use strict';

function TestMessageReceiver() {
  this.messages = new Set();
}

TestMessageReceiver.prototype.clearMessages = function() {
  this.messages.clear();
};

TestMessageReceiver.prototype.userSaved = function() {
  this.messages.add('USER_SAVED');
};

TestMessageReceiver.prototype.userFetched = function() {
  this.messages.add('USER_FETCHED');
};

TestMessageReceiver.prototype.reportSaved = function() {
  this.messages.add('REPORT_SAVED');
};

module.exports = TestMessageReceiver;