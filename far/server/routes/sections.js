'use strict';

var express = require('express');
var router = express.Router();

var sections = require('../sections.json');

var PresentLogged = require('../../src/usecases/PresentLogged');

var _ = require('underscore');

var DisplaySectionInteractor = require('../../src/usecases/DisplaySectionsInteractor');
var sectionsMap = DisplaySectionInteractor.init(sections);
DisplaySectionInteractor.build(sections);

router.get('/sections', function (req, res, next) {
  res.render('sections/sections', {
    notifications: req.flash('message'),
    title: 'Faculty Activity Report Generator',
    present: PresentLogged.isLoggedIn(req),
    sections: sections,
    toRoute: DisplaySectionInteractor.toRoute
  });
});

router.get('/sections/:section', function (req, res, next) {
  var renderJSON = {
    notifications: req.flash('message'),
    title: 'Faculty Activity Report Generator',
    present: PresentLogged.isLoggedIn(req),
    sections: sections,
    toRoute: DisplaySectionInteractor.toRoute,
    section: sectionsMap.get(req.params.section),
    type: function (type) {
      return 'body/' + type;
    }
  };

  if (req.user) {
    var DynamicModel = mongoose.model(req.params.section);
    DynamicModel.findOne({username: req.user.username}, function (err, model) {
      if (!model) {
        return res.render('sections/section', _.extend(renderJSON, {model: {}}));
      } else {
        return res.render('sections/section', _.extend(renderJSON, {model: model}));
      }
    });
  } else {
    req.flash('message', 'Please log in...');
    return res.redirect('/login');
  }
});

// build section schema

var mongoose = require('mongoose');

router.post('/sections/:section', function (req, res) {
  if (!req.user) {
    req.flash('message', 'Please log in...');
    return res.redirect('/login');
  } else {
    var DynamicModel = mongoose.model(req.params.section);
    var newModel = new DynamicModel(_.extend(req.body, {username: req.user.username}));
    DynamicModel.findOne({username: req.user.username}, function(err, doc) {
      if (!doc) {
        newModel.save({username: req.user.username}, function (err) {
          if (!err) {
            req.flash('message', 'saved!');
            return res.redirect('/sections/' + req.params.section);
          } else {
            req.flash('message', 'something went wrong...');
            return res.redirect('/sections/' + req.params.section);
          }
        });
      } else {
        for (var key in req.body) {
          if (doc[key] && req.body[key]) {
            doc[key] = req.body[key];
          }
        }
        doc.save();
        req.flash('message', 'saved!');
        return res.redirect('/sections/' + req.params.section);
      }
    });
  }
});

module.exports = router;