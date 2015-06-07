(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.algebra = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){

module.exports = require('./src/index')


},{"./src/index":4}],4:[function(require,module,exports){

module.exports = require('./strictMode')


},{"./strictMode":5}],5:[function(require,module,exports){

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


},{"module":1}],6:[function(require,module,exports){

var inherits = require('inherits')

var addStaticOperators  = require('./addStaticOperators'),
    buildComplexField   = require('./buildComplexField'),
    buildFieldOperators = require('./buildFieldOperators'),
    realField           = require('./realField'),
    Scalar              = require('./Scalar')

var complexField = buildComplexField(realField)

/**
 * Complex number.
 *
 * ```
 * var z = new Complex([1, 2]),
 *     w = new Complex([-2, 8.5]);
 * ```
 *
 * @class
 *
 * @param {Array} data
 */

function Complex (data) {
  Scalar.call(this, complexField, data)
}

inherits(Complex, Scalar)

addStaticOperators(Complex, buildFieldOperators(complexField))

/*!
 */

function scalarConjugation (z) {
  this.data = complexField.operator.conjugation(this.data)

  return this
}

Complex.prototype.conjugation = scalarConjugation
Complex.prototype.conj        = scalarConjugation

// Add conjugation as a static operator.
Complex.conjugation = complexField.operator.conjugation
Complex.conj        = complexField.operator.conjugation

module.exports = Complex


},{"./Scalar":11,"./addStaticOperators":15,"./buildComplexField":18,"./buildFieldOperators":20,"./realField":26,"inherits":2}],7:[function(require,module,exports){

/*!
 * Abstract element
 *
 * @class
 *
 * @param {Object|Array|Number|String|Function} data
 * @param {Function} check
 */

function Element (data, check) {
  if (typeof data === 'undefined')
    throw new TypeError('Undefined data')

  if (check(data))
    this.data = data
  else
    throw new TypeError('Invalid data = ', data)
}

/*!
 */

function valueOf () {
  return this.data
}

Element.prototype.valueOf = valueOf

module.exports = Element


},{}],8:[function(require,module,exports){

var inherits = require('inherits')

var arrayFrom = require('./arrayFrom'),
    Element   = require('./Element'),
    toData    = require('./toData')

/*!
 * Algebra field
 *
 * @class
 *
 * @param {Any} zero
 * @param {Any} one
 * @param {Object} operators
 */

function Field (zero, one, operators) {
  var self = this

  self.zero = zero
  self.one  = one


  var addition       = operators.addition,
      contains       = operators.contains,
      equal          = operators.equal,
      inversion      = operators.inversion,
      multiplication = operators.multiplication,
      negation       = operators.negation

  self.contains = contains

  /*!
   */

  function subtraction (data1, data2) {
    return addition(data1, negation(data2))
  }

  /*!
   */

  function notEqual (data1, data2) {
    return (! (operators.equal(data1, data2)))
  }

  /*!
   */

  function division (data1, data2) {
    return multiplication(data1, inversion(data2))
  }

  /*!
   */

  function checkIsNotZero (data) {
    if (equal(zero, data))
      throw new TypeError(data)

    return data
  }

  /*!
   * Static addition operator
   */

  function fieldAddition () {
    return arrayFrom(arguments).map(toData).reduce(addition)
  }

  self.addition = fieldAddition

  /*!
   * Static subtraction operator
   */

  function fieldSubtraction () {
    return arrayFrom(arguments).map(toData).reduce(subtraction)
  }

  self.subtraction = fieldSubtraction

  /*!
   * Static multiplication operator
   */

  function fieldMultiplication () {
    return arrayFrom(arguments).map(toData).reduce(multiplication)
  }

  self.multiplication = fieldMultiplication

  /*!
   * Static division operator
   */

  function fieldDivision () {
    return arrayFrom(arguments).map(toData).map(checkIsNotZero).reduce(division)
  }

  self.division = fieldDivision

  /*!
   * Static inversion operator
   */

  function fieldInversion () {
    return arrayFrom(arguments).map(toData).map(checkIsNotZero).reduce(inversion)
  }

  self.inversion = fieldInversion

  /*!
   * Static equal operator
   */

  function fieldEqual () {
    return arrayFrom(arguments).map(toData).reduce(equal)
  }

  self.equal = fieldEqual

  /*!
   * Static negation operator
   */

  function fieldNegation () {
    return operators.negation(toData(arguments[0]))
  }

  self.negation = fieldNegation

  /*!
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

  /*!
   */

  function scalarAddition () {
    this.data = fieldAddition(this.data, fieldAddition.apply(null, arguments))

    return this
  }

  Scalar.prototype.addition = scalarAddition
  Scalar.prototype.add      = scalarAddition

  /*!
   */

  function scalarSubtraction () {
    this.data = fieldSubtraction(this.data, fieldSubtraction.apply(null, arguments))

    return this
  }

  Scalar.prototype.subtraction = scalarSubtraction
  Scalar.prototype.sub         = scalarSubtraction

  /*!
   */

  function scalarMultiplication () {
    this.data = fieldMultiplication(this.data, fieldMultiplication.apply(null, arguments))

    return this
  }

  Scalar.prototype.multiplication = scalarMultiplication
  Scalar.prototype.mul = scalarMultiplication

  /*!
   */

  function scalarDivision () {
    this.data = fieldDivision(this.data, fieldDivision.apply(null, arguments))

    return this
  }

  Scalar.prototype.division = scalarDivision
  Scalar.prototype.div = scalarDivision

  /*!
   */

  function scalarInversion () {
    this.data = fieldInversion(this.data, fieldInversion.apply(null, arguments))

    return this
  }

  Scalar.prototype.inversion = scalarInversion
  Scalar.prototype.inv       = scalarInversion

  /*!
   */

  function scalarEqual () {
    return fieldEqual(this.data, fieldEqual.apply(null, arguments))
  }

  Scalar.prototype.equal = scalarEqual
  Scalar.prototype.eq = scalarEqual

  /*!
   */

  function scalarNegation () {
    this.data = fieldNegation(this.data)

    return this
  }

  Scalar.prototype.negation = scalarNegation
  Scalar.prototype.neg = scalarNegation

  self.Scalar = Scalar
}

module.exports = Field


},{"./Element":7,"./arrayFrom":17,"./toData":28,"inherits":2}],9:[function(require,module,exports){

var inherits = require('inherits')

var determinant               = require('./determinant'),
    getIndices                = require('./getIndices'),
    matrixToArrayIndex        = require('./matrixToArrayIndex'),
    rowByColumnMultiplication = require('./rowByColumnMultiplication.js'),
    Space                     = require('./Space'),
    toData                    = require('./toData'),
    VectorSpace               = require('./VectorSpace')

/**
 * Space of m x n matrices
 *
 * @class
 *
 * @param {Object} Scalar
 * @param {Number} numRows
 * @param {Number} numCols
 */

function MatrixSpace (Scalar) {
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

      /*
       *
       */

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
        Object.defineProperty(this, 'det', {get: matrixDeterminant})
      }
    }

    inherits(Matrix, Element)

    // Static attributes.
    Matrix.isSquare = isSquare
    Matrix.numRows  = numRows
    Matrix.numCols  = numCols

    // Static operators.
    Matrix.addition    = Element.addition
    Matrix.add         = Element.addition
    Matrix.subtraction = Element.subtraction
    Matrix.sub         = Element.subtraction

    /*!
     *
     */

    function matrixAddition (matrix) {
      this.data = Element.addition(this.data, matrix)

      return this
    }

    Matrix.prototype.addition = matrixAddition
    Matrix.prototype.add      = matrixAddition

    /*!
     *
     */

    function matrixSubtraction (matrix) {
      this.data = Element.subtraction(this.data, matrix)

      return this
    }

    Matrix.prototype.subtraction = matrixSubtraction
    Matrix.prototype.sub         = matrixSubtraction

    /*!
     *
     */

    function rightMultiplication (right) {
      var rightData    = toData(right),
          rightIndices = getIndices(right)

      var rightIsMatrix = rightIndices.length === 2,
          rightIsVector = rightIndices.length === 1

      // TODO rightIsScalar and use scalarMultiplication

      var rightIsSquare = rightIsMatrix && (rightIndices[0] === rightIndices[1])

      if (rightIsVector)
        rightIndices.push(1)

      var data = rowByColumnMultiplication(Scalar, this.data, this.indices, rightData, rightIndices)

      // Left multiplication by a square matrix is an internal operation,
      // so the method is a mutator.
      if (rightIsSquare) {
        this.data = data

        return this
      }

      if (rightIsVector) {
        var Vector = VectorSpace(Scalar)(numRows)

        return new Vector(data)
      }
        // TODO if rightIsMatrix return new this(Scalar)(numRows, numCols)(data)
    }

    Matrix.prototype.rightMultiplication = rightMultiplication
    Matrix.prototype.rightMul            = rightMultiplication
    Matrix.prototype.multiplication      = rightMultiplication
    Matrix.prototype.mul                 = rightMultiplication

    /*!
     *
     */

    function leftMultiplication (leftMatrix) {
      var leftData    = toData(left),
          leftIndices = getIndices(left)

      var leftIsMatrix = leftIndices.length === 2,
          leftIsVector = leftIndices.length === 1

      var leftIsSquare = leftIsMatrix && (leftIndices[0] === leftIndices[1])

      if (leftIsVector)
        leftIndices.push(1)

      var data = rowByColumnMultiplication(Scalar, leftData, leftIndices, this.data, this.indices)

      // Left multiplication by a square matrix is an inner product,
      // so the method is a mutator.
      if (leftIsSquare) {
        this.data = data

        return this
      }

      if (leftIsVector) {
        var Vector = VectorSpace(Scalar)(numCols)

        return new Vector(data)
      }
    }

    Matrix.prototype.leftMultiplication = leftMultiplication
    Matrix.prototype.leftMul            = leftMultiplication

    /*!
     * @todo should be extended to a Tensor operator, also vectors can be transposed
     *
     * @param {numRows}
     * @param {numCols}
     * @param {Object|Array} matrix
     *
     * @returns {Array} transposedData
     */

    function transpose (numRows, numCols, matrix) {
      var data = toData(matrix),
          transposedData = []

      for (var i = 0; i < numRows; i++)
        for (var j = 0; j < numCols; j++)
          transposedData.push(data[matrixToArrayIndex(j, i, numCols)])

      return transposedData
    }

    var staticTranspose = transpose.bind(null, numRows, numCols)
    Matrix.transpose = staticTranspose
    Matrix.tr            = staticTranspose

    /*!
     *
     * @returns {Object} transposedMatrix
     */

    function matrixTransposition () {
      var data    = this.data,
          numCols = this.numCols,
          numRows = this.numRows

      var transposedData     = transpose(numCols, numRows, data),
          transposedIndices  = [numCols, numRows]

      var TransposedMatrix = Space(Scalar)(transposedIndices)

      var transposedMatrix = new TransposedMatrix(transposedData)

      return transposedMatrix
    }

    Matrix.prototype.transpose = matrixTransposition
    Matrix.prototype.tr        = matrixTransposition
    Matrix.prototype.t         = matrixTransposition

    return Matrix
  }

  return Dimension
}

