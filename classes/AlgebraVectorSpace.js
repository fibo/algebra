
//
// # AlgebraVectorSpace
//

var AlgebraVector      = require('./AlgebraVector')
  , inherits           = require('inherits')
  , _                  = require('underscore')

function AlgebraVectorSpace(Element, dimension) {

  //
  // ## Attributes
  //

  //
  // ### dimension
  //

  if (! (_.isNumber(dimension)))
    throw new TypeError()

  function getDimension () { return dimension }

  Object.defineProperty(this, 'dimension', {get: getDimension})

  //
  // ### Vector
  //
  // It is an AlgebraVector constructor
  //
  // ```
  // var vector = new space.Vector();
  // ```

    /* TODO metti link ad un esempio*/

    /* TODO sarebbe da mettere in Object.defineProperty in modo da renderlo readonly ?
     * Da notare infatti che + un attributo che ha come valore una funzione
     * quindi anche se è una funzione, non è un metodo
     */

  function Vector () {
    var arg0 = arguments[0]
      , numArgs = arguments.length
      , elements = []

    if ((numArgs === 1) && (_.isArray(arg0)))
      elements = arg0

    if (numArgs > 1)
      for (var i in arguments)
        elements.push(arguments[i])

    AlgebraVector.call(this, Element, elements)
  }

  inherits(Vector, AlgebraVector)

  this.Vector = Vector
}

module.exports = AlgebraVectorSpace

