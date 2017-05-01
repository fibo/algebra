(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require('strict-mode')(() => {
  var Cyclic = require('./src/Cyclic')
  exports.Cyclic = Cyclic

  var CompositionAlgebra = require('./src/CompositionAlgebra')
  exports.CompositionAlgebra = CompositionAlgebra

  var field = require('./src/realField')

  var Real = CompositionAlgebra(field, 1)
  var Complex = CompositionAlgebra(field, 2)
  var Quaternion = CompositionAlgebra(field, 4)
  var Octonion = CompositionAlgebra(field, 8)

  exports.Real = Real
  exports.Complex = Complex
  exports.Quaternion = Quaternion
  exports.Octonion = Octonion

  var VectorSpace = require('./src/VectorSpace')
  var MatrixSpace = require('./src/MatrixSpace')

  exports.C = Complex
  exports.H = Quaternion
  exports.R = Real
  exports.R2 = VectorSpace(Real)(2)
  exports.R3 = VectorSpace(Real)(3)
  exports.R2x2 = MatrixSpace(Real)(2)

  exports.VectorSpace = VectorSpace
  exports.MatrixSpace = MatrixSpace
  exports.TensorSpace = require('./src/TensorSpace')
})

},{"./src/CompositionAlgebra":26,"./src/Cyclic":27,"./src/MatrixSpace":28,"./src/TensorSpace":29,"./src/VectorSpace":30,"./src/realField":36,"strict-mode":21}],2:[function(require,module,exports){
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

},{"./package.json":3,"algebra-ring":5,"static-props":20}],3:[function(require,module,exports){
module.exports={
  "_args": [
    [
      {
        "raw": "algebra-cyclic@^0.2.0",
        "scope": null,
        "escapedName": "algebra-cyclic",
        "name": "algebra-cyclic",
        "rawSpec": "^0.2.0",
        "spec": ">=0.2.0 <0.3.0",
        "type": "range"
      },
      "/Users/gcasati/github.com/fibo/algebra"
    ]
  ],
  "_from": "algebra-cyclic@>=0.2.0 <0.3.0",
  "_id": "algebra-cyclic@0.2.1",
  "_inCache": true,
  "_location": "/algebra-cyclic",
  "_nodeVersion": "4.3.2",
  "_npmOperationalInternal": {
    "host": "packages-16-east.internal.npmjs.com",
    "tmp": "tmp/algebra-cyclic-0.2.1.tgz_1472365525236_0.8247350375168025"
  },
  "_npmUser": {
    "name": "fibo",
    "email": "casati_gianluca@yahoo.it"
  },
  "_npmVersion": "3.8.9",
  "_phantomChildren": {},
  "_requested": {
    "raw": "algebra-cyclic@^0.2.0",
    "scope": null,
    "escapedName": "algebra-cyclic",
    "name": "algebra-cyclic",
    "rawSpec": "^0.2.0",
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
  "_where": "/Users/gcasati/github.com/fibo/algebra",
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
      "name": "fibo",
      "email": "casati_gianluca@yahoo.it"
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

},{}],4:[function(require,module,exports){

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

},{}],5:[function(require,module,exports){
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

},{"algebra-group":4,"static-props":6}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
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

      // var denote conj(x) as x`
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

},{"algebra-ring":10}],8:[function(require,module,exports){
const no = require('not-defined')
const staticProps = require('static-props')

const pkg = require('./package.json')

/**
 * Prepend package name to error message
 */

function msg (str) {
  return pkg.name + ': ' + str
}

var error = {}

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

  var secureCompositionLaw = internalOperator(given, 'compositionLaw', 2)
  var secureInversion = internalOperator(given, 'inversion', 1)

  function compositionLaw () {
    return [].slice.call(arguments).reduce(secureCompositionLaw)
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

    return secureCompositionLaw(a, rest.map(secureInversion).reduce(secureCompositionLaw))
  }

  // identity element
  var e = given.identity

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

  var definition = {}

  definition[prop('identity')] = e

  // Wrap functions otherwise staticProps will treat them as getters.
  definition[prop('contains')] = () => contains
  definition[prop('notContains')] = () => notContains
  definition[prop('compositionLaw')] = () => compositionLaw
  definition[prop('inversion')] = () => secureInversion
  definition[prop('inverseCompositionLaw')] = () => inverseCompositionLaw
  definition[prop('equality')] = () => given.equality
  definition[prop('disequality')] = () => disequality

  var group = {}

  // Add immutable props to group.
  staticProps(group)(definition)

  return group
}

staticProps(algebraGroup)({ error })

module.exports = algebraGroup

},{"./package.json":9,"not-defined":19,"static-props":20}],9:[function(require,module,exports){
module.exports={
  "_args": [
    [
      {
        "raw": "algebra-group@^0.6.0",
        "scope": null,
        "escapedName": "algebra-group",
        "name": "algebra-group",
        "rawSpec": "^0.6.0",
        "spec": ">=0.6.0 <0.7.0",
        "type": "range"
      },
      "/Users/gcasati/github.com/fibo/algebra/node_modules/cayley-dickson/node_modules/algebra-ring"
    ]
  ],
  "_from": "algebra-group@>=0.6.0 <0.7.0",
  "_id": "algebra-group@0.6.0",
  "_inCache": true,
  "_location": "/cayley-dickson/algebra-group",
  "_nodeVersion": "6.9.1",
  "_npmOperationalInternal": {
    "host": "packages-12-west.internal.npmjs.com",
    "tmp": "tmp/algebra-group-0.6.0.tgz_1480252373194_0.09729086351580918"
  },
  "_npmUser": {
    "name": "fibo",
    "email": "casati_gianluca@yahoo.it"
  },
  "_npmVersion": "3.10.8",
  "_phantomChildren": {},
  "_requested": {
    "raw": "algebra-group@^0.6.0",
    "scope": null,
    "escapedName": "algebra-group",
    "name": "algebra-group",
    "rawSpec": "^0.6.0",
    "spec": ">=0.6.0 <0.7.0",
    "type": "range"
  },
  "_requiredBy": [
    "/cayley-dickson/algebra-ring"
  ],
  "_resolved": "https://registry.npmjs.org/algebra-group/-/algebra-group-0.6.0.tgz",
  "_shasum": "3849872097e3e1eff5ad03ed3cf09f210d31be81",
  "_shrinkwrap": null,
  "_spec": "algebra-group@^0.6.0",
  "_where": "/Users/gcasati/github.com/fibo/algebra/node_modules/cayley-dickson/node_modules/algebra-ring",
  "author": {
    "name": "Gianluca Casati",
    "url": "http://g14n.info"
  },
  "bugs": {
    "url": "https://github.com/fibo/algebra-group/issues"
  },
  "dependencies": {
    "not-defined": "1.x",
    "static-props": "1.x"
  },
  "description": "defines and algebra group structure",
  "devDependencies": {
    "pre-commit": "1.x",
    "standard": "8.x",
    "tape": "4.x"
  },
  "directories": {},
  "dist": {
    "shasum": "3849872097e3e1eff5ad03ed3cf09f210d31be81",
    "tarball": "https://registry.npmjs.org/algebra-group/-/algebra-group-0.6.0.tgz"
  },
  "gitHead": "3f6697fad0ab440231f4ccc92e2b8eb3c9eafdcd",
  "homepage": "http://npm.im/algebra-group",
  "keywords": [
    "algebra"
  ],
  "license": "MIT",
  "main": "index.js",
  "maintainers": [
    {
      "name": "fibo",
      "email": "casati_gianluca@yahoo.it"
    }
  ],
  "name": "algebra-group",
  "optionalDependencies": {},
  "pre-commit": [
    "lint",
    "test",
    "check-deps"
  ],
  "readme": "ERROR: No README data found!",
  "repository": {
    "type": "git",
    "url": "git://github.com/fibo/algebra-group.git"
  },
  "scripts": {
    "check-deps": "npm outdated",
    "lint": "standard",
    "postversion": "git push origin v${npm_package_version}; npm publish; git push origin master",
    "test": "tape test.js"
  },
  "version": "0.6.0"
}

},{}],10:[function(require,module,exports){
var group = require('algebra-group')
var staticProps = require('static-props')

var pkg = require('./package.json')

/**
 * Prepend package name to error message
 */

function msg (str) {
  return pkg.name + ': ' + str
}

var error = {
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

},{"./package.json":11,"algebra-group":8,"static-props":20}],11:[function(require,module,exports){
module.exports={
  "_args": [
    [
      {
        "raw": "algebra-ring@^0.6.0",
        "scope": null,
        "escapedName": "algebra-ring",
        "name": "algebra-ring",
        "rawSpec": "^0.6.0",
        "spec": ">=0.6.0 <0.7.0",
        "type": "range"
      },
      "/Users/gcasati/github.com/fibo/algebra/node_modules/cayley-dickson"
    ]
  ],
  "_from": "algebra-ring@>=0.6.0 <0.7.0",
  "_id": "algebra-ring@0.6.0",
  "_inCache": true,
  "_location": "/cayley-dickson/algebra-ring",
  "_nodeVersion": "7.7.4",
  "_npmOperationalInternal": {
    "host": "packages-12-west.internal.npmjs.com",
    "tmp": "tmp/algebra-ring-0.6.0.tgz_1490736342978_0.44902119413018227"
  },
  "_npmUser": {
    "name": "fibo",
    "email": "casati_gianluca@yahoo.it"
  },
  "_npmVersion": "4.4.4",
  "_phantomChildren": {},
  "_requested": {
    "raw": "algebra-ring@^0.6.0",
    "scope": null,
    "escapedName": "algebra-ring",
    "name": "algebra-ring",
    "rawSpec": "^0.6.0",
    "spec": ">=0.6.0 <0.7.0",
    "type": "range"
  },
  "_requiredBy": [
    "/cayley-dickson"
  ],
  "_resolved": "https://registry.npmjs.org/algebra-ring/-/algebra-ring-0.6.0.tgz",
  "_shasum": "218a30c30195e4559ab57183c9ae1fc4fa8ca3b9",
  "_shrinkwrap": null,
  "_spec": "algebra-ring@^0.6.0",
  "_where": "/Users/gcasati/github.com/fibo/algebra/node_modules/cayley-dickson",
  "author": {
    "name": "Gianluca Casati",
    "url": "http://g14n.info"
  },
  "bugs": {
    "url": "https://github.com/fibo/algebra-ring/issues"
  },
  "dependencies": {
    "algebra-group": "^0.6.0",
    "static-props": "^1.0.2"
  },
  "description": "defines an algebra ring structure",
  "devDependencies": {
    "pre-commit": "^1.1.2",
    "standard": "^9.0.2",
    "tape": "^4.2.0"
  },
  "directories": {},
  "dist": {
    "shasum": "218a30c30195e4559ab57183c9ae1fc4fa8ca3b9",
    "tarball": "https://registry.npmjs.org/algebra-ring/-/algebra-ring-0.6.0.tgz"
  },
  "gitHead": "6636b9931ef5fcc7f89584395b2b6e27612e5d3d",
  "homepage": "https://github.com/fibo/algebra-ring",
  "keywords": [
    "algebra",
    "ring",
    "structure"
  ],
  "license": "MIT",
  "main": "algebra-ring.js",
  "maintainers": [
    {
      "name": "fibo",
      "email": "casati_gianluca@yahoo.it"
    }
  ],
  "name": "algebra-ring",
  "optionalDependencies": {},
  "pre-commit": [
    "lint",
    "test",
    "check-deps"
  ],
  "readme": "ERROR: No README data found!",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/fibo/algebra-ring.git"
  },
  "scripts": {
    "check-deps": "npm outdated",
    "lint": "standard",
    "postversion": "git push origin v${npm_package_version}; npm publish; git push origin master",
    "test": "NODE_PATH=. tape test.js"
  },
  "version": "0.6.0"
}

},{}],12:[function(require,module,exports){
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

},{}],13:[function(require,module,exports){
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

},{}],14:[function(require,module,exports){

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
  leftMatrixNotCompatible: msg('Cannot multiply matrix at left side'),
  rightMatrixNotCompatible: msg('Cannot multiply matrix at right side')
})

