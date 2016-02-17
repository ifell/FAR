'use strict';

function TestMessageReceiver() {
  this.messages = new Set();
}

TestMessageReceiver.prototype.clearMessages = function() {
  this.messages.clear();
};

TestMessageReceiver.prototype.userFetched = function() {
  this.messages.add('USER_FETCHED');
};

TestMessageReceiver.prototype.saved = function(type) {
  this.messages.add(type + '_SAVED');
};

module.exports = TestMessageReceiver;