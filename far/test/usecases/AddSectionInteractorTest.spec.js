'use strict';

var AddSectionInteractor = require('../../src/usecases/AddSectionInteractor');
var SetupContext = require('../../test/SetupContext');

describe('Add Section Interactor Tests', function () {
  beforeEach(function () {
    SetupContext();

    this.addSectionInteractor = new AddSectionInteractor();

    this.presenter = {
      present: function (response) {
        this.response = response;
      }
    };

    this.addSectionInteractor.setContractor({
      SECTION_TYPE_ADDED: function (request, response) {
        response.message = 'SECTION_ADDED';
      },
      SECTION_TYPE_FETCHED: function (request, response) {
        response.message = 'SECTION_FETCHED';
      },
      SECTION_TYPE_UNDEFINED: function (request, response) {
        response.message = 'SECTION_UNDEFINED';
      },
      SECTION_VALUE_UPDATED: function (request, response) {
        response.message = 'SECTION_UPDATED';
      }
    });

    this.addSectionInteractor.setPresenter(this.presenter);
  });

  it('can not get an undefined section by title', function (done) {
    this.addSectionInteractor.getSection({title: 'UndefinedSection'});
    expect(this.presenter.response.message).toEqual('SECTION_UNDEFINED');
    done();
  });

  describe('Defined Sections', function () {
    beforeEach(function () {
      this.simpleSection = {
        title: 'SimpleSectionWithTextField',
        body: [
          {
            label: 'uniqueField1',
            type: 'text'
          }
        ]
      };
      this.addSectionInteractor.addSection(this.simpleSection);
    });

    it('can add a section', function (done) {
      expect(this.presenter.response.message).toEqual('SECTION_ADDED');
      done();
    });

    it('should get a section by title', function (done) {
      this.addSectionInteractor.getSection({title: 'SimpleSectionWithTextField'});

      expect(this.presenter.response.message).toEqual('SECTION_FETCHED');
      expect(this.presenter.response.section.title).toEqual(this.simpleSection.title);
      expect(this.presenter.response.section.body).toEqual(this.simpleSection.body);
      done();
    });

    //it('can update the value for a field in a section', function(done) {
    //  var request = {
    //    title: 'SimpleSectionWithTextField',
    //    label: 'uniqueField1',
    //    value: 'Simple String Value'
    //  };
    //
    //  this.addSectionInteractor.setValueFor(request);
    //
    //  expect(this.presenter.response.message).toEqual('SECTION_UPDATED');
    //  done();
    //});
  });
});