module.exports = MatrixSpace


},{"./Space":12,"./VectorSpace":14,"./determinant":21,"./getIndices":22,"./matrixToArrayIndex":24,"./rowByColumnMultiplication.js":27,"./toData":28,"inherits":2}],10:[function(require,module,exports){

var inherits = require('inherits')

var addStaticOperators  = require('./addStaticOperators'),
    buildFieldOperators = require('./buildFieldOperators'),
    realField           = require('./realField'),
    Scalar              = require('./Scalar')

/**
 * Real number.
 *
 * ```
 * var x = new Real(1.5),
 *     y = new Real(-20);
 * ```
 *
 * @class
 *
 * @param {Number} data
 */

function Real (data) {
  Scalar.call(this, realField, data)
}

inherits(Real, Scalar)

addStaticOperators(Real, buildFieldOperators(realField))

module.exports = Real


},{"./Scalar":11,"./addStaticOperators":15,"./buildFieldOperators":20,"./realField":26,"inherits":2}],11:[function(require,module,exports){

var inherits = require('inherits')

var buildFieldOperators = require('./buildFieldOperators'),
    Element             = require('./Element')

var fieldOperator,
    one,
    zero

/**
 * Element of a field.
 *
 * @class
 *
 * @param {Object} field
 * @param {Any} data
 */

function Scalar (field, data) {
  fieldOperator = buildFieldOperators(field)
  one  = field.one
  zero = field.zero

  Element.call(this, data, field.operator.contains)
}

inherits(Scalar, Element)

Scalar.one  = one
Scalar.zero = zero

/*!
 */

function scalarAddition () {
  var fieldAddition = fieldOperator.addition

  this.data = fieldAddition(this.data, fieldAddition.apply(null, arguments))

  return this
}

Scalar.prototype.addition = scalarAddition
Scalar.prototype.add      = scalarAddition

/*!
 */

function scalarSubtraction () {
  var fieldSubtraction = fieldOperator.subtraction

  this.data = fieldSubtraction(this.data, fieldSubtraction.apply(null, arguments))

  return this
}

Scalar.prototype.subtraction = scalarSubtraction
Scalar.prototype.sub         = scalarSubtraction

/*!
 */

function scalarMultiplication () {
  var fieldMultiplication = fieldOperator.multiplication

  this.data = fieldMultiplication(this.data, fieldMultiplication.apply(null, arguments))

  return this
}

Scalar.prototype.multiplication = scalarMultiplication
Scalar.prototype.mul            = scalarMultiplication

/*!
 */

function scalarDivision () {
  var fieldDivision = fieldOperator.division

  this.data = fieldDivision(this.data, fieldDivision.apply(null, arguments))

  return this
}

Scalar.prototype.division = scalarDivision
Scalar.prototype.div      = scalarDivision

/*!
 */

function scalarInversion () {
  var fieldInversion = fieldOperator.inversion

  this.data = fieldInversion(this.data)

  return this
}

Scalar.prototype.inversion = scalarInversion
Scalar.prototype.inv       = scalarInversion

/*!
 */

function scalarEqual () {
  var fieldEqual = fieldOperator.equal

  return fieldEqual(this.data, fieldEqual.apply(null, arguments))
}

Scalar.prototype.equal = scalarEqual
Scalar.prototype.eq    = scalarEqual

/*!
 */

function scalarNegation () {
  var fieldNegation = fieldOperator.negation

  this.data = fieldNegation(this.data)

  return this
}

Scalar.prototype.negation = scalarNegation
Scalar.prototype.neg      = scalarNegation

module.exports = Scalar


},{"./Element":7,"./buildFieldOperators":20,"inherits":2}],12:[function(require,module,exports){

var inherits = require('inherits')

var arrayFrom = require('./arrayFrom'),
    Element   = require('./Element'),
    toData    = require('./toData')

/*!
 */

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
 * Abstract multidimensional space.
 *
 * @class
 *
 * @param {Object} Scalar
 * @param {Array} indices
 */

function Space (Scalar) {

  // TODO function Dimension (indices, coindices)
  function Dimension (indices) {

    // Attribute dimension is the product of all indices.
    var dimension = indices.reduce(function (a, b) { return a * b }, 1)

    /*!
     *
     */

    function spaceAddition () {
      return getResult(dimension, Scalar.addition, arrayFrom(arguments).map(toData))
    }

    /*!
     *
     */

    function spaceSubtraction () {
      return getResult(dimension, Scalar.subtraction, arrayFrom(arguments).map(toData))
    }

    /*!
     *
     */

    function spaceScalarMultiplication (data, scalar) {
      var result = []

      // Check if scalar is ok.
      var aScalar = [scalar]
      var scalarOk = aScalar.map(Scalar.contains).map(toData)[0]

      for (var i=0; i<dimension; i++) {
        var x = Scalar.multiplication(data[i], scalarOk)
        result.push(x)
      }

      return result
    }

    /*!
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

    /*!
     *
     * @param {Array} data
     *
     * @returns {Boolean}
     */

    function contains (data) {
      return data.map(Scalar.contains).length === dimension
    }

      // TODO spaceIdentity

    /**
     * Tensor
     *
     * @class
     *
     * @param {Array} data
     */

    function Tensor (data) {
      Element.call(this, data, contains)

      Object.defineProperty(this, 'indices', {
        enumerable : true,
        value      : indices,
        writable   : false
      })
    }

    inherits(Tensor, Element)

    /**
     *
     * @param {...Array} data
     *
     * @returns this Tensor with updated data
     */

    function tensorAddition () {
      this.data = spaceAddition(this.data, spaceAddition.apply(null, arguments))

      return this
    }

    Tensor.prototype.addition = tensorAddition
    Tensor.prototype.add      = tensorAddition

    /**
     *
     * @param {...Array} data
     *
     * @returns this Tensor with updated data
     */

    function tensorSubtraction () {
      this.data = spaceSubtraction(this.data, spaceSubtraction.apply(null, arguments))

      return this
    }

    Tensor.prototype.subtraction = tensorSubtraction
    Tensor.prototype.sub         = tensorSubtraction

    /**
     *
     * @param {*} scalar
     *
     * @returns this Tensor with updated data
     */

    function tensorScalarMultiplication (scalar) {
      this.data = spaceScalarMultiplication(this.data, scalar)

      return this
    }

    Tensor.prototype.scalarMultiplication = tensorScalarMultiplication
    Tensor.prototype.scalar               = tensorScalarMultiplication

    // Static attributes.
    Tensor.dimension = dimension
    Tensor.indices   = indices
    Tensor.Scalar    = Scalar

    // Static operators.
    Tensor.addition             = spaceAddition
    Tensor.add                  = spaceAddition

    Tensor.subtraction          = spaceSubtraction
    Tensor.sub                  = spaceSubtraction

    Tensor.scalarMultiplication = spaceScalarMultiplication
    Tensor.scalar               = spaceScalarMultiplication

    return Tensor
  }

  // Static attribute.
  Dimension.Scalar = Scalar

  return Dimension
}

module.exports = Space


},{"./Element":7,"./arrayFrom":17,"./toData":28,"inherits":2}],13:[function(require,module,exports){

var inherits = require('inherits')

var Space = require('./Space')

/**
 * Space of tensors
 *
 * @class
 *
 * @param {Object} Scalar
 * @param {Array} controvariant indices
 * @param {Array} covariant indices
 */

function TensorSpace (Scalar, controvariant, covariant) {
  var self = this

  var indices = controvariant.concat(covariant)

  var type = [controvariant.length, covariant.length]
  self.type = type

  var space = new Space(Scalar, indices)

  self.addition = space.addition
  self.subtraction = space.subtraction

  function Tensor (data) {
    space.Element.call(this, data)
  }


 inherits(Tensor, space.Element)

  self.Tensor = Tensor
}

inherits(TensorSpace, Space)

module.exports = TensorSpace


},{"./Space":12,"inherits":2}],14:[function(require,module,exports){

var inherits = require('inherits')

var getIndices                = require('./getIndices'),
    rowByColumnMultiplication = require('./rowByColumnMultiplication.js'),
    Space                     = require('./Space'),
    toData                    = require('./toData')


/**
 * Space of vectors
 *
 * ```
 * var V = VectorSpace(R)(2)
 *
 * var v = new V([1, 2])
 * ```
 *
 * @function
 *
 * @param {Object} Scalar
 *
 * @returns {Function} Dimension
 */

function VectorSpace (Scalar) {

  /*!
   * Dimension
   *
   * @param {Number} dimension
   *
   * @return {Constructor} Vector
   */

  function Dimension (dimension) {
    var indices = [dimension]

    var Element = Space(Scalar)(indices)

    /**
     *
     * @class
     *
     * @param {*} data
     */

    function Vector (data) {
      Element.call(this, data)

      /*!
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

    /*!
     *
     */

    function crossProduct (right) {
      var rightData      = toData(right),
          rightDimension = rightData.length,
          rightIndices   = getIndices(right)

    }

    // Cross product is defined only in dimension 3.
    if (dimension === 3) {
      Vector.prototype.crossProduct = crossProduct
      Vector.prototype.cross        = crossProduct
      Vector.prototype.x            = crossProduct
    }

    /*!
     *
     */

    function matrixProduct (matrix) {
      var matrixData    = toData(matrix),
          matrixIndices = getIndices(matrix)

      var indices = [1, dimension]

      var data = rowByColumnMultiplication(Scalar, this.data, indices, matrixData, matrixIndices)

      this.data = data

      return this
    }

    Vector.prototype.matrixProduct = matrixProduct

    /*!
     *
     */

    function scalarProduct (vector1, vector2) {
      var vectorData1    = toData(vector1),
          vectorData2    = toData(vector2)

      if (vectorData1.length !== vectorData2.length)
        throw new TypeError('Vectors has not the same dimension')

      var result = Scalar.multiplication(vectorData1[0], vectorData2[0])

      for (var i=1; i<dimension; i++) {
        result = Scalar.addition(result, Scalar.multiplication(vectorData1[i], vectorData2[i]))
      }

      return result
    }

    // TODO da spostare nei tensori
    function vectorScalarProduct (vector) {
      var result = scalarProduct(this.data, vector)

      return new Scalar(result)
    }

    Vector.prototype.scalarProduct = vectorScalarProduct
    Vector.prototype.dotProduct    = vectorScalarProduct
    Vector.prototype.dot           = vectorScalarProduct

    /*!
     *
     */

    function perScalarProduct (scalar) {
      var data       = this.data,
          scalarData = toData(scalar)

      for (var i = 0; i < dimension; i++)
        data[i] = Scalar.mul(data[i], scalarData)

      this.data = data

      return this
    }

    Vector.prototype.perScalarProduct = perScalarProduct

    /*!
     * Static operators
     */

    Vector.addition    = Element.addition
    Vector.add         = Element.addition
    Vector.subtraction = Element.subtraction
    Vector.sub         = Element.subtraction

    Vector.scalarProduct = scalarProduct

    return Vector
  }

  return Dimension
}

module.exports = VectorSpace


},{"./Space":12,"./getIndices":22,"./rowByColumnMultiplication.js":27,"./toData":28,"inherits":2}],15:[function(require,module,exports){

/*!
 * Add operator operators to Scalar as static methods
 *
 * @function
 *
 * @param {Object} Scalar class
 * @param {Object} operator
 */

function addStaticOperators (Scalar, operator) {
  Scalar.addition       = operator.addition
  Scalar.add            = operator.addition

  Scalar.subtraction    = operator.subtraction
  Scalar.sub            = operator.subtraction

  Scalar.multiplication = operator.multiplication
  Scalar.mul            = operator.multiplication

  Scalar.division       = operator.division
  Scalar.div            = operator.division

  Scalar.negation       = operator.negation
  Scalar.neg            = operator.negation

  Scalar.inversion      = operator.inversion
  Scalar.inv            = operator.inversion

  Scalar.equal          = operator.equal
  Scalar.eq             = operator.equal

  Scalar.contains       = operator.contains

  if (typeof operator.conjugation === 'function') {
    Scalar.conjugation = operator.conjugation
    Scalar.conj        = operator.conjugation
  }
}

module.exports = addStaticOperators


},{}],16:[function(require,module,exports){

var matrixToArrayIndex = require('./matrixToArrayIndex')

// TODO: check name disambiguation https://en.wikipedia.org/wiki/Adjugate_matrix

/*!
 * Compute the adjoint of a matrix
 *
 * @function
 *
 * @param {Array} data
 * @param {Number} numRows
 * @param {Number} numCols
 * @param {Number} row
 * @param {Number} col
 *
 * @returns {Array} adjoint
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


},{"./matrixToArrayIndex":24}],17:[function(require,module,exports){

/*!
 * Converts arguments to array
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
 * @function
 *
 * @param {Object} arguments of a function
 *
 * @returns {Array} array of arguments
 */

function arrayFrom () {
  return arraySlice0.apply(null, arguments[0])
}

/*!
 */

function arraySlice0 () {
  return Array.prototype.slice.call(arguments, 0)
}

module.exports = arrayFrom


},{}],18:[function(require,module,exports){

var buildFieldOperators = require('./buildFieldOperators')

/*!
 */

function buildComplexField (realField) {
  var zero = [realField.zero, realField.zero],
      one  = [realField.one, realField.zero]

  var add = realField.operator.addition,
      con = realField.operator.contains,
      eql = realField.operator.equal,
      mul = realField.operator.multiplication,
      neg = realField.operator.negation

  /*!
   * z + w = (z0 + i z1) * (w0 + i w1)
   *       = (z0 + w0) + i (z1 + w1)
   */

  function addition (z, w) {
    return [add(z[0], w[0]), add(z[1], w[1])]
  }

  /*!
   * z * w = (z0 + i z1) * (w0 + i w1)
   *       = (z0 * w0 - z1 * w1) + i (z1 * w0 + z0 * w1)
   */

  function multiplication (z, w) {
    return [add(mul(z[0], w[0]), neg(mul(z[1], w[1]))), add(mul(z[1], w[0]), mul(z[0], w[1]))]
  }

  /*!
   * z~ = (z0 + i z1)~
   *    = z0 - i z1
   */

  function conjugation (z) {
    return [z[0], neg(z[1])]
  }

  /*!
   * |z| = |z0 + i z1|
   *     = z0 * z0 + z1 * z1
   */

  function norm (z) {
    return add(mul(z[0], z[0]), mul(z[1], z[1]))
  }

  /*!
   * z^-1 = z~ * 1 / |z|
   */

  function inversion (z) {
    return multiplication(conjugation(z), [realField.one / norm(z), realField.zero])
  }

  /*!
   */

  function equal (z, w) {
    return ((eql(z[0], w[0])) && eql((z[1], w[1])))
  }

  /*!
   */

  function contains (z) {
    return (con(z[0])) && (con(z[1]))
  }

  /*!
   */

  function negation (z) {
    return [neg(z[0]), neg(z[1])]
  }

  var operators = {
    addition      : addition,
    multiplication: multiplication,
    negation      : negation,
    inversion     : inversion,
    equal         : equal,
    contains      : contains,
    conjugation   : conjugation
  }

  var complexField = {
    one     : one,
    zero    : zero,
    operator: operators
  }

  return complexField
}

module.exports = buildComplexField


},{"./buildFieldOperators":20}],19:[function(require,module,exports){

var inherits = require('inherits')

var addStaticOperators  = require('./addStaticOperators'),
    buildFieldOperators = require('./buildFieldOperators'),
    Scalar              = require('./Scalar')

/*!
 * Check if a number is prime
 *
 * @function
 *
 * @param {Number} n
 *
 * @returns {Boolean}
 */

function isPrime (n) {
  if (n === 1) return false
  if (n === 2) return true

  var m = Math.sqrt(n)

  for (var i = 2; i <= m; i++)
    if (n % i === 0)
      return false

  return true
}

/*!
 * Check if given elements are unique
 *
 * @function
 *
 * @param {Array} elements
 *
 * @returns {Boolean}
 */

function unique (elements) {
  for (var i = 0; i < elements.length - 1; i++)
    for (var j = i + 1; j < elements.length; j++)
      if (elements[i] === elements[j])
        return false

  return true
}

/*!
 * Construct a space isomorphic to Zp: the cyclic group of order p, where p is prime.
 *
 * @function
 *
 * @param {Array|String} elements
 *
 * @returns {Object} Cyclic
 */

function buildCyclicSpaceOf (elements) {
  if ((typeof elements.length !== 'number') || (! isPrime(elements.length)))
    throw new TypeError("elements length must be prime")

  if ((! unique(elements)))
    throw new TypeError("elements must be unique")

  var zero = elements[0],
      one  = elements[1]

  /*!
   */

  function numOf (element) {
    return elements.indexOf(element)
  }

  /*!
   */

  function addition (element1, element2) {
    var n = numOf(element1) + numOf(element2)

    n = n % elements.length

    return elements[n]
  }

  /*!
   */

  function contains (element) {
    return elements.indexOf(element) > -1
  }

  /*!
   */

  function multiplication (element1, element2) {
    var n = numOf(element1) * numOf(element2)

    n = n % elements.length

    return elements[n]
  }

  /*!
   */

  function inversion (element) {
    for (var i = 0; i < elements.length; i++)
      if(elements[1] == multiplication(element, elements[i]))

    return elements[i]
  }

  /*!
   */

  function division (element1, element2) {
    return multiplication(element1, inversion(element2))
  }

  /*!
   */

  function negation (element) {
    var n = numOf(element)

    if (n === 0)
      return element

    n = elements.length - n

    return elements[n]
  }

  /*!
   */

  function equal (element1, element2) {
    return element1 === element2
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

  /*!
   * Cyclic element.
   *
   * @class
   */

  function Cyclic (data) {
    Scalar.call(this, field, data)
  }

  inherits(Cyclic, Scalar)

  addStaticOperators(Cyclic, buildFieldOperators(field))

  return Cyclic
}

module.exports = buildCyclicSpaceOf


},{"./Scalar":11,"./addStaticOperators":15,"./buildFieldOperators":20,"inherits":2}],20:[function(require,module,exports){

var arrayFrom = require('./arrayFrom'),
    toData    = require('./toData')

/*!
 *
 * @function
 *
 * @param {Object} field
 *
 * @returns {Object} operators
 */

function buildFieldOperators (field) {
  var one  = field.one,
      zero = field.zero

  var addition       = field.operator.addition,
      multiplication = field.operator.multiplication,
      inversion      = field.operator.inversion,
      equal          = field.operator.equal,
      negation       = field.operator.negation

  var operators = {
    contains: field.operator.contains
  }

  if (typeof field.operator.conjugation === 'function')
    operators.conjugation = field.operator.conjugation

  /*!
   */

  function subtraction (data1, data2) {
    return addition(data1, negation(data2))
  }

  /*!
   */

  function notEqual (data1, data2) {
    return (! (equal(data1, data2)))
  }

  /*!
   */

  function division (data1, data2) {
    return multiplication(data1, inversion(data2))
  }

  /*!
   */

  function checkIsNotZero (data) {
    if (equal(zero, data))
      throw new TypeError(data)

    return data
  }

  /*!
   */

  function fieldAddition () {
    return arrayFrom(arguments).map(toData).reduce(addition)
  }

  operators.addition = fieldAddition

  /*!
   */

  function fieldSubtraction () {
    return arrayFrom(arguments).map(toData).reduce(subtraction)
  }

  operators.subtraction = fieldSubtraction

  /*!
   */

  function fieldMultiplication () {
    return arrayFrom(arguments).map(toData).reduce(multiplication)
  }

  operators.multiplication = fieldMultiplication

  /*!
   */

  function fieldDivision () {
    return arrayFrom(arguments).map(toData).map(checkIsNotZero).reduce(division)
  }

  operators.division = fieldDivision

  /*!
   */

  function fieldInversion () {
    return inversion(toData(arguments[0]))
  }

  operators.inversion = fieldInversion

  /*!
   */

  function fieldEqual () {
    return arrayFrom(arguments).map(toData).reduce(equal)
  }

  operators.equal = fieldEqual

  /*!
   */

  function fieldNegation () {
    return negation(toData(arguments[0]))
  }

  operators.negation = fieldNegation

  return operators
}

module.exports = buildFieldOperators


},{"./arrayFrom":17,"./toData":28}],21:[function(require,module,exports){

var adjointMatrix      = require('./adjointMatrix'),
    matrixToArrayIndex = require('./matrixToArrayIndex')

/*!
 * Computes the determinant of a matrix
 *
 * @function
 *
 * @param {Object} Scalar
 * @param {Array} data
 * @param {Number} order
 *
 * @returns {Any} det
 */

function determinant (Scalar, data, order) {
  var det

  // If order is 2, go for a straight calculation.
  //
  //  det | a b | = a * d - c * b
  //      | c d |
  //
  if (order === 2) {
    det = Scalar.subtraction(Scalar.multiplication(data[0], data[3]),
                             Scalar.multiplication(data[2], data[1]))

    return det
  }

  // TODO choose best row or column to start from, i.e. the one with more zeros
  // by now we start from first row, and walk by column
  var startingCol = 0,
      startingRow = 0


  var adjointData        = adjointMatrix(data, order, order, startingRow, startingCol),
      adjointDeterminant = determinant(Scalar, adjointData, order - 1),
      index              = matrixToArrayIndex(startingRow, startingCol, order)

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


},{"./adjointMatrix":16,"./matrixToArrayIndex":24}],22:[function(require,module,exports){

var toData = require('./toData')

/*!
 * Extract indices attribute, if any
 *
 * @function
 *
 * @param {Array|Any} arg
 *
 * @return {Array} indices
 */

function getIndices (arg) {
  var indices

  if (typeof arg.indices === 'undefined') {
// TODO
//   var data = toData(arg)
//
//   if (typeof data === 'array') {
//     // TODO recursion into data if it is a multidimensional array
//     indices = [data.length]
//   }
//   else {
//     indices = [1]
//   }
  }
  else {
    indices = arg.indices
  }

  if (typeof indices === 'undefined')
    throw new TypeError('No indices')

  return indices
}

module.exports = getIndices


},{"./toData":28}],23:[function(require,module,exports){

// TODO use strings ℝ ℂ ℍ
// usa anche ratio, lib per i numeri razionali

require('strict-mode')(function () {
  exports.Field       = require('./Field')
  exports.Space       = require('./Space')
  exports.VectorSpace = require('./VectorSpace')
  exports.MatrixSpace = require('./MatrixSpace')
  exports.TensorSpace = require('./TensorSpace')

  exports.Real    = require('./Real')
  exports.Complex = require('./Complex')

  exports.buildCyclicSpaceOf = require('./buildCyclicSpaceOf')
})


},{"./Complex":6,"./Field":8,"./MatrixSpace":9,"./Real":10,"./Space":12,"./TensorSpace":13,"./VectorSpace":14,"./buildCyclicSpaceOf":19,"strict-mode":3}],24:[function(require,module,exports){

var multiDimensionalArrayIndex = require('./multiDimensionalArrayIndex')

/*!
 * Convert a pair of indices to a 1-dimensional index
 *
 * @function
 * @param {Number} i row
 * @param {Number} j column
 * @param {Number} numberOfColumns
 *
 * @returns {Number} index
 */

function matrixToArrayIndex(i, j, numberOfColumns) {
  var index = multiDimensionalArrayIndex([numberOfColumns, numberOfColumns], [i, j])

  return index
}

module.exports = matrixToArrayIndex


},{"./multiDimensionalArrayIndex":25}],25:[function(require,module,exports){

/*!
 * Compute index of multi dim array
 *
 * Given
 *
 * dimensions d_1, d_2, d_3 .. d_n
 * and
 * indices i_1, i_2, i_3 .. i_n
 *
 * index is computed by formula
 * index = i_n + i_(n-1) * d_n + i_(n-2) * d_n * d_(n-1) + ... + i_2 * d_n * d_(n-1) * ... * d_3 + i_1 * d_n * ... * d_2
 *
 * @ function
 *
 * @param {Array} dimensions
 * @param {Array} indices
 *
 * @returns {Number} index
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

  return index
}

module.exports = multiDimensionalArrayIndex


},{}],26:[function(require,module,exports){

var zero = 0,
    one  = 1

/*!
 */

function addition (a, b) { return a + b }

/*!
 */

function multiplication (a, b) { return a * b }

/*!
 */

function inversion (a) { return one / a }

/*!
 */

function negation (a) { return - a }

/*!
 */

function equal (a, b) { return a === b }

/*!
 */

function contains (a) { return typeof a === 'number' }

var operators = {
  addition      : addition,
  multiplication: multiplication,
  negation      : negation,
  inversion     : inversion,
  equal         : equal,
  contains      : contains
}

var realField = {
  one     : one,
  zero    : zero,
  operator: operators
}

module.exports = realField


},{}],27:[function(require,module,exports){

var matrixToArrayIndex = require('./matrixToArrayIndex')

/*!
 *
 * @function
 *
 * @param {Object} Scalar
 * @param {Array} leftMatrix
 * @param {Array} leftIndices
 * @param {Array} rightMatrix
 * @param {Array} rightIndices
 *
 * @returns {Array} data
 */

function rowByColumnMultiplication (Scalar, leftMatrix, leftIndices, rightMatrix, rightIndices) {
  // Check if matrix can be multiplied
  if (leftIndices[1] !== rightIndices[0])
    throw new TypeError('Left num cols != right num rows')

  var commonIndex = leftIndices[1],
      data        = [],
      rows        = leftIndices[0],
      cols        = rightIndices[1]

  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      var leftIndex  = matrixToArrayIndex(i, 0, commonIndex),
          rightIndex = matrixToArrayIndex(0, j, cols)

      var rightElement = rightMatrix[rightIndex],
          leftElement  = leftMatrix[leftIndex]

      var element = Scalar.multiplication(leftElement, rightElement)

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


},{"./matrixToArrayIndex":24}],28:[function(require,module,exports){

/*!
 * Extract data attribute, if any, and check it
 *
 * @param {*} arg
 *
 * @returns {*} data
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


},{}],29:[function(require,module,exports){

module.exports = require('./src')


},{"./src":23}]},{},[29])(29)
});