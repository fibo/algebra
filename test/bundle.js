(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

require('strict-mode')(function () {
  var Cyclic = require('./src/Cyclic');
  exports.Cyclic = Cyclic;

  var Scalar = require('./src/Scalar');
  exports.Scalar = Scalar;

  var field = require('./src/realField');

  var Real = Scalar(field, 1);
  var Complex = Scalar(field, 2);
  var Quaternion = Scalar(field, 4);
  var Octonion = Scalar(field, 8);

  exports.Real = Real;
  exports.Complex = Complex;
  exports.Quaternion = Quaternion;
  exports.Octonion = Octonion;

  var VectorSpace = require('./src/VectorSpace');
  var MatrixSpace = require('./src/MatrixSpace');

  exports.C = Complex;
  exports.H = Quaternion;
  exports.R = Real;
  exports.R2 = VectorSpace(Real)(2);
  exports.R3 = VectorSpace(Real)(3);
  exports.R2x2 = MatrixSpace(Real)(2);

  exports.VectorSpace = VectorSpace;
  exports.MatrixSpace = MatrixSpace;
  exports.TensorSpace = require('./src/TensorSpace');
});

},{"./src/Cyclic":29,"./src/MatrixSpace":30,"./src/Scalar":31,"./src/TensorSpace":32,"./src/VectorSpace":33,"./src/realField":37,"strict-mode":23}],2:[function(require,module,exports){
var algebraRing = require('algebra-ring')
var staticProps = require('static-props')

var pkg = require('./package.json')

/**
 * Prepend package name to error message
 */

function msg (str) {
  return pkg.name + ': ' + str
}

var error = {}

staticProps(error)({
  groupCardinalityIsNotPrime: msg('elements length must be prime'),
  elementsAreNotUnique: msg('elements must be unique')
})

/**
 * Check if a number is prime
 *
 * @param {Number} n
 *
 * @returns {Boolean}
 */

function isPrime (n) {
  if (n === 1) return false
  if (n === 2) return true

  var m = Math.sqrt(n)

  for (var i = 2; i <= m; i++) if (n % i === 0) return false

  return true
}

/**
 * Check if given elements are unique
 *
 * @param {Array} elements
 *
 * @returns {Boolean}
 */

function unique (elements) {
  for (var i = 0; i < elements.length - 1; i++) {
    for (var j = i + 1; j < elements.length; j++) {
      if (elements[i] === elements[j]) return false
    }
  }

  return true
}

/**
 * Construct a space isomorphic to Zp: the cyclic group of order p, where p is prime.
 *
 * @param {Array|String} elements
 *
 * @returns {Object} cyclic ring
 */

function algebraCyclic (elements) {
  if (!isPrime(elements.length)) {
    throw new TypeError(error.groupCardinalityIsNotPrime)
  }

  if (!unique(elements)) {
    throw new TypeError(error.elementsAreNotUnique)
  }

  var zero = elements[0]
  var one = elements[1]

  function numOf (element) {
    return elements.indexOf(element)
  }

  function addition (element1, element2) {
    var n = numOf(element1) + numOf(element2)

    n = n % elements.length

    return elements[n]
  }

  function contains (element) {
    return elements.indexOf(element) > -1
  }

  function multiplication (element1, element2) {
    var n = numOf(element1) * numOf(element2)

    n = n % elements.length

    return elements[n]
  }

  function inversion (element) {
    for (var i = 0; i < elements.length; i++) {
      if (elements[1] === multiplication(element, elements[i])) {
        return elements[i]
      }
    }
  }

  function negation (element) {
    var n = numOf(element)

    if (n === 0) return element

    n = elements.length - n

    return elements[n]
  }

  function equality (element1, element2) {
    return element1 === element2
  }

  return algebraRing([zero, one], {
    equality: equality,
    contains: contains,
    addition: addition,
    negation: negation,
    multiplication: multiplication,
    inversion: inversion
  })
}

staticProps(algebraCyclic)({ error: error })

module.exports = algebraCyclic

},{"./package.json":4,"algebra-ring":6,"static-props":3}],3:[function(require,module,exports){
function staticProps (obj) {
  return function (props) {
    var statik = {}

    for (var propName in props) {
      var propValue = props[propName]

      statik[propName] = {
        value: propValue,
        configurable: false,
        enumerable: false,
        writable: false
      }
    }

    Object.defineProperties(obj, statik)
  }
}

module.exports = staticProps

},{}],4:[function(require,module,exports){
module.exports={
  "_args": [
    [
      "algebra-cyclic@^0.2.0",
      "/home/io/github.com/fibo/algebra"
    ]
  ],
  "_from": "algebra-cyclic@>=0.2.0 <0.3.0",
  "_id": "algebra-cyclic@0.2.0",
  "_inCache": true,
  "_installable": true,
  "_location": "/algebra-cyclic",
  "_nodeVersion": "4.2.2",
  "_npmOperationalInternal": {
    "host": "packages-16-east.internal.npmjs.com",
    "tmp": "tmp/algebra-cyclic-0.2.0.tgz_1460327024377_0.46814342867583036"
  },
  "_npmUser": {
    "email": "casati_gianluca@yahoo.it",
    "name": "fibo"
  },
  "_npmVersion": "3.7.2",
  "_phantomChildren": {},
  "_requested": {
    "name": "algebra-cyclic",
    "raw": "algebra-cyclic@^0.2.0",
    "rawSpec": "^0.2.0",
    "scope": null,
    "spec": ">=0.2.0 <0.3.0",
    "type": "range"
  },
  "_requiredBy": [
    "/"
  ],
  "_shasum": "d66e5dd19c8dab497c9115456376b3ab84b7756b",
  "_shrinkwrap": null,
  "_spec": "algebra-cyclic@^0.2.0",
  "_where": "/home/io/github.com/fibo/algebra",
  "author": {
    "name": "Gianluca Casati",
    "url": "http://g14n.info"
  },
  "bugs": {
    "url": "https://github.com/fibo/algebra-cyclic/issues"
  },
  "dependencies": {
    "algebra-ring": "^0.5.0",
    "prime-number": "^0.1.0",
    "static-props": "^0.2.0"
  },
  "description": "creates a space isomorphic to Zp: the cyclic ring of order p, where p is prime",
  "devDependencies": {
    "pre-commit": "^1.1.2",
    "standard": "^5.4.1",
    "tape": "^4.5.1"
  },
  "directories": {},
  "dist": {
    "shasum": "d66e5dd19c8dab497c9115456376b3ab84b7756b",
    "tarball": "https://registry.npmjs.org/algebra-cyclic/-/algebra-cyclic-0.2.0.tgz"
  },
  "gitHead": "09e7d5ba863a93adaa75bf0e0f297e96df3f6dbd",
  "homepage": "https://github.com/fibo/algebra-cyclic",
  "keywords": [
    "math",
    "algebra",
    "prime",
    "cyclic"
  ],
  "license": "MIT",
  "main": "index.js",
  "maintainers": [
    {
      "email": "casati_gianluca@yahoo.it",
      "name": "fibo"
    }
  ],
  "name": "algebra-cyclic",
  "optionalDependencies": {},
  "pre-commit": [
    "lint",
    "test"
  ],
  "readme": "ERROR: No README data found!",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/fibo/algebra-cyclic.git"
  },
  "scripts": {
    "check-deps": "npm outdated",
    "lint": "standard",
    "postversion": "git push origin v${npm_package_version}; npm publish; git push origin master",
    "test": "tape test.js"
  },
  "version": "0.2.0"
}

},{}],5:[function(require,module,exports){

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

  if (typeof given === 'undefined') {
    given = {}
  }

  if (typeof naming === 'undefined') {
    naming = {}
  }

  // default attribute naming

  var defaultNaming = {
    compositionLaw: 'addition',
    identity: 'zero',
    inverseCompositionLaw: 'subtraction',
    inversion: 'negation'
  }

  function prop (name) {
    if (typeof naming[name] === 'string') {
      return naming[name]
    }

    if (typeof defaultNaming[name] === 'string') {
      return defaultNaming[name]
    }

    return name
  }

  // operators

  function compositionLaw () {
    return [].slice.call(arguments).reduce(given.compositionLaw)
  }

  function contains () {
    var arg = [].slice.call(arguments)

    for (var i in arg) {
      if (!given.contains(arg[i])) {
        return false
      }
    }

    return true
  }

  function notContains (a) { return !contains(a) }

  function disequality (a, b) { return !given.equality(a, b) }

  function inverseCompositionLaw (a) {
    var rest = [].slice.call(arguments, 1)

    return compositionLaw(a, rest.map(given.inversion).reduce(given.compositionLaw))
  }

  group[prop('contains')] = contains
  group[prop('notContains')] = notContains
  group[prop('compositionLaw')] = compositionLaw
  group[prop('inversion')] = given.inversion
  group[prop('inverseCompositionLaw')] = inverseCompositionLaw
  group[prop('equality')] = given.equality
  group[prop('disequality')] = disequality

  // identity element
  var e = given.identity

  if (notContains(e)) {
    throw new TypeError('algebra-group: "identity" must be contained in group set')
  }

  // Check that e+e=e.
  if (disequality(given.compositionLaw(e, e), e)) {
    throw new TypeError('algebra-group: "identity" is not neutral')
  }

  group[prop('identity')] = e

  return group
}

module.exports = algebraGroup

},{}],6:[function(require,module,exports){
var group = require('algebra-group')
var staticProps = require('static-props')

var error = {
  cannotDivideByZero: 'algebra-ring: Cannot divide by zero',
  doesNotContainIdentity: 'algebra-ring: "identity" must be contained in ring set',
  identityIsNotNeutral: 'algebra-ring: "identity" is not neutral'
}

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
    identity: identity[0],
    contains: given.contains,
    equality: given.equality,
    compositionLaw: given.addition,
    inversion: given.negation
  })

  // operators

  function multiplication () {
    return [].slice.call(arguments).reduce(given.multiplication)
  }

  function inversion (a) {
    if (ring.equality(a, ring.zero)) {
      throw new TypeError(error.cannotDivideByZero)
    }

    return given.inversion(a)
  }

  function division (a) {
    var rest = [].slice.call(arguments, 1)

    return given.multiplication(a, rest.map(inversion).reduce(given.multiplication))
  }

  ring.multiplication = multiplication
  ring.inversion = inversion
  ring.division = division

  // Multiplicative identity.

  var one = identity[1]

  if (ring.notContains(one)) {
    throw new TypeError(error.doesNotContainIdentity)
  }

  // Check that one*one=one.
  if (ring.disequality(given.multiplication(one, one), one)) {
    throw new TypeError(error.identityIsNotNeutral)
  }

  if (ring.notContains(identity[1])) {
    throw new TypeError(error.doesNotContainIdentity)
  }

  ring.one = identity[1]

  return ring
}

staticProps(algebraRing)({error: error})

