# FAR
Documentation
There are several configuration files throughout the directory of the application. There are 3 located in the /server directory labeled "ValidatorTypes.js" "sections.json" and "SchemaTypes.js". The sections.json configuration file specifies the fields that are present in the report. An example is given below...
``` json
[
  {
    "title": "Name",
    "body": [
      {
        "label": "first",
        "type": "text"
      },
      {
        "label": "middle",
        "type": "text"
      },
      {
        "label": "last",
        "type": "text"
      }
    ]
  }
]
```
The SchemaTypes.js specifies the mapping to the MongoDB model and the view's bodyparser to the MongoDB model.

``` javascript
module.exports = {
  text: {
    map: function(schema, t) {
      schema[t.label] = 'String';
    },
    htmlToSchemaType: function(model, field, body) {
      model[field.label] = body[field.label];
    }
  }
};
```

The ValidatorTypes.js signifies any required fields that must be completed as well as any validation logic that the user input must pass in order to be saved to the database. 

```  javascript
module.exports = {
  sum: {
    get: function (t) {
      return function (self, callback) {
        for (var col in t.titleCol) {
          var sum = 0;
          var message = '';
          for (var row in t.titleRow) {
            var entry = t.titleRow[row] + '-' + t.titleCol[col];
            message += entry + ', ';
            sum += self[entry];
          }
          message += 'did not add up to 100.';
          if (sum !== 100) return callback(message);
        }
        return callback();
      }
    }
  }
};
```

Whenever a new type is added, it must also be specified on the client side as well. There are two configuration files for that in the views directory "sectionTypes.js" and "htmlTypes.js"

The sectionTypes.js specifies the types id that is passed to the html element.
``` javascript
var sectionTypes = {
  text: {
    id: function (currentBody, callback) {
      callback(currentBody.label);
    }
  }
};
```

The htmlTypes.js specifies the transformation from one html div section to the next.
``` javascript
var htmlTypes = {
  text: {
    setDataFromModel: function (element, key, data) {
      element.value = data;
    },
    setDataFromElement: function (lElement, rElement) {
      lElement.value = rElement.value;
    }
  }
};
```

LaTeX templates are stored in the /latex directory.
