'use strict';

var express = require('express');
var router = express.Router();

var sections = require('../sections.json');
var schemaTypes = require('../SchemaTypes');
var validatorTypes = require('../ValidatorTypes');

var PresentLogged = require('../../src/usecases/PresentLogged');

var _ = require('underscore');

var mongoose = require('mongoose');

var DisplaySectionInteractor = require('../../src/usecases/DisplaySectionsInteractor');
var sectionsMap = DisplaySectionInteractor.toMap(sections);
var toRouteJSON = DisplaySectionInteractor.toRouteJSON(sections);

DisplaySectionInteractor.render(sections, schemaTypes, validatorTypes, function (name, schema, validators) {
  var section = mongoose.Schema(schema);

  for (var v in validators) {
    section.pre('save', function (next) {
      validators[v](this, function (message) {
        if (message) next(new Error(message));
        else next();
      });
    });
  }

  mongoose.model(name, section);
});

var phantom = require('phantom');

function generatePdfFromHtml(html, path, done) {
  phantom.create().then(function (ph) {
    ph.createPage().then(function (page) {
      page.property('viewportSize', {width: 800, height: 600}).then(function () {
        page.property('content', html).then(function () {
          page.render(path, {
            format: 'pdf',
            quality: '100'
          }).then(function (wasGenerated) {
            console.log(wasGenerated);
            page.close();
            ph.exit();
            done();
          });
        });
      });
    });
  });
}

var swig = require('swig');

function buildSectionBody(title, section, username, result) {
  if (section && section.year && (title === 'affiliateAppointments' || title === 'teachingAdvisingAndOrInstructionalAccomplishments')) {
    var path = __dirname + '/tmp/' + username + section.year + title + '.pdf';
    generatePdfFromHtml(section.text, path, function() {
      return swig.renderFile(__dirname + '/latex/' + title + '.tex', {path: path}, result);
    });
  } else if (section && (title === 'assignedActivity' || title === 'teachingEvaluations')) {
    return swig.renderFile(__dirname + '/latex/' + title + '.tex', {s:section}, result);
  } else if (section) {
    return swig.renderFile(__dirname + '/latex/' + title + '.tex', section, result);
  } else {
    return swig.renderFile(__dirname + '/latex/notFinished.tex', {}, result);
  }
}

function buildSections(entireReport, username, callback) {
  var obj = {};
  var queriesToGo = Object.keys(entireReport).length;

  for (var title in entireReport) {
    (function(title) {
      buildSectionBody(
        DisplaySectionInteractor.toRoute(title),
        entireReport[title],
        username, function (err, result) {
          swig.renderFile(__dirname + '/latex/title.tex', {
            title: title, body: result
          }, function(err, result) {
            obj[DisplaySectionInteractor.toRoute(title)] = result;
            if (--queriesToGo === 0) {
              callback(obj);
            }
          });
        }
      );
    }(title));
  }
}

function renderLatex(year, username, entireReport, callback) {
  buildSections(entireReport, username, function(result) {
    var orderedResult = '';
    var keyItr = sectionsMap.keys();
    for (var k of keyItr) {
      orderedResult += result[k];
    }
    swig.renderFile(__dirname + '/latex/main.tex', {
      year: year,
      body: orderedResult
    }, function (err, output) {
      callback(output);
    });
  });
}

router.get('/downloadreport/year/:year', function (req, res, next) {
  console.log('downloading ' + req.params.year);

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
            // generate report with entireReport data
            renderLatex(req.params.year, req.user.username, entireReport, function (output) {
              var pdf = [];

              var s_pdf = require('latex')([
                output
              ]);

              s_pdf.on('data', (chunk) => {
                pdf.push(chunk);
              });

              var filename = req.params.year + req.user.username + 'report';

              s_pdf.on('end', () => {
                pdf = Buffer.concat(pdf);

                res.writeHead(200, {
                  'Content-Type': 'application/pdf',
                  'Content-Disposition': 'attachment; filename=' + filename,
                  'Content-Length': pdf.length
                });

                res.end(pdf);
              });
            });
          }
        });
      }(sections[s].title))
    }
  } else {
    req.flash('message', 'Please log in...');
    return res.redirect('/login');
  }
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
    body: function (type) {
      return 'body/' + type;
    },
    validators: function (type) {
      return 'validators/' + type;
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
            req.flash('message', err.message);
            return res.redirect('/sections/' + req.params.section + '/year/' + req.params.year);
          }
        });
      } else {
        for (var key in model) {
          doc[key] = model[key];
        }
        doc.save(function (err) {
          if (err) {
            req.flash('message', err.message);
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