
var RealField = require('./Field.js');
var R = new RealField();

var VectorSpace = require('../VectorSpace.js');
var RealVector = require('./Vector.js');
var Real = require('./Element.js');

var RealVectorSpace = function(dim) {
  var self = this;

  var arg = {};

  arg.dim = dim;
  arg.field = R;

  VectorSpace.call(self, arg);

  self.Vector = function () {
    var arg = {};
    arg.elements = [];
    arg.space = self;

    for (var i = 0; i < self.getDim(); i++) {
      var num = arguments[i] || 0;
      var element = new Real(num);
      arg.elements.push(element);
    }
    
    RealVector.call(this, arg);
  };
}

RealVectorSpace.prototype = VectorSpace.prototype;

module.exports = RealVectorSpace;

