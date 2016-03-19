'use strict';

var Context = require('../Context');

function alreadyLoggedIn() {
  return Context.gateKeeper.getLoggedInUser();
}

class LoginInteractor {
  constructor() {
  }

  setContext(context) {
    Context = context;
  }

  setPresenter(presenter) {
    this.presenter = presenter;
  }

  setContractor(contractor) {
    this._contractor = contractor;
  }

  login(request) {
    var response = {};
    var self = this;

    Context.userGateway.getUserByUsername(request.username, function (user) {
      if (!user) {
        self._contractor.USER_DOESNT_EXIST(request, response);
      } else if (alreadyLoggedIn()) {
        self._contractor.ALREADY_LOGGED_IN(request, response);
      } else {
        self._contractor.VALID_LOGIN_MESSAGE(request, response);
        Context.gateKeeper.setLoggedInUser(user);
      }

      self.presenter.present(response);
    });
  }

  logout() {
    var response = {};

    var user = Context.gateKeeper.getLoggedInUser();
    if (!user) {
      this._contractor.ALREADY_LOGGED_OUT(user, response);
    } else {
      this._contractor.LOGOUT_MESSAGE(user, response);
      Context.gateKeeper.setLoggedInUser(undefined);
    }

    this.presenter.present(response);
  }
}

module.exports = LoginInteractor;