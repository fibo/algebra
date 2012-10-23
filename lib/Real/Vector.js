
var util = require('util');

var Vector = require('../Vector.js');

var RealVector = function(arg) {
  var self = this;

  Vector.call(self, arg);

  self.x = function (i) {
    return self.getElement(i).num();
  }

  self.getCoordinates = function () {
    var coordinates = [];

    for (var i in self.getElements()) {
      coordinates.push(self.getElement(i).num());
    }

    return coordinates;
  }
}

util.inherits(RealVector, Vector);

module.exports = RealVector;

