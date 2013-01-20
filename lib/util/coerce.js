
var RealElement = require('../Real/Element.js');

var coerce = {};

function coerceToRealElement(arg) {
// TODO sistema bene, mancano tutte le casistiche, i test ecc
// poi considera che voglio fare i numei trascendenti, le radici dei polinomi, ecc
// gli potrei passare dei numeri complessi, ecc
  if( typeof arg == 'number' ) {
    return new RealElement(arg);
  }
  else {
    return arg;
  }
};

coerce.toRealElement = coerceToRealElement;

module.exports = coerce;

