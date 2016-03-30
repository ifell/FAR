'use strict';

function toRoute(sectionName) {
  if (sectionName.length < 1) return '';
  var formattedForRoute = sectionName[0].toLowerCase();

  for (var i = 1; i < sectionName.length; i++) {
    if (sectionName[i] === ' ') {
      formattedForRoute += sectionName[i + 1].toUpperCase();
      i += 1;
    } else {
      formattedForRoute += sectionName[i];
    }
  }

  return formattedForRoute;
}

function init(sections) {
  var map = new Map();

  for (var s of sections) {
    map.set(toRoute(s.title), s);
  }

  return map;
}

var mongoose = require('mongoose');

function build(sections) {
  for (var s of sections) {
    var schema = {
      username: 'String'
    };
    for (var t of s.body) {
      if (t.type === 'text') {
        schema[t.label] = 'String';
      }
    }
    mongoose.model(toRoute(s.title), mongoose.Schema(schema));
  }
}

module.exports = {
  toRoute: toRoute,
  init: init,
  build: build
};