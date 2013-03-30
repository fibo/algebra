
var RealElement = require('../Real/Element.js');

var coerce = {};

//-----------------------------------------------------------------------------

function coerceToNumber() {
  
};

//-----------------------------------------------------------------------------

// TODO sistema bene, mancano tutte le casistiche, i test ecc
// poi considera che voglio fare i numei trascendenti, le radici dei polinomi, ecc
// gli potrei passare dei numeri complessi, ecc
function coerceToRealElement(arg) {

  // TODO questo pezzo dovrebbe essere a fattor comune di tutti i coerce, cioè
  //      coercePippo, deve sapere qual è la sua classe, e se arg instanceof Pippo deve
  //      ritornare arg.
  //                       Alla fine valuta cosa è più semplice da fare, se un copia e incolla fatto bene 

//                         con tanto di documentazione in Conventions.md oppure qualcosa di più astratto.
  if (arg instanceof RealElement) {
    return arg;
  }

  if (typeof arg == 'number') {
    return new RealElement(arg);
  }
  else {
// Questo else non mi piace molto
    //return arg;
    return new RealElement(0);
  }
};

coerce.toRealElement = coerceToRealElement;

//-----------------------------------------------------------------------------

module.exports = coerce;

