'use strict';

let username = new WeakMap();
let reportYear = new WeakMap();

function Report(un, ry) {
  username.set(this, un);
  reportYear.set(this, ry);
}

module.exports = Report;