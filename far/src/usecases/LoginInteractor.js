'use strict';

module.exports = {
  setUserGateway: function(userGateway) {
    this.userGateway = userGateway;
  },
  setGateKeeper: function(gateKeeper) {
    this._gateKeeper = gateKeeper;
  },
  setPresenter: function(presenter) {
    this.presenter = presenter;
  },
  setContractor: function(contractor) {
    this._contractor = contractor;
  },
  login: function(request) {
    var response = {};
    var self = this;

    this.userGateway.getUserByUsername(request.username, function (user) {
      if (!user) {
        self._contractor.USER_DOESNT_EXIST(request, response);
        self.presenter.present(response);
      } else if (self._gateKeeper.isLoggedIn()) {
        self._contractor.ALREADY_LOGGED_IN(request, response);
        self.presenter.present(response);
      } else {
        self._gateKeeper.login(user, function() {
          self._contractor.LOGIN_MESSAGE(request, response);
          self.presenter.present(response);
        });
      }
    });
  },
  logout: function(request) {
    var response = {};
    var self = this;

    if (!self._gateKeeper.isLoggedIn()) {
      self._contractor.ALREADY_LOGGED_OUT(request, response);
    } else {
      self._contractor.LOGOUT_MESSAGE(request, response);
      self._gateKeeper.logout();
    }

    self.presenter.present(response);
  }
};
