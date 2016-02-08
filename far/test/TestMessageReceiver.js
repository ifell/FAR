'use strict';

function MessageReceiver() {
  this.messages = new Set();
}

MessageReceiver.prototype.clearMessages = function() {
  this.messages.clear();
};

MessageReceiver.prototype.sameUsernameSaveError = function() {
  this.messages.add('SAVE_USER_ERROR');
};

MessageReceiver.prototype.userSaved = function() {
  this.messages.add('USER_SAVED');
}

module.exports = MessageReceiver;