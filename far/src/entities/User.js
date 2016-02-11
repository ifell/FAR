'use strict';

function User(profile) {
  this.username = profile.username;
}

User.prototype.clone = function() {
  var cloned_user = new User(this);
  if (this.id)
    cloned_user.id = this.id;
  return cloned_user;
};

module.exports = User;