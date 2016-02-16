'use strict';

class User {
  constructor(profile) {
    this.username = profile.username;
    this.id = undefined;
  }

  clone() {
    var cloned_user = new User(this);
    if (this.id)
      cloned_user.id = this.id;
    return cloned_user;
  }
}

module.exports = User;