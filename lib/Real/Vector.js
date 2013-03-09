
var util = require('util');

var Vector = require('../Vector.js');

function RealVector(arg) {
  var self = this;

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

util.inherits(RealVector, Vector);

module.exports = RealVector;

