'use strict';

let Context = require('../Context');

class LoginInteractor {
  constructor() {
  }

  login(request) {
    var response = {};

    var user = Context.userGateway.getUserByUsername(request.username);
    if (!user) {
      response.message = Context.USER_DOESNT_EXIST();
    } else if (alreadyLoggedIn()) {
      response.message = Context.ALREADY_LOGGED_IN();
    } else {
      response.message = Context.VALID_LOGIN_MESSAGE(request.username);
      Context.gateKeeper.setLoggedInUser(user);
    }

    Context.presenter.present(response);
  }

  logout() {
    var response = {};

    var user = Context.gateKeeper.getLoggedInUser();
    if (!user) {
      response.message = Context.ALREADY_LOGGED_OUT();
    } else {
      Context.gateKeeper.setLoggedInUser(undefined);

      response.message = Context.LOGOUT_MESSAGE(user.username);
    }

    Context.presenter.present(response);
  }
}

function alreadyLoggedIn() {
  return Context.gateKeeper.getLoggedInUser();
}

module.exports = LoginInteractor;
