
var Vector = require('../Vector.js');

var RealVector = function(arg) {
  var self = this;

  Vector.call(self, arg);

  self.x = function (i) {
    return self.getElement(i).num();
  }

if (self.getDim() == 3) {
    self.cross = function (vector) {
	    /*
      var a1 = self.x(0);
      var a2 = self.x(1);
      var a3 = self.x(2);

      var b1 = vector.x(0);
      var b2 = vector.x(1);
      var b3 = vector.x(2);

      elements[0] = a2 * b3 - a3 * b2;
      elements[1] = a3 * b1 - a1 * b3;
      elements[2] = a1 * b2 - a2 * b1;
*/
      return self;
    }
  }
}

module.exports = RealVector;

