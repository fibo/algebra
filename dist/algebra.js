require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{"./package.json":2,"algebra-ring":5,"static-props":16}],2:[function(require,module,exports){
module.exports={
  "_from": "algebra-cyclic@^0.2.4",
  "_id": "algebra-cyclic@0.2.4",
  "_inBundle": false,
  "_integrity": "sha512-XHcsVP3qp/RtfRgEaeL7G2OrUMFL69j9sIimJhccajQiA+O5z/pQ1ZGb6R70XSr1Ev8Ky36gemdZ6PckZNgCnQ==",
  "_location": "/algebra-cyclic",
  "_phantomChildren": {},
  "_requested": {
    "type": "range",
    "registry": true,
    "raw": "algebra-cyclic@^0.2.4",
    "name": "algebra-cyclic",
    "escapedName": "algebra-cyclic",
    "rawSpec": "^0.2.4",
    "saveSpec": null,
    "fetchSpec": "^0.2.4"
  },
  "_requiredBy": [
    "/"
  ],
  "_resolved": "https://registry.npmjs.org/algebra-cyclic/-/algebra-cyclic-0.2.4.tgz",
  "_shasum": "f2f3fe2832dcf75d8ae812c024855998bf3d6cd5",
  "_spec": "algebra-cyclic@^0.2.4",
  "_where": "/Users/io/github.com/fibo/algebra",
  "author": {
    "name": "Gianluca Casati",
    "url": "http://g14n.info"
  },
  "bugs": {
    "url": "https://github.com/fibo/algebra-cyclic/issues"
  },
  "bundleDependencies": false,
  "dependencies": {
    "algebra-ring": "^0.6.3",
    "static-props": "^1.1.1"
  },
  "deprecated": false,
  "description": "creates a space isomorphic to Zp: the cyclic ring of order p, where p is prime",
  "devDependencies": {
    "pre-commit": "^1.1.2",
    "standa": "^2.0.1",
    "tape": "^4.9.0"
  },
  "homepage": "http://g14n.info/algebra-cyclic",
  "keywords": [
    "math",
    "algebra",
    "prime",
    "cyclic"
  ],
  "license": "MIT",
  "main": "index.js",
  "name": "algebra-cyclic",
  "pre-commit": [
    "lint",
    "test"
  ],
  "repository": {
    "type": "git",
    "url": "git+https://github.com/fibo/algebra-cyclic.git"
  },
  "scripts": {
    "check-deps": "npm outdated",
    "lint": "standa --fix",
    "postversion": "git push origin v${npm_package_version}; npm publish; git push origin master",
    "test": "tape test.js"
  },
  "version": "0.2.4"
}

},{}],3:[function(require,module,exports){
const no = require('not-defined')
const staticProps = require('static-props')

const pkg = require('./package.json')

/**
 * Prepend package name to error message
 */

function msg (str) {
  return pkg.name + ': ' + str
}

const error = {}

staticProps(error)({
  argumentIsNotInGroup: msg('argument is not contained in group set'),
  equalityIsNotReflexive: msg('"equality" is not reflexive'),
  identityIsNotInGroup: msg('"identity" must be contained in group set'),
  identityIsNotNeutral: msg('"identity" is not neutral')
})

/**
 * Defines an algebra group structure
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
 * @param {String} [naming.disequality=disequality]
 * @param {String} [naming.compositionLaw=addition]
 * @param {String} [naming.inversion=negation]
 * @param {String} [naming.inverseCompositionLaw=subtraction]
 * @param {String} [naming.notContains=notContains]
 *
 * @returns {Object} group
 */

function algebraGroup (given, naming) {
  if (no(given)) given = {}
  if (no(naming)) naming = {}

  // default attribute naming

  const defaultNaming = {
    compositionLaw: 'addition',
    contains: 'contains',
    disequality: 'disequality',
    equality: 'equality',
    identity: 'zero',
    inverseCompositionLaw: 'subtraction',
    inversion: 'negation',
    notContains: 'notContains'
  }

  /**
   * Returns a prop custom name or its default
   *
   * @param {String} name
   *
   * @returns {String} actualName
   */

  function prop (name) {
    if (typeof naming[name] === 'string') return naming[name]
    else return defaultNaming[name]
  }

  /**
   * Wraps operator by checking if arguments are contained in group.
   *
   * @param {Object} given operators
   * @param {String} operator name
   * @param {Number} arity
   *
   * @returns {Function} internalOperator
   */

  function internalOperator (given, operator, arity) {
    return function () {
      const args = [].slice.call(arguments, 0, arity)

      if (contains.apply(null, args)) {
        return given[operator].apply(null, args)
      } else {
        throw new TypeError(error.argumentIsNotInGroup)
      }
    }
  }

  // operators

  const secureCompositionLaw = internalOperator(given, 'compositionLaw', 2)
  const secureInversion = internalOperator(given, 'inversion', 1)

  function compositionLaw () {
    return [].slice.call(arguments).reduce(secureCompositionLaw)
  }

  function contains () {
    const arg = [].slice.call(arguments)

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
    const rest = [].slice.call(arguments, 1)

    return secureCompositionLaw(a, rest.map(secureInversion).reduce(secureCompositionLaw))
  }

  // identity element
  const e = given.identity

  // Check that e=e.
  if (given.equality(e, e) !== true) {
    throw new TypeError(error.equalityIsNotReflexive)
  }

  if (!given.contains(e)) {
    throw new TypeError(error.identityIsNotInGroup)
  }

  // Check that e+e=e.
  if (!given.equality(given.compositionLaw(e, e), e)) {
    throw new TypeError(error.identityIsNotNeutral)
  }

  const definition = {}

  definition[prop('identity')] = e

  // Wrap functions otherwise staticProps will treat them as getters.
  definition[prop('contains')] = () => contains
  definition[prop('notContains')] = () => notContains
  definition[prop('compositionLaw')] = () => compositionLaw
  definition[prop('inversion')] = () => secureInversion
  definition[prop('inverseCompositionLaw')] = () => inverseCompositionLaw
  definition[prop('equality')] = () => given.equality
  definition[prop('disequality')] = () => disequality

  const group = {}

  // Add immutable props to group.
  staticProps(group)(definition)

  return group
}

staticProps(algebraGroup)({ error })

module.exports = algebraGroup

},{"./package.json":4,"not-defined":15,"static-props":16}],4:[function(require,module,exports){
module.exports={
  "_from": "algebra-group@^0.6.1",
  "_id": "algebra-group@0.6.2",
  "_inBundle": false,
  "_integrity": "sha512-//pQGrgIU/Yn9B3UlquJao+GNgKILnD4j5SPpKxQCVe234Mqce6VclldvuDNa8r8HpY67up8UyY8IwIeQeVVAA==",
  "_location": "/algebra-group",
  "_phantomChildren": {},
  "_requested": {
    "type": "range",
    "registry": true,
    "raw": "algebra-group@^0.6.1",
    "name": "algebra-group",
    "escapedName": "algebra-group",
    "rawSpec": "^0.6.1",
    "saveSpec": null,
    "fetchSpec": "^0.6.1"
  },
  "_requiredBy": [
    "/algebra-ring"
  ],
  "_resolved": "https://registry.npmjs.org/algebra-group/-/algebra-group-0.6.2.tgz",
  "_shasum": "026b2b2ee47c355eb5898d642f83bf5d9574ef90",
  "_spec": "algebra-group@^0.6.1",
  "_where": "/Users/io/github.com/fibo/algebra/node_modules/algebra-ring",
  "author": {
    "name": "Gianluca Casati",
    "url": "http://g14n.info"
  },
  "bugs": {
    "url": "https://github.com/fibo/algebra-group/issues"
  },
  "bundleDependencies": false,
  "dependencies": {
    "not-defined": "^2.0.1",
    "static-props": "^1.1.1"
  },
  "deprecated": false,
  "description": "defines and algebra group structure",
  "devDependencies": {
    "dot-editorconfig": "^1.1.0",
    "pre-commit": "^1.2.2",
    "standa": "^2.0.1",
    "tape": "^4.9.0"
  },
  "homepage": "http://g14n.info/algebra-group",
  "keywords": [
    "algebra"
  ],
  "license": "MIT",
  "main": "algebra-group.js",
  "name": "algebra-group",
  "pre-commit": [
    "lint",
    "test",
    "check-deps"
  ],
  "repository": {
    "type": "git",
    "url": "git://github.com/fibo/algebra-group.git"
  },
  "scripts": {
    "check-deps": "npm outdated",
    "lint": "standa",
    "postversion": "git push origin v${npm_package_version}; npm publish; git push origin master",
    "test": "NODE_PATH=. tape test.js"
  },
  "version": "0.6.2"
}

},{}],5:[function(require,module,exports){
const group = require('algebra-group')
const staticProps = require('static-props')

const pkg = require('./package.json')

/**
 * Prepend package name to error message
 */

function msg (str) {
  return pkg.name + ': ' + str
}

const error = {
  cannotDivideByZero: msg('Cannot divide by zero'),
  doesNotContainIdentity: msg('"identity" must be contained in ring set'),
  identityIsNotNeutral: msg('"identity" is not neutral')
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

  const ring = group({
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
    const rest = [].slice.call(arguments, 1)

    return given.multiplication(a, rest.map(inversion).reduce(given.multiplication))
  }

  ring.multiplication = multiplication
  ring.inversion = inversion
  ring.division = division

  // Multiplicative identity.

  const one = identity[1]

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

},{"./package.json":6,"algebra-group":3,"static-props":16}],6:[function(require,module,exports){
module.exports={
  "_from": "algebra-ring@^0.6.3",
  "_id": "algebra-ring@0.6.3",
  "_inBundle": false,
  "_integrity": "sha512-aNALbw7Pal6APNE9EqbsFGmQZ+9ZSBXGIwsLVydypeEZC+YCaymnAkqV0hJYuPGjUqdwTa5XP7JsmNnmqAw4HA==",
  "_location": "/algebra-ring",
  "_phantomChildren": {},
  "_requested": {
    "type": "range",
    "registry": true,
    "raw": "algebra-ring@^0.6.3",
    "name": "algebra-ring",
    "escapedName": "algebra-ring",
    "rawSpec": "^0.6.3",
    "saveSpec": null,
    "fetchSpec": "^0.6.3"
  },
  "_requiredBy": [
    "/algebra-cyclic",
    "/cayley-dickson"
  ],
  "_resolved": "https://registry.npmjs.org/algebra-ring/-/algebra-ring-0.6.3.tgz",
  "_shasum": "0cc0803d09609b77568b370d137cb36a232b54a8",
  "_spec": "algebra-ring@^0.6.3",
  "_where": "/Users/io/github.com/fibo/algebra/node_modules/algebra-cyclic",
  "author": {
    "name": "Gianluca Casati",
    "url": "http://g14n.info"
  },
  "bugs": {
    "url": "https://github.com/fibo/algebra-ring/issues"
  },
  "bundleDependencies": false,
  "dependencies": {
    "algebra-group": "^0.6.1",
    "static-props": "^1.1.1"
  },
  "deprecated": false,
  "description": "defines an algebra ring structure",
  "devDependencies": {
    "pre-commit": "^1.1.2",
    "standa": "^2.0.1",
    "tape": "^4.9.0"
  },
  "homepage": "http://g14n.info/algebra-ring",
  "keywords": [
    "algebra",
    "ring",
    "structure"
  ],
  "license": "MIT",
  "main": "algebra-ring.js",
  "name": "algebra-ring",
  "pre-commit": [
    "lint",
    "test",
    "check-deps"
  ],
  "repository": {
    "type": "git",
    "url": "git+https://github.com/fibo/algebra-ring.git"
  },
  "scripts": {
    "check-deps": "npm outdated",
    "lint": "standa --fix",
    "postversion": "git push origin v${npm_package_version}; npm publish; git push origin master",
    "test": "NODE_PATH=. tape test.js"
  },
  "version": "0.6.3"
}

},{}],7:[function(require,module,exports){
var ring = require('algebra-ring')
var twoPow = Math.pow.bind(null, 2)

/**
 * Turn unary operator on single value to operator on n values.
 */

function arrayfy1 (operator, dim) {
  if (dim === 1) {
    return operator
  } else {
    return function (a) {
      var b = []

      for (var i = 0; i < dim; i++) {
        b.push(operator(a[i]))
      }

      return b
    }
  }
}

/**
 * Turn binary operator on single value to operator on n values.
 */

function arrayfy2 (operator, dim) {
  if (dim === 1) {
    return operator
  } else {
    return function (a, b) {
      var c = []

      for (var i = 0; i < dim; i++) {
        c.push(operator(a[i], b[i]))
      }

      return c
    }
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
      return function (a, b) {
        return fieldMultiplication(a[0], b[0])
      }
    }

    var dim = twoPow(iterations)
    var halfDim = twoPow(iterations - 1)

    var add = arrayfy2(fieldAddition, halfDim)
    var conj = buildConjugation(fieldNegation, iterations - 1)
    var mul = buildMultiplication(fieldAddition, fieldNegation, fieldMultiplication, iterations - 1)
    var neg = arrayfy1(fieldNegation, halfDim)

    function multiplication (a, b) {
      // a = (p, q)
      // b = (r, s)

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

      // var denote conj(x) as x`
      //
      // Multiplication law is given by
      //
      // (p, q)(r, s) = (pr - s`q, sp + qr`)

      var t = add(mul(p, r), neg(mul(conj(s), q)))
      var u = add(mul(s, p), mul(q, conj(r)))

      if (halfDim === 1) {
        return [t, u]
      } else {
        var c = []

        for (var i3 = 0; i3 < halfDim; i3++) {
          c.push(t[i3])
        }

        for (var i4 = 0; i4 < halfDim; i4++) {
          c.push(u[i4])
        }

        return c
      }
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
  // To elevate it to an algebra, we need a bilinear form which is given by the norm.
  var algebra = ring([zero, one], {
    contains,
    equality,
    addition,
    negation,
    multiplication,
    inversion
  })

  algebra.conjugation = conjugation
  algebra.norm = norm

  return algebra
}

module.exports = iterateCayleyDickson

},{"algebra-ring":5}],8:[function(require,module,exports){
function indicesPermutations (previousValue, currentValue, currentIndex, array) {
  var arrayLength = array.length
  var result = []

  if (arrayLength === 1) {
    for (var i = 0; i < currentValue; i++) {
      result.push([i])
    }
  } else {
    var arrayWithoutLastElement = []

    for (var j = 0; j < arrayLength - 1; j++) {
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
var no = require('not-defined')

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

  for (var i = 0; i < numRows; i++) {
    for (var j = 0; j < numCols; j++) {
      if ((i !== row) && (j !== col)) {
        sub.push(data[matrixToArrayIndex(i, j, numCols)])
      }
    }
  }

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
  if (data.length === 1) return data[0]

  if (no(order)) order = Math.sqrt(data.length)

  if (order % 1 !== 0) {
    throw new TypeError('data.lenght must be a square')
  }

  // Default to common real number field.
  if (no(scalar)) {
    scalar = {
      addition: function (a, b) { return a + b },
      multiplication: function (a, b) { return a * b },
      negation: function (a) { return -a }
    }
  }

  var det

  // TODO choose best row or column to start from, i.e. the one with more zeros
  // by now we start from first row, and walk by column
  // needs scalar.isZero
  //
  // is scalar.isZero is a function will be used, but should remain optional
  var startingRow = 0

  for (var col = 0; col < order; col++) {
    var subData = subMatrix(data, order, order, startingRow, col)

    //             +-- Recursion here.
    //             ↓
    var cofactor = determinant(subData, scalar, order - 1)

    if ((startingRow + col) % 2 === 1) {
      cofactor = scalar.negation(cofactor)
    }

    var index = matrixToArrayIndex(startingRow, col, order)

    if (no(det)) {
      det = scalar.multiplication(data[index], cofactor) // first iteration
    } else {
      det = scalar.addition(det, scalar.multiplication(data[index], cofactor))
    }
  }

  return det
}

module.exports = determinant

},{"not-defined":15}],11:[function(require,module,exports){
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

var matrixToArrayIndex = (i, j, numCols) => (j + i * numCols)

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

  if (no(customOperator)) customOperator = {}

  var add = customOperator.addition
  var mul = customOperator.multiplication

  // Default to operators over Reals.
  if (no(add)) add = (a, b) => (a + b)
  if (no(mul)) mul = (a, b) => (a * b)

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
      // Compatibilty check.

      var cols = rightMatrix.length / middle // right num cols
      var rows = leftMatrix.length / middle // left num rows

      var colsIsNotInteger = Math.floor(cols) !== cols
      var rowsIsNotInteger = Math.floor(rows) !== rows

      if (colsIsNotInteger) throw new TypeError(error.rightMatrixNotCompatible)
      if (rowsIsNotInteger) throw new TypeError(error.leftMatrixNotCompatible)

      // Compute result data.

      var data = []

      for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
          var leftIndex = matrixToArrayIndex(i, 0, middle)
          var rightIndex = matrixToArrayIndex(0, j, cols)

          var rightElement = rightMatrix[rightIndex]
          var leftElement = leftMatrix[leftIndex]

          var element = mul(leftElement, rightElement)

          for (var k = 1; k < middle; k++) {
            leftIndex = matrixToArrayIndex(i, k, middle)
            rightIndex = matrixToArrayIndex(k, j, cols)

            rightElement = rightMatrix[rightIndex]
            leftElement = leftMatrix[leftIndex]

            element = add(element, mul(rightElement, leftElement))
          }

          data.push(element)
        }
      }

      return data
    }
  }
}

staticProps(matrixMultiplication)({ error })

module.exports = matrixMultiplication

},{"./package.json":12,"not-defined":15,"static-props":16}],12:[function(require,module,exports){
module.exports={
  "_from": "matrix-multiplication@^0.5.2",
  "_id": "matrix-multiplication@0.5.2",
  "_inBundle": false,
  "_integrity": "sha512-rr3Adfxn9cktAn8zYAkYiDbFZFkFflwjm9oSm5drBIQJPjFoqUlT9nq7aMwXpr+Nr4uurQKgxy+9pfk5X2YmYA==",
  "_location": "/matrix-multiplication",
  "_phantomChildren": {},
  "_requested": {
    "type": "range",
    "registry": true,
    "raw": "matrix-multiplication@^0.5.2",
    "name": "matrix-multiplication",
    "escapedName": "matrix-multiplication",
    "rawSpec": "^0.5.2",
    "saveSpec": null,
    "fetchSpec": "^0.5.2"
  },
  "_requiredBy": [
    "/"
  ],
  "_resolved": "https://registry.npmjs.org/matrix-multiplication/-/matrix-multiplication-0.5.2.tgz",
  "_shasum": "3f5fd6eee86dfd592a6a299cc67a75cea17fc9bd",
  "_spec": "matrix-multiplication@^0.5.2",
  "_where": "/Users/io/github.com/fibo/algebra",
  "author": {
    "name": "Gianluca Casati",
    "url": "http://g14n.info"
  },
  "bugs": {
    "url": "https://github.com/fibo/matrix-multiplication/issues"
  },
  "bundleDependencies": false,
  "dependencies": {
    "not-defined": "^2.0.1",
    "static-props": "^1.1.1"
  },
  "deprecated": false,
  "description": "implements row by column multiplication",
  "devDependencies": {
    "pre-commit": "^1.2.2",
    "standa": "^1.0.2",
    "tape": "^4.8.0"
  },
  "homepage": "http://g14n.info/matrix-multiplication",
  "keywords": [
    "algebra"
  ],
  "license": "MIT",
  "main": "matrix-multiplication.js",
  "name": "matrix-multiplication",
  "pre-commit": [
    "lint",
    "test",
    "check-deps"
  ],
  "repository": {
    "type": "git",
    "url": "git://github.com/fibo/matrix-multiplication.git"
  },
  "scripts": {
    "check-deps": "npm outdated",
    "lint": "standa",
    "postversion": "git push origin v${npm_package_version}; npm publish; git push origin master",
    "test": "NODE_PATH=. tape test.js"
  },
  "version": "0.5.2"
}

},{}],13:[function(require,module,exports){
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

},{"./package.json":14,"static-props":16}],14:[function(require,module,exports){
module.exports={
  "_from": "multidim-array-index",
  "_id": "multidim-array-index@0.6.0",
  "_inBundle": false,
  "_integrity": "sha512-ojHXo7TNXU8i/MxkbC6BqLPR0z1Elr77PuX0xCLoQUSdo/53UjlRBcrDiaOyoLscQp1j84+qQTG1WwHPl6Vz/g==",
  "_location": "/multidim-array-index",
  "_phantomChildren": {},
  "_requested": {
    "type": "tag",
    "registry": true,
    "raw": "multidim-array-index",
    "name": "multidim-array-index",
    "escapedName": "multidim-array-index",
    "rawSpec": "",
    "saveSpec": null,
    "fetchSpec": "latest"
  },
  "_requiredBy": [
    "#USER",
    "/"
  ],
  "_resolved": "https://registry.npmjs.org/multidim-array-index/-/multidim-array-index-0.6.0.tgz",
  "_shasum": "bbadf001d13035c5fc1e7b4ef35b6b338a13ff04",
  "_spec": "multidim-array-index",
  "_where": "/Users/io/github.com/fibo/algebra",
  "author": {
    "name": "Gianluca Casati",
    "url": "http://g14n.info"
  },
  "bugs": {
    "url": "https://github.com/fibo/multidim-array-index/issues"
  },
  "bundleDependencies": false,
  "dependencies": {
    "static-props": "^1.0.0"
  },
  "deprecated": false,
  "description": "maps multidimensional array indices to monodimensional array index",
  "devDependencies": {
    "dot-editorconfig": "^1.1.0",
    "pre-commit": "^1.2.2",
    "standa": "^2.0.1",
    "tape": "^4.9.0"
  },
  "homepage": "http://g14n.info/multidim-array-index",
  "keywords": [
    "array",
    "multidim",
    "index"
  ],
  "license": "MIT",
  "main": "multidim-array-index.js",
  "name": "multidim-array-index",
  "pre-commit": [
    "check-deps",
    "lint",
    "test"
  ],
  "repository": {
    "type": "git",
    "url": "git://github.com/fibo/multidim-array-index.git"
  },
  "scripts": {
    "check-deps": "npm outdated",
    "lint": "standa",
    "postversion": "git push origin v${npm_package_version}; npm publish; git push origin master",
    "test": "NODE_PATH=. tape test.js"
  },
  "version": "0.6.0"
}

},{}],15:[function(require,module,exports){
module.exports=function(x){return x == null||(x.length<1 && typeof x != 'function')||(typeof x == 'object'&& Object.keys(x).length<1)}

},{}],16:[function(require,module,exports){
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
      if (typeof prop === 'function') {
        staticProp.get = prop
      } else {
        staticProp.value = prop
        staticProp.writable = false
      }
      staticProps[propName] = staticProp
    }
    Object.defineProperties(obj, staticProps)
  }
}
module.exports = exports.default = staticProps

},{}],17:[function(require,module,exports){
// In browserify context, fall back to a no op.
module.exports = function (cb) { cb() }

},{}],18:[function(require,module,exports){
arguments[4][13][0].apply(exports,arguments)
},{"./package.json":19,"dup":13,"static-props":16}],19:[function(require,module,exports){
module.exports={
  "_from": "multidim-array-index@^0.6.0",
  "_id": "multidim-array-index@0.6.0",
  "_inBundle": false,
  "_integrity": "sha512-ojHXo7TNXU8i/MxkbC6BqLPR0z1Elr77PuX0xCLoQUSdo/53UjlRBcrDiaOyoLscQp1j84+qQTG1WwHPl6Vz/g==",
  "_location": "/tensor-contraction/multidim-array-index",
  "_phantomChildren": {},
  "_requested": {
    "type": "range",
    "registry": true,
    "raw": "multidim-array-index@^0.6.0",
    "name": "multidim-array-index",
    "escapedName": "multidim-array-index",
    "rawSpec": "^0.6.0",
    "saveSpec": null,
    "fetchSpec": "^0.6.0"
  },
  "_requiredBy": [
    "/tensor-contraction"
  ],
  "_resolved": "https://registry.npmjs.org/multidim-array-index/-/multidim-array-index-0.6.0.tgz",
  "_shasum": "bbadf001d13035c5fc1e7b4ef35b6b338a13ff04",
  "_spec": "multidim-array-index@^0.6.0",
  "_where": "/Users/io/github.com/fibo/algebra/node_modules/tensor-contraction",
  "author": {
    "name": "Gianluca Casati",
    "url": "http://g14n.info"
  },
  "bugs": {
    "url": "https://github.com/fibo/multidim-array-index/issues"
  },
  "bundleDependencies": false,
  "dependencies": {
    "static-props": "^1.0.0"
  },
  "deprecated": false,
  "description": "maps multidimensional array indices to monodimensional array index",
  "devDependencies": {
    "dot-editorconfig": "^1.1.0",
    "pre-commit": "^1.2.2",
    "standa": "^2.0.1",
    "tape": "^4.9.0"
  },
  "homepage": "http://g14n.info/multidim-array-index",
  "keywords": [
    "array",
    "multidim",
    "index"
  ],
  "license": "MIT",
  "main": "multidim-array-index.js",
  "name": "multidim-array-index",
  "pre-commit": [
    "check-deps",
    "lint",
    "test"
  ],
  "repository": {
    "type": "git",
    "url": "git://github.com/fibo/multidim-array-index.git"
  },
  "scripts": {
    "check-deps": "npm outdated",
    "lint": "standa",
    "postversion": "git push origin v${npm_package_version}; npm publish; git push origin master",
    "test": "NODE_PATH=. tape test.js"
  },
  "version": "0.6.0"
}

},{}],20:[function(require,module,exports){
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
    return tensorDim
      .reduce(varyingTensorDim, [])
      .reduce(indicesPermutations, [])
      .reduce(sumOverVarying(tensorData), [])
  }
}

