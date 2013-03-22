
var util = require('util');

var Vector = require('../Vector.js');

var coerce = require('../util/coerce.js');

function RealVector(arg) {
  var self = this;

//-----------------------------------------------------------------------------

  // Coerce elements to RealElement.
  var elements = [];
  for(var i in arg.elements) {
    var element = arg.elements[i];
    elements.push(coerce.toRealElement(element));
  }
  arg.elements = elements;

  Vector.call(self, arg);

//-----------------------------------------------------------------------------

  function getCoordinate(i) {
    return self.getElement(i).num();
  };

  self.getCoordinate = getCoordinate;
  self.x             = getCoordinate;

//-----------------------------------------------------------------------------

  function getCoordinates() {
    var coordinates = [];

    for (var i in self.getElements()) {
      coordinates.push(self.getElement(i).num());
    }

    return coordinates;
  };

  self.getCoordinates = getCoordinates;

//-----------------------------------------------------------------------------

};

//-----------------------------------------------------------------------------

util.inherits(RealVector, Vector);

//-----------------------------------------------------------------------------

module.exports = RealVector;

