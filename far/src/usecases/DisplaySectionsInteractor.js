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

function toLabel(sectionName) {
  if (sectionName.length < 1) return '';
  var formattedForLabel = sectionName[0].toUpperCase();

  for (var i = 1; i < sectionName.length; i++) {
    if (sectionName[i] >= 'A' && sectionName[i] <= 'Z')
      formattedForLabel += ' ';

    formattedForLabel += sectionName[i];
  }

  return formattedForLabel;
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

function render(sections, SchemaTypes, renderModelCallback) {
  for (var s of sections) {
    var schema = {
      username: 'String',
      year: 'Number'
    };

    for (var t of s.body)
      SchemaTypes[t.type].map(schema, t);

    renderModelCallback(toRoute(s.title), schema);
  }
}

module.exports = {
  toRoute: toRoute,
  toLabel: toLabel,
  toMap: toMap,
  toRouteJSON: toRouteJSON,
  render: render
};