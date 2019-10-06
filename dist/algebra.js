require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{"./package.json":2,"not-defined":12,"static-props":13}],2:[function(require,module,exports){
module.exports={
  "_args": [
    [
      "algebra-group@0.6.2",
      "/Users/io/github.com/fibo/algebra"
    ]
  ],
  "_from": "algebra-group@0.6.2",
  "_id": "algebra-group@0.6.2",
  "_inBundle": false,
  "_integrity": "sha512-//pQGrgIU/Yn9B3UlquJao+GNgKILnD4j5SPpKxQCVe234Mqce6VclldvuDNa8r8HpY67up8UyY8IwIeQeVVAA==",
  "_location": "/algebra-group",
  "_phantomChildren": {},
  "_requested": {
    "type": "version",
    "registry": true,
    "raw": "algebra-group@0.6.2",
    "name": "algebra-group",
    "escapedName": "algebra-group",
    "rawSpec": "0.6.2",
    "saveSpec": null,
    "fetchSpec": "0.6.2"
  },
  "_requiredBy": [
    "/algebra-ring"
  ],
  "_resolved": "https://registry.npmjs.org/algebra-group/-/algebra-group-0.6.2.tgz",
  "_spec": "0.6.2",
  "_where": "/Users/io/github.com/fibo/algebra",
  "author": {
    "name": "Gianluca Casati",
    "url": "http://g14n.info"
  },
  "bugs": {
    "url": "https://github.com/fibo/algebra-group/issues"
  },
  "dependencies": {
    "not-defined": "^2.0.1",
    "static-props": "^1.1.1"
  },
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

},{}],3:[function(require,module,exports){
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
 * @param {Array} identities
 * @param {*}     identities[0] a.k.a zero
 * @param {*}     identities[1] a.k.a uno
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

function algebraRing (identities, given) {
  // A ring is a group, with multiplication.

  const ring = group({
    identity: identities[0],
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

  const one = identities[1]

  if (ring.notContains(one)) {
    throw new TypeError(error.doesNotContainIdentity)
  }

  // Check that one*one=one.
  if (ring.disequality(given.multiplication(one, one), one)) {
    throw new TypeError(error.identityIsNotNeutral)
  }

  if (ring.notContains(identities[1])) {
    throw new TypeError(error.doesNotContainIdentity)
  }

  ring.one = identities[1]

  return ring
}

staticProps(algebraRing)({ error: error })

module.exports = algebraRing

},{"./package.json":4,"algebra-group":1,"static-props":13}],4:[function(require,module,exports){
module.exports={
  "_args": [
    [
      "algebra-ring@0.6.4",
      "/Users/io/github.com/fibo/algebra"
    ]
  ],
  "_from": "algebra-ring@0.6.4",
  "_id": "algebra-ring@0.6.4",
  "_inBundle": false,
  "_integrity": "sha512-ydV8zKNp7T/t2zSENFqO5MJe/xNQBYLL5sXkC6Cqa9WEwuKOWAPMHEqhuO0n7iPqugE5AYoodTltLIPZt9QOag==",
  "_location": "/algebra-ring",
  "_phantomChildren": {},
  "_requested": {
    "type": "version",
    "registry": true,
    "raw": "algebra-ring@0.6.4",
    "name": "algebra-ring",
    "escapedName": "algebra-ring",
    "rawSpec": "0.6.4",
    "saveSpec": null,
    "fetchSpec": "0.6.4"
  },
  "_requiredBy": [
    "/cayley-dickson"
  ],
  "_resolved": "https://registry.npmjs.org/algebra-ring/-/algebra-ring-0.6.4.tgz",
  "_spec": "0.6.4",
  "_where": "/Users/io/github.com/fibo/algebra",
  "author": {
    "name": "Gianluca Casati",
    "url": "http://g14n.info"
  },
  "bugs": {
    "url": "https://github.com/fibo/algebra-ring/issues"
  },
  "dependencies": {
    "algebra-group": "^0.6.2",
    "static-props": "^1.1.2"
  },
  "description": "defines an algebra ring structure",
  "devDependencies": {
    "dot-editorconfig": "^1.1.1",
    "pre-commit": "^1.1.2",
    "standa": "^12.0.1",
    "tape": "^4.9.2"
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
  "version": "0.6.4"
}

},{}],5:[function(require,module,exports){
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

},{"algebra-ring":3}],6:[function(require,module,exports){
function indicesPermutations (accumulator, currentValue, index, array) {
  const arrayLength = array.length
  const result = []

  if (arrayLength === 1) {
    for (let i = 0; i < currentValue; i++) {
      result.push([i])
    }
  } else {
    const arrayWithoutLastElement = array.slice(0, arrayLength - 1)

    const previousIteration = arrayWithoutLastElement.reduce(indicesPermutations, [])

    for (let l = 0; l < previousIteration.length; l++) {
      for (let k = 0; k < currentValue; k++) {
        result.push(previousIteration[l].concat(k))
      }
    }
  }

  return result
}

module.exports = exports.default = indicesPermutations

},{}],7:[function(require,module,exports){
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

},{"not-defined":12}],8:[function(require,module,exports){
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

},{"./package.json":9,"not-defined":12,"static-props":13}],9:[function(require,module,exports){
module.exports={
  "_args": [
    [
      "matrix-multiplication@0.5.2",
      "/Users/io/github.com/fibo/algebra"
    ]
  ],
  "_from": "matrix-multiplication@0.5.2",
  "_id": "matrix-multiplication@0.5.2",
  "_inBundle": false,
  "_integrity": "sha512-rr3Adfxn9cktAn8zYAkYiDbFZFkFflwjm9oSm5drBIQJPjFoqUlT9nq7aMwXpr+Nr4uurQKgxy+9pfk5X2YmYA==",
  "_location": "/matrix-multiplication",
  "_phantomChildren": {},
  "_requested": {
    "type": "version",
    "registry": true,
    "raw": "matrix-multiplication@0.5.2",
    "name": "matrix-multiplication",
    "escapedName": "matrix-multiplication",
    "rawSpec": "0.5.2",
    "saveSpec": null,
    "fetchSpec": "0.5.2"
  },
  "_requiredBy": [
    "/"
  ],
  "_resolved": "https://registry.npmjs.org/matrix-multiplication/-/matrix-multiplication-0.5.2.tgz",
  "_spec": "0.5.2",
  "_where": "/Users/io/github.com/fibo/algebra",
  "author": {
    "name": "Gianluca Casati",
    "url": "http://g14n.info"
  },
  "bugs": {
    "url": "https://github.com/fibo/matrix-multiplication/issues"
  },
  "dependencies": {
    "not-defined": "^2.0.1",
    "static-props": "^1.1.1"
  },
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

},{}],10:[function(require,module,exports){
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

},{"./package.json":11,"static-props":13}],11:[function(require,module,exports){
module.exports={
  "_args": [
    [
      "multidim-array-index@0.6.0",
      "/Users/io/github.com/fibo/algebra"
    ]
  ],
  "_from": "multidim-array-index@0.6.0",
  "_id": "multidim-array-index@0.6.0",
  "_inBundle": false,
  "_integrity": "sha512-ojHXo7TNXU8i/MxkbC6BqLPR0z1Elr77PuX0xCLoQUSdo/53UjlRBcrDiaOyoLscQp1j84+qQTG1WwHPl6Vz/g==",
  "_location": "/multidim-array-index",
  "_phantomChildren": {},
  "_requested": {
    "type": "version",
    "registry": true,
    "raw": "multidim-array-index@0.6.0",
    "name": "multidim-array-index",
    "escapedName": "multidim-array-index",
    "rawSpec": "0.6.0",
    "saveSpec": null,
    "fetchSpec": "0.6.0"
  },
  "_requiredBy": [
    "/",
    "/tensor-contraction"
  ],
  "_resolved": "https://registry.npmjs.org/multidim-array-index/-/multidim-array-index-0.6.0.tgz",
  "_spec": "0.6.0",
  "_where": "/Users/io/github.com/fibo/algebra",
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

},{}],12:[function(require,module,exports){
module.exports=function(x){return x==null||(typeof x == 'number'&&isNaN(x))||(x.length<1&&typeof x!='function')||(typeof x=='object'&&Object.keys(x).length<1)}

},{}],13:[function(require,module,exports){
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

},{}],14:[function(require,module,exports){
// In browserify context, fall back to a no op.
module.exports = function (cb) { cb() }

},{}],15:[function(require,module,exports){
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

},{"indices-permutations":6,"multidim-array-index":10}],16:[function(require,module,exports){
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

},{}],17:[function(require,module,exports){
const CayleyDickson = require('cayley-dickson')
const no = require('not-defined')

const Ring = require('./Ring.js')

/**
 * A composition algebra is one of ℝ, ℂ, ℍ, O:
 * Real, Complex, Quaternion, Octonion.
 *
 * https://en.wikipedia.org/wiki/Composition_algebra
 *
 * @param {Object} ringDefinition
 * @param {Number} [num] of CayleyDickson construction iterations. Can be 1, 2, 4 or 8.
 *
 * @returns {Object} Scalar
 */

function CompositionAlgebra (ringDefinition, num) {
  if (no(num)) num = 1

  const logBase2 = [1, 2, 4, 8].indexOf(num)

  if (logBase2 === -1) {
    throw new TypeError('Argument n must be 1, 2, 4 or 8')
  }

  return Ring(CayleyDickson(ringDefinition, logBase2))
}

module.exports = CompositionAlgebra

},{"./Ring.js":19,"cayley-dickson":5,"not-defined":12}],18:[function(require,module,exports){
const determinant = require('laplace-determinant')
const multiplication = require('matrix-multiplication')
const multiDimArrayIndex = require('multidim-array-index')
const staticProps = require('static-props')
const tensorContraction = require('tensor-contraction')

const itemsPool = require('./itemsPool.js')
const toData = require('./toData.js')

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
  const {
    addition,
    equality,
    subtraction
  } = Scalar

  const contraction = tensorContraction.bind(null, addition)

  const enumerable = true

  /**
   * @param {Number} numRows
   * @param {Number} [numCols] if not defined it defaults to a square matrix.
   *
   * @returns {class} Matrix
   */

  return function (numRows, numCols) {
    if (typeof numCols === 'undefined') numCols = numRows

    const dimension = numRows * numCols
    const indices = [numRows, numCols]
    const isSquare = (numRows === numCols)

    /**
     * Determinant computation is defined only if it is a square matrix.
     */

    function computeDeterminant (matrix) {
      const data = toData(matrix)

      return determinant(data, Scalar, numRows)
    }

    /**
     * Matrix addition is the scalar addition for every item.
     */

    function matrixAddition (matrix1, matrix2) {
      const matrixData1 = toData(matrix1)
      const matrixData2 = toData(matrix2)

      const result = []

      for (let i = 0; i < dimension; i++) {
        result.push(addition(matrixData1[i], matrixData2[i]))
      }

      return result
    }

    /**
     * Matrix equality checks that all elements are equal.
     * It also tries to check if numCols and numRows correspond.
     */

    function matrixEquality (matrix1, matrix2) {
      if (matrix1 instanceof Matrix && matrix2 instanceof Matrix) {
        if (matrix1.numCols !== matrix2.numCols) {
          return false
        }

        if (matrix1.numRows !== matrix2.numRows) {
          return false
        }
      }

      const matrixData1 = toData(matrix1)
      const matrixData2 = toData(matrix2)

      if (matrixData1.length !== matrixData2.length) {
        return false
      }

      for (let i = 0; i < dimension; i++) {
        if (!equality(matrixData1[i], matrixData2[i])) {
          return false
        }
      }

      return true
    }
    /**
     * Multiplies row by column to the right.
     *
     * @param {Object|Array} rightMatrix
     *
     * @returns {Object} matrix
     */

    function matrixMultiplication (leftMatrix, rightMatrix) {
      const leftMatrixData = toData(leftMatrix)
      const rightMatrixData = toData(rightMatrix)

      const rowByColumnMultiplication = multiplication(Scalar)(numCols)

      return rowByColumnMultiplication(leftMatrixData, rightMatrixData)
    }

    /**
     * Matrix subtraction is the scalar subtraction for every item.
     */

    function matrixSubtraction (matrix1, matrix2) {
      const matrixData1 = toData(matrix1)
      const matrixData2 = toData(matrix2)

      const result = []

      for (let i = 0; i < dimension; i++) {
        result.push(subtraction(matrixData1[i], matrixData2[i]))
      }

      return result
    }

    /**
     * Calculates the matrix trace.
     *
     * @see {@link https://en.wikipedia.org/wiki/Trace_(linear_algebra)}
     *
     * @param {Object|Array} matrix
     *
     * @returns {Object} scalar
     */

    function computeTrace (matrix) {
      const matrixData = toData(matrix)

      return contraction([0, 1], indices, matrixData)
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

    class Matrix {
      constructor (data) {
        staticProps(this)({
          data,
          numCols,
          numRows
        }, enumerable)

        staticProps(this)({
          Scalar,
          tr: () => this.transposed
        })

        if (isSquare) {
          staticProps(this)({
            determinant: () => {
              const result = computeDeterminant(this)

              return new Scalar(result)
            },

            trace: () => {
              const result = computeTrace(this)

              return new Scalar(result)
            }
          })
        }
      }

      equality (matrix) {
        return matrixEquality(this, matrix)
      }

      get transposed () {
        const transposedElements = transpose(this)

        // Get a class matrix in the transposed matrix space.
        // Note that numCols and numRows order as arguments is inverted.
        const TransposedMatrix = MatrixSpace(Scalar)(numCols, numRows)

        return new TransposedMatrix(transposedElements)
      }

      addition (matrix) {
        const result = matrixAddition(this, matrix)

        return new Matrix(result)
      }

      multiplication (matrix) {
        const result = matrixMultiplication(this, matrix)

        return new Matrix(result)
      }

      subtraction (matrix) {
        const result = matrixSubtraction(this, matrix)

        return new Matrix(result)
      }
    }

    // Method aliases.
    Matrix.prototype.add = Matrix.prototype.addition
    Matrix.prototype.eq = Matrix.prototype.equality
    Matrix.prototype.equal = Matrix.prototype.equality
    Matrix.prototype.mul = Matrix.prototype.multiplication
    Matrix.prototype.sub = Matrix.prototype.subtraction

    staticProps(Matrix)({
      numCols,
      numRows
    })

    // Matrix static operators.

    staticProps(Matrix)({
      addition: () => matrixAddition,
      equality: () => matrixEquality,
      multiplication: () => matrixMultiplication,
      subtraction: () => matrixSubtraction,
      transpose: () => transpose
    })

    staticProps(Matrix)({
      add: Matrix.addition,
      eq: Matrix.equality,
      mul: Matrix.multiplication,
      sub: Matrix.subtraction,
      tr: Matrix.transpose
    })

    if (isSquare) {
      Matrix.prototype.det = Matrix.prototype.determinant

      staticProps(Matrix)({
        determinant: () => computeDeterminant,
        trace: () => computeTrace
      })

      staticProps(Matrix)({
        det: Matrix.determinant
      })
    }

    return Matrix
  }
}

itemsPool.set('MatrixSpace', MatrixSpace)

module.exports = MatrixSpace

},{"./itemsPool.js":22,"./toData.js":24,"laplace-determinant":7,"matrix-multiplication":8,"multidim-array-index":10,"static-props":13,"tensor-contraction":15}],19:[function(require,module,exports){
const staticProps = require('static-props')

const toData = require('./toData.js')

/**
 * @param {Object} ring definition
 *
 * @returns {Function} Scalar
 */

function Ring ({
  addition,
  conjugation,
  contains,
  division,
  equality,
  inversion,
  multiplication,
  negation,
  notContains,
  one,
  subtraction,
  zero
}) {
  function scalarAddition (scalar1, scalar2) {
    const scalarData1 = toData(scalar1)
    const scalarData2 = toData(scalar2)

    return addition(scalarData1, scalarData2)
  }

  function scalarConjugation (scalar) {
    const scalarData = toData(scalar)

    return conjugation(scalarData)
  }

  function scalarContains (scalar) {
    const scalarData = toData(scalar)

    return contains(scalarData)
  }

  function scalarEquality (scalar1, scalar2) {
    const scalarData1 = toData(scalar1)
    const scalarData2 = toData(scalar2)

    return equality(scalarData1, scalarData2)
  }

  function scalarDisequality (scalar1, scalar2) {
    return !scalarEquality(scalar1, scalar2)
  }

  function scalarDivision (scalar1, scalar2) {
    const scalarData1 = toData(scalar1)
    const scalarData2 = toData(scalar2)

    if (Scalar.equality(zero, scalarData2)) {
      throw new Error('Cannot divide by zero')
    }

    return division(scalarData1, scalarData2)
  }

  function scalarInversion (scalar) {
    const scalarData = toData(scalar)

    if (Scalar.equality(zero, scalarData)) {
      throw new Error('Cannot invert zero')
    }

    return inversion(scalarData)
  }

  function scalarMultiplication (scalar1, scalar2) {
    const scalarData1 = toData(scalar1)
    const scalarData2 = toData(scalar2)

    return multiplication(scalarData1, scalarData2)
  }

  function scalarNegation (scalar) {
    const scalarData = toData(scalar)

    return negation(scalarData)
  }

  function scalarSubtraction (scalar1, scalar2) {
    const scalarData1 = toData(scalar1)
    const scalarData2 = toData(scalar2)

    return subtraction(scalarData1, scalarData2)
  }

  /**
   * Scalar element.
   */

  class Scalar {
    constructor (data) {
      // validate data
      if (notContains(data)) {
        throw new TypeError('Invalid data = ' + data)
      }

      const enumerable = true
      staticProps(this)({ data }, enumerable)

      // Method aliases.

      staticProps(this)({
        add: () => this.addition,
        conj: () => this.conjugation,
        div: () => this.division,
        eq: () => this.equality,
        equal: () => this.equality,
        equals: () => this.equality,
        inv: () => this.inversion,
        mul: () => this.multiplication,
        ne: () => this.disequality,
        neg: () => this.negation,
        notEqual: () => this.disequality,
        notEquals: () => this.disequality,
        sub: () => this.subtraction
      })
    }

    addition (scalar) {
      const data = scalarAddition(this, scalar)

      return new Scalar(data)
    }

    belongsTo ({ contains }) {
      return contains(this.data)
    }

    conjugation () {
      const data = scalarConjugation(this)

      return new Scalar(data)
    }

    disequality (scalar) {
      return scalarDisequality(this, scalar)
    }

    division (scalar) {
      const data = scalarDivision(this, scalar)

      return new Scalar(data)
    }

    equality (scalar) {
      return scalarEquality(this, scalar)
    }

    inversion () {
      const data = scalarInversion(this)

      return new Scalar(data)
    }

    multiplication (scalar) {
      const data = scalarMultiplication(this, scalar)

      return new Scalar(data)
    }

    negation () {
      const data = scalarNegation(this)

      return new Scalar(data)
    }

    subtraction (scalar) {
      const data = scalarSubtraction(this, scalar)

      return new Scalar(data)
    }
  }

  staticProps(Scalar)({
    zero,
    one
  })

  // Scalar static operators.

  staticProps(Scalar)({
    addition: () => scalarAddition,
    conjugation: () => scalarConjugation,
    contains: () => scalarContains,
    disequality: () => scalarDisequality,
    division: () => scalarDivision,
    equality: () => scalarEquality,
    inversion: () => scalarInversion,
    multiplication: () => scalarMultiplication,
    negation: () => scalarNegation,
    subtraction: () => scalarSubtraction
  })

  staticProps(Scalar)({
    add: () => Scalar.addition,
    conj: () => Scalar.conjugation,
    div: () => Scalar.division,
    eq: () => Scalar.equality,
    equal: () => Scalar.equality,
    equals: () => Scalar.equality,
    inv: () => Scalar.inversion,
    mul: () => Scalar.multiplication,
    ne: () => Scalar.disequality,
    notEqual: () => Scalar.disequality,
    notEquals: () => Scalar.disequality,
    neg: () => Scalar.negation,
    sub: () => Scalar.subtraction
  })

  return Scalar
}

module.exports = Ring

},{"./toData.js":24,"static-props":13}],20:[function(require,module,exports){
const CompositionAlgebra = require('./CompositionAlgebra.js')

function Scalar (ringDefinition) {
  return CompositionAlgebra(ringDefinition)
}

module.exports = Scalar

},{"./CompositionAlgebra.js":17}],21:[function(require,module,exports){
const itemsPool = require('./itemsPool')
const matrixMultiplication = require('matrix-multiplication')
const staticProps = require('static-props')
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
  const {
    addition,
    equality,
    multiplication,
    subtraction
  } = Scalar

  const enumerable = true

  /**
   * @param {Number} dimension
   *
   * @returns {Function} Vector
   */

  return function (dimension) {
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

      const vector = []

      vector.push(subtraction(multiplication(uy, vz), multiplication(uz, vy)))
      vector.push(subtraction(multiplication(uz, vx), multiplication(ux, vz)))
      vector.push(subtraction(multiplication(ux, vy), multiplication(uy, vx)))

      return vector
    }

    /**
     * Multiply a column vector by matrix on right side
     *
     * @returns {Object} scalar
     * @param leftVector
     * @param rightMatrix
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
     * @see {@link https://en.wikipedia.org/wiki/Dot_product}
     *
     * @param {Object|Array} vector1
     * @param {Object|Array} vector2
     *
     * @returns {*} scalar
     */

    function scalarProduct (vector1, vector2) {
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
     * Vector addition is the scalar addition for every coordinate.
     */

    function vectorAddition (vector1, vector2) {
      const vectorData1 = toData(vector1)
      const vectorData2 = toData(vector2)

      const result = []

      for (let i = 0; i < dimension; i++) {
        result.push(addition(vectorData1[i], vectorData2[i]))
      }

      return result
    }

    /**
     * Vector equality checks that all coordinates are equal.
     */

    function vectorEquality (vector1, vector2) {
      const vectorData1 = toData(vector1)
      const vectorData2 = toData(vector2)

      if (vectorData1.length !== vectorData2.length) {
        return false
      }

      for (let i = 0; i < dimension; i++) {
        if (!equality(vectorData1[i], vectorData2[i])) {
          return false
        }
      }

      return true
    }

    /**
     * Vector subtraction is the scalar subtraction for every coordinate.
     */

    function vectorSubtraction (vector1, vector2) {
      const vectorData1 = toData(vector1)
      const vectorData2 = toData(vector2)

      const result = []

      for (let i = 0; i < dimension; i++) {
        result.push(subtraction(vectorData1[i], vectorData2[i]))
      }

      return result
    }

    /**
     * Vector element.
     */

    class Vector {
      constructor (data) {
        staticProps(this)({ data }, enumerable)

        staticProps(this)({
          norm: norm(data),
          dimension,
          Scalar
        })

        // Method aliases.

        staticProps(this)({
          add: () => this.addition,
          eq: () => this.equality,
          equals: () => this.equality,
          mul: () => this.multiplication,
          scalar: () => this.scalarProduct,
          sub: () => this.subtraction
        })
      }

      addition (vector) {
        const result = vectorAddition(this, vector)

        return new Vector(result)
      }

      equality (vector) {
        return vectorEquality(this, vector)
      }

      /**
       * Multiplication of a vector by a right matrix.
       *
       * Actually the vector it is supposed to be transposed, so it
       * becomes a row-vector, while by convention all vectors are column-vectors,
       * and after it is transposed, it can be multiplied by a right matrix.
       *
       * The transposition happens here implicitly.
       *
       * If you do not know what it means, do not worry. It is part of
       * Geometry first course at the first year of University, and you can
       * ignore it, since it has no consequences but it is hard to spot.
       *
       * I would like to thank and remember here in this comment, my awesome
       * prof. of Geometry. Thank you, Monti Bragadin.
       */

      multiplication (rightMatrix) {
        const MatrixSpace = itemsPool.get('MatrixSpace')

        const leftVectorData = this.data
        const result = multiplicationByMatrix(leftVectorData, rightMatrix)

        const rightNumRows = dimension
        const rightNumCols = result.length / rightNumRows

        const Matrix = MatrixSpace(Scalar)(rightNumRows, rightNumCols)

        return new Matrix(result)
      }

      scalarProduct (vector) {
        const result = scalarProduct(this, vector)

        return new Scalar(result)
      }

      subtraction (vector) {
        const result = vectorSubtraction(this, vector)

        return new Vector(result)
      }
    }

    staticProps(Vector)({
      dimension
    }, enumerable)

    // Vector static operators.

    staticProps(Vector)({
      addition: () => vectorAddition,
      equality: () => vectorEquality,
      norm: () => norm,
      scalarProduct: () => scalarProduct,
      subtraction: () => vectorSubtraction
    })

    staticProps(Vector)({
      add: () => Vector.addition,
      eq: () => Vector.equality,
      scalar: () => Vector.scalarProduct,
      sub: () => Vector.subtraction
    })

    function crossProductMethod (vector) {
      const data = this.data

      const result = crossProduct(data, vector)

      return new Vector(result)
    }

    if (dimension === 3) {
      Vector.prototype.cross = crossProductMethod
      Vector.prototype.crossProduct = crossProductMethod

      staticProps(Vector)({
        crossProduct: () => crossProduct,
        cross: () => crossProduct
      })
    }

    return Vector
  }
}

itemsPool.set('VectorSpace', VectorSpace)

module.exports = VectorSpace

},{"./itemsPool":22,"./toData":24,"matrix-multiplication":8,"static-props":13}],22:[function(require,module,exports){
const itemsPool = new Map()

module.exports = itemsPool

},{}],23:[function(require,module,exports){
const realField = {
  zero: 0,
  one: 1,
  // NaN, Infinity and -Infinity are not allowed.
  contains: (a) => (typeof a === 'number' && isFinite(a)),
  equality: (a, b) => {
    // Consider
    //
    //     0.1 + 0.2 === 0.3
    //
    // It evaluates to false. Actually the expression
    //
    //     0.1 + 0.2
    //
    // will return
    //
    //     0.30000000000000004
    //
    // Hence we need to approximate equality with an epsilon.

    return Math.abs(a - b) < Number.EPSILON
  },
  addition: (a, b) => a + b,
  negation: (a) => -a,
  multiplication: (a, b) => a * b,
  inversion: (a) => 1 / a
}

module.exports = realField

},{}],24:[function(require,module,exports){
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

},{"not-defined":12}],"algebra":[function(require,module,exports){
require('strict-mode')(() => {
  const Boole = require('./src/Boole.js')
  exports.Boole = Boole

  const CompositionAlgebra = require('./src/CompositionAlgebra.js')
  exports.CompositionAlgebra = CompositionAlgebra

  const Scalar = require('./src/Scalar.js')
  exports.Scalar = Scalar

  const realField = require('./src/realField.js')

  const Real = CompositionAlgebra(realField, 1)
  const Complex = CompositionAlgebra(realField, 2)
  const Quaternion = CompositionAlgebra(realField, 4)
  const Octonion = CompositionAlgebra(realField, 8)

  exports.Real = Real
  exports.Complex = Complex
  exports.Quaternion = Quaternion
  exports.Octonion = Octonion

  const VectorSpace = require('./src/VectorSpace.js')
  const MatrixSpace = require('./src/MatrixSpace.js')

  exports.C = Complex
  exports.C2x2 = MatrixSpace(Complex)(2)
  exports.H = Quaternion
  exports.R = Real
  exports.R2 = VectorSpace(Real)(2)
  exports.R3 = VectorSpace(Real)(3)
  exports.R2x2 = MatrixSpace(Real)(2)

  exports.VectorSpace = VectorSpace
  exports.MatrixSpace = MatrixSpace
})

},{"./src/Boole.js":16,"./src/CompositionAlgebra.js":17,"./src/MatrixSpace.js":18,"./src/Scalar.js":20,"./src/VectorSpace.js":21,"./src/realField.js":23,"strict-mode":14}]},{},[]);
