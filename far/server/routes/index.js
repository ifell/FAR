'use strict';

var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');

var PresentLogged = require('../../src/usecases/PresentLogged');

var _ = require('underscore');

function renderHeader(req) {
  return {
    notifications: req.flash('message')
  }
}

function renderHomePage() {
  return {
    title: 'Faculty Activity Report Generator',
    presentNav: {
      text: PresentLogged.showText(),
      route: PresentLogged.showRoute()
    }
  };
}

function renderSectionsPage() {
  return {
    title: 'Faculty Activity Report Generator',
    presentNav: {
      text: PresentLogged.showText(),
      route: PresentLogged.showRoute()
    }
  };
}

function renderLoginErrors(req) {
  return {
    message: req.flash('error')
  };
}

var sections = require('../sections.json');

var DisplaySectionInteractor = require('../../src/usecases/DisplaySectionsInteractor');
var sectionsMap = DisplaySectionInteractor.init(sections);

function renderSections(req) {
  return {
    sections: sections,
    toRoute: DisplaySectionInteractor.toRoute,
    section: sectionsMap.get(req.params.section),
    type: function(type) {
      return 'body/' + type;
    }
  };
}

function renderSectionsHome() {
  return {
    sections: sections,
    toRoute: DisplaySectionInteractor.toRoute
  };
}

function registerUser(req, res) {
  User.register(new User({username: req.body.username}), req.body.password, function (err, user) {
    if (err) {
      req.flash('error', err.message);
      res.redirect('/register');
    } else {
      passport.authenticate('local')(req, res, function () {
        loginInteractor.setPresenter({
          present: function(response) {
            res.redirect(response.route);
          }
        });

        loginInteractor.login(req.user);
      });
    }
  });
}

function authenticateUser() {
  return passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: 'Password or username are incorrect. Try again...'
  });
}

var LoginInteractor = require('../../src/usecases/LoginInteractor');
var loginInteractor = new LoginInteractor();

var GateKeeper = require('../../src/GateKeeper');
var gateKeeper = new GateKeeper();

loginInteractor.setContext({
  userGateway: {
    getUserByUsername(username, callback) {
      User.findOne({username: username}, function (err, user) {
        callback(user);
      });
    }
  },
  gateKeeper: gateKeeper
});

loginInteractor.setContractor({
  VALID_LOGIN_MESSAGE: function (request, response) {
    response.message = request.username.toUpperCase() + '_LOGGED_IN';
    response.route = '/';
    PresentLogged.loggedIn({username:request.username});
  },
  USER_DOESNT_EXIST: function (request, response) {
    response.message = 'USER_DOESNT_EXIST';
    response.route = '/login';
  },
  ALREADY_LOGGED_IN: function (request, response) {
    response.message = 'ALREADY_LOGGED_IN';
    response.route = '/';
  },
  ALREADY_LOGGED_OUT: function (request, response) {
    response.message = 'ALREADY_LOGGED_OUT';
    response.route = '/login';
  },
  LOGOUT_MESSAGE: function (request, response) {
    PresentLogged.loggedOut();
    response.message = request.username.toUpperCase() + '_LOGGED_OUT';
    response.route = '/';
  }
});

router.get('/login', function (req, res, next) {
  res.render('login', _.extend(renderHeader(req), renderHomePage(), renderLoginErrors(req)));
});

router.post('/login', authenticateUser(), function (req, res) {
  loginInteractor.setPresenter({
    present: function(response) {
      req.flash('message', response.message);
      res.redirect(response.route);
    }
  });

  if (req.body.username && req.body.password) {
    loginInteractor.login(req.body);
  } else {
    req.flash('message', 'error: no username or password typed');
    res.redirect('/login')
  }
});

router.get('/logout', function(req, res) {
  res.render('logout', _.extend(renderHeader(req), renderHomePage(), renderLoginErrors(req)));
});

router.post('/logout', function (req, res) {
  loginInteractor.setPresenter({
    present: function(response) {
      req.flash('message', response.message);
      req.logout();
      res.redirect(response.route);
    }
  });

  loginInteractor.logout();
});

router.get('/', function (req, res, next) {
  res.render('index', _.extend(renderHeader(req), renderHomePage()));
});




router.get('/sections', function (req, res, next) {
  res.render('sections/sections', _.extend(renderHeader(req), renderHomePage(), renderSectionsHome()));
});

router.get('/sections/:section', function (req, res, next) {
  res.render('sections/section', _.extend(renderHeader(req), renderSectionsPage(), renderSections(req)));
});





router.get('/about', function (req, res, next) {
  res.render('about', _.extend(renderHeader(req), renderHomePage()));
});

router.get('/register', function (req, res, next) {
  res.render('register', _.extend(renderHeader(req), renderHomePage(), renderLoginErrors(req)));
});

router.post('/register', function (req, res) {
  if (req.body.username && req.body.password) {
    registerUser(req, res);
  } else {
    req.flash('message', 'error: no username or password typed');
    res.redirect('/register')
  }
});

module.exports = router;
