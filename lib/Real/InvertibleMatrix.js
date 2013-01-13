
var util = require('util');

var RealSquareMatrix = require('./SquareMatrix.js');

function RealInvertibleMatrix(arg) {
  var self = this;

  var _order = arg.order;

/* TODO 
// TODO oppure gli elementi che non vengono passati cosa diventano? zero, uno ... vedi
                      la cosa migliore sarebbe sempre riempire di zeri tranne che nella diagonale.

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
   */ 
};

util.inherits(RealInvertibleMatrix, RealSquareMatrix);

module.exports = RealInvertibleMatrix;

