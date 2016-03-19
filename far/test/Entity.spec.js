'use strict';

var Entity = require('../src/Entities/Entity');

describe('Entities', function() {
  it ('can not create an unknown entity', function(done) {
    var unknown = function() { Entity.create('ThisTypeDoesNotExist', {}) };

    expect(unknown).toThrowError('Unknown Entity');
    done();
  });

  it ('can create a default entity', function(done) {
    var defaultEntity = Entity.create('Default', {});

    expect(defaultEntity.hasOwnProperty('_id')).toBe(true);
    expect(defaultEntity).toBeDefined();
    done();
  });

  it ('can create a defined entity', function(done) {
    var user = Entity.create('User', {username: 'username'});

    expect(user.hasOwnProperty('_id')).toBe(true);
    expect(user.username).toBeDefined();
    expect(user).toBeDefined();
    done();
  });

  it ('does not initialize fields not present in the entity type', function(done) {
    var user = Entity.create('User', {username: 'username', password: 'password'});

    expect(user.password).toBeUndefined();
    done();
  });

  it ('can create a clone of an entity', function(done) {
    var entity = Entity.create('User', {username: 'username'});

    var cloned_entity = entity.clone();

    expect(Object.is(cloned_entity, entity)).toBe(false);
    expect(entity.getId()).toEqual(cloned_entity.getId());
    expect(entity.username).toEqual(cloned_entity.username);
    done();
  });
});