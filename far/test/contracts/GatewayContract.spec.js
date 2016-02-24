'use strict';

var Entity = require('../../src/Entity');

var contract = require('./config');

var entity, gateway;

function expectObjectReferencesToBeDifferent(objectOne, objectTwo) {
  expect(Object.is(objectOne, objectTwo)).toBe(false);
}

describe('Gateway', function () {
  beforeEach(function () {
    entity = Entity.create('Default');
    gateway = new contract.Gateway();
  });

  describe('A Saved Entity', function () {
    beforeEach(function () {
      gateway.save(entity);
    });

    it('is a clone of the original entity', function (done) {
      expectObjectReferencesToBeDifferent(Object.is(gateway._collection.get(entity.getId()), entity));
      done();
    });

    it('has a defined id', function (done) {
      expect(entity.getId()).toBeDefined();
      done();
    });

    it('increments the size of the gateway by one', function (done) {
      expect(gateway.size()).toEqual(1);
      done();
    });

    it('can get a clone of the user by id', function (done) {
      var retrievedEntity = gateway.getById(entity.getId());
      var anotherRetrievedEntity = gateway.getById(entity.getId());

      expectObjectReferencesToBeDifferent(retrievedEntity, anotherRetrievedEntity);
      done();
    });

    it('another save (i.e. an Update) should not change the user id or add a new user', function (done) {
      var userid = entity.getId();

      gateway.save(entity);

      expect(userid).toEqual(entity.getId());
      expect(gateway.size()).toEqual(1);
      done();
    });

    //it('can not update an entity until that change is re-saved', function (done) {
    //  entity.setId('A');
    //  gateway.save(entity);
    //  expect(gateway.getById(entity.getId()).username).toEqual('username');
    //
    //  //entity.username = 'anotherusername';
    //  //expect(gateway.getById(entity.getId()).username).toEqual('username');
    //  //gateway.save(entity);
    //  //
    //  //expect(gateway.getById(entity.getId()).username).toEqual('anotherusername');
    //  //expect(gateway.size()).toEqual(1);
    //  done();
    //});
  });



  //
  //it('can get a list of users', function (done) {
  //  var user2 = new entities.User({username: 'cocoafell'});
  //  gateway.save(user2);
  //
  //  var users = gateway.get();
  //
  //  expect(users.length).toEqual(2);
  //  done();
  //});
  //
  //it('two saves on different object should add to the database twice', function (done) {
  //  var user2 = new entities.User({username: 'cocoafell'});
  //
  //  gateway.save(user2);
  //
  //  expect(gateway.size()).toEqual(2);
  //  done();
  //});
  //
  //it('can get a user from a username', function (done) {
  //  var fetched_user1 = gateway.getUserByUsername('ianfell');
  //
  //  expect(fetched_user1).toEqual(collection01);
  //  done();
  //});

});

describe('User Gateway', function () {

});

describe('Report Gateway', function () {

});