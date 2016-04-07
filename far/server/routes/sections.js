'use strict';

var express = require('express');
var router = express.Router();

var sections = require('../sections.json');
var schemaTypes = require('../SchemaTypes');

var PresentLogged = require('../../src/usecases/PresentLogged');

var _ = require('underscore');

var mongoose = require('mongoose');

var DisplaySectionInteractor = require('../../src/usecases/DisplaySectionsInteractor');
var sectionsMap = DisplaySectionInteractor.toMap(sections);
var toRouteJSON = DisplaySectionInteractor.toRouteJSON(sections);

DisplaySectionInteractor.render(sections, schemaTypes, function (name, schema) {
  mongoose.model(name, mongoose.Schema(schema));
});

router.get('/sections/year/:year', function (req, res, next) {
  if (req.user) {
    var entireReport = {};
    var queriesToGo = sections.length;

    for (var s in sections) {
      var sectionName = DisplaySectionInteractor.toRoute(sections[s].title);
      var DynamicModel = mongoose.model(sectionName);
      (function (sn) {
        DynamicModel.findOne({username: req.user.username, year: req.params.year}, function (err, model) {
          if (!model) {
            entireReport[sn] = undefined;
          } else {
            entireReport[sn] = model;
          }
          if (--queriesToGo === 0) {
            return res.jsonp(entireReport);
          }
        });
      }(sectionName))
    }
  } else {
    req.flash('message', 'Please log in...');
    return res.redirect('/login');
  }
});

router.get('/sections/:section', function (req, res, next) {
  if (req.user) {
    var DynamicModel = mongoose.model(req.params.section);
    DynamicModel.find({username: req.user.username}, function (err, models) {
      res.jsonp(models);
    }).sort({year: -1});
  } else {
    req.flash('message', 'Please log in...');
    return res.redirect('/login');
  }
});

router.get('/d/sections/:section/year/:year', function (req, res, next) {
  if (req.user) {
    var DynamicModel = mongoose.model(req.params.section);
    DynamicModel.findOne({username: req.user.username, year: req.params.year}, function (err, model) {
      return res.jsonp(model);
    }).sort({year: -1});
  } else {
    req.flash('message', 'Please log in...');
    return res.redirect('/login');
  }
});

router.get('/sections/:section/year/:year', function (req, res, next) {
  var renderJSON = {
    title: 'Faculty Activity Report Generator',
    notifications: req.flash('message'),
    present: PresentLogged.isLoggedIn(req),
    sections: sections,
    s_sections: JSON.stringify(toRouteJSON),
    toRoute: DisplaySectionInteractor.toRoute,
    section: sectionsMap.get(req.params.section),
    disablePrevious: sectionsMap.get(req.params.section).disablePrevious,
    getYear: req.params.year || (new Date).getFullYear(),
    getSection: req.params.section,
    getSectionToRoute: JSON.stringify(DisplaySectionInteractor.toRoute(req.params.section)),
    type: function (type) {
      return 'body/' + type;
    }
  };

  if (req.user) {
    var DynamicModel = mongoose.model(req.params.section);
    DynamicModel.findOne({username: req.user.username, year: req.params.year}, function (err, model) {
      if (!model) {
        return res.render('sections/section', _.extend(renderJSON, {model: {}}));
      } else {
        return res.render('sections/section', _.extend(renderJSON, {
          model: model || {}
        }));
      }
    }).sort({year: -1});
  } else {
    req.flash('message', 'Please log in...');
    return res.redirect('/login');
  }
});

router.post('/sections/:section/year/:year', function (req, res) {
  if (!req.user) {
    req.flash('message', 'Please log in...');
    return res.redirect('/login');
  } else {
    var model = {
      username: req.user.username,
      year: req.params.year
    };

    var sectionDataFormat = sectionsMap.get(req.params.section).body;

    for (var i in sectionDataFormat) {
      var field = sectionDataFormat[i];
      schemaTypes[field.type].htmlToSchemaType(model, field, req.body);
    }

    var DynamicModel = mongoose.model(req.params.section);
    var newModel = new DynamicModel(model);
    DynamicModel.findOne({username: req.user.username, year: req.params.year}, function (err, doc) {
      if (!doc) {
        newModel.save({username: req.user.username, year: req.params.year}, function (err) {
          if (!err) {
            req.flash('message', 'saved!');
            return res.redirect('/sections/' + req.params.section + '/year/' + req.params.year);
          } else {
            req.flash('message', 'something went wrong...');
            return res.redirect('/sections/' + req.params.section + '/year/' + req.params.year);
          }
        });
      } else {
        for (var key in model) {
          doc[key] = model[key];
        }
        doc.save(function (err) {
          if (err) {
            req.flash('message', 'something went wrong...');
            return res.redirect('/sections/' + req.params.section + '/year/' + req.params.year);
          } else {
            req.flash('message', 'saved!');
            return res.redirect('/sections/' + req.params.section + '/year/' + req.params.year);
          }
        });
      }
    });
  }
});

router.post('/sections/:section/setYear', function (req, res) {
  var section = req.params.section;
  return res.redirect('/sections/' + section + '/year/' + req.body.year);
});

module.exports = router;