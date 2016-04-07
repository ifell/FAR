'use strict';

function toRoute(sectionName) {
  if (sectionName.length < 1) return '';
  var formattedForRoute = sectionName[0].toLowerCase();

  for (var i = 1; i < sectionName.length; i++) {
    if (sectionName[i] === ' ' || sectionName[i] === '/' || sectionName[i] === ',') {
      if (sectionName[i+1] !== ' ' && sectionName[i+1] !== '/' && sectionName[i+1] !== ',') {
        formattedForRoute += sectionName[i + 1].toUpperCase();
        i += 1;
      }
    } else {
      formattedForRoute += sectionName[i];
    }
  }

  return formattedForRoute;
}

function toMap(sections) {
  var map = new Map();

  for (var s of sections)
    map.set(toRoute(s.title), s);

  return map;
}

function toRouteJSON(sections) {
  var json = {};

  for (var s of sections)
    json[toRoute(s.title)] = s;

  return json;
}

function render(sections, SchemaTypes, ValidatorTypes, renderModelCallback) {
  for (var s of sections) {
    var schema = {
      username: 'String',
      year: 'Number'
    };

    var validators = {};

    for (var t of s.body) {
      SchemaTypes[t.type].map(schema, t);
      if (t.validators) {
        for (var v of t.validators) {
          validators[v.type] = ValidatorTypes[v.type].get(t);
        }
      }
    }

    renderModelCallback(toRoute(s.title), schema, validators);
  }
}

module.exports = {
  toRoute: toRoute,
  toMap: toMap,
  toRouteJSON: toRouteJSON,
  render: render
};