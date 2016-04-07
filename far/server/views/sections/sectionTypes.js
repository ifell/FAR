var sectionTypes = {
  checkbox: {
    id: function (currentBody, callback) {
      callback(currentBody.label);
    }
  },
  monthAndYear: {
    id: function (currentBody, callback) {
      callback(currentBody.label);
    }
  },
  number: {
    id: function (currentBody, callback) {
      callback(currentBody.label);
    }
  },
  selectbox: {
    id: function (currentBody, callback) {
      callback(currentBody.label);
    }
  },
  table: {
    id: function (currentBody, callback) {
      for (var r = 0; r < currentBody.titleRow.length; r++) {
        for (var c in currentBody.titleCol) {
          callback(currentBody.titleRow[r] + '-' + currentBody.titleCol[c]);
        }
      }
    }
  },
  text: {
    id: function (currentBody, callback) {
      callback(currentBody.label);
    }
  },
  textarea: {
    id: function (currentBody, callback) {
      callback(currentBody.label);
    }
  }
};