'use strict';

class GateKeeper {
  constructor() {
    this._loggedInUser = undefined;
  }

  setLoggedInUser(user) {
    this._loggedInUser = user;
  }

  getLoggedInUser() {
    return this._loggedInUser;
  }
}

module.exports = GateKeeper;