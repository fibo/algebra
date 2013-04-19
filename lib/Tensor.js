

var abstractMethod = require('./util/abstractMethod.js')
  , is             = require('./util/is.js')
  , util           = require('util')

function Tensor () {
  var self = this
    , arg = arguments[0] || {}
    , _indices = [0]

  function getIndices () { return _indices }
  self.getIndices = getIndices

  function setIndices () {
    var arg = arguments[0]

    if (is.array(arg))
      _indices = arg
  }
  setIndices(arg.indices)
}

//-----------------------------------------------------------------------------

// TODO addition e subtraction si può fare solo tra tensori con indici uguali
// quindi per gli elementi è sempre possibile, per i vettori e le matrici bisogna fare il controllo sugli indici
Tensor.prototype.addition       = abstractMethod
Tensor.prototype.equals         = abstractMethod
Tensor.prototype.clone          = abstractMethod
Tensor.prototype.getElements    = abstractMethod
Tensor.prototype.inversion      = abstractMethod
Tensor.prototype.multiplication = abstractMethod
Tensor.prototype.negation       = abstractMethod
Tensor.prototype.notEquals      = abstractMethod
Tensor.prototype.subtraction    = abstractMethod

module.exports = Tensor

