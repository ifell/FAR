'use strict';

var Entity = require('../Entities/Entity');

module.exports = {
  setUserGateway: function (userGateway) {
    this.userGateway = userGateway;
  },
  setGateKeeper: function (gateKeeper) {
    this._gateKeeper = gateKeeper;
  },
  setPresenter: function (presenter) {
    this.presenter = presenter;
  },
  setContractor: function (contractor) {
    this._contractor = contractor;
  },
  setRegister(register) {
    this._register = register;
  },
  register: function (request) {
    var response = {};
    var self = this;

    if (self._gateKeeper.isLoggedIn()) {
      self._contractor.ALREADY_LOGGED_IN(request, response);
      self.presenter.present(response);
      return;
    }

    this.userGateway.getUserByUsername(request.username, function (user) {
      if (user) {
        self._contractor.ALREADY_REGISTERED(request, response);
        self.presenter.present(response);
      } else {
        self._register.register(request, function (err, savedUser) {
          if (err) {
            response.err = err;
            self._contractor.REGISTRATION_ERROR(request, response);
          } else {
            response.savedUser = savedUser;
            self._contractor.REGISTERED(request, response);
          }
          self.presenter.present(response);
        });
      }
    });
  }
};
