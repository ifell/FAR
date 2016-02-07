'use strict';

var entities = require('../../../src/entities');
var doubles = require('../../doubles');

describe('user', function() {
  it ('a saved user should have a defined id', function(done) {
    var userGateway, user;

    userGateway = new doubles.InMemoryUserGateway();
    user = new entities.User({username: 'ianfell'});

    expect(user.id).toBeUndefined();

    userGateway.save(user);
    expect(user.id).toBeDefined();

    expect(userGateway.getUsers()[user.id]).toEqual(user)

    done();
  });

  it ('should save correctly', function(done) {
    var userGateway, user;

    userGateway = new doubles.InMemoryUserGateway();
    user = new entities.User({username: 'ianfell'});

    userGateway.save(user);

    user.username = 'cocoafell';

    expect(userGateway.getUsers()[user.id].username).not.toEqual(user.username);

    done();
  });

});