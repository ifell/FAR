'use strict';

var DisplaySectionsInteractor = require('../../src/usecases/DisplaySectionsInteractor');

describe('Display Sections Interactor', function () {
  describe('toRoute', function () {
    var toRoute = DisplaySectionsInteractor.toRoute;
    it('format', function (done) {
      expect(toRoute('')).toEqual('');
      expect(toRoute('Name')).toEqual('name');
      expect(toRoute('camelCaseName')).toEqual('camelCaseName');
      expect(toRoute('Remove space')).toEqual('removeSpace');
      expect(toRoute('This Is A Very Long String')).toEqual('thisIsAVeryLongString');
      done();
    });
  });
});