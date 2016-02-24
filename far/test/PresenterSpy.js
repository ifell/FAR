'use strict';

function PresenterSpy() {}

PresenterSpy.prototype.present = function(response) {
  this.response = response;
};

module.exports = PresenterSpy;