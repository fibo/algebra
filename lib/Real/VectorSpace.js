
var RealElement = require('./Element.js');
var RealField = require('./Field.js');
var RealVector  = require('./Vector.js');
var VectorSpace = require('../VectorSpace.js');

var R = new RealField();

function RealVectorSpace(dim) {
  var self = this;

  var arg = {};

  arg.dim = dim;
  arg.field = R;

  VectorSpace.call(self, arg);

  self.Vector = function Vector() {
    var arg = {};
    arg.elements = [];
    arg.space = self;

    for (var i = 0; i < self.getDim(); i++) {
      var num = arguments[i] || 0;
      var element = new RealElement(num);
      arg.elements.push(element);
    }
    
    RealVector.call(this, arg);
  };
}

RealVectorSpace.prototype = VectorSpace.prototype;

module.exports = RealVectorSpace;

