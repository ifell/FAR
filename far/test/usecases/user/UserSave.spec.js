'use strict';

var entities = require('../../../src/entities');
var doubles = require('../../doubles');
var _ = require('underscore');

const MessageReceiver = require('../../TestMessageReceiver.js');

var TestMessageReceiver, user1, userGateway;

describe('Unsaved User', function () {
  beforeEach(function () {
    TestMessageReceiver = new MessageReceiver();
    user1 = new entities.User({username: 'ianfell'});
    userGateway = new doubles.InMemoryUserGateway(TestMessageReceiver);
  });

  it('an unsaved user should have an undefined id', function (done) {
    expect(user1.id).toBeUndefined();
    done();
  });

  describe('Saved User', function () {
    beforeEach(function () {
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
  });

  describe('Update User', function () {
    beforeEach(function () {
      userGateway.save(user1);
    });

    it('an update should not change the user id', function (done) {
      var userid = user1.id;

      userGateway.save(user1);

      expect(userid).toEqual(user1.id);
      done();
    });

    it('an update should not add a new user', function (done) {
      userGateway.save(user1);

      expect(userGateway.size()).toEqual(1);
      done();
    });

    it('can update a username to a nonexisting username')

    
  });




  it('two saves on different object should add to the database twice', function (done) {
    var user2 = new entities.User({username: 'cocoafell'});

    userGateway.save(user1);
    userGateway.save(user2);

    expect(userGateway.size()).toEqual(2);
    done();
  });

  it('two users should not have the same username', function (done) {
    var user2 = new entities.User({username: 'ianfell'});

    userGateway.save(user1);
    userGateway.save(user2);

    expect(userGateway.size()).toEqual(1);
    expect(TestMessageReceiver.messages.has('USER_SAVE_ERROR'));
    done();
  });
});