module.exports = algebraRing

},{"algebra-group":5,"static-props":7}],7:[function(require,module,exports){
arguments[4][3][0].apply(exports,arguments)
},{"dup":3}],8:[function(require,module,exports){
var ring = require('algebra-ring')
var twoPow = Math.pow.bind(null, 2)

/**
 * Turn unary operator on single value to operator on n values.
 */

function arrayfy1 (operator, dim) {
  return function (a) {
    var b = []

    for (var i = 0; i < dim; i++) {
      b.push(operator(a[i]))
    }

    return b
  }
}

/**
 * Turn binary operator on single value to operator on n values.
 */

function arrayfy2 (operator, dim) {
  return function (a, b) {
    var c = []

    for (var i = 0; i < dim; i++) {
      c.push(operator(a[i], b[i]))
    }

    return c
  }
}

/**
 * Iterate Cayley-Disckson construction
 *
 * @params {Object} given field
 * @params {*} given.zero
 * @params {*} given.one
 * @params {Function} given.equality
 * @params {Function} given.contains
 * @params {Function} given.addition
 * @params {Function} given.negation
 * @params {Function} given.multiplication
 * @params {Function} given.inversion
 * @params {Number} iterations
 *
 * @returns {Object} algebra
 */

function iterateCayleyDickson (given, iterations) {
  var field = ring([given.zero, given.one], given)

  if (iterations === 0) {
    return field
  }

  var fieldZero = field.zero
  var fieldOne = field.one
  var fieldAddition = field.addition
  var fieldMultiplication = field.multiplication
  var fieldNegation = field.negation
  var fieldDisequality = field.disequality
  var fieldNotContains = field.notContains

  // identities

  var one = []
  var zero = []
  var dim = twoPow(iterations)

  one.push(fieldOne)
  zero.push(fieldZero)

  for (var i = 1; i < dim; i++) {
    one.push(fieldZero)
    zero.push(fieldZero)
  }

  // operators

  function equality (a, b) {
    for (var i = 0; i < dim; i++) {
      if (fieldDisequality(a[i], b[i])) {
        return false
      }
    }

    return true
  }

  function contains (a) {
    for (var i = 0; i < dim; i++) {
      if (fieldNotContains(a[i])) {
        return false
      }
    }

    return true
  }

  function buildConjugation (fieldNegation, iterations) {
    if (iterations === 0) {
      return function (a) { return a }
    }

    var dim = twoPow(iterations)

    // b -> p looks like complex conjugation simmetry (:
    function conjugation (b) {
      var p = [b[0]]

      // First, copy half of b into q.
      for (var i = 1; i < dim; i++) {
        p.push(fieldNegation(b[i]))
      }

      return p
    }

    return conjugation
  }

  var conjugation = buildConjugation(fieldNegation, iterations)

  function buildMultiplication (fieldAddition, fieldNegation, fieldMultiplication, iterations) {
    if (iterations === 0) {
      return function (a, b) { return [fieldMultiplication(a, b)] }
    }

    var dim = twoPow(iterations)
    var halfDim = twoPow(iterations - 1)

    var add = arrayfy2(fieldAddition, halfDim)
    var conj = buildConjugation(fieldNegation, iterations - 1)
    var mul = buildMultiplication(fieldAddition, fieldNegation, fieldMultiplication, iterations - 1)
    var neg = arrayfy1(fieldNegation, halfDim)

    function multiplication (a, b) {
      var c = []

      //         a = (p, q)
      //         +    +  +
      //         b = (r, s)
      //         =    =  =
      // a + b = c = (t, u)

      var p = []
      var q = []
      var r = []
      var s = []

      for (var i1 = 0; i1 < halfDim; i1++) {
        p.push(a[i1])
        r.push(b[i1])
      }

      for (var i2 = halfDim; i2 < dim; i2++) {
        q.push(a[i2])
        s.push(b[i2])
      }

      // let denote conj(x) as x`
      //
      // Multiplication law is given by
      //
      // (p, q)(r, s) = (pr - s`q, sp + qr`)

      var t = add(mul(p, r), neg(mul(conj(s), q)))
      var u = add(mul(s, p), mul(q, conj(r)))

      for (var i3 = 0; i3 < halfDim; i3++) {
        c.push(t[i3])
      }

      for (var i4 = 0; i4 < halfDim; i4++) {
        c.push(u[i4])
      }

      return c
    }

    return multiplication
  }

  var multiplication = buildMultiplication(fieldAddition, fieldNegation, fieldMultiplication, iterations)

  function norm (a) {
    var n = fieldZero
    var squares = multiplication(a, conjugation(a))

    for (var i = 0; i < dim; i++) {
      n = fieldAddition(n, squares[i])
    }

    return n
  }

  function inversion (a) {
    var n = norm(a)
    var b = conjugation(a)

    for (var i = 0; i < dim; i++) {
      b[i] = field.division(b[i], n)
    }

    return b
  }

  var addition = arrayfy2(fieldAddition, dim)
  var negation = arrayfy1(fieldNegation, dim)

  // Cayley-Dickson construction take a field as input but the result can be often a ring,
  // this means that it can be *not-commutative*.
  // To elevate it to an algebra, we need a bilinear form wich is given by the norm.
  var algebra = ring([zero, one], {
    contains: contains,
    equality: equality,
    addition: addition,
    negation: negation,
    multiplication: multiplication,
    inversion: inversion
  })

  algebra.conjugation = conjugation
  algebra.norm = norm

  return algebra
}

module.exports = iterateCayleyDickson


},{"algebra-ring":9}],9:[function(require,module,exports){
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
    identity: identity[0],
    contains: given.contains,
    equality: given.equality,
    compositionLaw: given.addition,
    inversion: given.negation
  })

  // operators

  function multiplication () {
    return [].slice.call(arguments).reduce(given.multiplication)
  }

  function inversion (a) {
    if (ring.equality(a, ring.zero)) {
      throw new TypeError('algebra-ring: Cannot divide by zero.')
    }

    return given.inversion(a)
  }

  function division (a) {
    var rest = [].slice.call(arguments, 1)

    return given.multiplication(a, rest.map(given.inversion).reduce(given.multiplication))
  }

  ring.multiplication = multiplication
  ring.inversion = inversion
  ring.division = division

  // Multiplicative identity.

  var one = identity[1]

  if (ring.notContains(one)) {
    throw new TypeError('algebra-ring: "identity" must be contained in ring set')
  }

  // Check that one*one=one.
  if (ring.disequality(given.multiplication(one, one), one)) {
    throw new TypeError('algebra-ring: "identity" is not neutral')
  }

  if (ring.notContains(identity[1])) {
    throw new TypeError('algebra-ring:"identity" must be contained in ring set')
  }

  ring.one = identity[1]

  return ring
}

module.exports = algebraRing

},{"algebra-group":5}],10:[function(require,module,exports){
function indicesPermutations (previousValue, currentValue, currentIndex, array) {
  var result = []

  if (array.length === 1) {
    for (var i = 0; i < currentValue; i++) {
      result.push([i])
    }
  } else {
    var arrayWithoutLastElement = []

    for (var j = 0; j < array.length - 1; j++) {
      arrayWithoutLastElement.push(array[j])
    }

    var previousIteration = arrayWithoutLastElement.reduce(indicesPermutations, [])

    for (var l = 0; l < previousIteration.length; l++) {
      for (var k = 0; k < currentValue; k++) {
        result.push(previousIteration[l].concat(k))
      }
    }
  }

  return result
}

module.exports = indicesPermutations

},{}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
'use strict';
var numberIsNan = require('number-is-nan');

module.exports = Number.isFinite || function (val) {
	return !(typeof val !== 'number' || numberIsNan(val) || val === Infinity || val === -Infinity);
};

},{"number-is-nan":21}],13:[function(require,module,exports){
// https://github.com/paulmillr/es6-shim
// http://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.isinteger
var isFinite = require("is-finite");
module.exports = Number.isInteger || function(val) {
  return typeof val === "number" &&
    isFinite(val) &&
    Math.floor(val) === val;
};

},{"is-finite":12}],14:[function(require,module,exports){

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

/**
 * Compute the sub-matrix formed by deleting the i-th row and j-th column
 *
 * @function
 *
 * @param {Array} data set
 * @param {Number} numRows
 * @param {Number} numCols
 * @param {Number} row index deleted
 * @param {Number} col index deleted
 *
 * @returns {Array} sub data-set
 */

function subMatrix (data, numRows, numCols, row, col) {
  var sub = []

  for (var i = 0; i < numRows; i++)
    for (var j = 0; j < numCols; j++)
      if ((i !== row) && (j !== col))
        sub.push(data[matrixToArrayIndex(i, j, numCols)])

  return sub
}

/**
 * Computes the determinant of a matrix using Laplace's formula
 *
 * See https://en.wikipedia.org/wiki/Laplace_expansion
 *
 * @function
 *
 * @param {Array} data, lenght must be a square.
 * @param {Object} [scalar]
 * @param {Function} [scalar.addition       = (a, b) -> a + b ]
 * @param {Function} [scalar.multiplication = (a, b) -> a * b ]
 * @param {Function} [scalar.negation       = (a)    -> -a    ]
 * @param {Number} [order], defaults to Math.sqrt(data.length)
 *
 * @returns {*} det
 */

function determinant (data, scalar, order) {
  // Recursion will stop here:
  // the determinant of a 1x1 matrix is its only element.
  if (data.length === 1)
    return data[0]

  if (typeof order === 'undefined')
    order = Math.sqrt(data.length)

  if (order % 1 !== 0)
    throw new TypeError('data.lenght must be a square')

  // Default to common real number field.
  if (typeof scalar === 'undefined') {
    scalar = {
      addition      : function (a, b) { return a + b },
      multiplication: function (a, b) { return a * b },
      negation      : function (a) { return -a }
    }
  }

  var det

  // TODO choose best row or column to start from, i.e. the one with more zeros
  // by now we start from first row, and walk by column
  // needs scalar.isZero
  //
  // is scalar.isZero is a function will be used, but should remain optional
  var startingCol = 0,
      startingRow = 0

  for (var col = 0; col < order; col++) {
    var subData = subMatrix(data, order, order, startingRow, col)

                // +-- Recursion here.
                // ↓
    var cofactor = determinant(subData, scalar, order - 1)

    if ((startingRow + col) % 2 === 1)
      cofactor = scalar.negation(cofactor)

    var index = matrixToArrayIndex(startingRow, col, order)

    if (typeof det === 'undefined')
      det = scalar.multiplication(data[index], cofactor) // first iteration
    else
      det = scalar.addition(det, scalar.multiplication(data[index], cofactor))
  }

  return det
}

module.exports = determinant


},{}],15:[function(require,module,exports){
var isInteger = require('is-integer')
var no = require('not-defined')
var staticProps = require('static-props')

var pkg = require('./package.json')

/**
 * Prepend package name to error message
 */

function msg (str) {
  return pkg.name + ': ' + str
}

var error = {}

staticProps(error)({
  leftMatrixNotCompatible: msg('Cannot multiply matrix at left side'),
  rightMatrixNotCompatible: msg('Cannot multiply matrix at right side')
})

function matrixToArrayIndex (i, j, numCols) {
  return j + i * numCols
}

function realAddition (a, b) { return a + b }

function realMultiplication (a, b) { return a * b }

/**
 * Multiply two matrices, row by column.
 *
 * @param {Number} customOperator
 * @param {Function} [customOperator.addition]
 * @param {Function} [customOperator.multiplication]
 *
 * @returns {Function} operator
 */

function matrixMultiplication (customOperator) {
  // operators

  var op = {}

  if (no(customOperator)) customOperator = {}

  var customAdd = customOperator.addition
  var customMul = customOperator.multiplication

  if (no(customAdd)) op.add = realAddition
  else op.add = customAdd

  if (no(customMul)) op.mul = realMultiplication
  else op.mul = customMul

 /**
  * @param {Number} middle
  *
  * @returns {Function} mul
  */

  return function (middle) {
   /**
    * @param {Array} leftMatrix
    * @param {Array} rightMatrix
    *
    * @returns {Array} matrix
    */

    return function (leftMatrix, rightMatrix) {
      // Left num rows
      var rows = leftMatrix.length / middle
      // Right num cols
      var cols = rightMatrix.length / middle

      if (!isInteger(rows)) {
        throw new TypeError(error.leftMatrixNotCompatible)
      }

      if (!isInteger(cols)) {
        throw new TypeError(error.rightMatrixNotCompatible)
      }

      var data = []

      for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
          var leftIndex = matrixToArrayIndex(i, 0, middle)
          var rightIndex = matrixToArrayIndex(0, j, cols)

          var rightElement = rightMatrix[rightIndex]
          var leftElement = leftMatrix[leftIndex]

          var element = op.mul(leftElement, rightElement)

          for (var k = 1; k < middle; k++) {
            leftIndex = matrixToArrayIndex(i, k, middle)
            rightIndex = matrixToArrayIndex(k, j, cols)

            rightElement = rightMatrix[rightIndex]
            leftElement = leftMatrix[leftIndex]

            element = op.add(element, op.mul(rightElement, leftElement))
          }

          data.push(element)
        }
      }

      return data
    }
  }
}

