
var _    = require('underscore');
var util = require('util');

var RealElement      = require('./Element.js');
var RealField        = require('./Field.js');
var RealSquareMatrix = require('./SquareMatrix.js');

var R = new RealField();

function RealInvertibleMatrix(arg) {
  var self = this;

  var _order = arg.order;
  var _elements = [];

  if (_.isArray(arg.elements)) _elements = arg.elements;

  // Matrix defaults to Identity.
  for (var i = 0; i < _order; i++) {
    for (var j = 0; j < _order; j++) {
      var index = i * _order + j;

      var element = _elements[index]; 

      if (_.isUndefined(element)) {
        i == j ? _elements.push(R.getOne()) : _elements.push(R.getZero());
      }
    }
  }

  arg.elements = _elements;
  RealSquareMatrix.call(self, arg);
};

util.inherits(RealInvertibleMatrix, RealSquareMatrix);

module.exports = RealInvertibleMatrix;

