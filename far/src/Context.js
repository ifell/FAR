'use strict';

module.exports = {
  VALID_LOGIN_MESSAGE: function(username) {
    return username.toUpperCase() + '_LOGGED_IN';
  },
  LOGOUT_MESSAGE: function(username) {
    return username.toUpperCase() + '_LOGGED_OUT';
  },
  USER_DOESNT_EXIST: function() {
    return 'USER_DOESNT_EXIST';
  },
  ALREADY_LOGGED_IN: function() {
    return 'ALREADY_LOGGED_IN';
  },
  ALREADY_LOGGED_OUT: function() {
    return 'ALREADY_LOGGED_OUT';
  },
  REPORT_CREATED: function(username, year) {
    return year + '_REPORT_ASSIGNED_TO_' + username.toUpperCase();
  },
  UNKNOWN_USER: function() {
    return 'UNKNOWN_USER';
  },
  REPORT_ALREADY_CREATED: function(year, username) {
    return year + '_REPORT_ALREADY_EXISTS_FOR_' + username.toUpperCase();
  },
  userGateway: undefined,
  gateKeeper: undefined,
  reportGateway: undefined,
  presenter: undefined
};