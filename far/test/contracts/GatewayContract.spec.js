'use strict';

var Entity = require('../../src/Entities/Entity');

var contract = require('./config');

var entity, gateway;

function expectObjectReferencesToBeDifferent(objectOne, objectTwo) {
  expect(Object.is(objectOne, objectTwo)).toBe(false);
}

describe('Gateway', function () {
  beforeEach(function () {
    entity = Entity.create('Default');
    gateway = new contract.Gateway();
    gateway.save(entity);
  });

  describe('A Saved Entity', function () {
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
  });

  it('another saved entity increments the size by 2', function (done) {
    var entity2 = Entity.create('Default');
    gateway.save(entity2);

    expect(gateway.size()).toEqual(2);
    done();
  });
});

describe('User Gateway', function () {

});

describe('Report Gateway', function () {

});