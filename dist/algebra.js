!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.algebra=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

module.exports = require('./src')


},{"./src":20}],2:[function(require,module,exports){

},{}],3:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],4:[function(require,module,exports){

module.exports = require('./src/index')


},{"./src/index":5}],5:[function(require,module,exports){

module.exports = require('./strictMode')


},{"./strictMode":6}],6:[function(require,module,exports){

// The module api is in *Locked* state, so it will not change
// see http://nodejs.org/api/modules.html
// that is why I just copyed and pasted the orig module wrapper.
//
// By the way, in test/strictMode.js there is a test that checks if
// the content of *origWrapper* needs an update.

var origWrapper         = '(function (exports, require, module, __filename, __dirname) { '
  , strictWrapper       = origWrapper + '"use strict";'
  , strictModeExecuting = false

/* Package `exports` wrapper
 *
 * See [Usage](./#usage)
 *
 * @param {Function} callback containing caller package's exports statements
 */

function exportsWrapper (callback) {
  "use strict";

  if (typeof callback !== 'function')
    throw new TypeError('Not a function')

  // Avoid nested require('strict-mode')
  if (strictModeExecuting)
    throw new Error('Nested strict-mode calls')

  strictModeExecuting = true

  var module = require('module')
  module.wrapper[0] = strictWrapper

  // Every require in this callback will load modules in strict mode.
  try {
    callback()
  }
  catch (err) {
      console.error(err.stack)
  }

  // Restore orig module wrapper, play well with others.
  module.wrapper[0] = origWrapper
}

module.exports = exportsWrapper


},{"module":2}],7:[function(require,module,exports){

var inherits = require('inherits')

var addStaticOperators  = require('./addStaticOperators'),
    buildFieldOperators = require('./buildFieldOperators'),
    Scalar              = require('./Scalar')

var zero = [0, 0]
  , one  = [1, 0]

function addition (z, w) {
  return [z[0] + w[0], z[1] + w[1]]
}

function multiplication (z, w) {
  return [z[0] * w[0] - z[1] * w[1], z[1] * w[0] + z[0] * w[1]]
}

function conjugation (z) {
  // z~ = (z0 + i z1)~
  //    = z0 - i z1
  return [z[0], - z[1]]
}

function norm (z) {
  // |z| = |z0 + i z1|
  //     = z0 * z0 + z1 * z1
  return z[0] * z[0] + z[1] * z[1]
}

function inversion (z) {
  // z^-1 = z~ * 1 / |z|
  return multiplication(conjugation(z), [1 / norm(z), 0])
}

function equal (z, w) {
  return ((z[0] === w[0]) && (z[1] === w[1]))
}

function contains (z) {
  return (typeof z[0] === 'number') && (typeof z[1] === 'number')
}

function negation (z) {
  return [-z[0], -z[1]]
}

var operators = {
  addition      : addition,
  multiplication: multiplication,
  negation      : negation,
  inversion     : inversion,
  equal         : equal,
  contains      : contains
}

var field = {
  one     : one,
  zero    : zero,
  operator: operators
}

/**
 * Complex number.
 */

function Complex (data) {
  Scalar.call(this, field, data)
}

inherits(Complex, Scalar)

addStaticOperators(Complex, buildFieldOperators(field))

function fieldConjugation (z) {
  return conjugation(z)
}

function scalarConjugation (z) {
  this.data = fieldConjugation(this.data)

  return this
}

Complex.prototype.conjugation = scalarConjugation
Complex.prototype.conj        = scalarConjugation

Complex.conjugation = fieldConjugation
Complex.conj        = fieldConjugation

module.exports = Complex


},{"./Scalar":12,"./addStaticOperators":15,"./buildFieldOperators":18,"inherits":3}],8:[function(require,module,exports){

/**
 * Abstract element
 *
 * @param {Any} data
 * @param {Function} check
 *
 */

function Element (data, check) {
  if (check(data))
      this.data = data
    else
      throw new TypeError(data)
}
  
function valueOf () {
  return this.data
}
Element.prototype.valueOf = valueOf

module.exports = Element


},{}],9:[function(require,module,exports){

var inherits = require('inherits')

var arrayFrom = require('./arrayFrom')
  , Element = require('./Element')
  , toData = require('./toData')

/**
 * Algebra field
 *
 * @param {Any} zero
 * @param {Any} one
 * @param {Object} operators
 */

function Field (zero, one, operators) {
  var self = this

  self.zero = zero
  self.one = one


  var addition = operators.addition
    , multiplication = operators.multiplication
    , inversion = operators.inversion
    , equal = operators.equal
    , negation = operators.negation
    , contains = operators.contains
  
  self.contains = contains

  function subtraction (data1, data2) {
    return addition(data1, negation(data2))
  }

  function notEqual (data1, data2) {
    return (! (operators.equal(data1, data2)))
  }

  function division (data1, data2) {
    return multiplication(data1, inversion(data2))
  }

  function checkIsNotZero (data) {
    if (equal(zero, data))
      throw new TypeError(data)

    return data
  }

  /**
   * Static addition operator 
   */
  
  function fieldAddition () {
    return arrayFrom(arguments).map(toData).reduce(addition)        
  }

  self.addition = fieldAddition
    
  /**
   * Static subtraction operator 
   */
  
  function fieldSubtraction () {
    return arrayFrom(arguments).map(toData).reduce(subtraction)        
  }

  self.subtraction = fieldSubtraction
    
  /**
   * Static multiplication operator 
   */
  
  function fieldMultiplication () {
    return arrayFrom(arguments).map(toData).reduce(multiplication)        
  }

  self.multiplication = fieldMultiplication

  /**
   * Static division operator 
   */
  
  function fieldDivision () {
    return arrayFrom(arguments).map(toData).map(checkIsNotZero).reduce(division)        
  }

  self.division = fieldDivision

  /**
   * Static inversion operator 
   */
  
  function fieldInversion () {
    return arrayFrom(arguments).map(toData).map(checkIsNotZero).reduce(inversion)        
  }

  self.inversion = fieldInversion

  /**
   * Static equal operator 
   */
  
  function fieldEqual () {
    return arrayFrom(arguments).map(toData).reduce(equal)        
  }

  self.equal = fieldEqual

  /**
   * Static negation operator 
   */
  
  function fieldNegation () {
    return operators.negation(toData(arguments[0]))  
  }

  self.negation = fieldNegation
    
  /**
   * Scalar element
   * 
   * @param {Any} data
   * 
   * @return {Object} this
   */ 
  
  function Scalar (data) {
    Element.call(this, data, self.contains)
  }

  inherits(Scalar, Element)

  function scalarAddition () {
    this.data = fieldAddition(this.data, fieldAddition.apply(null, arguments))
    
    return this
  }
  
  Scalar.prototype.addition = scalarAddition
  Scalar.prototype.add      = scalarAddition

  function scalarSubtraction () {
    this.data = fieldSubtraction(this.data, fieldSubtraction.apply(null, arguments))
    
    return this
  }
  
  Scalar.prototype.subtraction = scalarSubtraction
  Scalar.prototype.sub         = scalarSubtraction

  function scalarMultiplication () {
    this.data = fieldMultiplication(this.data, fieldMultiplication.apply(null, arguments))
    
    return this
  }
  
  Scalar.prototype.multiplication = scalarMultiplication
  Scalar.prototype.mul = scalarMultiplication

  function scalarDivision () {
    this.data = fieldDivision(this.data, fieldDivision.apply(null, arguments))
    
    return this
  }
  
  Scalar.prototype.division = scalarDivision
  Scalar.prototype.div = scalarDivision

  function scalarInversion () {
    this.data = fieldInversion(this.data, fieldInversion.apply(null, arguments))
    
    return this
  }
  
  Scalar.prototype.inversion = scalarInversion
  Scalar.prototype.inv       = scalarInversion

  function scalarEqual () {
    return fieldEqual(this.data, fieldEqual.apply(null, arguments))
  }
  
  Scalar.prototype.equal = scalarEqual
  Scalar.prototype.eq = scalarEqual

  function scalarNegation () {
    this.data = fieldNegation(this.data)
    
    return this
  }
  
  Scalar.prototype.negation = scalarNegation
  Scalar.prototype.neg = scalarNegation

  self.Scalar = Scalar
}

module.exports = Field


},{"./Element":8,"./arrayFrom":17,"./toData":24,"inherits":3}],10:[function(require,module,exports){

var inherits = require('inherits')

var determinant               = require('./determinant'),
    rowByColumnMultiplication = require('./rowByColumnMultiplication.js'),
    Space                     = require('./Space'),
    toData                    = require('./toData')

/**
 * Space of m x n matrices
 *
 * @param {Object} Scalar
 * @param {Number} numRows
 * @param {Number} numCols
 */

function MatrixSpace (Scalar) {
  var self = this

  /**
   * Dimension
   *
   * @param {Number} numRows
   * @param {Number} numCols which is optional: defaults to a square matrix.
   *
   * @return {Constructor} Matrix
   */

  function Dimension (numRows, numCols) {
    var isSquare = false

    if (typeof numCols === 'undefined') {
      // numCols defaults to numRows
      numCols = numRows

      isSquare = true
    }

    var indices = [numRows, numCols]

    var Element = Space(Scalar)(indices)

    function Matrix () {
      Element.apply(this, arguments)

      /*
       *
       */

      function matrixDeterminant () {
        var det = determinant(Scalar, this.data, numRows)

        return new Scalar(det)
      }

      if (isSquare) {
        Object.defineProperty(this, 'determinant', {get: matrixDeterminant})
        Object.defineProperty(this, 'det',         {get: matrixDeterminant})
      }
    }

    inherits(Matrix, Element)

    // Static attributes.
    Matrix.isSquare = isSquare
    Matrix.numRows  = numRows
    Matrix.numCols  = numCols

    /*
     *
     */

    function spaceMultiplication (leftMatrix, rightMatrix) {
      var left  = toData(leftMatrix),
          right = toData(rightMatrix)

      return rowByColumnMultiplication(Scalar, left, indices, right, indices)
    }

    /*
     *

     */
    function matrixAddition (matrix) {
      this.data = space.addition(this.data, matrix)

      return this
    }

    Matrix.prototype.addition = matrixAddition
    Matrix.prototype.add      = matrixAddition

    /*
     *

     */
    function matrixSubtraction (matrix) {
      this.data = space.subtraction(this.data, matrix)

      return this
    }

    Matrix.prototype.subtraction = matrixSubtraction
    Matrix.prototype.sub         = matrixSubtraction

    /*
     *
     */

    function rightMultiplication (rightMatrix) {
      this.data = spaceMultiplication(this.data, rightMatrix)

      return this
    }

    Matrix.prototype.rightMultiplication = rightMultiplication
    Matrix.prototype.rightMul            = rightMultiplication
    Matrix.prototype.multiplication      = rightMultiplication
    Matrix.prototype.mul                 = rightMultiplication

    /*
     *
     */

    function leftMultiplication (leftMatrix) {
      this.data = spaceMultiplication(leftMatrix, this.data)

      return this
    }

    Matrix.prototype.leftMultiplication = leftMultiplication
    Matrix.prototype.leftMul            = leftMultiplication

    return Matrix
  }

  return Dimension
}

module.exports = MatrixSpace

},{"./Space":13,"./determinant":19,"./rowByColumnMultiplication.js":23,"./toData":24,"inherits":3}],11:[function(require,module,exports){

var inherits = require('inherits')

var addStaticOperators  = require('./addStaticOperators'),
    buildFieldOperators = require('./buildFieldOperators'),
    Scalar              = require('./Scalar')

var zero = 0
  , one  = 1

function addition (a, b) { return a + b }

function multiplication (a, b) { return a * b }

function inversion (a) { return one / a }

function negation (a) { return - a }

function equal (a, b) { return a === b }

function contains (a) { return typeof a === 'number' }

var operators = {
  addition      : addition,
  multiplication: multiplication,
  negation      : negation,
  inversion     : inversion,
  equal         : equal,
  contains      : contains
}

var field = {
  one     : one,
  zero    : zero,
  operator: operators
}

/**
 * Real number.
 */

function Real (data) {
  Scalar.call(this, field, data)
}

inherits(Real, Scalar)

addStaticOperators(Real, buildFieldOperators(field))

module.exports = Real


},{"./Scalar":12,"./addStaticOperators":15,"./buildFieldOperators":18,"inherits":3}],12:[function(require,module,exports){

var inherits = require('inherits')

var buildFieldOperators = require('./buildFieldOperators'),
    Element             = require('./Element')

var fieldOperator,
    one,
    zero

function Scalar (field, data) {
  fieldOperator = buildFieldOperators(field)
  one  = field.one
  zero = field.zero

  Element.call(this, data, field.operator.contains)
}

inherits(Scalar, Element)

Scalar.one  = one
Scalar.zero = zero

function scalarAddition () {
  var fieldAddition = fieldOperator.addition

  this.data = fieldAddition(this.data, fieldAddition.apply(null, arguments))

  return this
}

Scalar.prototype.addition = scalarAddition
Scalar.prototype.add      = scalarAddition

function scalarSubtraction () {
  var fieldSubtraction = fieldOperator.subtraction

  this.data = fieldSubtraction(this.data, fieldSubtraction.apply(null, arguments))

  return this
}

Scalar.prototype.subtraction = scalarSubtraction
Scalar.prototype.sub         = scalarSubtraction

function scalarMultiplication () {
  var fieldMultiplication = fieldOperator.multiplication

  this.data = fieldMultiplication(this.data, fieldMultiplication.apply(null, arguments))

  return this
}

Scalar.prototype.multiplication = scalarMultiplication
Scalar.prototype.mul            = scalarMultiplication

function scalarDivision () {
  var fieldDivision = fieldOperator.division

  this.data = fieldDivision(this.data, fieldDivision.apply(null, arguments))

  return this
}

Scalar.prototype.division = scalarDivision
Scalar.prototype.div      = scalarDivision

function scalarInversion () {
  var fieldInversion = fieldOperator.inversion

  this.data = fieldInversion(this.data)

  return this
}

Scalar.prototype.inversion = scalarInversion
Scalar.prototype.inv       = scalarInversion

function scalarEqual () {
  var fieldEqual = fieldOperator.equal

  return fieldEqual(this.data, fieldEqual.apply(null, arguments))
}

Scalar.prototype.equal = scalarEqual
Scalar.prototype.eq    = scalarEqual

function scalarNegation () {
  var fieldNegation = fieldOperator.negation

  this.data = fieldNegation(this.data)

  return this
}

Scalar.prototype.negation = scalarNegation
Scalar.prototype.neg      = scalarNegation

module.exports = Scalar

},{"./Element":8,"./buildFieldOperators":18,"inherits":3}],13:[function(require,module,exports){

var inherits = require('inherits')

var arrayFrom       = require('./arrayFrom'),
    AbstractElement = require('./Element'),
    toData          = require('./toData')

function getResult (dimension, operator, dataArg) {
  var result = dataArg[0]

  for (var i=1; i < dataArg.length; i++) {
    var data = dataArg[i]

    for (var j=0; j < dimension; j++) {
      result[j] = operator(result[j], data[j])
    }
  }

  return result
}

/**
 * Abstract multidimensional space
 *
 * @param {Object} Scalar
 * @param {Array} indices
 *
 * @constructor
 */

function Space (Scalar) {

  // TODO function Dimension (indices, coindices)
  function Dimension (indices) {

    var dimension = indices.reduce(function (a, b) { return a * b }, 1)

    /*
     *
     */

    function spaceAddition () {
      return getResult(dimension, Scalar.addition, arrayFrom(arguments).map(toData))
    }

    /*
     *
     */

    function spaceSubtraction () {
      return getResult(dimension, Scalar.subtraction, arrayFrom(arguments).map(toData))
    }

    /*
     *
     */

    function spaceScalarMultiplication (data, scalar) {
      var result = []

      // Check scalar is ok.
      var aScalar = [scalar]
      var scalarOk = aScalar.map(Scalar.contains).map(toData)[0]

      for (var i=0; i<dimension; i++) {
        var x = Scalar.multiplication(data[i], scalarOk)
        result.push(x)
      }

      return result
    }

    /*
     *
     */

    function spaceScalarProduct () {
      var dataMul = getResult(dimension, Scalar.multiplication, arrayFrom(arguments).map(toData))

      var result = dataMul[0]

      for (var i=1; i<dimension; i++) {
        result = Scalar.addition(result, dataMul[i])
      }

      return result
    }

    /*
     *
     */

    function contains (data) {
      return data.map(Scalar.contains).length === dimension
    }

      // TODO spaceIdentity

    /**
      * Space Element
     *
     * @param {Array} data
     *
     * @constructor
     */

    function Element (data) {
      AbstractElement.call(this, data, contains)
    }

    inherits(Element, AbstractElement)

    /**
     *
     * @param {Array} data1
     * @param {Array} data2
     * ...
     * @param {Array} dataN
     *
     * @return this Element with updated data
     */

    function elementAddition () {
      this.data = spaceAddition(this.data, spaceAddition.apply(null, arguments))

      return this
    }

    Element.prototype.addition = elementAddition
    Element.prototype.add      = elementAddition

    /**
     *
     * @param {Array} data1
     * @param {Array} data2
     * ...
     * @param {Array} dataN
     *
     * @return this Element with updated data
     */

    function elementSubtraction () {
      this.data = spaceSubtraction(this.data, spaceSubtraction.apply(null, arguments))

      return this
    }

    Element.prototype.subtraction = elementSubtraction
    Element.prototype.sub         = elementSubtraction

    /**
     *
     * @param {Any} scalar
     *
     * @return this Element with updated data
     */

    function elementScalarMultiplication (scalar) {
      this.data = spaceScalarMultiplication(this.data, scalar)

      return this
    }

    Element.prototype.scalarMultiplication = elementScalarMultiplication
    Element.prototype.scalar               = elementScalarMultiplication

    // Static attributes.
    Element.dimension = dimension
    Element.indices   = indices
    Element.Scalar    = Scalar

    // Static functions.
    Element.addition = spaceAddition
    Element.add      = spaceAddition

    Element.subtraction = spaceSubtraction
    Element.sub         = spaceSubtraction

    return Element
  }

  // Static attribute.
  Dimension.Scalar = Scalar

  return Dimension
}

module.exports = Space


},{"./Element":8,"./arrayFrom":17,"./toData":24,"inherits":3}],14:[function(require,module,exports){

var inherits = require('inherits')

var Space = require('./Space')

/**
 * Space of vectors
 *
 * ```
 * var V = VectorSpace(R)(2)
 *
 * var v = new V([1, 2])
 * ```
 *
 * @param {Object} Scalar
 *
 * @return {Function} Dimension
 */

function VectorSpace (Scalar) {

  /**
   * Dimension
   *
   * @param {Number} dimension
   *
   * @return {Constructor} Vector
   */

  function Dimension (dimension) {
    var Element = Space(Scalar)([dimension])

    function Vector () {
      Element.apply(this, arguments)

      var data = this.data

      /*
       * Norm of a vector
       *
       * Given v = (x1, x2, ... xN)
       *
       * norm is defined as n = x1 * x1 + x2 * x2 + ... + xN * xN
       *
       * @return {Scalar} result
       */

      function vectorNorm () {
        var result = Scalar.multiplication(data[0], data[0])

        for (var i=1; i<dimension; i++) {
          result = Scalar.addition(result, Scalar.multiplication(data[i], data[i]))
        }

        return new Scalar(result)
      }

      Object.defineProperty(this, 'norm', {get: vectorNorm})
    }

    inherits(Vector, Element)

    // TODO da mettere in metodo tipo addStaticOperators
    Vector.addition    = Element.addition
    Vector.add         = Element.addition
    Vector.subtraction = Element.subtraction
    Vector.sub         = Element.subtraction

    return Vector
  }

  return Dimension
}

module.exports = VectorSpace


},{"./Space":13,"inherits":3}],15:[function(require,module,exports){

/**
 * Add field operators to Scalar as static methods
 *
 * @param {Object} Scalar class
 * @param {Object} field
 */

function addStaticOperators (Scalar, field) {
  Scalar.addition       = field.addition
  Scalar.add            = field.addition

  Scalar.subtraction    = field.subtraction
  Scalar.sub            = field.subtraction

  Scalar.multiplication = field.multiplication
  Scalar.mul            = field.multiplication

  Scalar.division       = field.division
  Scalar.div            = field.division

  Scalar.negation       = field.negation
  Scalar.neg            = field.negation

  Scalar.inversion      = field.inversion
  Scalar.inv            = field.inversion

  Scalar.equal          = field.equal
  Scalar.eq             = field.equal

  Scalar.contains       = field.contains
}

module.exports = addStaticOperators


},{}],16:[function(require,module,exports){

var matrixToArrayIndex = require('./matrixToArrayIndex')

/**
 * Compute the adjoint of a matrix
 *
 * @param {Array} data
 * @param {Number} numRows
 * @param {Number} numCols
 * @param {Number} row
 * @param {Number} col
 *
 * @return {Array} adjoint
 */

function adjointMatrix (data, numRows, numCols, row, col) {
  var adjoint = []

  for (var i = 0; i < numRows; i++) {
    for (var j = 0; j < numCols; j++) {
      if ((i !== row) && (j !== col)) {
        var index = matrixToArrayIndex(i, j, numCols)

        adjoint.push(data[index])
      }
    }
  }

  return adjoint
}

module.exports = adjointMatrix


},{"./matrixToArrayIndex":21}],17:[function(require,module,exports){

/**
 * Convert arguments to array
 *
 * ```
 * function () {
 *   console.log(typeof arguments) // object
 *
 *   var args = arrayFrom(arguments)
 *
 *   console.log(typeof args) // array
 * }
 * ```
 *
 * @param {Object} arguments of a function
 *
 * @return {Array} array of arguments
 */

function arrayFrom () {
  return (function arraySlice0 () {
    return Array.prototype.slice.call(arguments, 0)
  }).apply(null, arguments[0])
}

module.exports = arrayFrom


},{}],18:[function(require,module,exports){

var arrayFrom = require('./arrayFrom'),
    toData    = require('./toData')

function buildFieldOperators (field) {

  var one  = field.one,
      zero = field.zero,
      addition       = field.operator.addition,
      multiplication = field.operator.multiplication,
      inversion      = field.operator.inversion,
      equal          = field.operator.equal,
      negation       = field.operator.negation

  var operators = {
    contains: field.operator.contains
  }

  function subtraction (data1, data2) {
    return addition(data1, negation(data2))
  }

  function notEqual (data1, data2) {
    return (! (equal(data1, data2)))
  }

  function division (data1, data2) {
    return multiplication(data1, inversion(data2))
  }

  function checkIsNotZero (data) {
    if (equal(zero, data))
      throw new TypeError(data)

    return data
  }

  function fieldAddition () {
    return arrayFrom(arguments).map(toData).reduce(addition)
  }

  operators.addition = fieldAddition

  function fieldSubtraction () {
    return arrayFrom(arguments).map(toData).reduce(subtraction)
  }

  operators.subtraction = fieldSubtraction

  function fieldMultiplication () {
    return arrayFrom(arguments).map(toData).reduce(multiplication)
  }

  operators.multiplication = fieldMultiplication

  function fieldDivision () {
    return arrayFrom(arguments).map(toData).map(checkIsNotZero).reduce(division)
  }

  operators.division = fieldDivision

  function fieldInversion () {
    return inversion(toData(arguments[0]))
  }

  operators.inversion = fieldInversion

  function fieldEqual () {
    return arrayFrom(arguments).map(toData).reduce(equal)
  }

  operators.equal = fieldEqual

  function fieldNegation () {
    return negation(toData(arguments[0]))
  }

  operators.negation = fieldNegation

  return operators
}

module.exports = buildFieldOperators


},{"./arrayFrom":17,"./toData":24}],19:[function(require,module,exports){

var adjointMatrix = require('./adjointMatrix')
  , matrixToArrayIndex = require('./matrixToArrayIndex')

/**
 *
 * @param {Object} Scalar
 * @param {Array} data
 * @param {Number} order
 *
 * @return {Any} det
 */

function determinant (Scalar, data, order) {
  var adjointData
    , adjointDeterminant
    , det
    , startingCol
    , startingRow
    , index

  if (order === 2) {
    det = Scalar.subtraction(Scalar.multiplication(data[0], data[3]), Scalar.multiplication(data[2], data[1]))

    return det
  }

  // TODO choose best row or column to start from, i.e. the one with more zeros
  // by now we start from first row, and walk by column
  startingCol = 0
  startingRow = 0

  index = matrixToArrayIndex(startingRow, startingCol, order)

  adjointData = adjointMatrix(data, order, order, startingRow, startingCol)
  adjointDeterminant = determinant(Scalar, adjointData, order - 1)

  det = Scalar.multiplication(data[index], adjointDeterminant)

  for (var col = 1; col < order; col++) {
    adjointData = adjointMatrix(data, order, order, startingRow, col)

    adjointDeterminant = determinant(Scalar, adjointData, order - 1)

    index = matrixToArrayIndex(startingRow, col, order)

    det = Scalar.addition(det, Scalar.multiplication(data[index], adjointDeterminant))
  }

  return det
}

module.exports = determinant


},{"./adjointMatrix":16,"./matrixToArrayIndex":21}],20:[function(require,module,exports){

// TODO usa le string ℝ ℂ ℍ
// usa anche ratio, lib per i numueri razionali

require('strict-mode')(function () {
  exports.Field       = require('./Field')
  exports.Space       = require('./Space')
  exports.VectorSpace = require('./VectorSpace')
  exports.MatrixSpace = require('./MatrixSpace')
//  exports.TensorSpace = require('./TensorSpace')

  exports.Real    = require('./Real')
  exports.Complex = require('./Complex')
})


},{"./Complex":7,"./Field":9,"./MatrixSpace":10,"./Real":11,"./Space":13,"./VectorSpace":14,"strict-mode":4}],21:[function(require,module,exports){

var multiDimensionalArrayIndex = require('./multiDimensionalArrayIndex')

/**
 *
 * @param {Number} i row
 * @param {Number} j column
 * @param {Number} numberOfColumns
 *
 * @return {Number} index
 */

function matrixToArrayIndex(i, j, numberOfColumns) {
  var index = multiDimensionalArrayIndex([numberOfColumns, numberOfColumns], [i, j])

  return index
}

module.exports = matrixToArrayIndex


},{"./multiDimensionalArrayIndex":22}],22:[function(require,module,exports){

/**
 * Compute index of multi dim array
 *
 * @param {Array} dimensions
 * @param {Array} indices
 *
 * @return {Number} index
 */

function multiDimensionalArrayIndex(dimensions, indices) {
  var l = dimensions.length - 1
    , index = indices[l]
    , factor

  if (dimensions.length > 1) {
    factor = dimensions[l - 1]

    index += factor * indices[l - 1]
  }

  for (var i = 2; i < dimensions.length; i++) {
    factor *= dimensions[l - i + 1]

    index += factor * indices[l - i]
  }

  // Given
  //
  // dimensions d_1, d_2, d_3 .. d_n
  // and
  // indices i_1, i_2, i_3 .. i_n
  //
  // index is computed by formula
  // index = i_n + i_(n-1) * d_n + i_(n-2) * d_n * d_(n-1) + ... + i_2 * d_n * d_(n-1) * ... * d_3 + i_1 * d_n * ... * d_2
  return index
}

module.exports = multiDimensionalArrayIndex


},{}],23:[function(require,module,exports){

var matrixToArrayIndex = require('./matrixToArrayIndex')

/**
 *
 * @param {Object} Scalar
 * @param {Array} leftMatrix
 * @param {Array} leftIndices
 * @param {Array} rightMatrix
 * @param {Array} rightIndices
 *
 * @return {Array} data
 */

function rowByColumnMultiplication (Scalar, leftMatrix, leftIndices, rightMatrix, rightIndices) {
  var data = []

  // Check if matrix can be multiplied
  if (leftIndices[1] !== rightIndices[0])
    throw new TypeError('Left num cols != right num rows')

  var commonIndex = leftIndices[1]

  var rows = leftIndices[0]
  var cols = rightIndices[1]

  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      var element
        , leftIndex
        , rightIndex
        , rightElement
        , leftElement

      leftIndex = matrixToArrayIndex(i, 0, commonIndex)
      rightIndex = matrixToArrayIndex(0, j, cols)

      rightElement = rightMatrix[rightIndex]
      leftElement = leftMatrix[leftIndex]

      element = Scalar.multiplication(leftElement, rightElement)

      for (var k = 1; k < commonIndex; k++) {
        leftIndex = matrixToArrayIndex(i, k, commonIndex)
        rightIndex = matrixToArrayIndex(k, j, cols)

        rightElement = rightMatrix[rightIndex]
        leftElement = leftMatrix[leftIndex]

        element = Scalar.addition(element, Scalar.multiplication(rightElement, leftElement))
      }

      data.push(element)
    }
  }

  return data
}

module.exports = rowByColumnMultiplication


},{"./matrixToArrayIndex":21}],24:[function(require,module,exports){

/**
  * Extract data attribute, if any, and check it
  *
  * @param {Object|Any} arg
  *
  * @return {Any} data
  */

function toData (arg) {
  var data

  if (typeof arg.data === 'undefined')
    data = arg
  else
    data = arg.data

  if (typeof data === 'undefined')
    throw new TypeError('No data')

  return data
}

module.exports = toData


},{}]},{},[1])(1)
});