module.exports = tensorContraction

},{"indices-permutations":8,"multidim-array-index":18}],21:[function(require,module,exports){
arguments[4][13][0].apply(exports,arguments)
},{"./package.json":22,"dup":13,"static-props":16}],22:[function(require,module,exports){
module.exports={
  "_from": "multidim-array-index@^0.6.0",
  "_id": "multidim-array-index@0.6.0",
  "_inBundle": false,
  "_integrity": "sha512-ojHXo7TNXU8i/MxkbC6BqLPR0z1Elr77PuX0xCLoQUSdo/53UjlRBcrDiaOyoLscQp1j84+qQTG1WwHPl6Vz/g==",
  "_location": "/tensor-product/multidim-array-index",
  "_phantomChildren": {},
  "_requested": {
    "type": "range",
    "registry": true,
    "raw": "multidim-array-index@^0.6.0",
    "name": "multidim-array-index",
    "escapedName": "multidim-array-index",
    "rawSpec": "^0.6.0",
    "saveSpec": null,
    "fetchSpec": "^0.6.0"
  },
  "_requiredBy": [
    "/tensor-product"
  ],
  "_resolved": "https://registry.npmjs.org/multidim-array-index/-/multidim-array-index-0.6.0.tgz",
  "_shasum": "bbadf001d13035c5fc1e7b4ef35b6b338a13ff04",
  "_spec": "multidim-array-index@^0.6.0",
  "_where": "/Users/io/github.com/fibo/algebra/node_modules/tensor-product",
  "author": {
    "name": "Gianluca Casati",
    "url": "http://g14n.info"
  },
  "bugs": {
    "url": "https://github.com/fibo/multidim-array-index/issues"
  },
  "bundleDependencies": false,
  "dependencies": {
    "static-props": "^1.0.0"
  },
  "deprecated": false,
  "description": "maps multidimensional array indices to monodimensional array index",
  "devDependencies": {
    "dot-editorconfig": "^1.1.0",
    "pre-commit": "^1.2.2",
    "standa": "^2.0.1",
    "tape": "^4.9.0"
  },
  "homepage": "http://g14n.info/multidim-array-index",
  "keywords": [
    "array",
    "multidim",
    "index"
  ],
  "license": "MIT",
  "main": "multidim-array-index.js",
  "name": "multidim-array-index",
  "pre-commit": [
    "check-deps",
    "lint",
    "test"
  ],
  "repository": {
    "type": "git",
    "url": "git://github.com/fibo/multidim-array-index.git"
  },
  "scripts": {
    "check-deps": "npm outdated",
    "lint": "standa",
    "postversion": "git push origin v${npm_package_version}; npm publish; git push origin master",
    "test": "NODE_PATH=. tape test.js"
  },
  "version": "0.6.0"
}

},{}],23:[function(require,module,exports){
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

},{"indices-permutations":8,"multidim-array-index":21}],24:[function(require,module,exports){
const Boole = {
  zero: false,
  one: true,
  contains: (a) => (typeof a === 'boolean'),
  addition: (a, b) => (a || b),
  equality: (a, b) => (a === b),
  negation: (a) => (a),
  multiplication: (a, b) => (a && b),
  inversion: (a) => (a)
}

module.exports = Boole

},{}],25:[function(require,module,exports){
const CayleyDickson = require('cayley-dickson')
const createScalar = require('./createScalar')
const no = require('not-defined')

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

function CompositionAlgebra (field, num) {
  if (no(num)) num = 1

  const logBase2 = [1, 2, 4, 8].indexOf(num)

  if (logBase2 === -1) {
    throw new TypeError('Argument n must be 1, 2, 4 or 8')
  }

  return createScalar(CayleyDickson(field, logBase2))
}

module.exports = CompositionAlgebra

},{"./createScalar":32,"cayley-dickson":7,"not-defined":15}],26:[function(require,module,exports){
const algebraCyclic = require('algebra-cyclic')
const createScalar = require('./createScalar')

/**
 * Create a Cyclic algebra.
 *
 * @param {String|Array} elements
 */

function Cyclic (elements) {
  const ring = algebraCyclic(elements)

  return createScalar(ring)
}

module.exports = Cyclic

},{"./createScalar":32,"algebra-cyclic":1}],27:[function(require,module,exports){
const determinant = require('laplace-determinant')
const inherits = require('inherits')
const itemsPool = require('./itemsPool')
const matrixMultiplication = require('matrix-multiplication')
const multiDimArrayIndex = require('multidim-array-index')
const no = require('not-defined')
const operators = require('./operators.json')
const staticProps = require('static-props')
const TensorSpace = require('./TensorSpace')
const tensorContraction = require('tensor-contraction')
const toData = require('./toData')

/**
 * Space of m x n matrices
 *
 * ```
 * const R = algebra.R
 *
 * const R2x2 = algebra.MatrixSpace(R)(2)
 * ```
 *
 * @param {Object} Scalar
 *
 * @returns {Function} anonymous with signature (numRows[, numCols])
 */

function MatrixSpace (Scalar) {
  const contraction = tensorContraction.bind(null, Scalar.addition)

  /**
   * @param {Number} numRows
   * @param {Number} [numCols] defaults to a square matrix.
   *
   * @returns {Function} Matrix
   */

  return function (numRows, numCols) {
    // numCols defaults to numRows
    if (no(numCols)) numCols = numRows

    const isSquare = (numRows === numCols)
    const indices = [numRows, numCols]

    const AbstractMatrix = TensorSpace(Scalar)(indices)

    /**
     * Calculates the matrix trace.
     *
     * https://en.wikipedia.org/wiki/Trace_(linear_algebra)
     *
     * @param {Object|Array} matrix
     *
     * @returns {Object} scalar
     */

    function trace (matrix) {
      const matrixData = toData(matrix)

      return contraction([0, 1], indices, matrixData)
    }

    /**
     * Multiplies row by column to the right.
     *
     * @param {Object|Array} rightMatrix
     *
     * @returns {Object} matrix
     */

    function multiplication (leftMatrix, rightMatrix) {
      const leftMatrixData = toData(leftMatrix)
      const rightMatrixData = toData(rightMatrix)

      const rowByColumnMultiplication = matrixMultiplication(Scalar)(numCols)

      return rowByColumnMultiplication(leftMatrixData, rightMatrixData)
    }

    /**
     * Calculates the transpose of a matrix.
     *
     * @param {Object|Array} matrix
     *
     * @returns {Array} matrix
     */

    function transpose (matrix) {
      const matrixData = toData(matrix)
      const transposedData = []

      for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
          const index = multiDimArrayIndex([numRows, numCols], [i, j])
          const transposedIndex = multiDimArrayIndex([numCols, numRows], [j, i])

          transposedData[transposedIndex] = matrixData[index]
        }
      }

      return transposedData
    }

    /**
     * Matrix element.
     */

    function Matrix (data) {
      AbstractMatrix.call(this, data)

      staticProps(this)({
        numCols,
        numRows
      })

      function computeDeterminant () {
        const det = determinant(data, Scalar, numRows)

        return new Scalar(det)
      }

      if (isSquare) {
        staticProps(this)({
          trace: trace(data)
        })

        staticProps(this)({
          determinant: computeDeterminant,
          det: computeDeterminant
        })
      }

      function transposed () {
        const result = transpose(data)
        const VectorSpace = itemsPool.get('VectorSpace')

        if (numRows === 1) {
          const Vector = VectorSpace(Scalar)(numCols)
          return new Vector(result)
        } else {
          const Matrix = MatrixSpace(Scalar)(numCols, numRows)
          return new Matrix(result)
        }
      }

      staticProps(this)({
        transposed,
        tr: transposed
      })
    }

    inherits(Matrix, AbstractMatrix)

    if (isSquare) {
      Matrix.trace = trace
    }

    Matrix.prototype.multiplication = function (rightMatrix) {
      const leftMatrixData = this.data
      const result = multiplication(leftMatrixData, rightMatrix)

      const rightNumRows = numCols
      const rightNumCols = result.length / rightNumRows

      const Matrix = MatrixSpace(Scalar)(rightNumRows, rightNumCols)

      return new Matrix(result)
    }

    // Static operators.

    Matrix.multiplication = multiplication
    Matrix.transpose = transpose

    // Aliases

    Matrix.tr = Matrix.transpose
    Matrix.mul = Matrix.multiplication

    Matrix.prototype.mul = Matrix.prototype.multiplication

    operators.group.forEach((operator) => {
      operators.aliasesOf[operator].forEach((alias) => {
        Matrix[alias] = Matrix[operator]
        Matrix.prototype[alias] = Matrix.prototype[operator]
      })
    })

    operators.group.forEach((operator) => {
      Matrix[operator] = AbstractMatrix[operator]
    })

    staticProps(Matrix)({
      numCols,
      numRows
    })

    return Matrix
  }
}

