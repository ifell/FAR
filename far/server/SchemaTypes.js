'use strict';

var escapeHtml = require('escape-html');

module.exports = {
  text: {
    map: function(schema, t) {
      schema[t.label] = 'String';
    },
    htmlToSchemaType: function(model, field, body) {
      model[field.label] = escapeHtml(body[field.label]);
    }
  },
  textarea: {
    map: function(schema, t) {
      schema[t.label] = 'String';
    },
    htmlToSchemaType: function(model, field, body) {
      model[field.label] = escapeHtml(body[field.label]);
    }
  },
  checkbox: {
    map: function(schema, t) {
      schema[t.label] = 'Boolean';
    },
    htmlToSchemaType: function(model, field, body) {
      model[field.label] = escapeHtml(body[field.label]) === 'on';
    }
  },
  selectbox: {
    map: function(schema, t) {
      schema[t.label] = 'String';
    },
    htmlToSchemaType: function(model, field, body) {
      model[field.label] = escapeHtml(body[field.label]);
    }
  },
  monthAndYear: {
    map: function(schema, t) {
      schema[t.label] = 'String';
    },
    htmlToSchemaType: function(model, field, body) {
      model[field.label] = escapeHtml(body[field.label]);
    }
  },
  table: {
    map: function(schema, field) {
      for (var row=0; row<field.titleRow.length -1; row++)
        for (var col in field.titleCol)
          schema[field.titleRow[row] + '-' + field.titleCol[col]] = 'Number';
    },
    htmlToSchemaType: function(model, field, body) {
      for (var row=0; row<field.titleRow.length -1; row++)
        for (var col in field.titleCol)
          model[field.titleRow[row] + '-' + field.titleCol[col]] =
            escapeHtml(body[field.titleRow[row] + '-' + field.titleCol[col]]);
    }
  }
};