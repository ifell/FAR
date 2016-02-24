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
  });

  it ('gives an USER_DOESNT_EXIST message if the user does not exist', function(done) {
    var request = {
      username: 'username'
    };
    loginInteractor.login(request);
    expect(Context.presenter.response.message).toEqual('USER_DOESNT_EXIST');
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

    expect(Context.presenter.response.message).toEqual('USERNAME_LOGGED_IN');
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

    expect(Context.presenter.response.message).toEqual('USERNAME_LOGGED_OUT');
    expect(Context.gateKeeper.getLoggedInUser()).toBeUndefined();

    done();
  });
});
