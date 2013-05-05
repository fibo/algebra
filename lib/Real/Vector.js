
var coerce      = require('../util/coerce.js')
  , RealElement = require('./Element.js')
  , Vector      = require('../Vector.js')
  , util        = require('util')

function RealVector () {
  var self         = this
    , elements     = coerce.argumentsToArray.apply(arguments)
    , realElements = []

  for(var i in elements) {
    // TODO sarebbe da mettere in un try
    var element = new RealElement(elements[i])
    realElements.push(element)
  }

  Vector.call(self, realElements)

  // TODO si può  già spostare in Vector.js
  function getCoordinate (i) {
    return self.getElement(i).getData()
  }
  self.getCoordinate = getCoordinate
  self.x             = getCoordinate

  // TODO si può  già spostare in Vector.js
  function getCoordinates () {
    var coordinates = []

    for (var i in self.getElements()) {
      coordinates.push(self.getElement(i).getData());
    }

    return coordinates
  }
  self.getCoordinates = getCoordinates
}

util.inherits(RealVector, Vector)

module.exports = RealVector

