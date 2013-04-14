
var util = require('util');

var abstractMethod = require('./util/abstractMethod.js');

function Tensor () {
  var self = this;

  var arg = arguments[0] || {};

//-----------------------------------------------------------------------------

// TODO gli elementi possono rimanere astratti
// anzi il tensore può essere anche vuoto
// ma gli indici sono importanti, lo definiscono

  var _indices = arg.indices || [0];

// TODO un Element può essere coerced a Tensore con indices = [0]
// quindi avrei element, vector e matrix che ereditano da tensor
// e posso fare le operazioni tra tensori

// TODO inizio con indices = [1, 2], ma poi per fare i covarianti e controvarianti dovrò fare indic alti e bassi, quindi [[1, 2], [0, 2, 2]]

//-----------------------------------------------------------------------------

  self.addition = abstractMethod;

  self.getElements = abstractMethod;

  self.subtraction = abstractMethod;

};


//-----------------------------------------------------------------------------

module.exports = Tensor;

