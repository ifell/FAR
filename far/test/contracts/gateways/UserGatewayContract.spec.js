'use strict';

var entities = require('../../../src/entities/index');
var contract = require('../config');

var TestMessageReceiver, user1, userGateway;

describe('Unsaved User', function () {
  beforeEach(function () {
    TestMessageReceiver = new contract.MessageReceiver();
    userGateway = new contract.InMemoryUserGateway(TestMessageReceiver);

    user1 = new entities.User({username: 'ianfell'});
    userGateway.save(user1);
  });

  it('has a defined id', function (done) {
    expect(user1.id).toBeDefined();
    done();
  });

  it('increments the size of the database by one', function (done) {
    expect(userGateway.size()).toEqual(1);
    done();
  });

  it('sends a user saved message', function (done) {
    expect(TestMessageReceiver.messages.has('USER_SAVED'));
    done();
  });

  it('a save should not change the user id', function (done) {
    var userid = user1.id;

    userGateway.save(user1);

    expect(userid).toEqual(user1.id);
    done();
  });

  it('a save should not add a new user', function (done) {
    userGateway.save(user1);

    expect(userGateway.size()).toEqual(1);
    done();
  });

  it('can not update the username before it is saved', function (done) {
    var previousUsername = user1.username;

    user1.username = 'anotherusername';
    expect(userGateway.getUserById(user1.id).username).toEqual(previousUsername);
    userGateway.save(user1);

    expect(userGateway.getUserById(user1.id).username).toEqual('anotherusername');
    expect(userGateway.size()).toEqual(1);
    done();
  });

  it('can get the user by id', function (done) {
    expect(userGateway.getUserById(user1.id)).toEqual(user1);
    done();
  });

  it('can get a list of users', function (done) {
    var user2 = new entities.User({username: 'cocoafell'});
    userGateway.save(user2);

    var users = userGateway.getUsers();

    expect(users.length).toEqual(2);
    done();
  });

  it('two saves on different object should add to the database twice', function (done) {
    var user2 = new entities.User({username: 'cocoafell'});

    userGateway.save(user2);

    expect(userGateway.size()).toEqual(2);
    done();
  });

  it('can get a user from a username', function (done) {
    var fetched_user1 = userGateway.getUserByUsername('ianfell');

    expect(fetched_user1).toEqual(user1);
    expect(TestMessageReceiver.messages.has('USER_FETCHED'));
    done();
  });
});