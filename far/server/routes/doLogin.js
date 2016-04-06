'use strict';

var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');

var loginInteractor = require('../../src/usecases/LoginInteractor');
var userInteractor = require('../../src/usecases/UserInteractor');

var userGateway = {
  getUserByUsername(username, callback) {
    User.findOne({username: username}, function (err, user) {
      callback(user);
    });
  }
};

loginInteractor.setUserGateway(userGateway);
userInteractor.setUserGateway(userGateway);

loginInteractor.setContractor({
  LOGIN_MESSAGE: function (request, response) {
    response.message = request.username.toUpperCase() + '_LOGGED_IN';
    response.route = '/sections/name/year/2016';
  },
  USER_DOESNT_EXIST: function (request, response) {
    response.message = 'USER_DOESNT_EXIST';
    response.route = '/login';
  },
  ALREADY_LOGGED_IN: function (request, response) {
    response.message = 'ALREADY_LOGGED_IN';
    response.route = '/sections/name/year/2016';
  },
  ALREADY_LOGGED_OUT: function (request, response) {
    response.message = 'ALREADY_LOGGED_OUT';
    response.route = '/login';
  },
  LOGOUT_MESSAGE: function (request, response) {
    response.message = 'LOGGED_OUT';
    response.route = '/';
  }
});

function presenter(req, res) {
  var presenter = {
    present: function (response) {
      req.flash('message', response.message);
      if (response.route)
        res.redirect(response.route);
    }
  };

  loginInteractor.setPresenter(presenter);
  userInteractor.setPresenter(presenter);
}

function gateKeeper(req, res) {
  var gk = {
    isLoggedIn() {
      return !!req.user;
    },
    login(user, callback) {
      passport.authenticate('local', {
        failureRedirect: '/login',
        failureFlash: 'Password or username are incorrect. Try again...'
      })(req, res, callback);
    },
    logout(user) {
      req.logout();
    }
  };

  userInteractor.setGateKeeper(gk);
  loginInteractor.setGateKeeper(gk);
}

function init(req, res) {
  presenter(req, res);
  gateKeeper(req, res);
}

router.post('/login', function (req, res) {
  init(req, res);

  if (req.body.username && req.body.password) {
    loginInteractor.login(req.body);
  } else {
    req.flash('message', 'error: no username or password typed');
    res.redirect('/login')
  }
});

router.post('/logout', function (req, res) {
  init(req, res);

  loginInteractor.logout({user: req.user});
});

userInteractor.setRegister({
  register: function (user, callback) {
    User.register(new User({username: user.username}), user.password, callback);
  }
});

router.post('/register', function (req, res) {
  init(req, res);

  userInteractor.setContractor({
    ALREADY_REGISTERED: function (request, response) {
      response.message = 'ALREADY_REGISTERED';
      response.route = '/sections';
    },
    REGISTERED: function (request, response) {
      response.message = 'REGISTERED';
      loginInteractor.login(response.savedUser);
    },
    REGISTRATION_ERROR: function (request, response) {
      response.message = 'REGISTRATION_ERROR';
      response.route = '/register';
    },
    ALREADY_LOGGED_IN: function (request, response) {
      response.message = 'ALREADY_LOGGED_IN';
      response.route = '/sections';
    }
  });

  if (req.body.username && req.body.password) {
    userInteractor.register(req.body);
  } else {
    req.flash('message', 'error: no username or password typed');
    res.redirect('/register')
  }
});

module.exports = router;