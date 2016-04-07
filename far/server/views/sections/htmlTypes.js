var htmlTypes = {
  text: {
    setDataFromModel: function (element, key, data) {
      element.value = data;
    },
    setDataFromElement: function (lElement, rElement) {
      lElement.value = rElement.value;
    }
  },
  checkbox: {
    setDataFromModel: function (element, key, data) {
      element.checked = data;
    },
    setDataFromElement: function (lElement, rElement) {
      lElement.checked = rElement.checked;
    }
  },
  'select-one': {
    setDataFromModel: function (element, key, data) {
      element.value = data;
    },
    setDataFromElement: function (lElement, rElement) {
      lElement.value = rElement.value;
    }
  },
  month: {
    setDataFromModel: function (element, key, data) {
      element.value = data;
    },
    setDataFromElement: function (lElement, rElement) {
      lElement.value = rElement.value;
    }
  },
  number: {
    setDataFromModel: function (element, key, data) {
      element.value = data;
    },
    setDataFromElement: function (lElement, rElement) {
      lElement.value = rElement.value;
    }
  },
  textarea: {
    setDataFromModel: function (element, key, data) {
      CKEDITOR.instances[key + '~prev'].setData(data);
    },
    setDataFromElement: function (lElement, rElement) {
      CKEDITOR.instances[lElement.id].setData(
        CKEDITOR.instances[rElement.id].getData()
      );
    }
  }
};