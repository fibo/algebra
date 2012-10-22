
var Vector = require('../Vector.js');

var RealVector = function(arg) {
  var self = this;

  Vector.call(self, arg);

  self.x = function (i) {
    return self.getElement(i).num();
  }
}

module.exports = RealVector;

