
var util = require('util');

var Field = require('../Field.js');
var Real = require('./Element.js');

var RealField = function() {
  var self = this;
}

util.inherits(RealField, Field);

RealField.prototype.coerceToElement = function (arg) {
// TODO sistema bene, mancano tutte le casistiche, i test ecc
// poi considera che voglio fare i numei trascendenti, le radici dei polinomi, ecc
// gli potrei passare dei numeri complessi, ecc
  if( typeof arg == 'number' ) {
    return new Real(arg);
  }
  else {
    return arg;
  }
}

RealField.prototype.getZero = function () { return new Real(0); }

RealField.prototype.getOne = function () { return new Real(1); }

module.exports = RealField;

