'use strict';

var Context = require('../../src/Context');

var SetupContext = require('../SetupContext');

var GateKeeper = require('../../src/GateKeeper');
var InMemoryUserGateway = require('../doubles/gateways/InMemoryUserGateway');

var LoginInteractor = require('../../src/usecases/LoginInteractor');
var UserInteractor = require('../../src/usecases/UserInteractor');

var loginInteractor;

describe('Login Interactor Tests', function() {
  beforeEach(function() {
    SetupContext();

    loginInteractor = new LoginInteractor();

    this.presenter = {
      present: function(response) {
        this.response = response;
      }
    };

    loginInteractor.setPresenter(this.presenter);

    loginInteractor.setContractor({
      USER_DOESNT_EXIST: function (request, response) {
        response.message = 'USER_DOESNT_EXIST';
      },
      ALREADY_LOGGED_IN: function (request, response) {
        response.message = 'ALREADY_LOGGED_IN';
      },
      VALID_LOGIN_MESSAGE: function (request, response) {
        response.message = request.username.toUpperCase() + '_LOGGED_IN';
      },
      ALREADY_LOGGED_OUT: function (request, response) {
        response.message = 'ALREADY_LOGGED_OUT';
      },
      LOGOUT_MESSAGE: function (request, response) {
        response.message = request.username.toUpperCase() + '_LOGGED_OUT';
      }
    });
  });

  it ('gives an USER_DOESNT_EXIST message if the user does not exist', function(done) {
    var request = {
      username: 'username'
    };
    loginInteractor.login(request);

    expect(this.presenter.response.message).toEqual('USER_DOESNT_EXIST');
    expect(Context.gateKeeper.getLoggedInUser()).toBeUndefined();
    done();
  });

  it ('normal login', function(done) {
    var userInteractor = new UserInteractor();
    userInteractor.createUser('username');

    var request = {
      username: 'username'
    };
    loginInteractor.login(request);

    expect(this.presenter.response.message).toEqual('USERNAME_LOGGED_IN');
    expect(Context.gateKeeper.getLoggedInUser().username).toEqual(request.username);
    done();
  });

  it ('gives a ALREADY_LOGGED_IN message if the user is already logged in', function(done) {
    var userInteractor = new UserInteractor();
    userInteractor.createUser('username');

    var request = {
      username: 'username'
    };
    loginInteractor.login(request);
    loginInteractor.login(request);

    expect(this.presenter.response.message).toEqual('ALREADY_LOGGED_IN');
    expect(Context.gateKeeper.getLoggedInUser().username).toEqual(request.username);
    done();
  });

  it ('normal logout', function(done) {
    var userInteractor = new UserInteractor();
    userInteractor.createUser('username');

    var request = {
      username: 'username'
    };
    loginInteractor.login(request);
    loginInteractor.logout();

    expect(this.presenter.response.message).toEqual('USERNAME_LOGGED_OUT');
    expect(Context.gateKeeper.getLoggedInUser()).toBeUndefined();

    done();
  });

  it ('gives a ALREADY_LOGGED_OUT message if the user is already logged out', function(done) {
    loginInteractor.logout();

    expect(this.presenter.response.message).toEqual('ALREADY_LOGGED_OUT');
    expect(Context.gateKeeper.getLoggedInUser()).toBeUndefined();

    done();
  });
});
