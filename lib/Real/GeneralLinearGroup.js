
var util = require('util');

var algorithm        = require('../util/algorithm.js');
var coerce           = require('../util/coerce.js');
var RealField        = require('./Field.js');
var RealSquareMatrix = require('./SquareMatrix.js');

var determinant = algorithm.determinant;

var R = new RealField();

function RealGeneralLinearGroup(order) {
  var self = this;

//-----------------------------------------------------------------------------

  var _order = order;

  function getOrder() { return _order; }

  self.getOrder = getOrder;

//-----------------------------------------------------------------------------

  function Matrix() {

    //TODO coerce arguments to collection
    var argumentsAreValid = (arguments.length == _order * _order);
	   // TODO || (arguments.length == 1 && typeof arguments[0] == 'array')

    /*
     * TODO defaults to Identity
     if(arguments.length==0){
    for (var i = 0; i < _order; i++) {
      for (var j = 0; j < _order; j++) {
        i == j ? elements.push(R.getOne()) : elements.push(R.getZero());
      }
    }
    }

    */

    if (!argumentsAreValid) {
      throw new Error();
    }

    var arg = {};

    var elements = [];

    // TODO per ora faccio la coerce a real element,
    // dovrebbbe farlo determinant, ma allora deve sapere su quale Ring
    for (var i in arguments) {
      var element = coerce.toRealElement(arguments[i]);

      elements.push(element);
    }

    if (determinant(_order, elements).isZero()) {
      throw new Error();
    }

    var arg = {
      elements: elements,
      order: _order
    };

    RealSquareMatrix.call(this, arg);
  };

  util.inherits(Matrix, RealSquareMatrix);

  self.Matrix = Matrix;

//-----------------------------------------------------------------------------

  function Identity() {
	  //TODO aggiusta
    return new Matrix()
  };

  self.Id       = Identity;

  self.Identity = Identity;

//-----------------------------------------------------------------------------

};

module.exports = RealGeneralLinearGroup;