const matrixToArrayIndex = (i, j, numCols) => (j + i * numCols)

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

      const cols = rightMatrix.length / middle // right num cols
      const rows = leftMatrix.length / middle  // left num rows

      const colsIsNotInteger = Math.floor(cols) !== cols
      const rowsIsNotInteger = Math.floor(rows) !== rows

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

},{"./package.json":16,"not-defined":19,"static-props":20}],16:[function(require,module,exports){
module.exports={
  "_args": [
    [
      {
        "raw": "matrix-multiplication@^0.5.0",
        "scope": null,
        "escapedName": "matrix-multiplication",
        "name": "matrix-multiplication",
        "rawSpec": "^0.5.0",
        "spec": ">=0.5.0 <0.6.0",
        "type": "range"
      },
      "/Users/gcasati/github.com/fibo/algebra"
    ]
  ],
  "_from": "matrix-multiplication@>=0.5.0 <0.6.0",
  "_id": "matrix-multiplication@0.5.0",
  "_inCache": true,
  "_location": "/matrix-multiplication",
  "_nodeVersion": "6.9.1",
  "_npmOperationalInternal": {
    "host": "packages-12-west.internal.npmjs.com",
    "tmp": "tmp/matrix-multiplication-0.5.0.tgz_1480269165278_0.5621082405559719"
  },
  "_npmUser": {
    "name": "fibo",
    "email": "casati_gianluca@yahoo.it"
  },
  "_npmVersion": "3.10.8",
  "_phantomChildren": {},
  "_requested": {
    "raw": "matrix-multiplication@^0.5.0",
    "scope": null,
    "escapedName": "matrix-multiplication",
    "name": "matrix-multiplication",
    "rawSpec": "^0.5.0",
    "spec": ">=0.5.0 <0.6.0",
    "type": "range"
  },
  "_requiredBy": [
    "/"
  ],
  "_resolved": "https://registry.npmjs.org/matrix-multiplication/-/matrix-multiplication-0.5.0.tgz",
  "_shasum": "ed92f068e0e02181947135910b28bab98c36a4b1",
  "_shrinkwrap": null,
  "_spec": "matrix-multiplication@^0.5.0",
  "_where": "/Users/gcasati/github.com/fibo/algebra",
  "author": {
    "name": "Gianluca Casati",
    "url": "http://g14n.info"
  },
  "bugs": {
    "url": "https://github.com/fibo/matrix-multiplication/issues"
  },
  "dependencies": {
    "not-defined": "1.x",
    "static-props": "1.x"
  },
  "description": "implements row by column multiplication",
  "devDependencies": {
    "pre-commit": "1.x",
    "standard": "8.x",
    "tape": "4.x"
  },
  "directories": {},
  "dist": {
    "shasum": "ed92f068e0e02181947135910b28bab98c36a4b1",
    "tarball": "https://registry.npmjs.org/matrix-multiplication/-/matrix-multiplication-0.5.0.tgz"
  },
  "gitHead": "e562ab098e148930fe52d140caf57169e1f1b43a",
  "homepage": "http://npm.im/matrix-multiplication",
  "keywords": [
    "algebra"
  ],
  "license": "MIT",
  "main": "matrix-multiplication.js",
  "maintainers": [
    {
      "name": "fibo",
      "email": "casati_gianluca@yahoo.it"
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
    "test": "NODE_PATH=. tape test.js"
  },
  "version": "0.5.0"
}

},{}],17:[function(require,module,exports){
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

},{"./package.json":18,"static-props":20}],18:[function(require,module,exports){
module.exports={
  "_args": [
    [
      {
        "raw": "multidim-array-index@^0.5.0",
        "scope": null,
        "escapedName": "multidim-array-index",
        "name": "multidim-array-index",
        "rawSpec": "^0.5.0",
        "spec": ">=0.5.0 <0.6.0",
        "type": "range"
      },
      "/Users/gcasati/github.com/fibo/algebra"
    ]
  ],
  "_from": "multidim-array-index@>=0.5.0 <0.6.0",
  "_id": "multidim-array-index@0.5.0",
  "_inCache": true,
  "_location": "/multidim-array-index",
  "_nodeVersion": "4.2.2",
  "_npmOperationalInternal": {
    "host": "packages-16-east.internal.npmjs.com",
    "tmp": "tmp/multidim-array-index-0.5.0.tgz_1460790776022_0.695659349905327"
  },
  "_npmUser": {
    "name": "fibo",
    "email": "casati_gianluca@yahoo.it"
  },
  "_npmVersion": "3.7.2",
  "_phantomChildren": {},
  "_requested": {
    "raw": "multidim-array-index@^0.5.0",
    "scope": null,
    "escapedName": "multidim-array-index",
    "name": "multidim-array-index",
    "rawSpec": "^0.5.0",
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
  "_where": "/Users/gcasati/github.com/fibo/algebra",
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
      "name": "fibo",
      "email": "casati_gianluca@yahoo.it"
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

},{}],19:[function(require,module,exports){
module.exports=function(x){return (typeof x==='undefined')||(x === null)}

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
module.exports = staticProps

},{}],21:[function(require,module,exports){
// In browserify context, fall back to a no op.
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

},{"indices-permutations":12,"multidim-array-index":23}],23:[function(require,module,exports){
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

},{"indices-permutations":12,"multidim-array-index":25}],25:[function(require,module,exports){
arguments[4][23][0].apply(exports,arguments)
},{"dup":23}],26:[function(require,module,exports){
var CayleyDickson = require('cayley-dickson')
var createScalar = require('./createScalar')
var no = require('not-defined')

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

  var logBase2 = [1, 2, 4, 8].indexOf(num)

  if (logBase2 === -1) {
    throw new TypeError('Argument n must be 1, 2, 4 or 8')
  }

  return createScalar(CayleyDickson(field, logBase2))
}

module.exports = CompositionAlgebra

},{"./createScalar":33,"cayley-dickson":7,"not-defined":19}],27:[function(require,module,exports){
var algebraCyclic = require('algebra-cyclic')
var createScalar = require('./createScalar')

/**
 * Create a Cyclic algebra.
 *
 * @param {String|Array} elements
 */

function Cyclic (elements) {
  var ring = algebraCyclic(elements)

  return createScalar(ring)
}

module.exports = Cyclic

},{"./createScalar":33,"algebra-cyclic":2}],28:[function(require,module,exports){
var determinant = require('laplace-determinant')
var inherits = require('inherits')
var itemsPool = require('./itemsPool')
var matrixMultiplication = require('matrix-multiplication')
var multiDimArrayIndex = require('multidim-array-index')
var no = require('not-defined')
var operators = require('./operators.json')
var staticProps = require('static-props')
var TensorSpace = require('./TensorSpace')
var tensorContraction = require('tensor-contraction')
var toData = require('./toData')

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

function MatrixSpace (Scalar) {
  var contraction = tensorContraction.bind(null, Scalar.addition)

  /**
   * @param {Number} numRows
   * @param {Number} [numCols] defaults to a square matrix.
   *
   * @returns {Function} Matrix
   */

  return function (numRows, numCols) {
    // numCols defaults to numRows
    if (no(numCols)) numCols = numRows

    var isSquare = (numRows === numCols)
    var indices = [numRows, numCols]

    var AbstractMatrix = TensorSpace(Scalar)(indices)

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
      var matrixData = toData(matrix)

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
      var leftMatrixData = toData(leftMatrix)
      var rightMatrixData = toData(rightMatrix)

      var rowByColumnMultiplication = matrixMultiplication(Scalar)(numCols)

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
      var matrixData = toData(matrix)
      var transposedData = []

      for (var i = 0; i < numRows; i++) {
        for (var j = 0; j < numCols; j++) {
          var index = multiDimArrayIndex([numRows, numCols], [i, j])
          var transposedIndex = multiDimArrayIndex([numCols, numRows], [j, i])

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
        var det = determinant(data, Scalar, numRows)

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
        var result = transpose(data)
        var VectorSpace = itemsPool.get('VectorSpace')

        if (numRows === 1) {
          var Vector = VectorSpace(Scalar)(numCols)
          return new Vector(result)
        } else {
          var Matrix = MatrixSpace(Scalar)(numCols, numRows)
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
      var leftMatrixData = this.data
      var result = multiplication(leftMatrixData, rightMatrix)

      var rightNumRows = numCols
      var rightNumCols = result.length / rightNumRows

      var Matrix = MatrixSpace(Scalar)(rightNumRows, rightNumCols)

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

},{"./TensorSpace":29,"./itemsPool":34,"./operators.json":35,"./toData":37,"inherits":13,"laplace-determinant":14,"matrix-multiplication":15,"multidim-array-index":17,"not-defined":19,"static-props":20,"tensor-contraction":22}],29:[function(require,module,exports){
var operators = require('./operators.json')
var staticProps = require('static-props')
var toData = require('./toData')
var tensorProduct = require('tensor-product')

/**
 * Creates a tensor space that is a class representing a tensor.
 *
 * @param {Object} Scalar
 *
 * @returns {Function} anonymous with signature (indices)
 */

function TensorSpace (Scalar) {
  var multiplication = Scalar.multiplication

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
    var order = indices.filter((dim) => dim > 1).length

    // TODO if it is a scalar, return the Scalar
    // which should be a composition algebra
    // Then add product tensor to composition algebras.
    // Finally, a tensor i,j,k should be constructed as the
    // tensor product of a scalar i,j,k times.
    var isScalar = (order === 0)

    var dimension = indices.reduce((a, b) => a * b, 1)

    if (isScalar) {
      staticProps(Scalar)({ order })

      return Scalar
    }

    // TODO create one for square matrices
    // Create zero.
    var zero = indices.reduce((result, dim) => {
      for (var i = 0; i < dim; i++) {
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

      var enumerable = true
      staticProps(this)({ data }, enumerable)

      staticProps(this)({ order })
    }

    function staticBinary (operator) {
      Tensor[operator] = function () {
        var result = []

        for (var i = 0; i < dimension; i++) {
          var operands = []

          for (var j = 0; j < arguments.length; j++) {
            operands.push(toData(arguments[j])[i])
          }

          result.push(Scalar[operator].apply(null, operands))
        }

        return result
      }
    }

    var myBinaryOperators = ['addition', 'subtraction']

    myBinaryOperators.forEach((operator) => {
      staticBinary(operator)

      Tensor.prototype[operator] = function () {
        var args = [].slice.call(arguments)
        var operands = [this.data].concat(args)

        var data = Tensor[operator].apply(null, operands)

        var tensor = new Tensor(data)

        return tensor
      }
    })

    function scalarMultiplication (tensor, scalar) {
      var tensorData = toData(tensor)

      var result = []

      for (var i = 0; i < dimension; i++) {
        result.push(multiplication(tensorData[i], scalar))
      }

      return result
    }

    Tensor.scalarMultiplication = scalarMultiplication

    Tensor.prototype.scalarMultiplication = function (scalar) {
      var data = scalarMultiplication(this, scalar)

      return new Tensor(data)
    }

    Tensor.equality = function (tensor1, tensor2) {
      var tensorData1 = toData(tensor1)
      var tensorData2 = toData(tensor2)

      for (var i = 0; i < dimension; i++) {
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

    var myOperators = operators.group

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

},{"./operators.json":35,"./toData":37,"static-props":20,"tensor-product":24}],30:[function(require,module,exports){
var inherits = require('inherits')
var itemsPool = require('./itemsPool')
var matrixMultiplication = require('matrix-multiplication')
var operators = require('./operators.json')
var staticProps = require('static-props')
var TensorSpace = require('./TensorSpace')
var toData = require('./toData')

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

function VectorSpace (Scalar) {
  var addition = Scalar.addition
  var multiplication = Scalar.multiplication
  var subtraction = Scalar.subtraction

  /**
   * @param {Number} dimension
   *
   * @returns {Function} Vector
   */

  return function (dimension) {
    var indices = [dimension]

    var AbstractVector = TensorSpace(Scalar)(indices)

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
      var vectorData1 = toData(vector1)
      var vectorData2 = toData(vector2)

      var ux = vectorData1[0]
      var uy = vectorData1[1]
      var uz = vectorData1[2]

      var vx = vectorData2[0]
      var vy = vectorData2[1]
      var vz = vectorData2[2]

      var vector = []

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
      var leftVectorData = toData(leftVector)
      var rightMatrixData = toData(rightMatrix)

      var rowByColumnMultiplication = matrixMultiplication(Scalar)(dimension)

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
      var data = toData(vector)

      var value = multiplication(data[0], data[0])

      for (var i = 1; i < dimension; i++) {
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
      var vectorData1 = toData(vector1)
      var vectorData2 = toData(vector2)

      if (vectorData1.length !== vectorData2.length) {
        throw new TypeError('Vectors have not the same dimension')
      }

      var result = multiplication(vectorData1[0], vectorData2[0])

      for (var i = 1; i < dimension; i++) {
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
      var data = this.data

      var result = scalarProduct(data, vector)

      return new Scalar(result)
    }

    // Cross product is defined only in dimension 3.
    function crossProductMethod (vector) {
      var data = this.data

      var result = crossProduct(data, vector)

      return new Vector(result)
    }

    if (dimension === 3) {
      Vector.crossProduct = crossProduct

      Vector.prototype.crossProduct = crossProductMethod
      Vector.prototype.cross = crossProductMethod
    }

    Vector.prototype.multiplication = function (rightMatrix) {
      var MatrixSpace = itemsPool.get('MatrixSpace')

      var leftVectorData = this.data
      var result = multiplicationByMatrix(leftVectorData, rightMatrix)

      // TODO rightNumRows equals dimension
      // but the vector should be transposed.
      // Add transpose operator for vectors, then use it implicitly.
      var rightNumRows = dimension
      var rightNumCols = result.length / rightNumRows

      var Matrix = MatrixSpace(Scalar)(rightNumRows, rightNumCols)

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

    var myOperators = ['scalarProduct'].concat(operators.group)

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

},{"./TensorSpace":29,"./itemsPool":34,"./operators.json":35,"./toData":37,"inherits":13,"matrix-multiplication":15,"static-props":20}],31:[function(require,module,exports){
var binaryField = {
  zero: 0,
  one: 1,
  contains: (a) => ((a === 0) || (a === 1)),
  addition: (a, b) => ((a + b) % 2),
  equality: (a, b) => a === b,
  negation: (a) => a,
  multiplication: (a, b) => ((a * b) % 2),
  inversion: (a) => a
}

module.exports = binaryField

},{}],32:[function(require,module,exports){
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

},{"./toData":37}],33:[function(require,module,exports){
var coerced = require('./coerced')
var operators = require('./operators.json')
var staticProps = require('static-props')
var toData = require('./toData')

/**
 * @param {Object} ring
 *
 * @returns {Function} Scalar
 */

function createScalar (ring) {
  var attributes = {
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

      var enumerable = true
      staticProps(this)({ data }, enumerable)

      staticProps(this)(attributes)
    }
  }

  staticProps(Scalar)(attributes)

  var staticNary = (operator) => {
    Scalar[operator] = function () {
      var operands = [].slice.call(arguments).map(toData)
      return coerced(ring[operator]).apply(null, operands)
    }
  }

  var unaryOperators = operators.inversion

  unaryOperators.push('conjugation')

  unaryOperators.forEach((operator) => {
    Scalar[operator] = function (operand) {
      return ring[operator](toData(operand))
    }

    Scalar.prototype[operator] = function () {
      var data = Scalar[operator](this.data)

      return new Scalar(data)
    }
  })

  operators.group.concat(operators.ring).forEach((operator) => {
    staticNary(operator)

    Scalar.prototype[operator] = function () {
      var args = [].slice.call(arguments)
      var operands = [this.data].concat(args)

      var data = Scalar[operator].apply(null, operands)

      return new Scalar(data)
    }
  })

  operators.set.forEach((operator) => {
    staticNary(operator)
  })

  operators.comparison.forEach((operator) => {
    staticNary(operator)

    Scalar.prototype[operator] = function () {
      var args = [].slice.call(arguments)
      var operands = [this.data].concat(args)

      var bool = Scalar[operator].apply(null, operands)

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

},{"./coerced":32,"./operators.json":35,"./toData":37,"static-props":20}],34:[function(require,module,exports){
var itemsPool = new Map()

module.exports = itemsPool

},{}],35:[function(require,module,exports){
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

},{}],36:[function(require,module,exports){
var realField = {
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

},{}],37:[function(require,module,exports){
var no = require('not-defined')

/**
 * Extract data attribute, if any, and check it
 *
 * @param {*} arg
 *
 * @returns {*} data
 */

function toData (arg) {
  var data

  if (no(arg.data)) data = arg
  else data = arg.data

  if (no(data)) throw new TypeError('No data')

  return data
}

module.exports = toData

},{"not-defined":19}],38:[function(require,module,exports){
var algebra = require('algebra')

var C = algebra.Complex

var methodBinaryOperator = require('./features/methodBinaryOperator')
var methodUnaryOperator = require('./features/methodUnaryOperator')
var staticBinaryOperator = require('./features/staticBinaryOperator')
var staticUnaryOperator = require('./features/staticUnaryOperator')

describe('Complex', () => {
  var operator

  describe('zero', () => {
    it('is static', () => {
      C.zero.should.eql([0, 0])
    })
  })

  describe('one', () => {
    it('is static', () => {
      C.one.should.eql([1, 0])
    })
  })

  describe('addition', () => {
    operator = 'addition'

    it('is a static method', staticBinaryOperator(C, operator, [2, 1], [2, 3], [4, 4]))

    it('is a class method', methodBinaryOperator(C, operator, [1, 2], [1, -1], [2, 1]))
  })

  describe('subtraction', () => {
    operator = 'subtraction'

    it('is a static method', staticBinaryOperator(C, operator, [2, 1], [2, 3], [0, -2]))

    it('is a class method', methodBinaryOperator(C, operator, [0, 2], [1, -2], [-1, 4]))
  })

  describe('multiplication', () => {
    operator = 'multiplication'

    it('is a static method', staticBinaryOperator(C, operator, [2, 1], [2, -1], [5, 0]))

    it('is a class method', methodBinaryOperator(C, operator, [1, 2], [-1, 2], [-5, 0]))
  })

  describe('division', () => {
    operator = 'division'

    it('is a static method', staticBinaryOperator(C, operator, [2, 4], [2, 0], [1, 2]))

    it('is a class method', methodBinaryOperator(C, operator, [5, 0], [2, -1], [2, 1]))
  })

  describe('negation', () => {
    operator = 'negation'

    it('is a static method', staticUnaryOperator(C, operator, [-2, 1], [2, -1]))

    it('is a class method', methodUnaryOperator(C, operator, [1, 8], [-1, -8]))
  })

  describe('conjugation', () => {
    operator = 'conjugation'

    it('is a static method', staticUnaryOperator(C, operator, [2, 1], [2, -1]))

    it('is a class method', methodUnaryOperator(C, operator, [1, 7], [1, -7]))
  })
})

},{"./features/methodBinaryOperator":48,"./features/methodUnaryOperator":49,"./features/staticBinaryOperator":50,"./features/staticUnaryOperator":51,"algebra":52}],39:[function(require,module,exports){
var CompositionAlgebra = require('../src/CompositionAlgebra')
var realField = require('../src/realField')

describe('CompositionAlgebra', () => {
  it('checks n is 1, 2, 4 or 8', () => {
    ;(() => {
      CompositionAlgebra(realField, 3)
    }).should.throw()
  })

  it('has signature (field, num)', () => {
    var R = CompositionAlgebra(realField, 1)
    var C = CompositionAlgebra(realField, 2)
    var H = CompositionAlgebra(realField, 4)
    var O = CompositionAlgebra(realField, 8)

    R.should.be.instanceOf(Function)
    C.should.be.instanceOf(Function)
    H.should.be.instanceOf(Function)
    O.should.be.instanceOf(Function)
  })

  it('returns a Scalar class', () => {
    var R = CompositionAlgebra(realField, 1)
    var C = CompositionAlgebra(realField, 2)

    R.addition(2, 3).should.be.eql(5)

    var x = new R(2)
    x.data.should.be.eql(2)

    x.addition(3).data.should.be.eql(5)

    C.addition([1, 2], [3, 4]).should.be.eql([4, 6])

    var z = new C([1, 2])
    z.data.should.be.eql([1, 2])

    z.addition([3, 4]).data.should.be.eql([4, 6])
  })
})

},{"../src/CompositionAlgebra":26,"../src/realField":36}],40:[function(require,module,exports){
var algebra = require('algebra')

var methodBinaryOperator = require('./features/methodBinaryOperator')
var methodUnaryOperator = require('./features/methodUnaryOperator')
var staticBinaryOperator = require('./features/staticBinaryOperator')
var staticUnaryOperator = require('./features/staticUnaryOperator')

var Cyclic = algebra.Cyclic

var elements = ' abcdefghijklmnopqrstuvwyxz0123456789'

var Alphanum = Cyclic(elements)

describe('Cyclic', () => {
  describe('zero', () => {
    it('is static', () => {
      Alphanum.zero.should.eql(' ')
    })
  })

  describe('one', () => {
    it('is static', () => {
      Alphanum.one.should.eql('a')
    })
  })

  describe('addition', () => {
    var operator = 'addition'

    it('is a static method', staticBinaryOperator(Alphanum, operator, 'a', 'b', 'c'))

    it('is a class method', methodBinaryOperator(Alphanum, operator, 'a', 'b', 'c'))

    it('accepts many arguments', () => {
      var x = new Alphanum('b')
      x.addition('a', 'a', 'a').data.should.eql('e')
    })
  })

  describe('subtraction', () => {
    var operator = 'subtraction'

    it('is a static method', staticBinaryOperator(Alphanum, operator, '8', 'b', '6'))

    it('is a class method', methodBinaryOperator(Alphanum, operator, 'f', 'd', 'b'))

    it('accepts many arguments', () => {
      var x = new Alphanum('e')
      x.subtraction('e', 'a', 'b').data.should.eql('7')
    })
  })

  describe('multiplication', () => {
    var operator = 'multiplication'

    it('is a static method', staticBinaryOperator(Alphanum, operator, 'a', 'b', 'b'))

    it('is a class method', methodBinaryOperator(Alphanum, operator, 'c', 'c', 'i'))

    it('accepts many arguments', () => {
      var x = new Alphanum('c')
      x.multiplication('0', 'u', 'e').data.should.eql('5')
    })
  })

  describe('division', () => {
    var operator = 'division'

    it('is a static method', staticBinaryOperator(Alphanum, operator, 'e', 'n', 'c'))

    it('is a class method', methodBinaryOperator(Alphanum, operator, 'r', 'o', 'p'))

    it('accepts many arguments', () => {
      var x = new Alphanum('y')
      x.division('e', 'e').data.should.eql('8')
    })
  })

  describe('equality', () => {
    var operator = 'equality'

    it('is a static method', staticBinaryOperator(Alphanum, operator, 'z', 'z', true))

    it('is a class method', () => {
      var x = new Alphanum('g')
      x.equality('g').should.be.ok()
    })
  })

  describe('disequality', () => {
    var operator = 'disequality'

    it('is a static method', staticBinaryOperator(Alphanum, operator, 'a', ' ', true))

    it('is a class method', () => {
      var x = new Alphanum('e')
      x.disequality('n').should.be.ok()
    })
  })

  describe('negation', () => {
    var operator = 'negation'

    it('is a static method', staticUnaryOperator(Alphanum, operator, 'c', '7'))

    it('is a class method', methodUnaryOperator(Alphanum, operator, 'z', 'k'))

    it('is an involution', () => {
      var x = new Alphanum('d')
      x.negation().negation().data.should.be.eql('d')
    })
  })

  describe('inversion', () => {
    var operator = 'inversion'

    it('is a static method', staticUnaryOperator(Alphanum, operator, 'w', '2'))

    it('is a class method', methodUnaryOperator(Alphanum, operator, 'y', 'q'))

    it('is an involution', () => {
      var x = new Alphanum('8')
      x.inversion().inversion().data.should.be.eql('8')
    })
  })
})

},{"./features/methodBinaryOperator":48,"./features/methodUnaryOperator":49,"./features/staticBinaryOperator":50,"./features/staticUnaryOperator":51,"algebra":52}],41:[function(require,module,exports){
/* eslint-disable indent */

describe('MatrixSpace', () => {
  var algebra = require('algebra')

  var notDefined = require('not-defined')

  var MatrixSpace = algebra.MatrixSpace
  var Real = algebra.Real

  var methodBinaryOperator = require('./features/methodBinaryOperator')
  var staticBinaryOperator = require('./features/staticBinaryOperator')
  var staticUnaryOperator = require('./features/staticUnaryOperator')

  var R1x4 = MatrixSpace(Real)(1, 4)
  var R2x3 = MatrixSpace(Real)(2, 3)
  var R2x2 = MatrixSpace(Real)(2)
  var R3x2 = MatrixSpace(Real)(3, 2)

  it('has signature (Scalar)(numRows, numCols)', () => {
    R2x3.numRows.should.be.eql(2)
    R2x3.numCols.should.be.eql(3)
  })

  it('has signature (Scalar)(numRows) and numCols defaults to numRows', () => {
    R2x2.numRows.should.be.eql(2)
    R2x2.numCols.should.be.eql(2)
  })

  var matrix1 = new R2x2([ 2, 3,
                           1, 1 ])
  var matrix2 = new R2x2([ 0, 1,
                          -1, 0 ])
  var matrix3 = new R2x3([ 0, 1, 2,
                          -2, 1, 0 ])

  describe('data', () => {
    it('is enumerable', () => {
      matrix1.propertyIsEnumerable('data').should.be.ok()
    })

    it('is immutable', () => {
      ;(() => {
        'use strict'
        matrix1.data = [2, 1,
                        5, 4]
      }).should.throwError()
    })
  })

  describe('numRows', () => {
    it('returns the number of rows', () => {
      matrix1.numRows.should.be.eql(2)
      matrix2.numRows.should.be.eql(2)
      matrix3.numRows.should.be.eql(2)
    })
  })

  describe('numCols', () => {
    it('returns the number of cols', () => {
      matrix1.numCols.should.be.eql(2)
      matrix2.numCols.should.be.eql(2)
      matrix3.numCols.should.be.eql(3)
    })
  })

  describe('determinant', () => {
    it('returns a scalar', () => {
      matrix1.determinant.should.be.instanceOf(Real)
      matrix2.determinant.should.be.instanceOf(Real)

      matrix1.determinant.data.should.be.eql(-1)
      matrix2.determinant.data.should.be.eql(1)
    })
  })

  describe('addition()', () => {
    var operator = 'addition'

    it('is a static method', staticBinaryOperator(R2x2, operator,
        [ 2, 3,
          1, 1 ],
        [ 0, 1,
         -1, 0 ],
        [ 2, 4,
          0, 1 ]
    ))

    it('is a class method', methodBinaryOperator(R2x2, operator,
        [ 2, 3,
          1, 1 ],
        [ 0, 1,
         -1, 0 ],
        [ 2, 4,
          0, 1 ]
    ))

    it('accepts multiple arguments', () => {
      R2x2.addition([ 2, 3,
                      1, 1 ],
                    [ 0, 1,
                     -1, 0 ],
                    [ -2, -4,
                      0, -1 ]).should.deepEqual([0, 0,
                                                 0, 0])

      var matrix = new R2x2([ 2, 3,
                              1, 1 ])
      matrix.addition([ 0, 1,
                       -1, 0 ],
                      [ -2, -4,
                         0, -1 ]).data.should.deepEqual([0, 0,
                                                       0, 0])
    })
  })

  describe('subtraction()', () => {
    var operator = 'subtraction'

    it('is a static method', staticBinaryOperator(R2x2, operator,
        [2, 3,
         1, 1],
        [0, 1,
        -1, 0],
        [2, 2,
         2, 1]
    ))

    it('is a class method', methodBinaryOperator(R2x2, operator,
        [2, 3,
         1, 1],
        [0, 1,
        -1, 0],
        [2, 2,
         2, 1]
    ))

    it('accepts multiple arguments', () => {
      R2x2.subtraction([2, 3,
                        1, 1],
                       [0, 1,
                       -1, 0],
                       [2, 4,
                        0, 1]).should.deepEqual([0, -2,
                                                 2, 0])

      var matrix = new R2x2([2, 3,
                             1, 1])
      matrix.subtraction([0, 1,
                          -1, 0],
                         [2, 4,
                          0, 1]).data.should.deepEqual([0, -2,
                                                        2, 0])
    })
  })

  describe('multiplication()', () => {
    var operator = 'multiplication'

    it('is a static method', staticBinaryOperator(R3x2, operator,
        [2, 3,
         1, 1,
         1, 1],
        [0, 1, 1, 1,
        -1, 0, 2, 3],
        [-3, 2, 8, 11,
         -1, 1, 3, 4,
         -1, 1, 3, 4]
    ))

    it('is a class method', methodBinaryOperator(R2x2, operator,
        [2, 3,
         1, 1],
        [0, 1,
        -1, 0],
        [-3, 2,
         -1, 1]
    ))

    it('accepts multiple arguments', () => {
      R2x2.multiplication([1, 2,
                           3, 4],
                          [0, 1,
                          -1, 0],
                          [-1, 0,
                            0, 1]).should.deepEqual([-2, 1,
                                                     -4, 3])

      var matrix = new R2x2([1, 2,
                             3, 4])
      matrix.multiplication([0, 1,
                            -1, 0],
                           [-1, 0,
                             0, 1]).data.should.deepEqual([-2, 1,
                                                           -4, 3])
    })
  })

  describe('trace()', () => {
    var operator = 'trace'

    it('is a static method', staticUnaryOperator(R2x2, operator,
      [1, 2,
       5, 6], 7
    ))

    it('is not available for no square matrices', () => {
      notDefined(R3x2.trace).should.be.ok()
    })
  })

  describe('trace', () => {
    it('is a static attribute', () => {
      var matrix2x2 = new R2x2([1, 2,
                                5, 6])

      matrix2x2.trace.should.be.eql(7)
    })

    it('is not available for no square matrices', () => {
      var matrix3x2 = new R3x2([1, 2,
                                3, 4,
                                5, 6])

      notDefined(matrix3x2.trace).should.be.ok()
    })
  })

  describe('transpose()', () => {
    it('is a static operator', () => {
      var matrix3x2 = new R3x2([1, 2,
                                3, 4,
                                5, 6])

      var transposed = R3x2.transpose(matrix3x2)

      transposed.should.deepEqual([1, 3, 5,
                                   2, 4, 6])
    })
  })

  describe('transposed', () => {
    it('is a class attribute', () => {
      var matrix3x2 = new R3x2([1, 2,
                                3, 4,
                                5, 6])

      var transposed = matrix3x2.transposed

      transposed.data.should.deepEqual([1, 3, 5,
                                        2, 4, 6])
    })

    it('holds a transposed matrix', () => {
      var matrix2x3 = new R2x3([1, 2, 3,
                                4, 5, 6])

      matrix2x3.transposed.data.should.deepEqual([1, 4,
                                                  2, 5,
                                                  3, 6])

      matrix2x3.numRows.should.be.eql(matrix2x3.transposed.numCols)
      matrix2x3.numCols.should.be.eql(matrix2x3.transposed.numRows)
    })

    it('is an involution', () => {
      var matrix2x2a = new R2x2([1, 2,
                                 3, 4])

      var matrix2x2b = matrix2x2a.transposed.transposed

      matrix2x2a.data.should.deepEqual(matrix2x2b.data)
    })

    it('returns a vector if the Matrix has one row', () => {
      var matrix1x4 = new R1x4([1, 2, 3, 4])

      var vector = matrix1x4.transposed

      matrix1x4.data.should.deepEqual(vector.data)
      vector.dimension.should.be.eql(matrix1x4.numCols)
    })
  })

  describe('mul()', () => {
    it('is an alias of multiplication()', () => {
      R2x2.mul.should.be.eql(R2x2.multiplication)

      var matrix2x2 = new R2x2([1, 2,
                                3, 4])

      matrix2x2.multiplication.should.be.eql(matrix2x2.mul)
    })
  })

  describe('tr()', () => {
    it('is an alias of transpose()', () => {
      R2x2.tr.should.be.eql(R2x2.transpose)
    })
  })

  describe('tr', () => {
    it('is an alias of transposed', () => {
      var matrix = new R3x2([0, 1,
                             1, 0,
                             2, 2])

      matrix.tr.data.should.be.eql(matrix.transposed.data)
    })
  })
})

},{"./features/methodBinaryOperator":48,"./features/staticBinaryOperator":50,"./features/staticUnaryOperator":51,"algebra":52,"not-defined":19}],42:[function(require,module,exports){
var algebra = require('algebra')

var R = algebra.Real

var methodBinaryOperator = require('./features/methodBinaryOperator')
var methodUnaryOperator = require('./features/methodUnaryOperator')
var staticBinaryOperator = require('./features/staticBinaryOperator')
var staticUnaryOperator = require('./features/staticUnaryOperator')

describe('Real', () => {
  describe('zero', () => {
    it('is static', () => {
      R.zero.should.eql(0)
    })
  })

  describe('one', () => {
    it('is static', () => {
      R.one.should.eql(1)
    })
  })

  describe('addition', () => {
    var operator = 'addition'

    it('is a static method', staticBinaryOperator(R, operator, 2, 3, 5))

    it('is a class method', methodBinaryOperator(R, operator, 1, 2, 3))

    it('accepts many arguments', () => {
      var x = new R(1)
      x.addition(2, 3, 4).data.should.eql(10)
    })
  })

  describe('subtraction', () => {
    var operator = 'subtraction'

    it('is a static method', staticBinaryOperator(R, operator, 2, 3, -1))

    it('is a class method', methodBinaryOperator(R, operator, -1, -4, 3))

    it('accepts many arguments', () => {
      var x = new R(10)
      x.subtraction(1, 2, 3).data.should.eql(4)
    })
  })

  describe('multiplication', () => {
    var operator = 'multiplication'

    it('is a static method', staticBinaryOperator(R, operator, 8, -2, -16))

    it('is a class method', methodBinaryOperator(R, operator, 2, 2, 4))

    it('accepts many arguments', () => {
      var x = new R(2)
      x.multiplication(3, 4, 5).data.should.eql(120)
    })
  })

  describe('division', () => {
    var operator = 'division'

    it('is a static method', staticBinaryOperator(R, operator, 8, 2, 4))

    it('is a class method', methodBinaryOperator(R, operator, -2, 4, -0.5))

    it('accepts many arguments', () => {
      var x = new R(120)
      x.division(3, 4, 5).data.should.eql(2)
    })
  })

  describe('equality', () => {
    var operator = 'equality'

    it('is a static method', staticBinaryOperator(R, operator, 10, 10, true))

    it('is a class method', () => {
      var x = new R(10)
      x.equality(10).should.be.ok()
    })
  })

  describe('disequality', () => {
    var operator = 'disequality'

    it('is a static method', staticBinaryOperator(R, operator, 10, 20, true))

    it('is a class method', () => {
      var x = new R(10)
      x.disequality(20).should.be.ok()
    })
  })

  describe('negation', () => {
    var operator = 'negation'

    it('is a static method', staticUnaryOperator(R, operator, -2, 2))

    it('is a class method', methodUnaryOperator(R, operator, 8, -8))

    it('is an involution', () => {
      var x = new R(10)
      x.negation().negation().data.should.be.eql(10)
    })
  })

  describe('inversion', () => {
    var operator = 'inversion'

    it('is a static method', staticUnaryOperator(R, operator, 2, 0.5))

    it('is a class method', methodUnaryOperator(R, operator, -4, -0.25))

    it('is an involution', () => {
      var x = new R(10)
      x.inversion().inversion().data.should.be.eql(10)
    })
  })
})

},{"./features/methodBinaryOperator":48,"./features/methodUnaryOperator":49,"./features/staticBinaryOperator":50,"./features/staticUnaryOperator":51,"algebra":52}],43:[function(require,module,exports){
var CompositionAlgebra = require('algebra').CompositionAlgebra
var realField = require('../src/realField')

var R = CompositionAlgebra(realField)

describe('CompositionAlgebra', () => {
  describe('data', () => {
    var pi = new R(Math.PI)

    it('is enumerable', () => {
      pi.propertyIsEnumerable('data').should.be.ok()
    })

    it('is immutable', () => {
      ;(() => {
        'use strict'
        pi.data = 2
      }).should.throwError()
    })
  })
})

},{"../src/realField":36,"algebra":52}],44:[function(require,module,exports){
/* eslint-disable indent */

describe('TensorSpace', () => {
  var algebra = require('algebra')
  var TensorSpace = algebra.TensorSpace
  var Real = algebra.Real

  var T2x2x2 = TensorSpace(Real)([2, 2, 2])

  it('can create a Scalar', () => {
    var indices = [1]

    var Scalar = TensorSpace(Real)(indices)

    Scalar.zero.should.be.eql(0)

    Scalar.addition(1, 2).should.be.eql(3)
    Scalar.addition(1, 2, 3).should.be.eql(6)

    Scalar.subtraction(1, 2).should.be.eql(-1)
    Scalar.subtraction(1, 2, 3).should.be.eql(-4)

    var x = new Scalar(1)
    x.data.should.be.eql(1)

    x.addition(2).data.should.be.eql(3)
    x.addition(2, 3, 4).data.should.be.eql(10)

    x.subtraction(2).data.should.be.eql(-1)
    x.subtraction(2, 3, 4).data.should.be.eql(-8)
  })

  it('can create a Vector', () => {
    var indices = [2]

    var Vector = TensorSpace(Real)(indices)

    Vector.zero.should.be.eql([0, 0])

    Vector.addition([1, 0], [1, -1]).should.be.eql([2, -1])
    Vector.addition([1, 0], [1, -1], [-1, 1]).should.be.eql([1, 0])

    Vector.subtraction([2, -1], [1, -1]).should.be.eql([1, 0])
    Vector.subtraction([1, -1], [2, -2], [3, -3]).should.be.eql([-4, 4])

    var v = new Vector([1, 2])
    v.data.should.be.eql([1, 2])

    v.addition([4, -1]).data.should.be.eql([5, 1])
    v.addition([4, -1], [-1, 1]).data.should.be.eql([4, 2])

    v.subtraction([2, 1]).data.should.be.eql([-1, 1])
    v.subtraction([2, 1], [1, -1]).data.should.be.eql([-2, 2])
  })

  it('can create a Matrix', () => {
    var indices = [2, 2]

    var Matrix = TensorSpace(Real)(indices)

    Matrix.zero.should.be.eql([0, 0,
                               0, 0])

    Matrix.addition([1, 0,
                     0, 1], [1, -1,
                             0, 1]).should.be.eql([2, -1,
                                                    0, 2])

    Matrix.addition([1, 0,
                     0, 1], [1, -1,
                             0, 1], [2, 1,
                                      1, 2]).should.be.eql([4, 0,
                                                            1, 4])

    Matrix.subtraction([1, 0,
                        0, 1], [1, -1,
                                0, 1]).should.be.eql([0, 1,
                                                      0, 0])

    Matrix.subtraction([1, 0,
                        0, 1], [1, -1,
                                0, 1], [2, 1,
                                        1, 2]).should.be.eql([-2, 0,
                                                              -1, -2])

    var m = new Matrix([1, 2,
                        3, 4])

    m.data.should.be.eql([1, 2,
                          3, 4])

    m.addition([1, 0,
                0, 1]).data.should.be.eql([2, 2,
                                           3, 5])

    m.subtraction([1, 0,
                   0, 1]).data.should.be.eql([0, 2,
                                              3, 3])
  })

  describe('attribute', () => {
    describe('order', () => {
      it('is 0 for scalars', () => {
        var Scalar = TensorSpace(Real)([1])
        Scalar.order.should.eql(0)

        var scalar1 = new Scalar(4)
        scalar1.order.should.eql(0)
      })

      it('is 1 for vectors', () => {
        var Vector = TensorSpace(Real)([2])
        Vector.order.should.eql(1)

        var vector1 = new Vector([1, 2])
        vector1.order.should.eql(1)
      })

      it('is 2 for matrices', () => {
        var Matrix = TensorSpace(Real)([2, 2])
        Matrix.order.should.eql(2)

        var matrix1 = new Matrix([1, 2,
                                  3, 4])
        matrix1.order.should.eql(2)
      })
    })
  })

  describe('operator', () => {
    describe('addition', () => {
      it('works', () => {
        var tensor1 = new T2x2x2([1, 2, 3, 4, 5, 6, 7, 8])
        var tensor2 = new T2x2x2([2, 3, 4, 5, 6, 7, 8, 9])
        var resultData = [3, 5, 7, 9, 11, 13, 15, 17]

        T2x2x2.addition(tensor1, tensor2).should.deepEqual(resultData)

        var tensor3 = tensor1.addition(tensor2)
        tensor3.data.should.deepEqual(resultData)
      })
    })

    describe('subtraction', () => {
      it('works', () => {
        var tensor1 = new T2x2x2([1, 2, 3, 4, 5, 6, 7, 8])
        var tensor2 = new T2x2x2([2, 3, 4, 5, 6, 7, 8, 9])
        var resultData = [-1, -1, -1, -1, -1, -1, -1, -1]

        T2x2x2.subtraction(tensor1, tensor2).should.deepEqual(resultData)

        var tensor3 = tensor1.subtraction(tensor2)
        tensor3.data.should.deepEqual(resultData)
      })
    })

    describe('scalarMultiplication', () => {
      it('works', () => {
        var tensor1 = new T2x2x2([1, 2, 3, 4, 5, 6, 7, 8])
        var scalar1 = new Real(2)
        var resultData = [2, 4, 6, 8, 10, 12, 14, 16]

        T2x2x2.scalarMultiplication(tensor1, scalar1).should.deepEqual(resultData)

        var tensor2 = tensor1.scalarMultiplication(scalar1)
        tensor2.data.should.deepEqual(resultData)
      })
    })
  })
})

},{"algebra":52}],45:[function(require,module,exports){
var algebra = require('algebra')
var notDefined = require('not-defined')

var Real = algebra.Real
var VectorSpace = algebra.VectorSpace

var methodBinaryOperator = require('./features/methodBinaryOperator')
var staticBinaryOperator = require('./features/staticBinaryOperator')
var staticUnaryOperator = require('./features/staticUnaryOperator')

var R2 = VectorSpace(Real)(2)
var R3 = VectorSpace(Real)(3)

describe('VectorSpace', () => {
  describe('data', () => {
    var v = new R2([0, 1])

    it('is enumerable', () => {
      v.propertyIsEnumerable('data').should.be.ok()
    })

    it('is immutable', () => {
      ;(() => {
        'use strict'
        v.data = [2, 1]
      }).should.throwError()
    })
  })

  describe('addition()', () => {
    var operator = 'addition'

    it('is a static method', staticBinaryOperator(R2, operator, [0, 2], [-1, 3], [-1, 5]))

    it('is a class method', methodBinaryOperator(R2, operator, [0, 1], [1, 1], [1, 2]))

    it('accepts multiple arguments', () => {
      R2.addition([1, -1], [2, -2], [3, -3]).should.deepEqual([6, -6])

      var vector = new R2([1, -1])
      vector.addition([2, -2], [3, -3]).data.should.eql([6, -6])
    })
  })

  describe('subtraction()', () => {
    var operator = 'subtraction'

    it('is a static method', staticBinaryOperator(R2, operator, [0, 2], [-1, 3], [1, -1]))

    it('is a class method', methodBinaryOperator(R2, operator, [0, 1], [1, 1], [-1, 0]))

    it('accepts multiple arguments', () => {
      R2.subtraction([6, -6], [2, -2], [3, -3]).should.deepEqual([1, -1])

      var vector = new R2([6, -6])
      vector.subtraction([2, -2], [3, -3]).data.should.eql([1, -1])
    })
  })

  describe('scalarProduct()', () => {
    it('is a static operator', () => {
      var data = R2.scalarProduct([0, 1], [1, 1])

      data.should.eql(1)
    })

    it('is a class method', () => {
      var vector1 = new R2([0, 1])
      var vector2 = new R2([1, 1])

      var scalar = vector1.scalarProduct(vector2)

      scalar.data.should.be.eql(1)
    })

    it('is returns a scalar', () => {
      var vector1 = new R2([0, 1])
      var vector2 = new R2([1, 1])

      var scalar = vector1.scalarProduct(vector2)

      scalar.data.should.be.eql(1)
    })
  })

  describe('dotProduct()', () => {
    it('is an alias of scalarProduct()', () => {
      R2.scalarProduct.should.be.eql(R2.dotProduct)

      var vector = new R2([0, 1])
      vector.scalarProduct.should.be.eql(vector.dotProduct)
    })
  })

  describe('dot()', () => {
    it('is an alias of scalarProduct()', () => {
      R2.scalarProduct.should.be.eql(R2.dot)

      var vector = new R2([0, 1])
      vector.scalarProduct.should.be.eql(vector.dot)
    })
  })

  describe('dimension', () => {
    it('is a static attribute', () => {
      var vector1 = new R2([0, 1])
      var vector2 = new R3([1, 1, 2])

      vector1.dimension.should.be.eql(2)
      vector2.dimension.should.be.eql(3)

      R2.dimension.should.be.eql(2)
      R3.dimension.should.be.eql(3)
    })
  })

  describe('norm', () => {
    it('is an attribute holding a scalar', () => {
      var vector1 = new R2([0, 1])
      var vector2 = new R3([1, 1, 2])

      vector1.norm.data.should.be.eql(1)
      vector2.norm.data.should.be.eql(6)
    })
  })

  describe('norm()', () => {
    var operator = 'norm'

    it('is a static method', () => {
      staticUnaryOperator(R2, operator, [0, 1], 1)
      staticUnaryOperator(R3, operator, [1, 1, 2], 6)
    })
  })

  describe('crossProduct()', () => {
    var operator = 'crossProduct'

    it('is a static method', () => {
      staticBinaryOperator(R3, operator, [3, -3, 1], [4, 9, 2], [-15, -2, 39])
    })

    it('is a class method', () => {
      methodBinaryOperator(R3, operator, [3, -3, 1], [-12, 12, -4], [0, 0, 0])
    })

    it('is defined only in dimension 3', () => {
      notDefined(R2.cross).should.be.ok()

      var vector = new R2([1, 0])
      notDefined(vector.cross).should.be.ok()
    })
  })

  describe('cross()', () => {
    it('is an alias of crossProduct()', () => {
      R3.crossProduct.should.be.eql(R3.cross)

      var vector = new R3([1, 0, 1])
      vector.crossProduct.should.be.eql(vector.cross)
    })
  })
})

},{"./features/methodBinaryOperator":48,"./features/staticBinaryOperator":50,"./features/staticUnaryOperator":51,"algebra":52,"not-defined":19}],46:[function(require,module,exports){
/* eslint-disable indent */

describe('API', () => {
  var algebra = require('algebra')

  var C = algebra.C
  var Complex = algebra.Complex
  var H = algebra.H
  var Quaternion = algebra.Quaternion
  var R = algebra.R
  var R2 = algebra.R2
  var R3 = algebra.R3
  var R2x2 = algebra.R2x2
  var Real = algebra.Real
  var CompositionAlgebra = algebra.CompositionAlgebra
  var MatrixSpace = algebra.MatrixSpace
  var TensorSpace = algebra.TensorSpace
  var VectorSpace = algebra.VectorSpace

  var binaryField = require('../src/binaryField')

  describe('About operators', () => {
    it('works', () => {
      var vector1 = new R2([1, 2])
      var vector2 = new R2([3, 4])

      R2.addition(vector1, [3, 4]).should.deepEqual([4, 6])
      R2.addition([1, 2], vector2).should.deepEqual([4, 6])
      R2.addition(vector1, vector2).should.deepEqual([4, 6])

      var vector3 = vector1.addition([3, 4])
      var vector4 = vector1.addition(vector2)
      R2.equality(vector3, vector4).should.be.ok()

      vector1.addition(vector1, vector1).equality([3, 6]).should.be.ok()

      vector1.data.should.deepEqual([1, 2])
    })
  })

  describe('CompositionAlgebra', () => {
    var Bit = CompositionAlgebra(binaryField)

    it('works', () => {
      Bit.contains(1).should.be.ok()
      Bit.contains(4).should.not.be.ok()

      var bit = new Bit(1)
      bit.addition(0).data.should.eql(1)
    })
  })

  describe('Byte', () => {
    it('is an octonion over binary field', () => {
      var Byte = CompositionAlgebra(binaryField, 8)

      var byte1 = new Byte([1, 0, 0, 0, 0, 0, 0, 0])
      var byte2 = new Byte([0, 1, 0, 0, 0, 0, 0, 0])
      var byte3 = new Byte([0, 0, 1, 0, 0, 0, 0, 0])
      var byte4 = new Byte([0, 0, 0, 1, 0, 0, 0, 0])
      var byte5 = new Byte([0, 0, 0, 0, 1, 0, 0, 0])
      var byte6 = new Byte([0, 0, 0, 0, 0, 1, 0, 0])
      var byte7 = new Byte([0, 0, 0, 0, 0, 0, 1, 0])
      var byte8 = new Byte([0, 0, 0, 0, 0, 0, 0, 1])

      byte1.mul(byte1).data.should.deepEqual([1, 0, 0, 0, 0, 0, 0, 0])
      byte2.mul(byte2).data.should.deepEqual([1, 0, 0, 0, 0, 0, 0, 0])
      byte3.mul(byte3).data.should.deepEqual([1, 0, 0, 0, 0, 0, 0, 0])
      byte4.mul(byte4).data.should.deepEqual([1, 0, 0, 0, 0, 0, 0, 0])
      byte5.mul(byte5).data.should.deepEqual([1, 0, 0, 0, 0, 0, 0, 0])
      byte6.mul(byte6).data.should.deepEqual([1, 0, 0, 0, 0, 0, 0, 0])
      byte7.mul(byte7).data.should.deepEqual([1, 0, 0, 0, 0, 0, 0, 0])
      byte8.mul(byte8).data.should.deepEqual([1, 0, 0, 0, 0, 0, 0, 0])

      var max = byte1.add(byte2).add(byte3).add(byte4)
                       .add(byte5).add(byte6).add(byte7).add(byte8)

      max.data.should.deepEqual([1, 1, 1, 1, 1, 1, 1, 1])
    })
  })

  describe('Scalar', () => {
    // TODO Color space RBG as example
    //
    // colorA = (.2, .3, .7)
    // colorB = (.1, .1, .1)
    //
    // colorC = colorA * colorB = (.2 * .1, .3 * .1, .7 * .1)
    // colorD = colorA + colorB = (.2 + .1 / 2, .3 + .1 / 2, .7 + .1 / 2)
    //
    // is it a Ring?
    describe('Scalar.one', () => {
      it('is a static attribute')
    })

    describe('Scalar.zero', () => {
      it('is a static attribute')
    })

    describe('order', () => {
      it('works')
    })

    describe('data', () => {
      it('works')
    })

    describe('contains', () => {
      it('works')
    })

    describe('belongsTo', () => {
      it('works')
    })

    describe('equality', () => {
      it('works')
    })

    describe('disequality', () => {
      it('works')
    })

    describe('addition', () => {
      it('works')
    })

    describe('subtraction', () => {
      it('works')
    })

    describe('multiplication', () => {
      it('works')
    })

    describe('division', () => {
      it('works')
    })

    describe('negation', () => {
      it('works')
    })

    describe('inversion', () => {
      it('works')
    })

    describe('conjugation', () => {
      it('works')
    })
  })

  describe('Cyclic', () => {
    it('works', () => {
      var Cyclic = algebra.Cyclic

      var elements = ' abcdefghijklmnopqrstuvwyxz0123456789'

      var Alphanum = Cyclic(elements)

      Alphanum.addition('a', 'b').should.eql('c')

      var x = new Alphanum('a')

      var y = x.add('c', 'a', 't')
               .mul('i', 's')
               .add('o', 'n')
               .sub('t', 'h', 'e')
               .div('t', 'a', 'b', 'l', 'e')

      y.data.should.eql('s')

      var VectorStrings2 = algebra.VectorSpace(Alphanum)(2)
      var MatrixStrings2x2 = algebra.MatrixSpace(Alphanum)(2)

      var vectorOfStrings = new VectorStrings2(['o', 'k'])
      var matrixOfStrings = new MatrixStrings2x2(['c', 'o',
                                                    'o', 'l'])
      matrixOfStrings.mul(vectorOfStrings)
                     .data.should.deepEqual(['x', 'y'])

      vectorOfStrings.mul(matrixOfStrings)
                     .data.should.deepEqual(['x', 'y'])
    })
  })

  describe('Real', () => {
    it('works', () => {
      var Real = algebra.Real

      Real.addition(1, 2).should.eql(3)

      var pi = new Real(Math.PI)
      var twoPi = pi.mul(2)

      Real.subtraction(twoPi, 2 * Math.PI).should.eql(0)
    })
  })

  describe('Complex', () => {
    it('works', () => {
      var Complex = algebra.Complex
      var complex1 = new Complex([1, 2])

      complex1.conjugation().data.should.deepEqual([1, -2])
    })
  })

  describe('Quaternion', () => {
    it('works')
  })

  describe('Octonion', () => {
    it('works')
  })

  describe('Common spaces', () => {
    describe('R', () => {
      it('is an alias of Real', () => {
        R.should.be.eql(Real)
      })
    })

    describe('R2', () => {
      it('is an alias of VectorSpace(Real)(2)', () => {
        R2.should.be.eql(VectorSpace(Real)(2))
      })
    })

    describe('R3', () => {
      it('is an alias of VectorSpace(Real)(3)', () => {
        R3.should.be.eql(VectorSpace(Real)(3))
      })
    })

    describe('R2x2', () => {
      it('is an alias of MatrixSpace(Real)(2)', () => {
        R2x2.should.be.eql(MatrixSpace(Real)(2))
      })
    })

    describe('C', () => {
      it('is an alias of Complex', () => {
        C.should.be.eql(Complex)
      })
    })

    describe('H', () => {
      it('is an alias of Quaternion', () => {
        H.should.be.eql(Quaternion)
      })
    })
  })

  describe('Vector', () => {
    describe('Vector.dimension', () => {
      it('is a static attribute', () => {
        R2.dimension.should.eql(2)
        R3.dimension.should.eql(3)
      })
    })

    describe('vector.dimension', () => {
      it('is an attribute', () => {
        var vector = new R2([1, 1])

        vector.dimension.should.eql(2)
      })
    })

    describe('Vector.norm', () => {
      it('is a static operator', () => {
        R2.norm([3, 4]).data.should.eql(25)
      })
    })

    describe('vector.norm', () => {
      it('is an attribute', () => {
        var vector = new R2([1, 2])

        vector.norm.data.should.eql(5)
      })
    })

    describe('addition', () => {
      it('works', () => {
        R2.addition([2, 1], [1, 2]).should.deepEqual([3, 3])

        var vector1 = new R2([2, 1])
        var vector2 = new R2([2, 2])

        var vector3 = vector1.addition(vector2)

        vector3.data.should.deepEqual([4, 3])
      })
    })

    describe('Cross product', () => {
      it('works', () => {
        R3.crossProduct([3, -3, 1], [4, 9, 2]).should.deepEqual([-15, -2, 39])

        var vector1 = new R3([3, -3, 1])
        var vector2 = new R3([4, 9, 2])

        var vector3 = vector1.crossProduct(vector2)

        vector3.data.should.deepEqual([-15, -2, 39])
      })
    })
  })

  describe('Tensor', () => {
    describe('equality', () => {
      it('works', () => {
        var T2x2x2 = TensorSpace(Real)([2, 2, 2])

        var tensor1 = new T2x2x2([1, 2, 3, 4, 5, 6, 7, 8])
        var tensor2 = new T2x2x2([2, 3, 4, 5, 6, 7, 8, 9])

        T2x2x2.equality(tensor1, tensor1).should.be.ok()
        T2x2x2.equality(tensor1, tensor2).should.not.be.ok()

        tensor1.equality(tensor1).should.be.ok()
        tensor1.equality(tensor2).should.not.be.ok()
      })
    })
  })
})

},{"../src/binaryField":31,"algebra":52}],47:[function(require,module,exports){
var coerced = require('../src/coerced')

var add = coerced((a, b) => a + b)

describe('coerced', () => {
  it('means to extract "data" property, if any', () => {
    add(1, 2).should.eql(3)
    add({ data: 1 }, 2).should.eql(3)
    add({ data: 1 }, 2).should.eql(3)
    add({ data: 1 }, { data: 2 }).should.eql(3)
  })
})

},{"../src/coerced":32}],48:[function(require,module,exports){
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

function mutatorBinaryOperator (Scalar, operator, operand1, operand2, resultData) {
  return function mutatorBinaryOperatorTest () {
    var scalar = new Scalar(operand1)

    var result = scalar[operator](operand2)

    result.data.should.eql(resultData)
  }
}

module.exports = mutatorBinaryOperator

},{}],49:[function(require,module,exports){
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

function mutatorUnaryOperator (Scalar, operator, operand, resultData) {
  return function mutatorUnaryOperatorTest () {
    var scalar = new Scalar(operand)

    var result = scalar[operator]()

    result.data.should.eql(resultData)
  }
}

module.exports = mutatorUnaryOperator

},{}],50:[function(require,module,exports){
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

function staticBinaryOperator (Scalar, operator, operand1, operand2, result) {
  return function staticBinaryOperatorTest () {
    Scalar[operator](operand1, operand2).should.eql(result)
  }
}

module.exports = staticBinaryOperator

},{}],51:[function(require,module,exports){
/**
 * Check if unary operator is static
 *
 * @param {Object} Scalar
 * @param {String} operator name
 * @param {*} operand
 * @param {*} result expected
 *
 * @returns {Function} staticUnaryOperatorTest
 */

function staticUnaryOperator (Scalar, operator, operand, result) {
  return function staticUnaryOperatorTest () {
    Scalar[operator](operand).should.eql(result)
  }
}

module.exports = staticUnaryOperator

},{}],52:[function(require,module,exports){

// Cheating npm require.
module.exports = require('../../..')


},{"../../..":1}],53:[function(require,module,exports){
/* eslint-disable indent */

describe('Quick start', () => {
  var algebra = require('algebra')

  it('works', () => {
    var R = algebra.Real

    R.add(1, 2, 3).should.eql(6)

    var x = new R(2)
    var y = new R(-2)

    var r = x.mul(y)
    r.data.should.eql(-4)
    x.data.should.eql(2)

    x = x.add(3).mul(2).inv()

    x.data.should.eql(0.1)

    x.equal(0.1).should.be.ok()
    x.notEqual(Math.PI).should.be.ok()

    var C = algebra.Complex

    var z1 = new C([1, 2])
    var z2 = new C([3, 4])

    z1 = z1.mul(z2)

    z1.data.should.eql([-5, 10])

    z1 = z1.conj().mul([2, 0])

    z1.data.should.eql([-10, -20])

    var R2 = algebra.VectorSpace(R)(2)

    var v1 = new R2([0, 1])
    var v2 = new R2([1, -2])

    v1 = v1.add(v2)

    v1.data.should.eql([1, -1])

    var R3x2 = algebra.MatrixSpace(R)(3, 2)

    var m1 = new R3x2([1, 1,
                       0, 1,
                       1, 0])

    var v3 = m1.mul(v1)

    v3.data.should.deepEqual([0, -1, 1])

    var R2x2 = algebra.MatrixSpace(R)(2)

    var m2 = new R2x2([1, 0,
                       0, 2])
    var m3 = new R2x2([0, -1,
                       1, 0])

    m2 = m2.mul(m3)

    m2.data.should.deepEqual([0, -1, 2, 0])

    m2.determinant.data.should.be.eql(2)
  })
})

},{"algebra":52}]},{},[38,39,40,41,42,43,44,45,46,47,53]);
