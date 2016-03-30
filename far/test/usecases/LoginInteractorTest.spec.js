'use strict';

var InMemoryUserGateway = require('../doubles/gateways/InMemoryUserGateway');

var Entity = require('../../src/Entities/Entity');

var loginInteractor = require('../../src/usecases/LoginInteractor');
var userInteractor = require('../../src/usecases/UserInteractor');

describe('Login Interactor Tests', function () {
  beforeEach(function () {
    var inMemoryUserGateway = new InMemoryUserGateway();

    loginInteractor.setUserGateway(inMemoryUserGateway);
    userInteractor.setUserGateway(inMemoryUserGateway);

    var gateKeeperFake = {
      loggedInUser: undefined,
      isLoggedIn() {
        return !!this.loggedInUser;
      },
      logout() {
        this.loggedInUser = undefined;
      },
      login(user, callback) {
        this.loggedInUser = user;
        callback();
      }
    };

    loginInteractor.setGateKeeper(gateKeeperFake);
    userInteractor.setGateKeeper(gateKeeperFake);

    userInteractor.setRegister({
      register(user, callback) {
        inMemoryUserGateway.asyncSave(Entity.create('User', user), callback);
      }
    });

    this.presenter = {
      present: function (response) {
        this.response = response;
      }
    };

    loginInteractor.setPresenter(this.presenter);
    userInteractor.setPresenter(this.presenter);

    loginInteractor.setContractor({
      USER_DOESNT_EXIST: function (request, response) {
        response.message = 'USER_DOESNT_EXIST';
      },
      ALREADY_LOGGED_IN: function (request, response) {
        response.message = 'ALREADY_LOGGED_IN';
      },
      LOGIN_MESSAGE: function (request, response) {
        response.message = 'LOGGED_IN';
      },
      ALREADY_LOGGED_OUT: function (request, response) {
        response.message = 'ALREADY_LOGGED_OUT';
      },
      LOGOUT_MESSAGE: function (request, response) {
        response.message = 'LOGGED_OUT';
      }
    });

    userInteractor.setContractor({
      ALREADY_REGISTERED: function (request, response) {
        response.message = 'ALREADY_REGISTERED';
      },
      REGISTERED: function (request, response) {
        response.message = 'REGISTERED';
      },
      REGISTRATION_ERROR: function (request, response) {
        response.message = 'REGISTRATION_ERROR';
      },
      ALREADY_LOGGED_IN: function (request, response) {
        response.message = 'ALREADY_LOGGED_IN';
      }
    });
  });

  it('gives an USER_DOESNT_EXIST message if the user does not exist', function (done) {
    var request = {
      username: 'username'
    };

    loginInteractor.login(request);

    expect(this.presenter.response.message).toEqual('USER_DOESNT_EXIST');
    done();
  });

  it('normal login', function (done) {
    userInteractor.register({
      username: 'username',
      password: 'password'
    });

    var request = {
      username: 'username'
    };

    loginInteractor.login(request);

    expect(this.presenter.response.message).toEqual('LOGGED_IN');
    done();
  });

  it('gives a ALREADY_LOGGED_IN message if the user is already logged in', function (done) {
    userInteractor.register({
      username: 'username',
      password: 'password'
    });

    var request = {
      username: 'username'
    };

    loginInteractor.login(request);
    loginInteractor.login(request);

    expect(this.presenter.response.message).toEqual('ALREADY_LOGGED_IN');
    done();
  });

  it('gives a ALREADY_LOGGED_IN message if the user is already logged in as another user', function (done) {
    userInteractor.register({
      username: 'username',
      password: 'password'
    });

    userInteractor.register({
      username: 'username02',
      password: 'password'
    });

    loginInteractor.login({
      username: 'username'
    });

    loginInteractor.login({
      username: 'username02'
    });

    expect(this.presenter.response.message).toEqual('ALREADY_LOGGED_IN');
    done();
  });

  it('normal logout', function (done) {
    userInteractor.register({
      username: 'username',
      password: 'password'
    });

    var request = {
      username: 'username'
    };

    loginInteractor.login(request);
    loginInteractor.logout(request);

    expect(this.presenter.response.message).toEqual('LOGGED_OUT');
    done();
  });

  it('gives a ALREADY_LOGGED_OUT message if the user is already logged out', function (done) {
    var request = {};

    loginInteractor.logout(request);

    expect(this.presenter.response.message).toEqual('ALREADY_LOGGED_OUT');
    done();
  });

  describe('register', function () {
    it('gives a REGISTERED message when the user is successfully registered', function (done) {
      var request = {
        username: 'username',
        password: 'password'
      };

      userInteractor.register(request);

      expect(this.presenter.response.message).toEqual('REGISTERED');
      done();
    });

    it('gives a ALREADY_REGISTERED message if a username has already been registered', function (done) {
      var request = {
        username: 'username',
        password: 'password'
      };

      userInteractor.register(request);
      userInteractor.register(request);

      expect(this.presenter.response.message).toEqual('ALREADY_REGISTERED');
      done();
    });

    it ('gives a REGISTRATION_ERROR message when the registration fails', function(done) {
      userInteractor.setRegister({
        register(user, callback) {
          callback('error');
        }
      });

      var request = {
        username: 'username',
        password: 'password'
      };

      userInteractor.register(request);

      expect(this.presenter.response.message).toEqual('REGISTRATION_ERROR');
      done();
    });

    it ('gives a ALREADY_LOGGED_IN message when trying to register when logged in', function(done) {
      userInteractor.register({
        username: 'username',
        password: 'password'
      });

      loginInteractor.login({
        username: 'username'
      });

      userInteractor.register({
        username: 'newusername',
        password: 'password'
      });

      expect(this.presenter.response.message).toEqual('ALREADY_LOGGED_IN');

      done();
    });
  });
});