staticProps(matrixMultiplication)({ error: error })

module.exports = matrixMultiplication

},{"./package.json":17,"is-integer":13,"not-defined":20,"static-props":16}],16:[function(require,module,exports){
arguments[4][3][0].apply(exports,arguments)
},{"dup":3}],17:[function(require,module,exports){
module.exports={
  "_args": [
    [
      "matrix-multiplication@^0.4.0",
      "/home/io/github.com/fibo/algebra"
    ]
  ],
  "_from": "matrix-multiplication@>=0.4.0 <0.5.0",
  "_id": "matrix-multiplication@0.4.0",
  "_inCache": true,
  "_installable": true,
  "_location": "/matrix-multiplication",
  "_nodeVersion": "4.2.2",
  "_npmOperationalInternal": {
    "host": "packages-16-east.internal.npmjs.com",
    "tmp": "tmp/matrix-multiplication-0.4.0.tgz_1460154669918_0.5360936403740197"
  },
  "_npmUser": {
    "email": "casati_gianluca@yahoo.it",
    "name": "fibo"
  },
  "_npmVersion": "3.7.2",
  "_phantomChildren": {},
  "_requested": {
    "name": "matrix-multiplication",
    "raw": "matrix-multiplication@^0.4.0",
    "rawSpec": "^0.4.0",
    "scope": null,
    "spec": ">=0.4.0 <0.5.0",
    "type": "range"
  },
  "_requiredBy": [
    "/"
  ],
  "_shasum": "d63c0885ecd788fa9290c16f483ef50fa16c13a1",
  "_shrinkwrap": null,
  "_spec": "matrix-multiplication@^0.4.0",
  "_where": "/home/io/github.com/fibo/algebra",
  "author": {
    "name": "Gianluca Casati",
    "url": "http://g14n.info"
  },
  "bugs": {
    "url": "https://github.com/fibo/matrix-multiplication/issues"
  },
  "dependencies": {
    "is-integer": "^1.0.6",
    "not-defined": "^1.0.0",
    "static-props": "^0.2.0"
  },
  "description": "implements row by column multiplication",
  "devDependencies": {
    "pre-commit": "^1.1.2",
    "standard": "^6.0.4",
    "tape": "^4.2.0"
  },
  "directories": {},
  "dist": {
    "shasum": "d63c0885ecd788fa9290c16f483ef50fa16c13a1",
    "tarball": "https://registry.npmjs.org/matrix-multiplication/-/matrix-multiplication-0.4.0.tgz"
  },
  "gitHead": "a641d34ec6993e1f276e62e15258f009e185f2b4",
  "homepage": "http://npm.im/matrix-multiplication",
  "keywords": [
    "algebra"
  ],
  "license": "MIT",
  "main": "index.js",
  "maintainers": [
    {
      "email": "casati_gianluca@yahoo.it",
      "name": "fibo"
    }
  ],
  "name": "matrix-multiplication",
  "optionalDependencies": {},
  "pre-commit": [
    "lint",
    "test",
    "check-deps"
  ],
  "readme": "ERROR: No README data found!",
  "repository": {
    "type": "git",
    "url": "git://github.com/fibo/matrix-multiplication.git"
  },
  "scripts": {
    "check-deps": "npm outdated",
    "lint": "standard",
    "postversion": "git push origin v${npm_package_version}; npm publish; git push origin master",
    "test": "tape test.js"
  },
  "version": "0.4.0"
}

},{}],18:[function(require,module,exports){
var staticProps = require('static-props')

var pkg = require('./package.json')

/**
 * Prepend package name to error message
 */

function msg (str) {
  return pkg.name + ': ' + str
}

var error = {}

staticProps(error)({
  outOfBoundIndex: msg('Index exceeds its bound')
})

/**
 * Maps multidimensional array indices to monodimensional array index
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
 * @param {Array} dimensions
 * @param {Array} indices
 * @returns {Number} index
 */

function multiDimArrayIndex (dimensions, indices) {
  // Check that indices fit inside dimensions shape.
  for (var i = 0; i < dimensions.length; i++) {
    if (indices[i] > dimensions[i]) {
      throw new TypeError(error.outOfBoundIndex)
    }
  }

  var order = dimensions.length

  // Handle order 1
  if (order === 1) return indices[0]

 //* index = i_n + i_(n-1) * d_n + i_(n-2) * d_n * d_(n-1) + ... + i_2 * d_n * d_(n-1) * ... * d_3 + i_1 * d_n * ... * d_2
  var n = order - 1
  var factor = dimensions[n] // d_n
  var index = indices[n] + factor * indices[n - 1] // i_n + i_(n-1) * d_n

  for (var j = 2; j < order; j++) {
    factor *= dimensions[n - j]

    index += factor * indices[n - j]
  }

  return index
}

staticProps(multiDimArrayIndex)({ error: error })

module.exports = multiDimArrayIndex

},{"./package.json":19,"static-props":22}],19:[function(require,module,exports){
module.exports={
  "_args": [
    [
      "multidim-array-index@^0.5.0",
      "/home/io/github.com/fibo/algebra"
    ]
  ],
  "_from": "multidim-array-index@>=0.5.0 <0.6.0",
  "_id": "multidim-array-index@0.5.0",
  "_inCache": true,
  "_installable": true,
  "_location": "/multidim-array-index",
  "_nodeVersion": "4.2.2",
  "_npmOperationalInternal": {
    "host": "packages-16-east.internal.npmjs.com",
    "tmp": "tmp/multidim-array-index-0.5.0.tgz_1460790776022_0.695659349905327"
  },
  "_npmUser": {
    "email": "casati_gianluca@yahoo.it",
    "name": "fibo"
  },
  "_npmVersion": "3.7.2",
  "_phantomChildren": {},
  "_requested": {
    "name": "multidim-array-index",
    "raw": "multidim-array-index@^0.5.0",
    "rawSpec": "^0.5.0",
    "scope": null,
    "spec": ">=0.5.0 <0.6.0",
    "type": "range"
  },
  "_requiredBy": [
    "/"
  ],
  "_shasum": "34aceea031769c419df016819329142b0332bd07",
  "_shrinkwrap": null,
  "_spec": "multidim-array-index@^0.5.0",
  "_where": "/home/io/github.com/fibo/algebra",
  "author": {
    "name": "Gianluca Casati",
    "url": "http://g14n.info"
  },
  "bugs": {
    "url": "https://github.com/fibo/multidim-array-index/issues"
  },
  "dependencies": {
    "static-props": "^1.0.0"
  },
  "description": "maps multidimensional array indices to monodimensional array index",
  "devDependencies": {
    "standard": "^5.4.1",
    "tape": "^4.4.0"
  },
  "directories": {},
  "dist": {
    "shasum": "34aceea031769c419df016819329142b0332bd07",
    "tarball": "https://registry.npmjs.org/multidim-array-index/-/multidim-array-index-0.5.0.tgz"
  },
  "gitHead": "4476b7f91a74189b27be85f0d6f42f4d63928bfe",
  "homepage": "http://npm.im/multidim-array-index",
  "keywords": [
    "array",
    "multidim",
    "index"
  ],
  "license": "MIT",
  "main": "index.js",
  "maintainers": [
    {
      "email": "casati_gianluca@yahoo.it",
      "name": "fibo"
    }
  ],
  "name": "multidim-array-index",
  "optionalDependencies": {},
  "readme": "ERROR: No README data found!",
  "repository": {
    "type": "git",
    "url": "git://github.com/fibo/multidim-array-index.git"
  },
  "scripts": {
    "lint": "standard",
    "postversion": "git push origin v${npm_package_version}; npm publish; git push origin master",
    "test": "tape test.js"
  },
  "version": "0.5.0"
}

},{}],20:[function(require,module,exports){
module.exports=function(x){return typeof x==='undefined'}

},{}],21:[function(require,module,exports){
'use strict';
module.exports = Number.isNaN || function (x) {
	return x !== x;
};

},{}],22:[function(require,module,exports){
/**
 * @param {Object} obj
 * @returns {Function}
 */

function staticProps (obj) {
  /**
   * @param {Object} props
   * @param {Boolean} [enumerable]
   */
  return function (props, enumerable) {
    var staticProps = {}

    for (var propName in props) {
      var staticProp = {
        configurable: false,
        enumerable: enumerable
      }
      var prop = props[propName]

      if (typeof prop === 'function') staticProp.get = prop
      else {
        staticProp.value = prop

        staticProp.writable = false
      }

      staticProps[propName] = staticProp
    }
    Object.defineProperties(obj, staticProps)
  }
}
module.exports = staticProps

},{}],23:[function(require,module,exports){
// In browserify context, *strict-mode* fall back to a no op.
module.exports = function (cb) { cb() }

},{}],24:[function(require,module,exports){
var indicesPermutations = require('indices-permutations')
var multiDimArrayIndex = require('multidim-array-index')

/**
 * Computes tensor contraction
 *
 * @params {Function} addition
 * @params {Array} indicesPair
 * @params {Array} tensorDim
 * @params {Array} tensorData
 * @returns {Array} contractedTensorData
 */

function tensorContraction (addition, indicesPair, tensorDim, tensorData) {
  // Sort indices pair, otherwise algorithm gets unnecessary complicated.
  indicesPair.sort()

  var p0 = indicesPair[0]
  var p1 = indicesPair[1]
  var dim0 = tensorDim[p0]
  var dim1 = tensorDim[p1]

  if (dim0 !== dim1) {
    throw new TypeError('Contraction indices does not have the same dimension: ' +
      p0 + '-th index = ' + dim0 + ' but ' + p1 + '-th index = ' + dim1 + '.')
  }

  function varyingTensorDim (result, element, index) {
    if ((index !== p0) && (index !== p1)) {
      result.push(element)
    }

    return result
  }

  function copyArray (result, element) {
    result.push(element)

    return result
  }

  function sumOverVarying (tensorData) {
    return function (result, varyingCombination) {
      var firstCombination = varyingCombination.reduce(copyArray, [])
      firstCombination.splice(p0, 0, 0)
      firstCombination.splice(p1, 0, 0)
      var firstIndex = multiDimArrayIndex(tensorDim, firstCombination)
      var element = tensorData[firstIndex]

      for (var i = 1; i < dim0; i++) {
        var combination = varyingCombination.reduce(copyArray, [])
        combination.splice(p0, 0, i)
        combination.splice(p1, 0, i)
        var index = multiDimArrayIndex(tensorDim, combination)
        element = addition(element, tensorData[index])
      }

      result.push(element)

      return result
    }
  }

  // If given tensor has order 2, the contracted tensor will be a scalar
  // so it makes sense to return an element, not an array.
  // Furthermore, varyingTensorDim will be an empty array so generic algorithm
  // will not even be triggered. Then it will be simply computed the trace.
  if (tensorDim.length === 2) {
    var trace = tensorData[0]

    for (var i = 1; i < dim0; i++) {
      var combination = [i, i]
      var index = multiDimArrayIndex(tensorDim, combination)
      trace = addition(trace, tensorData[index])
    }

    return trace
  } else {
    return tensorDim.reduce(varyingTensorDim, [])
                    .reduce(indicesPermutations, [])
                    .reduce(sumOverVarying(tensorData), [])
  }
}

module.exports = tensorContraction

},{"indices-permutations":10,"multidim-array-index":25}],25:[function(require,module,exports){
/**
 * maps multidimensional array indices to monodimensional array index
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
 * @function
 *
 * @param {Array} dimensions
 * @param {Array} indices
 * @returns {Number} index
 */

function multiDimArrayIndex (dimensions, indices) {
    var len = dimensions.length - 1
  var index = indices[len]
  var factor = null

  if (dimensions.length > 1) {
    factor = dimensions[len - 1]

    index += factor * indices[len - 1]
  }

  for (var i = 2; i < dimensions.length; i++) {
    factor *= dimensions[len - i + 1]

    index += factor * indices[len - i]
  }

  return index
}

module.exports = multiDimArrayIndex

},{}],26:[function(require,module,exports){
var indicesPermutations = require('indices-permutations')
var multiDimArrayIndex = require('multidim-array-index')

/**
 * Computes product of tensors
 *
 *
 * @param {Function} multiplication
 * @param {Array} leftDim
 * @param {Array} rightDim
 * @param {Array} rightData
 * @param {Array} leftData
 *
 * @returns {Array} tensorData
 */

function tensorProduct (multiplication, leftDim, rightDim, leftData, rightData) {
  var tensorData = []

  leftDim
    .reduce(indicesPermutations, [])
    .forEach(function (leftCombination) {
      var i = multiDimArrayIndex(leftDim, leftCombination)

      rightDim
        .reduce(indicesPermutations, [])
        .forEach(function (rightCombination) {
          var j = multiDimArrayIndex(rightDim, rightCombination)

          tensorData.push(multiplication(leftData[i], rightData[j]))
        })
    })

  return tensorData
}

module.exports = tensorProduct

},{"indices-permutations":10,"multidim-array-index":27}],27:[function(require,module,exports){
arguments[4][25][0].apply(exports,arguments)
},{"dup":25}],28:[function(require,module,exports){
'use strict';

var CayleyDickson = require('cayley-dickson');
var coerced = require('./coerced');
var operators = require('./operators.json');
var staticProps = require('static-props');
var toData = require('./toData');

/**
 * A composition algebra is one of ℝ, ℂ, ℍ, O:
 * Real, Complex, Quaternion, Octonion.
 *
 * https://en.wikipedia.org/wiki/Composition_algebra
 *
 * @param {Object} ring
 *
 * @returns {Function} anonymous with signature (numOfCayleyDicksonConstructionIteration)
 */

function CompositionAlgebra(ring) {
  /**
   * @param {Number} num of CayleyDickson construction iterations
   */

  return function (num) {
    var K = CayleyDickson(ring, num);

    function Scalar(data) {
      // validate data

      if (K.notContains(data)) {
        throw new TypeError('Invalid data = ' + data);
      }

      var enumerable = true;
      staticProps(this)({ data: data }, enumerable);

      staticProps(this)({
        zero: K.zero,
        one: K.one,
        order: 0
      });
    }

    staticProps(Scalar)({
      zero: K.zero,
      one: K.one,
      order: 0
    });

    var comparisonOperators = ['equality', 'disequality'];

    var binaryOperators = operators.group.concat(['multiplication', 'division']);

    function staticNary(operator) {
      Scalar[operator] = function () {
        var operands = [].slice.call(arguments).map(toData);
        return coerced(K[operator]).apply(null, operands);
      };
    }

    binaryOperators.forEach(function (operator) {
      staticNary(operator);

      Scalar.prototype[operator] = function () {
        var args = [].slice.call(arguments);
        var operands = [this.data].concat(args);

        var data = Scalar[operator].apply(null, operands);

        var scalar = new Scalar(data);

        return scalar;
      };
    });

    comparisonOperators.forEach(function (operator) {
      staticNary(operator);

      Scalar.prototype[operator] = function () {
        var args = [].slice.call(arguments);
        var operands = [this.data].concat(args);

        var bool = Scalar[operator].apply(null, operands);

        return bool;
      };
    });

    staticProps(Scalar)({
      contains: function contains() {
        return K.contains;
      },
      notContains: function notContains() {
        return K.notContains;
      }
    });

    Scalar.prototype.add = Scalar.prototype.addition;
    Scalar.prototype.mul = Scalar.prototype.multiplication;

    Scalar.mul = Scalar.multiplication;

    Scalar.div = Scalar.division;

    Scalar.prototype.eq = Scalar.prototype.equality;

    Scalar.eq = Scalar.equality;

    Scalar.prototype.ne = Scalar.prototype.disequality;

    Scalar.ne = Scalar.disequality;

    var unaryOperators = ['inversion', 'negation'];

    if (num > 0) unaryOperators.push('conjugation');

    unaryOperators.forEach(function (operator) {
      Scalar[operator] = function (operand) {
        return K[operator](toData(operand));
      };

      Scalar.prototype[operator] = function () {
        var data = Scalar[operator](this.data);

        return new Scalar(data);
      };
    });

    // Aliases

    var myOperators = binaryOperators.concat(comparisonOperators).concat(unaryOperators);

    // TODO this aliasify function can be in common with Vector and Matrix
    myOperators.forEach(function (operator) {
      operators.aliasesOf[operator].forEach(function (alias) {
        Scalar[alias] = Scalar[operator];
        Scalar.prototype[alias] = Scalar.prototype[operator];
      });
    });

    Scalar.prototype.ne = Scalar.prototype.negation;
    Scalar.prototype.inv = Scalar.prototype.inversion;

    Scalar.ne = Scalar.negation;
    Scalar.inv = Scalar.inversion;

    return Scalar;
  };
}

module.exports = CompositionAlgebra;

},{"./coerced":35,"./operators.json":36,"./toData":38,"cayley-dickson":8,"static-props":22}],29:[function(require,module,exports){
'use strict';

var CompositionAlgebra = require('./CompositionAlgebra');
var algebraCyclic = require('algebra-cyclic');

function Cyclic(elements) {
  var cyclicRing = algebraCyclic(elements);

  return CompositionAlgebra(cyclicRing)(1);
}

module.exports = Cyclic;

},{"./CompositionAlgebra":28,"algebra-cyclic":2}],30:[function(require,module,exports){
'use strict';

var determinant = require('laplace-determinant');
var inherits = require('inherits');
var no = require('not-defined');
var matrixMultiplication = require('matrix-multiplication');
var multiDimArrayIndex = require('multidim-array-index');
var operators = require('./operators.json');
var staticProps = require('static-props');
var TensorSpace = require('./TensorSpace');
var tensorContraction = require('tensor-contraction');
var toData = require('./toData');
var VectorSpace = require('./VectorSpace');

/**
 * Space of m x n matrices
 *
 * ```
 * var R = algebra.R
 *
 * var R2x2 = algebra.MatrixSpace(R)(2)
 * ```
 *
 * @param {Object} Scalar
 *
 * @returns {Function} anonymous with signature (numRows[, numCols])
 */

function MatrixSpace(Scalar) {
  var contraction = tensorContraction.bind(null, Scalar.addition);

  /**
   *
   * @param {Number} numRows
   * @param {Number} [numCols] defaults to a square matrix.
   *
   * @returns {Function} Matrix
   */

  return function (numRows, numCols) {
    // numCols defaults to numRows
    if (no(numCols)) numCols = numRows;

    var isSquare = numRows === numCols;
    var indices = [numRows, numCols];

    var AbstractMatrix = TensorSpace(Scalar)(indices);

    /**
     * Calculates the matrix trace.
     *
     * https://en.wikipedia.org/wiki/Trace_(linear_algebra)
     *
     * @param {Object|Array} matrix
     *
     * @returns {Object} scalar
     */

    function trace(matrix) {
      var matrixData = toData(matrix);

      return contraction([0, 1], indices, matrixData);
    }

    /**
     * Multiplies row by column to the right.
     *
     * @param {Object|Array} rightMatrix
     *
     * @returns {Object} matrix
     */

    function multiplication(leftMatrix, rightMatrix) {
      var leftMatrixData = toData(leftMatrix);
      var rightMatrixData = toData(rightMatrix);

      var rowByColumnMultiplication = matrixMultiplication(Scalar)(numCols);

      return rowByColumnMultiplication(leftMatrixData, rightMatrixData);
    }

    /**
     * Calculates the transpose of a matrix.
     *
     * @param {Object|Array} matrix
     *
     * @returns {Array} matrix
     */

    function transpose(matrix) {
      var matrixData = toData(matrix);
      var transposedData = [];

      for (var i = 0; i < numRows; i++) {
        for (var j = 0; j < numCols; j++) {
          var index = multiDimArrayIndex([numRows, numCols], [i, j]);
          var transposedIndex = multiDimArrayIndex([numCols, numRows], [j, i]);

          transposedData[transposedIndex] = matrixData[index];
        }
      }

      return transposedData;
    }

    /**
     * @class
     */

    function Matrix(data) {
      AbstractMatrix.call(this, data);

      staticProps(this)({
        numCols: numCols,
        numRows: numRows
      });

      function computeDeterminant() {
        var det = determinant(data, Scalar, numRows);

        return new Scalar(det);
      }

      if (isSquare) {
        staticProps(this)({
          trace: trace(data)
        });

        Object.defineProperties(this, {
          determinant: { get: computeDeterminant },
          det: { get: computeDeterminant }
        });
      }

      function transposed() {
        var result = transpose(data);

        if (numRows === 1) {
          var Vector = VectorSpace(Scalar)(numCols);
          return new Vector(result);
        } else {
          var Matrix = MatrixSpace(Scalar)(numCols, numRows);
          return new Matrix(result);
        }
      }

      Object.defineProperties(this, {
        transposed: { get: transposed },
        tr: { get: transposed }
      });
    }

    inherits(Matrix, AbstractMatrix);

    if (isSquare) {
      Matrix.trace = trace;
    }

    Matrix.prototype.multiplication = function (rightMatrix) {
      var leftMatrixData = this.data;
      var result = multiplication(leftMatrixData, rightMatrix);

      var rightNumRows = numCols;
      var rightNumCols = result.length / rightNumRows;

      var Matrix = MatrixSpace(Scalar)(rightNumRows, rightNumCols);

      return new Matrix(result);
    };

    // Static operators.

    Matrix.multiplication = multiplication;
    Matrix.transpose = transpose;

    // Aliases

    Matrix.tr = Matrix.transpose;
    Matrix.mul = Matrix.multiplication;

    Matrix.prototype.mul = Matrix.prototype.multiplication;

    operators.group.forEach(function (operator) {
      operators.aliasesOf[operator].forEach(function (alias) {
        Matrix[alias] = Matrix[operator];
        Matrix.prototype[alias] = Matrix.prototype[operator];
      });
    });

    operators.group.forEach(function (operator) {
      Matrix[operator] = AbstractMatrix[operator];
    });

    staticProps(Matrix)({
      numCols: numCols,
      numRows: numRows
    });

    return Matrix;
  };
}

module.exports = MatrixSpace;

},{"./TensorSpace":32,"./VectorSpace":33,"./operators.json":36,"./toData":38,"inherits":11,"laplace-determinant":14,"matrix-multiplication":15,"multidim-array-index":18,"not-defined":20,"static-props":22,"tensor-contraction":24}],31:[function(require,module,exports){
'use strict';

var CompositionAlgebra = require('./CompositionAlgebra');
var no = require('not-defined');

/**
 * Create a Scalar that belongs to a composition algebra.
 *
 * @param {Object} field
 * @param {Number} [n] must be 1, 2, 4 or 8.
 */

function Scalar(field, n) {
  if (no(n)) n = 1;

  var logBase2 = [1, 2, 4, 8].indexOf(n);

  if (logBase2 === -1) {
    throw new TypeError('Argument n must be 1, 2, 4 or 8');
  }

  return CompositionAlgebra(field)(logBase2);
}

module.exports = Scalar;

},{"./CompositionAlgebra":28,"not-defined":20}],32:[function(require,module,exports){
'use strict';

var operators = require('./operators.json');
var staticProps = require('static-props');
var toData = require('./toData');
var tensorProduct = require('tensor-product');

/**
 * Creates a tensor space that is a class representing a tensor.
 *
 * @param {Object} Scalar
 *
 * @returns {Function} anonymous with signature (indices)
 */

function TensorSpace(Scalar) {
  var multiplication = Scalar.multiplication;

  /**
   * @param {Array} indices
   */

  return function (indices) {
    // If dim equals 1 it is like a vector of dimension 1, that is a scalar.
    // Only dim greater than 1, represents a varying index  increase order.
    // A scalar has order 0.
    // A vector has order 1.
    // A matrix has order 2.
    // Order is also called "rank" or "tensor rank", but, to avoid confusion with
    // "matrix rank" it is better to call it "order".
    var order = indices.filter(function (dim) {
      return dim > 1;
    }).length;

    // TODO if it is a scalar, return the Scalar
    // which should be a composition algebra
    // Then add product tensor to composition algebras.
    // Finally, a tensor i,j,k should be constructed as the
    // tensor product of a scalar i,j,k times.
    var isScalar = order === 0;

    var dimension = indices.reduce(function (a, b) {
      return a * b;
    }, 1);

    if (isScalar) {
      staticProps(Scalar)({ order: order });

      return Scalar;
    }

    // TODO create one for square matrices
    // Create zero.
    var zero = indices.reduce(function (result, dim) {
      for (var i = 0; i < dim; i++) {
        result.push(Scalar.zero);
      }

      return result;
    }, []);

    /**
     * Tensor
     *
     * @class
     */

    function Tensor(data) {
      // validate data

      function validate(item) {
        if (Scalar.notContains(item)) {
          throw new TypeError('Invalid data = ' + item);
        }
      }

      data.forEach(validate);

      var enumerable = true;
      staticProps(this)({ data: data }, enumerable);

      staticProps(this)({ order: order });
    }

    function staticBinary(operator) {
      Tensor[operator] = function () {
        var result = [];

        for (var i = 0; i < dimension; i++) {
          var operands = [];

          for (var j = 0; j < arguments.length; j++) {
            operands.push(toData(arguments[j])[i]);
          }

          result.push(Scalar[operator].apply(null, operands));
        }

        return result;
      };
    }

    var myBinaryOperators = ['addition', 'subtraction'];

    myBinaryOperators.forEach(function (operator) {
      staticBinary(operator);

      Tensor.prototype[operator] = function () {
        var args = [].slice.call(arguments);
        var operands = [this.data].concat(args);

        var data = Tensor[operator].apply(null, operands);

        var tensor = new Tensor(data);

        return tensor;
      };
    });

    function scalarMultiplication(tensor, scalar) {
      var tensorData = toData(tensor);

      var result = [];

      for (var i = 0; i < dimension; i++) {
        result.push(multiplication(tensorData[i], scalar));
      }

      return result;
    }

    Tensor.scalarMultiplication = scalarMultiplication;

    Tensor.prototype.scalarMultiplication = function (scalar) {
      var data = scalarMultiplication(this, scalar);

      return new Tensor(data);
    };

    Tensor.equality = function (tensor1, tensor2) {
      var tensorData1 = toData(tensor1);
      var tensorData2 = toData(tensor2);

      for (var i = 0; i < dimension; i++) {
        if (Scalar.disequality(tensorData1[i], tensorData2[i])) {
          return false;
        }
      }

      return true;
    };

    Tensor.prototype.equality = function (tensor2) {
      return Tensor.equality(this, tensor2);
    };

    Tensor.product = function (leftData) {
      return function (rightDim) {
        return function (rightData) {
          return tensorProduct(multiplication, indices, rightDim, leftData, rightData);
        };
      };
    };

    staticProps(Tensor)({
      order: order,
      zero: zero
    });

    var myOperators = operators.group;

    myOperators.forEach(function (operator) {
      operators.aliasesOf[operator].forEach(function (alias) {
        Tensor[alias] = Tensor[operator];
        Tensor.prototype[alias] = Tensor.prototype[operator];
      });
    });

    return Tensor;
  };
}

module.exports = TensorSpace;

},{"./operators.json":36,"./toData":38,"static-props":22,"tensor-product":26}],33:[function(require,module,exports){
'use strict';

var inherits = require('inherits');
var operators = require('./operators.json');
var staticProps = require('static-props');
var TensorSpace = require('./TensorSpace');
var toData = require('./toData');

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
 * @returns {Function} anonymous with signature (dimension)
 */

function VectorSpace(Scalar) {
  var addition = Scalar.addition;
  var multiplication = Scalar.multiplication;
  var subtraction = Scalar.subtraction;

  /**
   * @param {Number} dimension
   *
   * @returns {Function} Vector
   */

  return function (dimension) {
    var indices = [dimension];

    var AbstractVector = TensorSpace(Scalar)(indices);

    /**
     * Computes the cross product of two vectors.
     *
     * It is defined only in dimension 3.
     *
     * @param {Object|Array} vector1
     * @param {Object|Array} vector2
     *
     * @returns {Array} vector
     */

    function crossProduct(vector1, vector2) {
      var vectorData1 = toData(vector1);
      var vectorData2 = toData(vector2);

      var ux = vectorData1[0];
      var uy = vectorData1[1];
      var uz = vectorData1[2];

      var vx = vectorData2[0];
      var vy = vectorData2[1];
      var vz = vectorData2[2];

      var vector = [];

      vector.push(subtraction(multiplication(uy, vz), multiplication(uz, vy)));
      vector.push(subtraction(multiplication(uz, vx), multiplication(ux, vz)));
      vector.push(subtraction(multiplication(ux, vy), multiplication(uy, vx)));

      return vector;
    }

    /**
     * Norm of a vector
     *
     * Given v = (x1, x2, ... xN)
     *
     * norm is defined as n = x1 * x1 + x2 * x2 + ... + xN * xN
     *
     * @param {Object|Array} vector
     *
     * @returns {Object} scalar
     */

    function norm(vector) {
      var data = toData(vector);

      var value = multiplication(data[0], data[0]);

      for (var i = 1; i < dimension; i++) {
        value = addition(value, multiplication(data[i], data[i]));
      }

      return new Scalar(value);
    }

    /**
     * Scalar product
     *
     * https://en.wikipedia.org/wiki/Dot_product
     *
     * @param {Object|Array} vector1
     * @param {Object|Array} vector2
     *
     * @returns {*} scalar
     */

    function scalarProduct(vector1, vector2) {
      // TODO use tensor product and then contraction (trace)
      var vectorData1 = toData(vector1);
      var vectorData2 = toData(vector2);

      if (vectorData1.length !== vectorData2.length) {
        throw new TypeError('Vectors have not the same dimension');
      }

      var result = multiplication(vectorData1[0], vectorData2[0]);

      for (var i = 1; i < dimension; i++) {
        result = addition(result, multiplication(vectorData1[i], vectorData2[i]));
      }

      return result;
    }

    /**
     * @class
     */

    function Vector(data) {
      AbstractVector.call(this, data);

      staticProps(this)({
        norm: norm(data),
        dimension: dimension
      });
    }

    inherits(Vector, AbstractVector);

    Vector.prototype.scalarProduct = function (vector) {
      var data = this.data;

      var result = scalarProduct(data, vector);

      return new Scalar(result);
    };

    // Cross product is defined only in dimension 3.
    function crossProductMethod(vector) {
      var data = this.data;

      var result = crossProduct(data, vector);

      return new Vector(result);
    }

    if (dimension === 3) {
      Vector.crossProduct = crossProduct;

      Vector.prototype.crossProduct = crossProductMethod;
      Vector.prototype.cross = crossProductMethod;
    }

    // Static operators.

    Vector.norm = norm;
    Vector.scalarProduct = scalarProduct;

    operators.set.forEach(function (operator) {
      Vector[operator] = AbstractVector[operator];
    });

    operators.group.forEach(function (operator) {
      Vector[operator] = AbstractVector[operator];
    });

    // Aliases

    var myOperators = ['scalarProduct'].concat(operators.group);

    myOperators.forEach(function (operator) {
      operators.aliasesOf[operator].forEach(function (alias) {
        Vector[alias] = Vector[operator];
        Vector.prototype[alias] = Vector.prototype[operator];
      });
    });

    if (dimension === 3) {
      Vector.cross = crossProduct;
    }

    return Vector;
  };
}

module.exports = VectorSpace;

},{"./TensorSpace":32,"./operators.json":36,"./toData":38,"inherits":11,"static-props":22}],34:[function(require,module,exports){
"use strict";

var booleanField = {
  zero: false,
  one: true,
  contains: function contains(a) {
    return a === true || a === false;
  },
  addition: function addition(a, b) {
    return a || b;
  },
  equality: function equality(a, b) {
    return a === b;
  },
  negation: function negation(a) {
    return !a;
  },
  multiplication: function multiplication(a, b) {
    return a && b;
  },
  inversion: function inversion(a) {
    return a;
  }
};

module.exports = booleanField;

},{}],35:[function(require,module,exports){
'use strict';

var toData = require('./toData');

/**
 * Get an operator that coerces arguments to data.
 *
 * @api private
 *
 * @param {Function} operator
 *
 * @returns {Function} anonymous coerced operator
 */

function coerced(operator) {
  return function () {
    return operator.apply(null, [].slice.call(arguments).map(toData));
  };
}

module.exports = coerced;

},{"./toData":38}],36:[function(require,module,exports){
module.exports={
  "set": [
    "equality",
    "disequality",
    "contains",
    "notContains"
  ],
  "group": [
    "addition",
    "subtraction"
  ],
  "ring": [
    "multiplication"
  ],
  "aliasesOf": {
    "conjugation": [
      "conj"
    ],
    "equality": [
      "equal",
      "eq"
    ],
    "disequality": [
      "notEqual"
    ],
    "addition": [
      "add"
    ],
    "multiplication": [
      "mul"
    ],
    "division": [
      "div"
    ],
    "scalarProduct": [
      "dotProduct",
      "dot"
    ],
    "subtraction": [
      "sub"
    ],
    "inversion": [
      "inv"
    ],
    "negation": [
      "neg"
    ],
    "transpose": [
      "tr"
    ]
  }
}

},{}],37:[function(require,module,exports){
'use strict';

var realField = {
  zero: 0,
  one: 1,
  contains: function contains(a) {
    // NaN, Infinity and -Infinity are not allowed.
    return typeof a === 'number' && isFinite(a);
  },
  equality: function equality(a, b) {
    return a === b;
  },
  addition: function addition(a, b) {
    return a + b;
  },
  negation: function negation(a) {
    return -a;
  },
  multiplication: function multiplication(a, b) {
    return a * b;
  },
  inversion: function inversion(a) {
    return 1 / a;
  }
};

module.exports = realField;

},{}],38:[function(require,module,exports){
'use strict';

var no = require('not-defined');

/**
 * Extract data attribute, if any, and check it
 *
 * @api private
 *
 * @param {*} arg
 *
 * @returns {*} data
 */

function toData(arg) {
  var data;

  if (no(arg.data)) data = arg;else data = arg.data;

  if (no(data)) throw new TypeError('No data');

  return data;
}

module.exports = toData;

},{"not-defined":20}],39:[function(require,module,exports){
'use strict';

var algebra = require('algebra');

var C = algebra.Complex;

var methodBinaryOperator = require('./features/methodBinaryOperator');
var methodUnaryOperator = require('./features/methodUnaryOperator');
var staticBinaryOperator = require('./features/staticBinaryOperator');
var staticUnaryOperator = require('./features/staticUnaryOperator');

describe('Complex', function () {
  var operator;

  describe('zero', function () {
    it('is static', function () {
      C.zero.should.eql([0, 0]);
    });
  });

  describe('one', function () {
    it('is static', function () {
      C.one.should.eql([1, 0]);
    });
  });

  describe('addition', function () {
    operator = 'addition';

    it('is a static method', staticBinaryOperator(C, operator, [2, 1], [2, 3], [4, 4]));

    it('is a class method', methodBinaryOperator(C, operator, [1, 2], [1, -1], [2, 1]));
  });

  describe('subtraction', function () {
    operator = 'subtraction';

    it('is a static method', staticBinaryOperator(C, operator, [2, 1], [2, 3], [0, -2]));

    it('is a class method', methodBinaryOperator(C, operator, [0, 2], [1, -2], [-1, 4]));
  });

  describe('multiplication', function () {
    operator = 'multiplication';

    it('is a static method', staticBinaryOperator(C, operator, [2, 1], [2, -1], [5, 0]));

    it('is a class method', methodBinaryOperator(C, operator, [1, 2], [-1, 2], [-5, 0]));
  });

  describe('division', function () {
    operator = 'division';

    it('is a static method', staticBinaryOperator(C, operator, [2, 4], [2, 0], [1, 2]));

    it('is a class method', methodBinaryOperator(C, operator, [5, 0], [2, -1], [2, 1]));
  });

  describe('negation', function () {
    operator = 'negation';

    it('is a static method', staticUnaryOperator(C, operator, [-2, 1], [2, -1]));

    it('is a class method', methodUnaryOperator(C, operator, [1, 8], [-1, -8]));
  });

  describe('conjugation', function () {
    operator = 'conjugation';

    it('is a static method', staticUnaryOperator(C, operator, [2, 1], [2, -1]));

    it('is a class method', methodUnaryOperator(C, operator, [1, 7], [1, -7]));
  });
});

},{"./features/methodBinaryOperator":49,"./features/methodUnaryOperator":50,"./features/staticBinaryOperator":51,"./features/staticUnaryOperator":52,"algebra":53}],40:[function(require,module,exports){
'use strict';

var CompositionAlgebra = require('../src/CompositionAlgebra');
var realField = require('../src/realField');

describe('CompositionAlgebra', function () {
  it('has signature (field)(num)', function () {
    var R = CompositionAlgebra(realField)(0);
    var C = CompositionAlgebra(realField)(1);
    var H = CompositionAlgebra(realField)(2);
    var O = CompositionAlgebra(realField)(3);

    R.should.be.instanceOf(Function);
    C.should.be.instanceOf(Function);
    H.should.be.instanceOf(Function);
    O.should.be.instanceOf(Function);
  });

  it('returns a Scalar class', function () {
    var R = CompositionAlgebra(realField)(0);
    var C = CompositionAlgebra(realField)(1);

    R.addition(2, 3).should.be.eql(5);

    var x = new R(2);
    x.data.should.be.eql(2);

    x.addition(3).data.should.be.eql(5);

    C.addition([1, 2], [3, 4]).should.be.eql([4, 6]);

    var z = new C([1, 2]);
    z.data.should.be.eql([1, 2]);

    z.addition([3, 4]).data.should.be.eql([4, 6]);
  });
});

},{"../src/CompositionAlgebra":28,"../src/realField":37}],41:[function(require,module,exports){
'use strict';

var algebra = require('algebra');

var notDefined = require('not-defined');

var MatrixSpace = algebra.MatrixSpace;
var Real = algebra.Real;
var VectorSpace = algebra.VectorSpace;

var methodBinaryOperator = require('./features/methodBinaryOperator');
var methodUnaryOperator = require('./features/methodUnaryOperator');
var staticBinaryOperator = require('./features/staticBinaryOperator');
var staticUnaryOperator = require('./features/staticUnaryOperator');

describe('MatrixSpace', function () {
  var R1x4 = MatrixSpace(Real)(1, 4);
  var R2x3 = MatrixSpace(Real)(2, 3);
  var R2x2 = MatrixSpace(Real)(2);
  var R3x2 = MatrixSpace(Real)(3, 2);
  var R4 = VectorSpace(Real)(4);

  it('has signature (Scalar)(numRows, numCols)', function () {
    R2x3.numRows.should.be.eql(2);
    R2x3.numCols.should.be.eql(3);
  });

  it('has signature (Scalar)(numRows) and numCols defaults to numRows', function () {
    R2x2.numRows.should.be.eql(2);
    R2x2.numCols.should.be.eql(2);
  });

  var matrix1 = new R2x2([2, 3, 1, 1]);
  var matrix2 = new R2x2([0, 1, -1, 0]);
  var matrix3 = new R2x3([0, 1, 2, -2, 1, 0]);

  describe('data', function () {
    it('is enumerable', function () {
      matrix1.propertyIsEnumerable('data').should.be.ok;
    });

    it('is immutable', function () {
      ;(function () {
        'use strict';

        matrix1.data = [2, 1, 5, 4];
      }).should.throwError();
    });
  });

  describe('numRows', function () {
    it('returns the number of rows', function () {
      matrix1.numRows.should.be.eql(2);
      matrix2.numRows.should.be.eql(2);
      matrix3.numRows.should.be.eql(2);
    });
  });

  describe('numCols', function () {
    it('returns the number of cols', function () {
      matrix1.numCols.should.be.eql(2);
      matrix2.numCols.should.be.eql(2);
      matrix3.numCols.should.be.eql(3);
    });
  });

  describe('determinant', function () {
    it('returns a scalar', function () {
      matrix1.determinant.should.be.instanceOf(Real);
      matrix2.determinant.should.be.instanceOf(Real);

      matrix1.determinant.data.should.be.eql(-1);
      matrix2.determinant.data.should.be.eql(1);
    });
  });

  describe('addition()', function () {
    var operator = 'addition';

    it('is a static method', staticBinaryOperator(R2x2, operator, [2, 3, 1, 1], [0, 1, -1, 0], [2, 4, 0, 1]));

    it('is a class method', methodBinaryOperator(R2x2, operator, [2, 3, 1, 1], [0, 1, -1, 0], [2, 4, 0, 1]));

    it('accepts multiple arguments', function () {
      R2x2.addition([2, 3, 1, 1], [0, 1, -1, 0], [-2, -4, 0, -1]).should.deepEqual([0, 0, 0, 0]);

      var matrix = new R2x2([2, 3, 1, 1]);
      matrix.addition([0, 1, -1, 0], [-2, -4, 0, -1]).data.should.deepEqual([0, 0, 0, 0]);
    });
  });

  describe('subtraction()', function () {
    var operator = 'subtraction';

    it('is a static method', staticBinaryOperator(R2x2, operator, [2, 3, 1, 1], [0, 1, -1, 0], [2, 2, 2, 1]));

    it('is a class method', methodBinaryOperator(R2x2, operator, [2, 3, 1, 1], [0, 1, -1, 0], [2, 2, 2, 1]));

    it('accepts multiple arguments', function () {
      R2x2.subtraction([2, 3, 1, 1], [0, 1, -1, 0], [2, 4, 0, 1]).should.deepEqual([0, -2, 2, 0]);

      var matrix = new R2x2([2, 3, 1, 1]);
      matrix.subtraction([0, 1, -1, 0], [2, 4, 0, 1]).data.should.deepEqual([0, -2, 2, 0]);
    });
  });

  describe('multiplication()', function () {
    var operator = 'multiplication';

    it('is a static method', staticBinaryOperator(R3x2, operator, [2, 3, 1, 1, 1, 1], [0, 1, 1, 1, -1, 0, 2, 3], [-3, 2, 8, 11, -1, 1, 3, 4, -1, 1, 3, 4]));

    it('is a class method', methodBinaryOperator(R2x2, operator, [2, 3, 1, 1], [0, 1, -1, 0], [-3, 2, -1, 1]));

    it('accepts multiple arguments', function () {
      R2x2.multiplication([1, 2, 3, 4], [0, 1, -1, 0], [-1, 0, 0, 1]).should.deepEqual([-2, 1, -4, 3]);

      var matrix = new R2x2([1, 2, 3, 4]);
      matrix.multiplication([0, 1, -1, 0], [-1, 0, 0, 1]).data.should.deepEqual([-2, 1, -4, 3]);
    });
  });

  describe('trace()', function () {
    it('is a static method', function () {
      R2x2.trace([1, 2, 5, 6]).should.be.eql(7);
    });

    it('is not available for no square matrices', function () {
      notDefined(R3x2.trace).should.be.true;
    });
  });

  describe('trace', function () {
    it('is a static attribute', function () {
      var matrix2x2 = new R2x2([1, 2, 5, 6]);

      matrix2x2.trace.should.be.eql(7);
    });

    it('is not available for no square matrices', function () {
      var matrix3x2 = new R3x2([1, 2, 3, 4, 5, 6]);

      notDefined(matrix3x2.trace).should.be.true;
    });
  });

  describe('transpose()', function () {
    it('is a static operator', function () {
      var matrix3x2 = new R3x2([1, 2, 3, 4, 5, 6]);

      var transposed = R3x2.transpose(matrix3x2);

      transposed.should.deepEqual([1, 3, 5, 2, 4, 6]);
    });
  });

  describe('transposed', function () {
    it('is a class attribute', function () {
      var matrix3x2 = new R3x2([1, 2, 3, 4, 5, 6]);

      var transposed = matrix3x2.transposed;

      transposed.data.should.deepEqual([1, 3, 5, 2, 4, 6]);
    });

    it('holds a transposed matrix', function () {
      var matrix2x3 = new R2x3([1, 2, 3, 4, 5, 6]);

      matrix2x3.transposed.data.should.deepEqual([1, 4, 2, 5, 3, 6]);

      matrix2x3.numRows.should.be.eql(matrix2x3.transposed.numCols);
      matrix2x3.numCols.should.be.eql(matrix2x3.transposed.numRows);
    });

    it('is an involution', function () {
      var matrix2x2a = new R2x2([1, 2, 3, 4]);

      var matrix2x2b = matrix2x2a.transposed.transposed;

      matrix2x2a.data.should.deepEqual(matrix2x2b.data);
    });

    it('returns a vector if the Matrix has one row', function () {
      var matrix1x4 = new R1x4([1, 2, 3, 4]);

      var vector = matrix1x4.transposed;

      matrix1x4.data.should.deepEqual(vector.data);
      vector.dimension.should.be.eql(matrix1x4.numCols);
    });
  });

  describe('mul()', function () {
    it('is an alias of multiplication()', function () {
      R2x2.mul.should.be.eql(R2x2.multiplication);

      var matrix2x2 = new R2x2([1, 2, 3, 4]);

      matrix2x2.multiplication.should.be.eql(matrix2x2.mul);
    });
  });

  describe('tr()', function () {
    it('is an alias of transpose()', function () {
      R2x2.tr.should.be.eql(R2x2.transpose);
    });
  });

  describe('tr', function () {
    it('is an alias of transposed', function () {
      var matrix = new R2x2([0, 1, 1, 0]);

      matrix.tr.should.be.eql(matrix.transposed);
    });
  });
});

},{"./features/methodBinaryOperator":49,"./features/methodUnaryOperator":50,"./features/staticBinaryOperator":51,"./features/staticUnaryOperator":52,"algebra":53,"not-defined":20}],42:[function(require,module,exports){
'use strict';

var algebra = require('algebra');

var R = algebra.Real;

var methodBinaryOperator = require('./features/methodBinaryOperator');
var methodUnaryOperator = require('./features/methodUnaryOperator');
var staticBinaryOperator = require('./features/staticBinaryOperator');
var staticUnaryOperator = require('./features/staticUnaryOperator');

describe('Real', function () {
  var operator, x;

  describe('zero', function () {
    it('is static', function () {
      R.zero.should.eql(0);
    });
  });

  describe('one', function () {
    it('is static', function () {
      R.one.should.eql(1);
    });
  });

  describe('addition', function () {
    operator = 'addition';

    it('is a static method', staticBinaryOperator(R, operator, 2, 3, 5));

    it('is a class method', methodBinaryOperator(R, operator, 1, 2, 3));

    // TODO
    //it('accepts many arguments', multiArgumentOperator(R, operator, 1, [2, 3, 4], 10))

    it('accepts many arguments', function () {
      x = new R(1);
      x = x.addition(2, 3, 4);
      x.data.should.eql(10);
    });
  });

  describe('subtraction', function () {
    operator = 'subtraction';

    it('is a static method', staticBinaryOperator(R, operator, 2, 3, -1));

    it('is a class method', methodBinaryOperator(R, operator, -1, -4, 3));

    it('accepts many arguments', function () {
      x = new R(10);
      x = x.subtraction(1, 2, 3);
      x.data.should.eql(4);
    });
  });

  describe('multiplication', function () {
    operator = 'multiplication';

    it('is a static method', staticBinaryOperator(R, operator, 8, -2, -16));

    it('is a class method', methodBinaryOperator(R, operator, 2, 2, 4));

    it('accepts many arguments', function () {
      x = new R(2);
      x = x.multiplication(3, 4, 5);
      x.data.should.eql(120);
    });
  });

  describe('division', function () {
    operator = 'division';

    it('is a static method', staticBinaryOperator(R, operator, 8, 2, 4));

    it('is a class method', methodBinaryOperator(R, operator, -2, 4, -0.5));

    it('accepts many arguments', function () {
      x = new R(120);
      x = x.division(3, 4, 5);
      x.data.should.eql(2);
    });
  });

  describe('equality', function () {
    operator = 'equality';

    it('is a static method', staticBinaryOperator(R, operator, 10, 10, true));

    it('is a class method', function () {
      x = new R(10);
      x.equality(10).should.be.ok;
    });
  });

  describe('disequality', function () {
    operator = 'disequality';

    it('is a static method', staticBinaryOperator(R, operator, 10, 20, true));

    it('is a class method', function () {
      x = new R(10);
      x.disequality(20).should.be.ok;
    });
  });

  describe('negation', function () {
    operator = 'negation';

    it('is a static method', staticUnaryOperator(R, operator, -2, 2));

    it('is a class method', methodUnaryOperator(R, operator, 8, -8));

    it('is an involution', function () {
      x = new R(10);
      x.negation().negation().data.should.be.eql(10);
    });
  });

  describe('inversion', function () {
    operator = 'inversion';

    it('is a static method', staticUnaryOperator(R, operator, 2, 0.5));

    it('is a class method', methodUnaryOperator(R, operator, -4, -0.25));

    it('is an involution', function () {
      x = new R(10);
      x.inversion().inversion().data.should.be.eql(10);
    });
  });
});

},{"./features/methodBinaryOperator":49,"./features/methodUnaryOperator":50,"./features/staticBinaryOperator":51,"./features/staticUnaryOperator":52,"algebra":53}],43:[function(require,module,exports){
'use strict';

var Scalar = require('algebra').Scalar;
var realField = require('../src/realField');

var R = Scalar(realField);

describe('Scalar', function () {
  it('checks n is 1, 2, 4 or 8', function () {
    ;(function () {
      Scalar(realField, 3);
    }).should.throw();
  });

  describe('data', function () {
    var pi = new R(Math.PI);

    it('is enumerable', function () {
      pi.propertyIsEnumerable('data').should.be.ok;
    });

    it('is immutable', function () {
      ;(function () {
        'use strict';

        pi.data = 2;
      }).should.throwError();
    });
  });
});

},{"../src/realField":37,"algebra":53}],44:[function(require,module,exports){
'use strict';

describe('TensorSpace', function () {
  var algebra = require('algebra');
  var TensorSpace = algebra.TensorSpace;
  var Real = algebra.Real;

  var T2x2x2 = TensorSpace(Real)([2, 2, 2]);

  it('can create a Scalar', function () {
    var indices = [1];

    var Scalar = TensorSpace(Real)(indices);

    Scalar.zero.should.be.eql(0);

    Scalar.addition(1, 2).should.be.eql(3);
    Scalar.addition(1, 2, 3).should.be.eql(6);

    Scalar.subtraction(1, 2).should.be.eql(-1);
    Scalar.subtraction(1, 2, 3).should.be.eql(-4);

    var x = new Scalar(1);
    x.data.should.be.eql(1);

    x.addition(2).data.should.be.eql(3);
    x.addition(2, 3, 4).data.should.be.eql(10);

    x.subtraction(2).data.should.be.eql(-1);
    x.subtraction(2, 3, 4).data.should.be.eql(-8);
  });

  it('can create a Vector', function () {
    var indices = [2];

    var Vector = TensorSpace(Real)(indices);

    Vector.zero.should.be.eql([0, 0]);

    Vector.addition([1, 0], [1, -1]).should.be.eql([2, -1]);
    Vector.addition([1, 0], [1, -1], [-1, 1]).should.be.eql([1, 0]);

    Vector.subtraction([2, -1], [1, -1]).should.be.eql([1, 0]);
    Vector.subtraction([1, -1], [2, -2], [3, -3]).should.be.eql([-4, 4]);

    var v = new Vector([1, 2]);
    v.data.should.be.eql([1, 2]);

    v.addition([4, -1]).data.should.be.eql([5, 1]);
    v.addition([4, -1], [-1, 1]).data.should.be.eql([4, 2]);

    v.subtraction([2, 1]).data.should.be.eql([-1, 1]);
    v.subtraction([2, 1], [1, -1]).data.should.be.eql([-2, 2]);
  });

  it('can create a Matrix', function () {
    var indices = [2, 2];

    var Matrix = TensorSpace(Real)(indices);

    Matrix.zero.should.be.eql([0, 0, 0, 0]);

    Matrix.addition([1, 0, 0, 1], [1, -1, 0, 1]).should.be.eql([2, -1, 0, 2]);

    Matrix.addition([1, 0, 0, 1], [1, -1, 0, 1], [2, 1, 1, 2]).should.be.eql([4, 0, 1, 4]);

    Matrix.subtraction([1, 0, 0, 1], [1, -1, 0, 1]).should.be.eql([0, 1, 0, 0]);

    Matrix.subtraction([1, 0, 0, 1], [1, -1, 0, 1], [2, 1, 1, 2]).should.be.eql([-2, 0, -1, -2]);

    var m = new Matrix([1, 2, 3, 4]);

    m.data.should.be.eql([1, 2, 3, 4]);

    m.addition([1, 0, 0, 1]).data.should.be.eql([2, 2, 3, 5]);

    m.subtraction([1, 0, 0, 1]).data.should.be.eql([0, 2, 3, 3]);
  });

  describe('attribute', function () {
    describe('order', function () {
      it('is 0 for scalars', function () {
        var Scalar = TensorSpace(Real)([1]);
        var scalar1 = new Scalar(4);
        Scalar.order.should.eql(0);
        scalar1.order.should.eql(0);
      });

      it('is 1 for vectors', function () {
        var Vector = TensorSpace(Real)([2]);
        var vector1 = new Vector([1, 2]);
        Vector.order.should.eql(1);
        vector1.order.should.eql(1);
      });

      it('is 2 for matrices', function () {
        var Matrix = TensorSpace(Real)([2, 2]);
        var matrix1 = new Matrix([1, 2, 3, 4]);
        Matrix.order.should.eql(2);
        matrix1.order.should.eql(2);
      });
    });
  });

  describe('operator', function () {
    describe('addition', function () {
      it('works', function () {
        var tensor1 = new T2x2x2([1, 2, 3, 4, 5, 6, 7, 8]);
        var tensor2 = new T2x2x2([2, 3, 4, 5, 6, 7, 8, 9]);
        var resultData = [3, 5, 7, 9, 11, 13, 15, 17];

        T2x2x2.addition(tensor1, tensor2).should.deepEqual(resultData);

        var tensor3 = tensor1.addition(tensor2);
        tensor3.data.should.deepEqual(resultData);
      });
    });

    describe('subtraction', function () {
      it('works', function () {
        var tensor1 = new T2x2x2([1, 2, 3, 4, 5, 6, 7, 8]);
        var tensor2 = new T2x2x2([2, 3, 4, 5, 6, 7, 8, 9]);
        var resultData = [-1, -1, -1, -1, -1, -1, -1, -1];

        T2x2x2.subtraction(tensor1, tensor2).should.deepEqual(resultData);

        var tensor3 = tensor1.subtraction(tensor2);
        tensor3.data.should.deepEqual(resultData);
      });
    });

    describe('scalarMultiplication', function () {
      it('works', function () {
        var tensor1 = new T2x2x2([1, 2, 3, 4, 5, 6, 7, 8]);
        var scalar1 = new Real(2);
        var resultData = [2, 4, 6, 8, 10, 12, 14, 16];

        T2x2x2.scalarMultiplication(tensor1, scalar1).should.deepEqual(resultData);

        var tensor2 = tensor1.scalarMultiplication(scalar1);
        tensor2.data.should.deepEqual(resultData);
      });
    });
  });
});

},{"algebra":53}],45:[function(require,module,exports){
'use strict';

var algebra = require('algebra');
var notDefined = require('not-defined');

var MatrixSpace = algebra.MatrixSpace;
var Real = algebra.Real;
var VectorSpace = algebra.VectorSpace;

var methodBinaryOperator = require('./features/methodBinaryOperator');
var methodUnaryOperator = require('./features/methodUnaryOperator');
var staticBinaryOperator = require('./features/staticBinaryOperator');
var staticUnaryOperator = require('./features/staticUnaryOperator');

var R2 = VectorSpace(Real)(2);
var R3 = VectorSpace(Real)(3);

var R2x2 = MatrixSpace(Real)(2, 2);

describe('VectorSpace', function () {
  var operator;

  describe('data', function () {
    var v = new R2([0, 1]);

    it('is enumerable', function () {
      v.propertyIsEnumerable('data').should.be.ok;
    });

    it('is immutable', function () {
      ;(function () {
        'use strict';

        v.data = [2, 1];
      }).should.throwError();
    });
  });

  describe('addition()', function () {
    operator = 'addition';

    it('is a static method', staticBinaryOperator(R2, operator, [0, 2], [-1, 3], [-1, 5]));

    it('is a class method', methodBinaryOperator(R2, operator, [0, 1], [1, 1], [1, 2]));

    it('accepts multiple arguments', function () {
      R2.addition([1, -1], [2, -2], [3, -3]).should.deepEqual([6, -6]);

      var vector = new R2([1, -1]);
      vector.addition([2, -2], [3, -3]).data.should.eql([6, -6]);
    });
  });

  describe('subtraction()', function () {
    operator = 'subtraction';

    it('is a static method', staticBinaryOperator(R2, operator, [0, 2], [-1, 3], [1, -1]));

    it('is a class method', methodBinaryOperator(R2, operator, [0, 1], [1, 1], [-1, 0]));

    it('accepts multiple arguments', function () {
      R2.subtraction([6, -6], [2, -2], [3, -3]).should.deepEqual([1, -1]);

      var vector = new R2([6, -6]);
      vector.subtraction([2, -2], [3, -3]).data.should.eql([1, -1]);
    });
  });

  describe('scalarProduct()', function () {
    it('is a static operator', function () {
      var data = R2.scalarProduct([0, 1], [1, 1]);

      data.should.eql(1);
    });

    it('is a class method', function () {
      var vector1 = new R2([0, 1]);
      var vector2 = new R2([1, 1]);

      var scalar = vector1.scalarProduct(vector2);

      scalar.data.should.be.eql(1);
    });

    it('is returns a scalar', function () {
      var vector1 = new R2([0, 1]);
      var vector2 = new R2([1, 1]);

      var scalar = vector1.scalarProduct(vector2);

      scalar.data.should.be.eql(1);
    });
  });

  describe('dotProduct()', function () {
    it('is an alias of scalarProduct()', function () {
      R2.scalarProduct.should.be.eql(R2.dotProduct);

      var vector = new R2([0, 1]);
      vector.scalarProduct.should.be.eql(vector.dotProduct);
    });
  });

  describe('dot()', function () {
    it('is an alias of scalarProduct()', function () {
      R2.scalarProduct.should.be.eql(R2.dot);

      var vector = new R2([0, 1]);
      vector.scalarProduct.should.be.eql(vector.dot);
    });
  });

  describe('norm', function () {
    it('is an attribute holding a scalar', function () {
      var vector1 = new R2([0, 1]);
      var vector2 = new R3([1, 1, 2]);

      vector1.norm.data.should.be.eql(1);
      vector2.norm.data.should.be.eql(6);
    });
  });

  describe('norm()', function () {
    it('is a static method', function () {
      R2.norm([0, 1]).data.should.be.eql(1);
      R3.norm([1, 1, 2]).data.should.be.eql(6);
    });
  });

  describe('crossProduct()', function () {
    it('is a static method', function () {
      R3.crossProduct([3, -3, 1], [4, 9, 2]).should.be.eql([-15, -2, 39]);
    });

    it('is a class method', function () {
      var vector1 = new R3([3, -3, 1]);
      var vector2 = new R3([-12, 12, -4]);

      vector1.crossProduct(vector2).data.should.be.eql([0, 0, 0]);
    });

    it('is defined only in dimension 3', function () {
      notDefined(R2.cross).should.be.ok;

      var vector = new R2([1, 0]);
      notDefined(vector.cross).should.be.ok;
    });
  });

  describe('cross()', function () {
    it('is an alias of crossProduct()', function () {
      R3.crossProduct.should.be.eql(R3.cross);

      var vector = new R3([1, 0, 1]);
      vector.crossProduct.should.be.eql(vector.cross);
    });
  });
});

},{"./features/methodBinaryOperator":49,"./features/methodUnaryOperator":50,"./features/staticBinaryOperator":51,"./features/staticUnaryOperator":52,"algebra":53,"not-defined":20}],46:[function(require,module,exports){
'use strict';

describe('API', function () {
  var algebra = require('algebra');

  var C = algebra.C;
  var Complex = algebra.Complex;
  var H = algebra.H;
  var Quaternion = algebra.Quaternion;
  var R = algebra.R;
  var R2 = algebra.R2;
  var R3 = algebra.R3;
  var Real = algebra.Real;
  var Scalar = algebra.Scalar;
  var TensorSpace = algebra.TensorSpace;

  var booleanField = require('../src/booleanField');

  describe('About operators', function () {
    it('works', function () {
      var vector1 = new R2([1, 2]);
      var vector2 = new R2([3, 4]);

      R2.addition(vector1, [3, 4]).should.deepEqual([4, 6]);
      R2.addition([1, 2], vector2).should.deepEqual([4, 6]);
      R2.addition(vector1, vector2).should.deepEqual([4, 6]);

      var vector3 = vector1.addition([3, 4]);
      var vector4 = vector1.addition(vector2);
      R2.equality(vector3, vector4).should.be.ok;

      vector1.addition(vector1, vector1).equality([4, 6]).should.be.ok;

      vector1.data.should.deepEqual([1, 2]);
    });
  });

  describe('Bool', function () {
    var Bool = Scalar(booleanField);

    it('works', function () {
      Bool.contains(true).should.be.ok;
      Bool.contains(1).should.be.ko;

      Bool.addition(true, false).should.eql(true);

      var t = new Bool(true);
      t.negation().data.should.eql(false);
    });
  });

  describe('Byte', function () {
    it('is an octionion of booleans' /*, () => {
                                     var f = false
                                     var t = true
                                     var Byte = Scalar(booleanField, 8)
                                     var byte1 = new Byte([t, f, f, f, f, f, f, f])
                                     }*/);
  });

  describe('Cyclic', function () {
    it('works' /*, () => {
               var Cyclic = algebra.Cyclic
               var elements = ' abcdefghijklmnopqrstuvwyxz0123456789'
               var Alphanum = Cyclic(elements)
               var a = new Alphanum('a')
               a.data.should.eql('a')
               }*/);
  });

  describe('Real', function () {
    it('works', function () {
      var Real = algebra.Real;

      Real.addition(1, 2).should.eql(3);

      var pi = new Real(Math.PI);
      var twoPi = pi.mul(2);

      Real.subtraction(twoPi, 2 * Math.PI).should.eql(0);
    });
  });

  describe('Complex', function () {
    it('works', function () {
      var Complex = algebra.Complex;
      var complex1 = new Complex([1, 2]);

      complex1.conjugation().data.should.deepEqual([1, -2]);
    });
  });

  describe('Common spaces', function () {
    describe('R', function () {
      it('is an alias', function () {
        R.should.be.eql(Real);
      });
    });

    describe('R2', function () {
      it();
    });

    /* 'is an alias', () => {
    }*/describe('R3', function () {
      it();
    });

    /* 'is an alias', () => {
    }*/describe('R2x2', function () {
      it();
    });

    /* 'is an alias', () => {
    }*/describe('C', function () {
      it('is an alias', function () {
        C.should.be.eql(Complex);
      });
    });

    describe('H', function () {
      it('is an alias', function () {
        H.should.be.eql(Quaternion);
      });
    });
  });

  describe('Tensor', function () {
    describe('Cross product', function () {
      it('works', function () {
        R3.crossProduct([3, -3, 1], [4, 9, 2]).should.deepEqual([-15, -2, 39]);

        var vector1 = new R3([3, -3, 1]);
        var vector2 = new R3([4, 9, 2]);

        var vector3 = vector1.crossProduct(vector2);

        vector3.data.should.deepEqual([-15, -2, 39]);
      });
    });
  });

  describe('Tensor', function () {
    describe('equality', function () {
      it('works', function () {
        var T2x2x2 = TensorSpace(Real)([2, 2, 2]);

        var tensor1 = new T2x2x2([1, 2, 3, 4, 5, 6, 7, 8]);
        var tensor2 = new T2x2x2([2, 3, 4, 5, 6, 7, 8, 9]);

        T2x2x2.equality(tensor1, tensor1).should.be.ok;
        T2x2x2.equality(tensor1, tensor2).should.be.ko;

        tensor1.equality(tensor1).should.be.ok;
        tensor2.equality(tensor2).should.be.ko;
      });
    });
  });
});

},{"../src/booleanField":34,"algebra":53}],47:[function(require,module,exports){
'use strict';

describe('booleanField', function () {
  var bool = require('../src/booleanField');

  describe('contains', function () {
    it('ok for booleans, otherwise false', function () {
      bool.contains(false).should.be.ok;
      bool.contains(true).should.be.ok;
      bool.contains(1).should.be.ko;
      bool.contains('true').should.be.ko;
    });
  });

  describe('equality', function () {
    it('works', function () {
      bool.equality(false, false).should.be.ok;
      bool.equality(true, true).should.be.ok;
      bool.equality(true, false).should.be.ko;
      bool.equality(false, true).should.be.ko;
    });
  });

  describe('negation', function () {
    it('works', function () {
      bool.negation(false).should.eql(true);
      bool.negation(true).should.eql(false);
    });
  });

  describe('addition', function () {
    it('has false as neutral element', function () {
      bool.addition(true, false).should.eql(true);
      bool.addition(false, false).should.eql(false);
    });
  });

  describe('multiplication', function () {
    it('has true as neutral element', function () {
      bool.multiplication(true, true).should.eql(true);
      bool.multiplication(false, true).should.eql(false);
    });
  });
});

},{"../src/booleanField":34}],48:[function(require,module,exports){
'use strict';

var coerced = require('../src/coerced');

var add = coerced(function (a, b) {
  return a + b;
});

describe('coerced', function () {
  it('means to extract "data" property, if any', function () {
    add(1, 2).should.eql(3);
    add({ data: 1 }, 2).should.eql(3);
    add({ data: 1 }, 2).should.eql(3);
    add({ data: 1 }, { data: 2 }).should.eql(3);
  });
});

},{"../src/coerced":35}],49:[function(require,module,exports){
"use strict";

/**
 * Check if binary operator is a mutator
 *
 * @api private
 *
 * @param {Object} Scalar
 * @param {String} operator name
 * @param {*} operand1
 * @param {*} operand2
 * @param {*} resultData
 *
 * @returns {Function} mutatorBinaryOperatorTest
 */

function mutatorBinaryOperator(Scalar, operator, operand1, operand2, resultData) {
  return function mutatorBinaryOperatorTest() {
    var scalar = new Scalar(operand1);

    var result = scalar[operator](operand2);

    result.data.should.eql(resultData);
  };
}

module.exports = mutatorBinaryOperator;

},{}],50:[function(require,module,exports){
"use strict";

/**
 * Check if unary operator is a mutator
 *
 * @api private
 *
 * @param {Object} Scalar
 * @param {String} operator name
 * @param {*} operand
 * @param {*} resultData
 *
 * @returns {Function} mutatorUnaryOperatorTest
 */

function mutatorUnaryOperator(Scalar, operator, operand, resultData) {
  return function mutatorUnaryOperatorTest() {
    var scalar = new Scalar(operand);

    var result = scalar[operator]();

    result.data.should.eql(resultData);
  };
}

module.exports = mutatorUnaryOperator;

},{}],51:[function(require,module,exports){
"use strict";

/**
 * Check if binary operator is static
 *
 * @param {Object} Scalar
 * @param {String} operator name
 * @param {*} operand1
 * @param {*} operand2
 * @param {*} result
 *
 * @returns {Function} staticBinaryOperatorTest
 */

function staticBinaryOperator(Scalar, operator, operand1, operand2, result) {
  return function staticBinaryOperatorTest() {
    Scalar[operator](operand1, operand2).should.eql(result);
  };
}

module.exports = staticBinaryOperator;

},{}],52:[function(require,module,exports){
"use strict";

/**
 * Check if unary operator is static
 *
 * @param {Object} Scalar
 * @param {String} operator name
 * @param {*} operand
 * @param {*} result
 *
 * @returns {Function} staticUnaryOperatorTest
 */

function staticUnaryOperator(Scalar, operator, operand, result) {
  return function staticUnaryOperatorTest() {
    Scalar[operator](operand).should.eql(result);
  };
}

module.exports = staticUnaryOperator;

},{}],53:[function(require,module,exports){

// Cheating npm require.
module.exports = require('../../..')


},{"../../..":1}],54:[function(require,module,exports){
'use strict';

describe('Quick start', function () {
                   var algebra = require('../index');

                   it('works', function () {
                                      var R = algebra.Real;

                                      R.add(1, 2, 3).should.eql(6);

                                      var x = new R(2);
                                      var y = new R(-2);

                                      var r = x.mul(y);
                                      r.data.should.eql(-4);
                                      x.data.should.eql(2);

                                      x = x.add(3).mul(2).inv();

                                      x.data.should.eql(0.1);

                                      x.equal(0.1).should.be.ok;
                                      x.notEqual(Math.PI).should.be.ok;

                                      var C = algebra.Complex;

                                      var z1 = new C([1, 2]);
                                      var z2 = new C([3, 4]);

                                      z1 = z1.mul(z2);

                                      z1.data.should.eql([-5, 10]);

                                      z1 = z1.conj().mul([2, 0]);

                                      z1.data.should.eql([-10, -20]);

                                      var R2 = algebra.VectorSpace(R)(2);

                                      var v1 = new R2([0, 1]);
                                      var v2 = new R2([1, -2]);

                                      v1 = v1.add(v2);

                                      v1.data.should.eql([1, -1]);

                                      var R3x2 = algebra.MatrixSpace(R)(3, 2);

                                      var m1 = new R3x2([1, 1, 0, 1, 1, 0]);

                                      var v3 = m1.mul(v1);

                                      v3.data.should.deepEqual([0, -1, 1]);

                                      var R2x2 = algebra.MatrixSpace(R)(2);

                                      var m2 = new R2x2([1, 0, 0, 2]);
                                      var m3 = new R2x2([0, -1, 1, 0]);

                                      m2 = m2.mul(m3);

                                      m2.data.should.deepEqual([0, -1, 2, 0]);

                                      m2.determinant.data.should.be.eql(2);
                   });
});

},{"../index":1}]},{},[39,40,41,42,43,44,45,46,47,48,54]);
