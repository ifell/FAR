'use strict';

let loggedInUser = new WeakMap();

function GateKeeper() {
  loggedInUser.set(this, undefined);
}

GateKeeper.prototype.setLoggedInUser = function(user) {
  loggedInUser.set(this, user);
};

GateKeeper.prototype.getLoggedInUser = function() {
  loggedInUser.get(this);
};

module.exports = GateKeeper;