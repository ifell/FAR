'use strict';

module.exports = function(messageReceiver, userGateway) {
    return {
      MessageReceiver: messageReceiver,
      InMemoryUserGateway: userGateway
    }
};