
var util = require('util');

var MatrixRing   = require('../MatrixRing.js');
var RealField    = require('./Field.js');
var Real         = require('./Element.js');
var SquareMatrix = require('../Matrix.js');

var R = new RealField();

var RealMatrixRing = function(order) {
  var self = this;

  var arg = {};
  arg.order = order;
  arg.field = R;

  MatrixRing.call(self, arg);

  self.Matrix = function () {
    var arg = {};
    arg.elements = [];
    arg.field = self.getField();
    var o = arg.order = self.getOrder();

    // Matrix defaults to big Id.
    for (var i = 0; i < o; i++) {
      for (var j = 0; j < o; j++) {
        var _default = 0;
        if (i == j) _default = 1;
        var num = arguments[i*o+j] || _default;
        var element = new Real(num);
        arg.elements.push(element);
      }
    }
    
    SquareMatrix.call(this, arg);
  };

  self.Id = self.Matrix;

};

util.inherits(RealMatrixRing, MatrixRing);

module.exports = RealMatrixRing;

