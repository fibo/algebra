
var util = require('util');

var abstractMethod = require('./util/abstractMethod.js');

var Element = require('../Element.js');

function Tensor() {
  var self = this;

//-----------------------------------------------------------------------------

// TODO gli elementi possono rimanere astratti
// anzi il tensore può essere anche vuoto
// ma gli indici sono importanti, lo definiscono

  var _indices = [];

// TODO un Element può essere coerced a Tensore con indices = [0]
// quindi avrei element, vector e matrix che ereditano da tensor
// e posso fare le operazioni tra tensori

// TODO inizio con indices = [1, 2], ma poi per fare i covarianti e controvarianti dovrò fare indic alti e bassi, quindi [[1, 2], [0, 2, 2]]

};

Tensor.prototype.getElements = abstractMethod;

//-----------------------------------------------------------------------------

module.exports = Tensor;

