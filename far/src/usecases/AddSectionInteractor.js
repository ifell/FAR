'use strict';

var Entity = require('../Entities/Entity');
var Context = require('../Context');

class AddSectionInteractor {
  constructor() {
  }

  setPresenter(presenter) {
    this._presenter = presenter;
  }

  setContractor(contractor) {
    this._contractor = contractor;
  }

  setContext(context) {
    Context = context;
  }

  addSection(request) {
    var response = {};
    var self = this;

    var newSection = Entity.create('Section', request);
    Context.sectionGateway.asyncSave(newSection, function() {
      self._contractor.SECTION_TYPE_ADDED(request, response);
      self._presenter.present(response);
    });
  }

  getSection(request) {
    var response = {};
    var self = this;

    Context.sectionGateway.getSectionByTitle(request.title, function (section) {
      if (!section) {
        self._contractor.SECTION_TYPE_UNDEFINED(request, response);
      } else {
        response.section = section;
        self._contractor.SECTION_TYPE_FETCHED(request, response);
      }

      self._presenter.present(response);
    });
  }

  setValueFor(request) {
    var response = {};
    var self = this;

    Context.sectionGateway.getSectionByTitle(request.title, function (section) {
      if (!section) {
        self._contractor.SECTION_TYPE_UNDEFINED(request, response);
      } else {
        section.body.forEach(function(field) {
          if (field.label === request.label) {
            // save
            var newSection = Entity.create(section.title, request.value)
          }
        });
      }
      self._presenter.present(response);
    });
  }
}

module.exports = AddSectionInteractor;