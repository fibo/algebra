require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./package.json":2,"algebra-ring":4,"static-props":20}],2:[function(require,module,exports){
module.exports={
  "_args": [
    [
      "algebra-cyclic@^0.2.0",
      "/home/io/github.com/fibo/algebra"
    ]
  ],
  "_from": "algebra-cyclic@>=0.2.0 <0.3.0",
  "_id": "algebra-cyclic@0.2.1",
  "_inCache": true,
  "_installable": true,
  "_location": "/algebra-cyclic",
  "_nodeVersion": "4.3.2",
  "_npmOperationalInternal": {
    "host": "packages-16-east.internal.npmjs.com",
    "tmp": "tmp/algebra-cyclic-0.2.1.tgz_1472365525236_0.8247350375168025"
  },
  "_npmUser": {
    "email": "casati_gianluca@yahoo.it",
    "name": "fibo"
  },
  "_npmVersion": "3.8.9",
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
  "_resolved": "https://registry.npmjs.org/algebra-cyclic/-/algebra-cyclic-0.2.1.tgz",
  "_shasum": "81a7dc25cfb0e9bb8eedb721d54d78728b9d3488",
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
    "static-props": "^1.0.0"
  },
  "description": "creates a space isomorphic to Zp: the cyclic ring of order p, where p is prime",
  "devDependencies": {
    "npm-watch": "^0.1.3",
    "pre-commit": "^1.1.2",
    "standard": "^8.0.0",
    "tape": "^4.5.1"
  },
  "directories": {},
  "dist": {
    "shasum": "81a7dc25cfb0e9bb8eedb721d54d78728b9d3488",
    "tarball": "https://registry.npmjs.org/algebra-cyclic/-/algebra-cyclic-0.2.1.tgz"
  },
  "gitHead": "62a9906342b4e9753f3753a6ddceb53f1c0d38e4",
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
    "postupdate-deps": "npm test && git commit -am 'updated deps' || git checkout -- package.json",
    "postversion": "git push origin v${npm_package_version}; npm publish; git push origin master",
    "test": "tape test.js",
    "update-deps": "npm update --save --dev",
    "watch": "npm-watch"
  },
  "version": "0.2.1",
  "watch": {
    "test": "{index,test}.js"
  }
}

},{}],3:[function(require,module,exports){

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

},{}],4:[function(require,module,exports){
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

},{"algebra-group":3,"static-props":5}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
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


},{"algebra-ring":7}],7:[function(require,module,exports){
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

},{"algebra-group":3}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
'use strict';
var numberIsNan = require('number-is-nan');

module.exports = Number.isFinite || function (val) {
	return !(typeof val !== 'number' || numberIsNan(val) || val === Infinity || val === -Infinity);
};

},{"number-is-nan":19}],11:[function(require,module,exports){
// https://github.com/paulmillr/es6-shim
// http://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.isinteger
var isFinite = require("is-finite");
module.exports = Number.isInteger || function(val) {
  return typeof val === "number" &&
    isFinite(val) &&
    Math.floor(val) === val;
};

},{"is-finite":10}],12:[function(require,module,exports){

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


},{}],13:[function(require,module,exports){
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

},{"./package.json":15,"is-integer":11,"not-defined":18,"static-props":14}],14:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],15:[function(require,module,exports){
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
  "_resolved": "https://registry.npmjs.org/matrix-multiplication/-/matrix-multiplication-0.4.0.tgz",
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

},{}],16:[function(require,module,exports){
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

},{"./package.json":17,"static-props":20}],17:[function(require,module,exports){
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
  "_resolved": "https://registry.npmjs.org/multidim-array-index/-/multidim-array-index-0.5.0.tgz",
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

},{}],18:[function(require,module,exports){
module.exports=function(x){return (typeof x==='undefined')||(x === null)}

},{}],19:[function(require,module,exports){
'use strict';
module.exports = Number.isNaN || function (x) {
	return x !== x;
};

},{}],20:[function(require,module,exports){
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

},{}],21:[function(require,module,exports){
// In browserify context, *strict-mode* fall back to a no op.
module.exports = function (cb) { cb() }

},{}],22:[function(require,module,exports){
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

},{"indices-permutations":8,"multidim-array-index":23}],23:[function(require,module,exports){
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

},{}],24:[function(require,module,exports){
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

},{"indices-permutations":8,"multidim-array-index":25}],25:[function(require,module,exports){
arguments[4][23][0].apply(exports,arguments)
},{"dup":23}],26:[function(require,module,exports){
'use strict';

var CayleyDickson = require('cayley-dickson');
var createScalar = require('./createScalar');
var no = require('not-defined');

/**
 * A composition algebra is one of ℝ, ℂ, ℍ, O:
 * Real, Complex, Quaternion, Octonion.
 *
 * https://en.wikipedia.org/wiki/Composition_algebra
 *
 * @param {Object} field
 * @param {Number} [num] of CayleyDickson construction iterations. Can be 1, 2, 4 or 8.
 *
 * @returns {Object} Scalar
 */

function CompositionAlgebra(field, num) {
  if (no(num)) num = 1;

  var logBase2 = [1, 2, 4, 8].indexOf(num);

  if (logBase2 === -1) {
    throw new TypeError('Argument n must be 1, 2, 4 or 8');
  }

  return createScalar(CayleyDickson(field, logBase2));
}

module.exports = CompositionAlgebra;

},{"./createScalar":32,"cayley-dickson":6,"not-defined":18}],27:[function(require,module,exports){
'use strict';

var algebraCyclic = require('algebra-cyclic');
var createScalar = require('./createScalar');

/**
 * Create a Cyclic algebra.
 *
 * @param {String|Array} elements
 */

function Cyclic(elements) {
  var ring = algebraCyclic(elements);

  return createScalar(ring);
}

module.exports = Cyclic;

},{"./createScalar":32,"algebra-cyclic":1}],28:[function(require,module,exports){
'use strict';

var determinant = require('laplace-determinant');
var inherits = require('inherits');
var itemsPool = require('./itemsPool');
var matrixMultiplication = require('matrix-multiplication');
var multiDimArrayIndex = require('multidim-array-index');
var no = require('not-defined');
var operators = require('./operators.json');
var staticProps = require('static-props');
var TensorSpace = require('./TensorSpace');
var tensorContraction = require('tensor-contraction');
var toData = require('./toData');

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
     * Matrix element.
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

        staticProps(this)({
          determinant: computeDeterminant,
          det: computeDeterminant
        });
      }

      function transposed() {
        var result = transpose(data);
        var VectorSpace = itemsPool.get('VectorSpace');

        if (numRows === 1) {
          var Vector = VectorSpace(Scalar)(numCols);
          return new Vector(result);
        } else {
          var _Matrix = MatrixSpace(Scalar)(numCols, numRows);
          return new _Matrix(result);
        }
      }

      staticProps(this)({
        transposed: transposed,
        tr: transposed
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

itemsPool.set('MatrixSpace', MatrixSpace);

module.exports = MatrixSpace;

},{"./TensorSpace":29,"./itemsPool":33,"./operators.json":34,"./toData":36,"inherits":9,"laplace-determinant":12,"matrix-multiplication":13,"multidim-array-index":16,"not-defined":18,"static-props":20,"tensor-contraction":22}],29:[function(require,module,exports){
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

},{"./operators.json":34,"./toData":36,"static-props":20,"tensor-product":24}],30:[function(require,module,exports){
'use strict';

var inherits = require('inherits');
var itemsPool = require('./itemsPool');
var matrixMultiplication = require('matrix-multiplication');
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
     * Multiply a column vector by matrix on right side
     * @param {Object|Array} vector
     *
     * @returns {Object} scalar
     */

    function multiplicationByMatrix(leftVector, rightMatrix) {
      var leftVectorData = toData(leftVector);
      var rightMatrixData = toData(rightMatrix);

      var rowByColumnMultiplication = matrixMultiplication(Scalar)(dimension);

      return rowByColumnMultiplication(leftVectorData, rightMatrixData);
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
     * Vector element.
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

    Vector.prototype.multiplication = function (rightMatrix) {
      var MatrixSpace = itemsPool.get('MatrixSpace');

      var leftVectorData = this.data;
      var result = multiplicationByMatrix(leftVectorData, rightMatrix);

      // TODO rightNumRows equals dimension
      // but the vector should be transposed.
      // Add transpose operator for vectors, then use it implicitly.
      var rightNumRows = dimension;
      var rightNumCols = result.length / rightNumRows;

      var Matrix = MatrixSpace(Scalar)(rightNumRows, rightNumCols);

      return new Matrix(result);
    };

    // Static operators.

    Vector.multiplication = multiplicationByMatrix;
    Vector.norm = norm;
    Vector.scalarProduct = scalarProduct;

    operators.comparison.forEach(function (operator) {
      Vector[operator] = AbstractVector[operator];
    });

    operators.set.forEach(function (operator) {
      Vector[operator] = AbstractVector[operator];
    });

    operators.group.forEach(function (operator) {
      Vector[operator] = AbstractVector[operator];
    });

    // Aliases

    Vector.mul = multiplicationByMatrix;
    Vector.prototype.mul = Vector.prototype.multiplication;

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

itemsPool.set('VectorSpace', VectorSpace);

module.exports = VectorSpace;

},{"./TensorSpace":29,"./itemsPool":33,"./operators.json":34,"./toData":36,"inherits":9,"matrix-multiplication":13,"static-props":20}],31:[function(require,module,exports){
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

},{"./toData":36}],32:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var coerced = require('./coerced');
var operators = require('./operators.json');
var staticProps = require('static-props');
var toData = require('./toData');

/**
 * @param {Object} ring
 *
 * @returns {Function} Scalar
 */

function createScalar(ring) {
  var attributes = {
    zero: ring.zero,
    one: ring.one,
    order: 0
  };

  /**
   * Scalar element.
   */

  var Scalar = function Scalar(data) {
    _classCallCheck(this, Scalar);

    // validate data
    if (ring.notContains(data)) {
      throw new TypeError('Invalid data = ' + data);
    }

    var enumerable = true;
    staticProps(this)({ data: data }, enumerable);

    staticProps(this)(attributes);
  };

  staticProps(Scalar)(attributes);

  var staticNary = function staticNary(operator) {
    Scalar[operator] = function () {
      var operands = [].slice.call(arguments).map(toData);
      return coerced(ring[operator]).apply(null, operands);
    };
  };

  var unaryOperators = operators.inversion;

  unaryOperators.push('conjugation');

  unaryOperators.forEach(function (operator) {
    Scalar[operator] = function (operand) {
      return ring[operator](toData(operand));
    };

    Scalar.prototype[operator] = function () {
      var data = Scalar[operator](this.data);

      return new Scalar(data);
    };
  });

  operators.group.concat(operators.ring).forEach(function (operator) {
    staticNary(operator);

    Scalar.prototype[operator] = function () {
      var args = [].slice.call(arguments);
      var operands = [this.data].concat(args);

      var data = Scalar[operator].apply(null, operands);

      return new Scalar(data);
    };
  });

  operators.set.forEach(function (operator) {
    staticNary(operator);
  });

  operators.comparison.forEach(function (operator) {
    staticNary(operator);

    Scalar.prototype[operator] = function () {
      var args = [].slice.call(arguments);
      var operands = [this.data].concat(args);

      var bool = Scalar[operator].apply(null, operands);

      return bool;
    };
  });

  Object.keys(operators.aliasesOf).forEach(function (operator) {
    operators.aliasesOf[operator].forEach(function (alias) {
      Scalar[alias] = Scalar[operator];
      Scalar.prototype[alias] = Scalar.prototype[operator];
    });
  });

  return Scalar;
}

module.exports = createScalar;

},{"./coerced":31,"./operators.json":34,"./toData":36,"static-props":20}],33:[function(require,module,exports){
"use strict";

var itemsPool = new Map();

module.exports = itemsPool;

},{}],34:[function(require,module,exports){
module.exports={
  "comparison": [
    "equality",
    "disequality"
  ],
  "set": [
    "contains",
    "notContains"
  ],
  "group": [
    "addition",
    "subtraction"
  ],
  "ring": [
    "multiplication",
    "division"
  ],
  "inversion": [
    "inversion",
    "negation"
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

},{}],35:[function(require,module,exports){
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

},{}],36:[function(require,module,exports){
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

},{"not-defined":18}],"algebra":[function(require,module,exports){
'use strict';

require('strict-mode')(function () {
  var Cyclic = require('./src/Cyclic');
  exports.Cyclic = Cyclic;

  var CompositionAlgebra = require('./src/CompositionAlgebra');
  exports.CompositionAlgebra = CompositionAlgebra;

  var field = require('./src/realField');

  var Real = CompositionAlgebra(field, 1);
  var Complex = CompositionAlgebra(field, 2);
  var Quaternion = CompositionAlgebra(field, 4);
  var Octonion = CompositionAlgebra(field, 8);

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

},{"./src/CompositionAlgebra":26,"./src/Cyclic":27,"./src/MatrixSpace":28,"./src/TensorSpace":29,"./src/VectorSpace":30,"./src/realField":35,"strict-mode":21}]},{},[]);
