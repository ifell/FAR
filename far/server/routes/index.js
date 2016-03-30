'use strict';

module.exports = function(app) {
  app.use(require('./doLogin'));
  app.use(require('./presentLogin'));

  app.use(require('./sections'));
};
