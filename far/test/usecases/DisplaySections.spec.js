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
      expect(toRoute('Teaching, Advising And/Or Instructional Accomplishments')).toEqual(
        'teachingAdvisingAndOrInstructionalAccomplishments'
      );
      done();
    });
  });

  //describe('toLabel', function() {
  //  var toLabel = DisplaySectionsInteractor.toLabel;
  //  it ('format', function (done) {
  //    expect(toLabel('')).toEqual('');
  //    expect(toLabel('name')).toEqual('Name');
  //    expect(toLabel('addSpaceAfterCapitals')).toEqual('Add Space After Capitals');
  //    expect(toLabel('teachingAdvisingAndOrInstructionalAccomplishments')).toEqual(
  //      'Teaching, Advising And/Or Instructional Accomplishments'
  //    );
  //
  //    done();
  //  });
  //});

  //describe('render', function() {
  //  var simpleSection = [{
  //    title: 'SimpleSection01',
  //    body: [{
  //      label: 'SimpleLabel01',
  //      type: 'SimpleType'
  //    },{
  //      label: 'SimpleLabel02',
  //      type: 'SimpleType'
  //    }]
  //  }, {
  //    title: 'SimpleSection02',
  //    body: [{
  //      label: 'SimpleLabel01',
  //      type: 'SimpleType'
  //    },{
  //      label: 'SimpleLabel02',
  //      type: 'SimpleType'
  //    }]
  //  }];
  //
  //  var type = {
  //    SimpleType: {
  //      map: function(schema, label) {
  //        schema[label] = 'SimpleSchemaType';
  //      }
  //    }
  //  };
  //
  //  it ('can render a simple section', function(done) {
  //    DisplaySectionsInteractor.render(simpleSection, type, function(name, schema) {
  //      expect(schema.username).toEqual('String');
  //      expect(schema.SimpleLabel01).toEqual('SimpleSchemaType');
  //      expect(schema.SimpleLabel02).toEqual('SimpleSchemaType');
  //      done();
  //    });
  //  });
  //});
});