itemsPool.set('MatrixSpace', MatrixSpace)

module.exports = MatrixSpace

},{"./TensorSpace":29,"./itemsPool":33,"./operators.json":34,"./toData":36,"inherits":9,"laplace-determinant":10,"matrix-multiplication":11,"multidim-array-index":13,"not-defined":15,"static-props":16,"tensor-contraction":20}],28:[function(require,module,exports){
const algebraRing = require('algebra-cyclic')
const createScalar = require('./createScalar')

/**
 * Create a Scalar.
 */

function Scalar (neutralElements, operators) {
  const ring = algebraRing(neutralElements, operators)

  return createScalar(ring)
}

module.exports = Scalar

},{"./createScalar":32,"algebra-cyclic":1}],29:[function(require,module,exports){
const operators = require('./operators.json')
const staticProps = require('static-props')
const toData = require('./toData')
const tensorProduct = require('tensor-product')

/**
 * Creates a tensor space that is a class representing a tensor.
 *
 * @param {Object} Scalar
 *
 * @returns {Function} anonymous with signature (indices)
 */

function TensorSpace (Scalar) {
  const multiplication = Scalar.multiplication

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
    const order = indices.filter((dim) => dim > 1).length

    // TODO if it is a scalar, return the Scalar
    // which should be a composition algebra
    // Then add product tensor to composition algebras.
    // Finally, a tensor i,j,k should be constructed as the
    // tensor product of a scalar i,j,k times.
    const isScalar = (order === 0)

    const dimension = indices.reduce((a, b) => a * b, 1)

    if (isScalar) {
      staticProps(Scalar)({ order })

      return Scalar
    }

    // TODO create one for square matrices
    // Create zero.
    const zero = indices.reduce((result, dim) => {
      for (let i = 0; i < dim; i++) {
        result.push(Scalar.zero)
      }

      return result
    }, [])

    /**
     */

    function Tensor (data) {
      // validate data

      function validate (item) {
        if (Scalar.notContains(item)) {
          throw new TypeError('Invalid data = ' + item)
        }
      }

      data.forEach(validate)

      const enumerable = true
      staticProps(this)({ data }, enumerable)

      staticProps(this)({ order })
    }

    function staticBinary (operator) {
      Tensor[operator] = function () {
        let result = []

        for (let i = 0; i < dimension; i++) {
          let operands = []

          for (let j = 0; j < arguments.length; j++) {
            operands.push(toData(arguments[j])[i])
          }

          result.push(Scalar[operator].apply(null, operands))
        }

        return result
      }
    }

    const myBinaryOperators = ['addition', 'subtraction']

    myBinaryOperators.forEach((operator) => {
      staticBinary(operator)

      Tensor.prototype[operator] = function () {
        const args = [].slice.call(arguments)
        const operands = [this.data].concat(args)

        const data = Tensor[operator].apply(null, operands)

        const tensor = new Tensor(data)

        return tensor
      }
    })

    function scalarMultiplication (tensor, scalar) {
      const tensorData = toData(tensor)

      let result = []

      for (let i = 0; i < dimension; i++) {
        result.push(multiplication(tensorData[i], scalar))
      }

      return result
    }

    Tensor.scalarMultiplication = scalarMultiplication

    Tensor.prototype.scalarMultiplication = function (scalar) {
      const data = scalarMultiplication(this, scalar)

      return new Tensor(data)
    }

    Tensor.equality = function (tensor1, tensor2) {
      const tensorData1 = toData(tensor1)
      const tensorData2 = toData(tensor2)

      for (let i = 0; i < dimension; i++) {
        if (Scalar.disequality(tensorData1[i], tensorData2[i])) {
          return false
        }
      }

      return true
    }

    Tensor.prototype.equality = function (tensor2) {
      return Tensor.equality(this, tensor2)
    }

    Tensor.product = function (leftData) {
      return (rightDim) => {
        return function (rightData) {
          return tensorProduct(multiplication, indices, rightDim, leftData, rightData)
        }
      }
    }

    staticProps(Tensor)({
      order,
      zero
    })

    const myOperators = operators.group

    myOperators.forEach((operator) => {
      operators.aliasesOf[operator].forEach((alias) => {
        Tensor[alias] = Tensor[operator]
        Tensor.prototype[alias] = Tensor.prototype[operator]
      })
    })

    return Tensor
  }
}

module.exports = TensorSpace

},{"./operators.json":34,"./toData":36,"static-props":16,"tensor-product":23}],30:[function(require,module,exports){
const inherits = require('inherits')
const itemsPool = require('./itemsPool')
const matrixMultiplication = require('matrix-multiplication')
const operators = require('./operators.json')
const staticProps = require('static-props')
const TensorSpace = require('./TensorSpace')
const toData = require('./toData')

/**
 * Space of vectors
 *
 * ```
 * const V = VectorSpace(R)(2)
 *
 * const v = new V([1, 2])
 * ```
 *
 * @param {Object} Scalar
 *
 * @returns {Function} anonymous with signature (dimension)
 */

function VectorSpace (Scalar) {
  const addition = Scalar.addition
  const multiplication = Scalar.multiplication
  const subtraction = Scalar.subtraction

  /**
   * @param {Number} dimension
   *
   * @returns {Function} Vector
   */

  return function (dimension) {
    const indices = [dimension]

    const AbstractVector = TensorSpace(Scalar)(indices)

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

    function crossProduct (vector1, vector2) {
      const vectorData1 = toData(vector1)
      const vectorData2 = toData(vector2)

      const ux = vectorData1[0]
      const uy = vectorData1[1]
      const uz = vectorData1[2]

      const vx = vectorData2[0]
      const vy = vectorData2[1]
      const vz = vectorData2[2]

      let vector = []

      vector.push(subtraction(multiplication(uy, vz), multiplication(uz, vy)))
      vector.push(subtraction(multiplication(uz, vx), multiplication(ux, vz)))
      vector.push(subtraction(multiplication(ux, vy), multiplication(uy, vx)))

      return vector
    }

    /**
     * Multiply a column vector by matrix on right side
     * @param {Object|Array} vector
     *
     * @returns {Object} scalar
     */

    function multiplicationByMatrix (leftVector, rightMatrix) {
      const leftVectorData = toData(leftVector)
      const rightMatrixData = toData(rightMatrix)

      const rowByColumnMultiplication = matrixMultiplication(Scalar)(dimension)

      return rowByColumnMultiplication(leftVectorData, rightMatrixData)
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

    function norm (vector) {
      const data = toData(vector)

      let value = multiplication(data[0], data[0])

      for (let i = 1; i < dimension; i++) {
        value = addition(value, multiplication(data[i], data[i]))
      }

      return new Scalar(value)
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

    function scalarProduct (vector1, vector2) {
      // TODO use tensor product and then contraction (trace)
      const vectorData1 = toData(vector1)
      const vectorData2 = toData(vector2)

      if (vectorData1.length !== vectorData2.length) {
        throw new TypeError('Vectors have not the same dimension')
      }

      let result = multiplication(vectorData1[0], vectorData2[0])

      for (let i = 1; i < dimension; i++) {
        result = addition(result, multiplication(vectorData1[i], vectorData2[i]))
      }

      return result
    }

    /**
     * Vector element.
     */

    function Vector (data) {
      AbstractVector.call(this, data)

      staticProps(this)({
        norm: norm(data),
        dimension
      })
    }

    inherits(Vector, AbstractVector)

    staticProps(Vector)({ dimension })

    Vector.prototype.scalarProduct = function (vector) {
      const data = this.data

      const result = scalarProduct(data, vector)

      return new Scalar(result)
    }

    // Cross product is defined only in dimension 3.
    function crossProductMethod (vector) {
      const data = this.data

      const result = crossProduct(data, vector)

      return new Vector(result)
    }

    if (dimension === 3) {
      Vector.crossProduct = crossProduct

      Vector.prototype.crossProduct = crossProductMethod
      Vector.prototype.cross = crossProductMethod
    }

    Vector.prototype.multiplication = function (rightMatrix) {
      const MatrixSpace = itemsPool.get('MatrixSpace')

      const leftVectorData = this.data
      const result = multiplicationByMatrix(leftVectorData, rightMatrix)

      // TODO rightNumRows equals dimension
      // but the vector should be transposed.
      // Add transpose operator for vectors, then use it implicitly.
      const rightNumRows = dimension
      const rightNumCols = result.length / rightNumRows

      const Matrix = MatrixSpace(Scalar)(rightNumRows, rightNumCols)

      return new Matrix(result)
    }

    // Static operators.

    Vector.multiplication = multiplicationByMatrix
    Vector.norm = norm
    Vector.scalarProduct = scalarProduct

    operators.comparison.forEach((operator) => {
      Vector[operator] = AbstractVector[operator]
    })

    operators.set.forEach((operator) => {
      Vector[operator] = AbstractVector[operator]
    })

    operators.group.forEach((operator) => {
      Vector[operator] = AbstractVector[operator]
    })

    // Aliases

    Vector.mul = multiplicationByMatrix
    Vector.prototype.mul = Vector.prototype.multiplication

    const myOperators = ['scalarProduct'].concat(operators.group)

    myOperators.forEach((operator) => {
      operators.aliasesOf[operator].forEach((alias) => {
        Vector[alias] = Vector[operator]
        Vector.prototype[alias] = Vector.prototype[operator]
      })
    })

    if (dimension === 3) {
      Vector.cross = crossProduct
    }

    return Vector
  }
}

itemsPool.set('VectorSpace', VectorSpace)

module.exports = VectorSpace

},{"./TensorSpace":29,"./itemsPool":33,"./operators.json":34,"./toData":36,"inherits":9,"matrix-multiplication":11,"static-props":16}],31:[function(require,module,exports){
const toData = require('./toData')

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

},{"./toData":36}],32:[function(require,module,exports){
const coerced = require('./coerced')
const operators = require('./operators.json')
const staticProps = require('static-props')
const toData = require('./toData')

/**
 * @param {Object} ring
 *
 * @returns {Function} Scalar
 */

function createScalar (ring) {
  const attributes = {
    zero: ring.zero,
    one: ring.one,
    order: 0
  }

  /**
   * Scalar element.
   */

  class Scalar {
    constructor (data) {
      // validate data
      if (ring.notContains(data)) {
        throw new TypeError('Invalid data = ' + data)
      }

      const enumerable = true
      staticProps(this)({ data }, enumerable)

      staticProps(this)(attributes)
    }
  }

  staticProps(Scalar)(attributes)

  const staticNary = (operator) => {
    Scalar[operator] = function () {
      const operands = [].slice.call(arguments).map(toData)
      return coerced(ring[operator]).apply(null, operands)
    }
  }

  const unaryOperators = operators.inversion

  unaryOperators.push('conjugation')

  unaryOperators.forEach((operator) => {
    Scalar[operator] = function (operand) {
      return ring[operator](toData(operand))
    }

    Scalar.prototype[operator] = function () {
      const data = Scalar[operator](this.data)

      return new Scalar(data)
    }
  })

  operators.group.concat(operators.ring).forEach((operator) => {
    staticNary(operator)

    Scalar.prototype[operator] = function () {
      const args = [].slice.call(arguments)
      const operands = [this.data].concat(args)

      const data = Scalar[operator].apply(null, operands)

      return new Scalar(data)
    }
  })

  operators.set.forEach((operator) => {
    staticNary(operator)
  })

  operators.comparison.forEach((operator) => {
    staticNary(operator)

    Scalar.prototype[operator] = function () {
      const args = [].slice.call(arguments)
      const operands = [this.data].concat(args)

      const bool = Scalar[operator].apply(null, operands)

      return bool
    }
  })

  Object.keys(operators.aliasesOf).forEach((operator) => {
    operators.aliasesOf[operator].forEach((alias) => {
      Scalar[alias] = Scalar[operator]
      Scalar.prototype[alias] = Scalar.prototype[operator]
    })
  })

  return Scalar
}

module.exports = createScalar

},{"./coerced":31,"./operators.json":34,"./toData":36,"static-props":16}],33:[function(require,module,exports){
const itemsPool = new Map()

module.exports = itemsPool

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
const realField = {
  zero: 0,
  one: 1,
  // NaN, Infinity and -Infinity are not allowed.
  contains: (a) => (typeof a === 'number' && isFinite(a)),
  equality: (a, b) => a === b,
  addition: (a, b) => a + b,
  negation: (a) => -a,
  multiplication: (a, b) => a * b,
  inversion: (a) => 1 / a
}

module.exports = realField

},{}],36:[function(require,module,exports){
const no = require('not-defined')

/**
 * Extract data attribute, if any, and check it
 *
 * @param {*} arg
 *
 * @returns {*} data
 */

function toData (arg) {
  let data

  if (no(arg.data)) data = arg
  else data = arg.data

  if (no(data)) throw new TypeError('No data')

  return data
}

module.exports = toData

},{"not-defined":15}],"algebra":[function(require,module,exports){
require('strict-mode')(() => {
  var Boole = require('./src/Boole')
  exports.Boole = Boole

  var CompositionAlgebra = require('./src/CompositionAlgebra')
  exports.CompositionAlgebra = CompositionAlgebra

  var Cyclic = require('./src/Cyclic')
  exports.Cyclic = Cyclic

  var Scalar = require('./src/Scalar')
  exports.Scalar = Scalar

  var realField = require('./src/realField')

  var Real = CompositionAlgebra(realField, 1)
  var Complex = CompositionAlgebra(realField, 2)
  var Quaternion = CompositionAlgebra(realField, 4)
  var Octonion = CompositionAlgebra(realField, 8)

  exports.Real = Real
  exports.Complex = Complex
  exports.Quaternion = Quaternion
  exports.Octonion = Octonion

  var VectorSpace = require('./src/VectorSpace')
  var MatrixSpace = require('./src/MatrixSpace')

  exports.C = Complex
  exports.C2x2 = MatrixSpace(Complex)(2)
  exports.H = Quaternion
  exports.R = Real
  exports.R2 = VectorSpace(Real)(2)
  exports.R3 = VectorSpace(Real)(3)
  exports.R2x2 = MatrixSpace(Real)(2)

  exports.VectorSpace = VectorSpace
  exports.MatrixSpace = MatrixSpace
  exports.TensorSpace = require('./src/TensorSpace')
})

},{"./src/Boole":24,"./src/CompositionAlgebra":25,"./src/Cyclic":26,"./src/MatrixSpace":27,"./src/Scalar":28,"./src/TensorSpace":29,"./src/VectorSpace":30,"./src/realField":35,"strict-mode":17}]},{},[]);
