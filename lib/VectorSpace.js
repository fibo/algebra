
var vector = require('./Vector.js');

var VectorSpace = function(arg) {

  var field = arg.field;
  this.getField = function() { return field; }

  var dim = arg.dim;
  this.getDim = function() { return dim; }

}

VectorSpace.prototype = {

  zero: function() {
    var field = this.getField();
    var dim = this.getDim();
    var elements = [];

    for (var i = 0, i < dim, i++) {
      elements.push(field.getZero());
    }

    var zero = new Vector({
      space: this,
      elements: elements
    });

    return zero;
  }

};

module.exports = VectorSpace;

