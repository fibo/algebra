(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.algebra = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

require('strict-mode')(function () {
  var CayleyDickson = require('./src/cayley-dickson'),
      Real          = require('./src/Real')

  exports.CayleyDickson = CayleyDickson
  exports.group = require('./src/group')
  exports.ring = require('./src/ring')

  exports.VectorSpace = require('./src/VectorSpace')
//  exports.MatrixSpace = require('./src/MatrixSpace')

  exports.Real       = Real
//  exports.Complex    = CayleyDickson(Real, 1)
//  exports.Quaternion = CayleyDickson(Real, 2)
//  exports.Octonion   = CayleyDickson(Real, 3)

//  exports.buildCyclicSpaceOf = require('./src/buildCyclicSpaceOf')
})


},{"./src/Real":10,"./src/VectorSpace":11,"./src/cayley-dickson":12,"./src/group":17,"./src/ring":20,"strict-mode":6}],2:[function(require,module,exports){

/**
 * given an algebra group structure
 *
 * @param {Object}   given
 * @param {*}        given.identity a.k.a neutral element
 * @param {Function} given.contains
 * @param {Function} given.equality
 * @param {Function} given.compositionLaw
 * @param {Function} given.inversion
 * @param {Object} [naming]
 * @param {String} [naming.identity=zero]
 * @param {String} [naming.contains=contains]
 * @param {String} [naming.equality=equality]
 * @param {String} [naming.compositionLaw=addition]
 * @param {String} [naming.inversion=negation]
 * @param {String} [naming.inverseCompositionLaw=subtraction]
 * @param {String} [naming.notContains=notContains]
 *
 * @returns {Object} group
 */

function algebraGroup (given, naming) {
  var group = {}

  if (typeof given === 'undefined') given = {}

  if (typeof naming === 'undefined') naming = {}

  // default attribute naming

  var defaultNaming = {
    compositionLaw        : 'addition',
    identity              : 'zero',
    inverseCompositionLaw : 'subtraction',
    inversion             : 'negation'
  }

  function prop (name) {
    if (typeof naming[name] === 'string')
      return naming[name]

    if (typeof defaultNaming[name] === 'string')
      return defaultNaming[name]

    return name
  }

  // operators
  function compositionLaw () {
    return [].slice.call(arguments).reduce(given.compositionLaw)
  }

  function contains () {
    var arg = [].slice.call(arguments)

    for (var i in arg)
      if (! given.contains(arg[i]))
        return false

       return true
  }

  function notContains (a) { return ! contains(a) }

  function disequality (a, b) { return ! given.equality(a, b) }

  function inverseCompositionLaw (a) {
    var rest = [].slice.call(arguments, 1)

    return compositionLaw(a, rest.map(given.inversion).reduce(given.compositionLaw))
  }

  group[prop('contains')]              = contains
  group[prop('notContains')]           = notContains
  group[prop('compositionLaw')]        = compositionLaw
  group[prop('inversion')]             = given.inversion
  group[prop('inverseCompositionLaw')] = inverseCompositionLaw
  group[prop('equality')]              = given.equality
  group[prop('disequality')]           = disequality

  // identity element
  var e = given.identity

  if (notContains(e))
    throw new TypeError('"identity" must be contained in group set')

  // Check that e+e=e.
  if (disequality(given.compositionLaw(e, e), e))
    throw new TypeError('"identity" is not neutral')

  group[prop('identity')] = e

  return group
}

module.exports = algebraGroup


},{}],3:[function(require,module,exports){

var group = require('algebra-group')

/**
 * Define an algebra ring structure
 *
 * @param {Array} identity
 * @param {*}     identity[0] a.k.a zero
 * @param {*}     identity[1] a.k.a uno
 * @param {Object}   given operator functions
 * @param {Function} given.contains
 * @param {Function} given.equality
 * @param {Function} given.addition
 * @param {Function} given.negation
 * @param {Function} given.multiplication
 * @param {Function} given.inversion
 *
 * @returns {Object} ring
 */

function algebraRing (identity, given) {

  // A ring is a group, with multiplication.

  var ring = group({
    identity       : identity[0],
    contains       : given.contains,
    equality       : given.equality,
    compositionLaw : given.addition,
    inversion      : given.negation
  })

  // operators

  function multiplication () {
    return [].slice.call(arguments).reduce(given.multiplication)
  }

  function inversion (a) {
    if (ring.equality(a, ring.zero))
      throw new TypeError('algebra-ring: Cannot divide by zero.')

    return given.inversion(a)
  }

  function division (a) {
    var rest = [].slice.call(arguments, 1)

    return given.multiplication(a, rest.map(given.inversion).reduce(given.multiplication))
  }

  ring.multiplication = multiplication
  ring.inversion      = inversion
  ring.division       = division

  // Multiplicative identity.

  var one = identity[1]

  if (ring.notContains(one))
    throw new TypeError('algebra-ring: "identity" must be contained in ring set')

  // Check that one*one=one.
  if (ring.disequality(given.multiplication(one, one), one))
    throw new TypeError('algebra-ring: "identity" is not neutral')

  if (ring.notContains(identity[1]))
    throw new TypeError('algebra-ring:"identity" must be contained in ring set')

  ring.one = identity[1]

  return ring
}

module.exports = algebraRing


},{"algebra-group":2}],4:[function(require,module,exports){

},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){

module.exports = require('./src/index')


},{"./src/index":7}],7:[function(require,module,exports){

module.exports = require('./strictMode')


},{"./strictMode":8}],8:[function(require,module,exports){

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


},{"module":4}],9:[function(require,module,exports){

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


},{}],10:[function(require,module,exports){

var ring = require('./ring')

var Real = ring([0, 1], {
  contains:       function (a, b) {
                    // NaN, Infinity and -Infinity are not allowed
                    return (typeof a === 'number' && isFinite(a))
                  },
  equality:       function (a, b) { return a === b },
  addition:       function (a, b) { return a + b },
  negation:       function (a) { return -a },
  multiplication: function (a, b) { return a * b },
  inversion:      function (a) { return 1 / a }
})

module.exports = Real


},{"./ring":20}],11:[function(require,module,exports){

var getIndices                = require('./getIndices'),
    group                     = require('./group'),
    inherits                  = require('inherits'),
    rowByColumnMultiplication = require('./rowByColumnMultiplication.js'),
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
 * @param {Object} Scalar class
 *
 * @returns {Function} anonymous with signature (dimension)
 */

function VectorSpace (Scalar) {

  /*!
   *
   * @param {Number} dimension
   *
   * @returns {Constructor} Vector
   */

  return function (dimension) {

    function createZero (scalarZero, dimension) {
      var vectorZero = []

      for (var i = 0; i < dimension; i++)
        vectorZero.push(scalarZero)

     return vectorZero
    }

    var zero = createZero(Scalar.zero, dimension)

    function contains (a) {
      if (a.length !== dimension) return false

      for (var i = 0; i < dimension; i++)
        if (! Scalar.contains(a[i]))
          return false

      return true
    }

    function equality (a, b) {
      for (var i = 0; i < dimension; i++)
        if (! Scalar.equality(a[i], b[i]))
          return false

      return true
    }

    function addition (a, b) {
      var c = []

      for (var i = 0; i < dimension; i++)
        c.push(Scalar.addition(a[i], b[i]))

      return c
    }

    function negation (a) {
      var b = []

      for (var i = 0; i < dimension; i++)
        b.push(Scalar.negation(a[i]))

      return b
    }

    var Group = group({
      identity       : zero,
      contains       : contains,
      equality       : equality,
      compositionLaw : addition,
      inversion      : negation
    })

    /**
     *
     * @class
     *
     * @param {*} data
     */

    function Vector (data) {
      Group.call(this, data)

      /**
       * Norm of a vector
       *
       * Given v = (x1, x2, ... xN)
       *
       * norm is defined as n = x1 * x1 + x2 * x2 + ... + xN * xN
       *
       * @returns {Scalar} result
       */

      function vectorNorm () {
        var result = Scalar.multiplication(data[0], data[0])

        for (var i = 1; i < dimension; i++) {
          result = Scalar.addition(result, Scalar.multiplication(data[i], data[i]))
        }

        return new Scalar(result)
      }

      Object.defineProperty(this, 'norm', {get: vectorNorm})
    }

    inherits(Vector, Group)

    Vector.addition = Group.addition
    Vector.subtraction = Group.subtraction
    Vector.negation = Group.negation

    Object.defineProperty(Vector, 'zero', {
      writable: false,
      value: zero
    })

    function crossProduct (right) {
      var rightData      = toData(right),
          rightDimension = rightData.length,
          rightIndices   = getIndices(right)

            // TODO complete cross product
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

      for (var i = 1; i < dimension; i++) {
        result = Scalar.addition(result, Scalar.multiplication(vectorData1[i], vectorData2[i]))
      }

      return result
    }

    function vectorScalarProduct (vector) {
      var result = scalarProduct(this.data, vector)

      return new Scalar(result)
    }

    Vector.prototype.scalarProduct = vectorScalarProduct
    Vector.prototype.dotProduct    = vectorScalarProduct
    Vector.prototype.dot           = vectorScalarProduct

    function perScalarProduct (Scalar) {
      var data       = this.data,
          ScalarData = toData(Scalar)

      for (var i = 0; i < dimension; i++)
        data[i] = Scalar.mul(data[i], ScalarData)

      this.data = data

      return this
    }

    Vector.prototype.perScalarProduct = perScalarProduct

    Vector.scalarProduct = scalarProduct

    return Vector
  }
}

module.exports = VectorSpace


},{"./getIndices":16,"./group":17,"./rowByColumnMultiplication.js":21,"./toData":22,"inherits":5}],12:[function(require,module,exports){

var CayleyDickson = require('./constructCayleyDicksonAlgebra'),
    ring          = require('./ring')

function CayleyDicksonAlgebra (K, iterations) {
  var Kn = CayleyDickson(K, iterations)

  return ring([Kn.zero, Kn.one], Kn)
}

module.exports = CayleyDicksonAlgebra


},{"./constructCayleyDicksonAlgebra":15,"./ring":20}],13:[function(require,module,exports){

var toData = require('./toData')

/**
 * Get an operator that coerces arguments to data.
 *
 * @api private
 *
 * @param {Function} operator
 *
 * @returns {Function} anonymous coerced operator
 */

function coerced (operator) {
  return function () {
    return operator.apply(null, [].slice.call(arguments).map(toData))
  }
}

module.exports = coerced


},{"./toData":22}],14:[function(require,module,exports){

/**
 * Comparison operator for group and ring classes
 *
 * @param {Function} operator
 *
 * @returns {Function} anonymous accessor
 */

function comparison (operator) {
  return function () {
    return operator.bind(null, this.data).apply(null, arguments)
  }
}

module.exports = comparison


},{}],15:[function(require,module,exports){

//var algebraGroup = require('algebra-group'),
//    algebraRing  = require('algebra-ring')
var ring = require('./ring')

var twoPow = Math.pow.bind(null, 2)

/**
 * Iterate Cayley-Disckson construction
 *
 * @params {Object} field
 * @params {Number} iterations
 *
 * @returns {Object} algebra
 */

function constructCayleyDicksonAlgebra (field, iterations) {
  if (! (iterations in {0: 'real', 1: 'complex', 2: 'quaternion', 3: 'octonion'}))
    throw new TypeError('Num of iterations must be 1, 2 or 3')

  if (iterations === 0)
    return field

  // identities

  var one  = [],
      zero = [],
      dim  = twoPow(iterations)

  one.push(field.one)
  zero.push(field.zero)

  for (var i = 1; i < dim; i++) {
    one.push(field.zero)
    zero.push(field.zero)
  }

  // operators

  function equality (a, b) {
    for (var i = 0; i < dim; i++)
      if (field.disequality(a[i], b[i]))
        return false

    return true
  }

  function contains (a) {
    for (var i = 0; i < dim; i++)
      if (field.notContains(a[i]))
        return false

    return true
  }

  /**
   * Turn unary operator on single value to operator on n values.
   */

 function arrayfy1 (operator, dim) {
    return function (a) {
      if (dim === 1)
        return [operator(a)]

      var b = []

      for (var i = 0; i < dim; i++)
        b.push(operator(a[i]))

      return b
    }
 }

  /**
   * Turn binary operator on single value to operator on n values.
   */

 function arrayfy2 (operator, dim) {
    return function (a, b) {
      if (dim === 1)
        return [operator(a, b)]

      var c = []

      for (var i = 0; i < dim; i++)
        c.push(operator(a[i], b[i]))

      return c
    }
 }

  function buildConjugation (fieldNegation, iterations) {
    var dim = twoPow(iterations)

    if (dim === 1)
      return function (b) { return b[0] }

    // b -> p looks like complex conjugation simmetry (:
    function conjugation (b) {
      var p = [],
          halfDim = twoPow(iterations - 1),
          i = 0

      // First, copy half of b into q.
      for (i = 0; i < halfDim; i++)
        p.push(b[i])

      // Then conjugate b, according to lower algebra conjugation.
      // Note that if iterations - 1 == 0 it is the identity.
      p = buildConjugation(fieldNegation, iterations - 1)(b)

      for (i = halfDim; i < dim; i++)
        p.push(fieldNegation(b[i]))

      return p
    }

    return conjugation
  }

  var conjugation = buildConjugation(field.negation, iterations)

  function norm (a) {
    var n       = field.zero,
        squares = multiplication(a, conjugation(a))

    for (var i = 0; i < dim; i++)
      n = field.addition(n, squares[i])

    return n
  }

  function buildMultiplication (field, iterations) {
    var dim     = twoPow(iterations),
        halfDim = 1

    if (iterations === 0)
      return field.multiplication
    else
      halfDim = twoPow(iterations - 1)

    var add  = arrayfy2(field.addition, halfDim),
        conj = buildConjugation(field.negation, iterations -1),
        mul  = buildMultiplication(field, iterations - 1),
        neg  = arrayfy1(field.negation, halfDim)

    function multiplication (a, b) {
      var c = [],
          i = 0

      //         a = (p, q)
      //         b = (r, s)
      //
      // a + b = c = (t, u)

      var p = [], q = [],
          r = [], s = []

      for (i = 0; i < halfDim; i++) {
        p.push(a[i])
        r.push(b[i])
      }

      for (i = halfDim; i < dim; i++) {
        q.push(a[i])
        s.push(b[i])
      }

      // let denote conj(x) as x`
      //
      // Multiplication law is given by
      //
      // (p, q)(r, s) = (pr - s`q, sp + qr`)

      var t = add(mul(p, r), neg(mul(conj(s), q))),
          u = add(mul(s, p), mul(q, conj(r)))

      for (i = 0; i < halfDim; i++)
        c.push(t[i])

      for (i = halfDim; i < dim; i++)
        c.push(u[i])

      return c
    }

    return multiplication
  }

  var multiplication = buildMultiplication(field, iterations)

  function inversion (a) {
    var n = norm(a)

    var b = conjugation(a)

    for (var i = 0; i < dim; i++)
      b[i] = field.division(b[i], n)

    return b
  }

  var addition = arrayfy2(field.addition, dim),
      negation = arrayfy1(field.negation, dim)

  var algebra = ring([zero, one], {
    contains       : contains,
    equality       : equality,
    addition       : addition,
    negation       : negation,
    multiplication : multiplication,
    inversion      : inversion
  })

  algebra.conjugation = conjugation
  algebra.norm        = norm

  return algebra
}

module.exports = constructCayleyDicksonAlgebra


},{"./ring":20}],16:[function(require,module,exports){

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


},{"./toData":22}],17:[function(require,module,exports){

var algebraGroup = require('algebra-group'),
    coerced      = require('./coerced'),
    comparison   = require('./comparison'),
    Element      = require('./Element'),
    mutator      = require('./mutator'),
    inherits     = require('inherits')

var nAryMutator  = mutator.nAry,
    unaryMutator = mutator.unary

/**
 * Create an algebra group.
 *
 * @param {Object} given
 * @param {*}        given.identity a.k.a neutral element
 * @param {Function} given.contains
 * @param {Function} given.equality
 * @param {Function} given.compositionLaw
 * @param {Function} given.inversion
 * @param {Object} [naming]
 * @param {String} [naming.identity=zero]
 * @param {String} [naming.contains=contains]
 * @param {String} [naming.equality=equality]
 * @param {String} [naming.compositionLaw=addition]
 * @param {String} [naming.inversion=negation]
 * @param {String} [naming.inverseCompositionLaw=subtraction]
 * @param {String} [naming.notContains=notContains]
 *
 * @returns {Function} Group that implements an algebra group as a class
 */

function group (given, naming) {
  var g = algebraGroup(given, naming)

  function Group (data) {
    Element.call(this, data, given.contains)
  }

  inherits(Group, Element)

  var addition    = coerced(g.addition),
      contains    = coerced(g.contains),
      disequality = coerced(g.disequality),
      equality    = coerced(g.equality),
      negation    = coerced(g.negation),
      notContains = coerced(g.notContains),
      subtraction = coerced(g.subtraction)

  // Comparison operators.

  Group.prototype.equality    = comparison(equality)
  Group.prototype.disequality = comparison(disequality)

  // Chainable class methods.

  Group.prototype.addition    = nAryMutator(addition)
  Group.prototype.subtraction = nAryMutator(subtraction)
  Group.prototype.negation    = unaryMutator(negation)

  // Static operators.

  Group.addition       = addition
  Group.contains       = contains
  Group.disequality    = disequality
  Group.equality       = equality
  Group.negation       = negation
  Group.notContains    = notContains
  Group.subtraction    = subtraction

  // Identity.

  Object.defineProperty(Group, 'zero', {
    writable: false,
    value: g.zero
  })

  // Aliases.

  Group.eq = Group.equality
  Group.ne = Group.disequality

  Group.equal    = Group.equality
  Group.notEqual = Group.disequality
  Group.notEq    = Group.disequality

  Group.add = Group.addition
  Group.neg = Group.negation
  Group.sub = Group.subtraction

  Group.prototype.add = Group.prototype.addition
  Group.prototype.neg = Group.prototype.negation
  Group.prototype.sub = Group.prototype.subtraction

  return Group
}

module.exports = group


},{"./Element":9,"./coerced":13,"./comparison":14,"./mutator":19,"algebra-group":2,"inherits":5}],18:[function(require,module,exports){

/**
 * Convert a pair of indices to a 1-dimensional index
 *
 * @function
 * @param {Number} i index row
 * @param {Number} j index column
 * @param {Number} numCols
 *
 * @returns {Number} index
 */

function matrixToArrayIndex (i, j, numCols) {
  return j + i * numCols
}

module.exports = matrixToArrayIndex


},{}],19:[function(require,module,exports){

function unaryMutator (operator) {
  return function () {
    this.data = operator(this.data)
    return this
  }
}

exports.unary = unaryMutator

function nAryMutator (operator) {
  return function () {
    this.data = operator.bind(null, this.data).apply(null, arguments)
    return this
  }
}

exports.nAry = nAryMutator


},{}],20:[function(require,module,exports){

var algebraRing = require('algebra-ring'),
    coerced     = require('./coerced'),
    comparison  = require('./comparison'),
    Element     = require('./Element'),
    mutator     = require('./mutator'),
    inherits    = require('inherits')

var nAryMutator  = mutator.nAry,
    unaryMutator = mutator.unary

/**
 * Create an algebra ring.
 *
 * @params {Array} identity
 * @params {Array} identity[0] a.k.a. zero
 * @params {Array} identity[1] a.k.a. uno
 * @params {Object} given operator functions
 * @param {Function} given.contains
 * @param {Function} given.equality
 * @param {Function} given.addition
 * @param {Function} given.negation
 * @param {Function} given.multiplication
 * @param {Function} given.inversion
 *
 * @returns {Function} Ring that implements an algebra ring as a class
 */

function ring (identity, given) {
  var r = algebraRing(identity, given)

  function Ring (data) {
    Element.call(this, data, given.contains)
  }

  inherits(Ring, Element)

  // Note that many code in ring.js is almost the same of group.js:
  // copy and paste over inheritance!

  var addition    = coerced(r.addition),
      contains    = coerced(r.contains),
      disequality = coerced(r.disequality),
      equality    = coerced(r.equality),
      negation    = coerced(r.negation),
      notContains = coerced(r.notContains),
      subtraction = coerced(r.subtraction)

  var multiplication = coerced(r.multiplication),
      division       = coerced(r.division),
      inversion      = coerced(r.inversion)

  // Comparison operators.

  Ring.prototype.equality    = comparison(equality)
  Ring.prototype.disequality = comparison(disequality)

  // Chainable class methods.

  Ring.prototype.addition    = nAryMutator(addition)
  Ring.prototype.subtraction = nAryMutator(subtraction)
  Ring.prototype.negation    = unaryMutator(negation)

  Ring.prototype.multiplication = nAryMutator(multiplication)
  Ring.prototype.division       = nAryMutator(division)
  Ring.prototype.inversion      = unaryMutator(r.inversion)

  // Static operators.

  Ring.addition    = addition
  Ring.contains    = contains
  Ring.disequality = disequality
  Ring.equality    = equality
  Ring.negation    = negation
  Ring.notContains = notContains
  Ring.subtraction = subtraction

  Ring.multiplication = multiplication
  Ring.division       = division
  Ring.inversion      = inversion

  // Aliases.

  Ring.eq = Ring.equality
  Ring.ne = Ring.disequality

  Ring.equal    = Ring.equality
  Ring.notEqual = Ring.disequality
  Ring.notEq    = Ring.disequality

  Ring.add = Ring.addition
  Ring.neg = Ring.negation
  Ring.sub = Ring.subtraction

  Ring.div = Ring.division
  Ring.inv = Ring.inversion
  Ring.mul = Ring.multiplication

  Ring.prototype.add = Ring.prototype.addition
  Ring.prototype.neg = Ring.prototype.negation
  Ring.prototype.sub = Ring.prototype.subtraction

  Ring.prototype.mul = Ring.prototype.multiplication
  Ring.prototype.div = Ring.prototype.division
  Ring.prototype.inv = Ring.prototype.inversion

  // Identities.

  Object.defineProperties(Ring, {
    'zero': {
      writable: false,
      value: identity[0]
    },
    'one': {
      writable: false,
      value: identity[1]
    }
  })

  return Ring
}

module.exports = ring


},{"./Element":9,"./coerced":13,"./comparison":14,"./mutator":19,"algebra-ring":3,"inherits":5}],21:[function(require,module,exports){

var matrixToArrayIndex = require('./matrixToArrayIndex')

/**
 * Multiply two matrices, row by column.
 *
 * @function
 *
 * @api private
 *
 * @param {Object}   scalar
 * @param {Function} scalar.addition
 * @param {Function} scalar.multiplication
 * @param {Array} leftMatrix
 * @param {Array} leftIndices
 * @param {Array} rightMatrix
 * @param {Array} rightIndices
 *
 * @returns {Array} data
 */

function rowByColumnMultiplication (scalar, leftMatrix, leftIndices, rightMatrix, rightIndices) {
  // Check if matrices can be multiplied.
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

      var element = scalar.multiplication(leftElement, rightElement)

      for (var k = 1; k < commonIndex; k++) {
        leftIndex = matrixToArrayIndex(i, k, commonIndex)
        rightIndex = matrixToArrayIndex(k, j, cols)

        rightElement = rightMatrix[rightIndex]
        leftElement = leftMatrix[leftIndex]

        element = scalar.addition(element, scalar.multiplication(rightElement, leftElement))
      }

      data.push(element)
    }
  }

  return data
}

module.exports = rowByColumnMultiplication


},{"./matrixToArrayIndex":18}],22:[function(require,module,exports){

/**
 * Extract data attribute, if any, and check it
 *
 * @api private
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


},{}]},{},[1])(1)
});