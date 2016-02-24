'use strict';

var entities = require('../../src/entities');

var contract = require('./config');

var collection01, gateway;

describe('Gateway', function () {
  beforeEach(function () {
    gateway = new contract.Gateway();

    collection01 = new entities.User({username: 'ianfell'});
    gateway.save(collection01);
  });

  it('has a defined id', function (done) {
    expect(collection01.getId()).toBeDefined();
    done();
  });

  it('increments the size of the database by one', function (done) {
    expect(gateway.size()).toEqual(1);
    done();
  });

  it('a save should not change the user id', function (done) {
    var userid = collection01.getId();

    gateway.save(collection01);

    expect(userid).toEqual(collection01.getId());
    done();
  });

  it('a save should not add a new user', function (done) {
    gateway.save(collection01);

    expect(gateway.size()).toEqual(1);
    done();
  });

  it('can not update the username before it is saved', function (done) {
    var previousUsername = collection01.username;

    collection01.username = 'anotherusername';
    expect(gateway.getById(collection01.getId()).username).toEqual(previousUsername);
    gateway.save(collection01);

    expect(gateway.getById(collection01.getId()).username).toEqual('anotherusername');
    expect(gateway.size()).toEqual(1);
    done();
  });

  it('can get the user by id', function (done) {
    expect(gateway.getById(collection01.getId())).toEqual(collection01);
    done();
  });

  it('can get a list of users', function (done) {
    var user2 = new entities.User({username: 'cocoafell'});
    gateway.save(user2);

    var users = gateway.get();

    expect(users.length).toEqual(2);
    done();
  });

  it('two saves on different object should add to the database twice', function (done) {
    var user2 = new entities.User({username: 'cocoafell'});

    gateway.save(user2);

    expect(gateway.size()).toEqual(2);
    done();
  });

  it('can get a user from a username', function (done) {
    var fetched_user1 = gateway.getUserByUsername('ianfell');

    expect(fetched_user1).toEqual(collection01);
    done();
  });
});

describe('User Gateway', function() {

});

describe('Report Gateway', function() {

});