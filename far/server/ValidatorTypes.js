'use strict';

module.exports = {
  sum: {
    get: function (t) {
      return function (self, callback) {
        for (var col in t.titleCol) {
          var sum = 0;
          var message = '';
          for (var row in t.titleRow) {
            var entry = t.titleRow[row] + '-' + t.titleCol[col];
            message += entry + ', ';
            sum += self[entry];
          }
          message += 'did not add up to 100.';
          if (sum !== 100) return callback(message);
        }
        return callback();
      }
    }
  }
};