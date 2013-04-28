
var util = require('util');

var RealElement = require('./Element.js');
var Vector      = require('../Vector.js');

function RealVector() {
  var self = this;


  var arg = arguments[0];

  var elements = [];
  for(var i in arg.elements) {
    // TODO sarebbe da mettere in un try
    var element = new RealElement(arg.elements[i]);
    elements.push(element);
  }

  arg.elements = elements;

  Vector.call(self, arg);


  function getCoordinate(i) {
    return self.getElement(i).num();
  };

  self.getCoordinate = getCoordinate;
  self.x             = getCoordinate;


  function getCoordinates() {
    var coordinates = [];

    for (var i in self.getElements()) {
      coordinates.push(self.getElement(i).num());
    }

    return coordinates;
  };

  self.getCoordinates = getCoordinates;

};

util.inherits(RealVector, Vector);

module.exports = RealVector;

