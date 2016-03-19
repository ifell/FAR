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

module.exports = {
  toRoute: toRoute,
  init: init
};