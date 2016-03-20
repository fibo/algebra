require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

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

},{}],2:[function(require,module,exports){
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

},{"algebra-group":1}],3:[function(require,module,exports){
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


},{"algebra-ring":2}],4:[function(require,module,exports){
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
'use strict';
var numberIsNan = require('number-is-nan');

module.exports = Number.isFinite || function (val) {
	return !(typeof val !== 'number' || numberIsNan(val) || val === Infinity || val === -Infinity);
};

},{"number-is-nan":11}],7:[function(require,module,exports){
// https://github.com/paulmillr/es6-shim
// http://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.isinteger
var isFinite = require("is-finite");
module.exports = Number.isInteger || function(val) {
  return typeof val === "number" &&
    isFinite(val) &&
    Math.floor(val) === val;
};

},{"is-finite":6}],8:[function(require,module,exports){

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


},{}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
module.exports=function(x){return typeof x==='undefined'}

},{}],11:[function(require,module,exports){
'use strict';
module.exports = Number.isNaN || function (x) {
	return x !== x;
};

},{}],12:[function(require,module,exports){
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

},{}],13:[function(require,module,exports){
// In browserify context, *strict-mode* fall back to a no op.
module.exports = function (cb) { cb() }

},{}],14:[function(require,module,exports){
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

},{"indices-permutations":4,"multidim-array-index":9}],15:[function(require,module,exports){
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

},{"indices-permutations":4,"multidim-array-index":9}],16:[function(require,module,exports){
var CayleyDickson = require('cayley-dickson');
var coerced = require('./coerced');
var inherits = require('inherits');
var operators = require('./operators.json');
var staticProps = require('static-props');
var TensorSpace = require('./TensorSpace');
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
    var indices = [1];

    function Scalar(data) {
      this.data = data;

      staticProps(this)({
        zero: K.zero,
        one: K.one
      });
    }

    staticProps(Scalar)({
      zero: K.zero,
      one: K.one
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

    Scalar.contains = K.contains;
    Scalar.notContains = K.notContains;

    Scalar.prototype.add = Scalar.prototype.addition;
    Scalar.prototype.mul = Scalar.prototype.multiplication;

    Scalar.mul = Scalar.multiplication;

    Scalar.div = Scalar.division;

    Scalar.prototype.eq = Scalar.prototype.equality;

    Scalar.eq = Scalar.equality;

    Scalar.prototype.ne = Scalar.prototype.disequality;

    Scalar.ne = Scalar.disequality;

    var unaryOperators = ['inversion', 'negation', 'inversion', 'negation'];

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

    var myOperators = binaryOperators.concat(comparisonOperators);

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

},{"./TensorSpace":18,"./coerced":20,"./operators.json":22,"./toData":25,"cayley-dickson":3,"inherits":5,"static-props":12}],17:[function(require,module,exports){
var determinant = require('laplace-determinant');
var inherits = require('inherits');
var no = require('not-defined');
var matrixToArrayIndex = require('./matrixToArrayIndex');
var multiDimArrayIndex = require('multidim-array-index');
var operators = require('./operators.json');
var rowByColumnMultiplication = require('./rowByColumnMultiplication');
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

      // For this static version, it is assumed that leftMatrix is numRows by numCols.
      var leftNumRows = numRows;
      var leftNumCols = numCols;

      var rightNumRows = leftNumCols;
      var rightNumCols = rightMatrixData.length / rightNumRows;

      return rowByColumnMultiplication(Scalar, leftMatrixData, leftNumRows, rightMatrixData, rightNumCols);
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
          var index = matrixToArrayIndex(i, j, numCols);
          var transposedIndex = matrixToArrayIndex(j, i, numRows);

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

},{"./TensorSpace":18,"./VectorSpace":19,"./matrixToArrayIndex":21,"./operators.json":22,"./rowByColumnMultiplication":24,"./toData":25,"inherits":5,"laplace-determinant":8,"multidim-array-index":9,"not-defined":10,"static-props":12,"tensor-contraction":14}],18:[function(require,module,exports){
var coerced = require('./coerced');
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

    // TODO create one
    // Create zero.
    var zero = indices.reduce(function (result, dim) {
      if (isScalar) {
        return Scalar.zero;
      } else {
        for (var i = 0; i < dim; i++) {
          result.push(Scalar.zero);
        }

        return result;
      }
    }, []);

    /**
     * Tensor
     *
     * @class
     */

    function Tensor(data) {
      function check(item) {
        if (Scalar.notContains(item)) {
          throw new TypeError('Invalid data = ' + item);
        }
      }

      if (isScalar) check(data);else data.forEach(check);

      this.data = data;
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

    Tensor.product = function (leftData) {
      return function (rightDim) {
        return function (rightData) {
          return tensorProduct(Scalar.multiplication, indices, rightDim, leftData, rightData);
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

},{"./coerced":20,"./operators.json":22,"./toData":25,"static-props":12,"tensor-product":15}],19:[function(require,module,exports){
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

  /**
   * @api private
   *
   * @param {Number} dimension
   *
   * @returns {Function} Vector
   */

  return function (dimension) {
    var indices = [dimension];

    var AbstractVector = TensorSpace(Scalar)(indices);

    /**
     */

    function crossProduct() {}
    // TODO complete cross product


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
      n;
    }

    if (dimension === 3) {
      Vector.crossProduct = crossProduct;

      Vector.prototype.crossProduct = crossProductMethod;
      Vector.prototype.cross = crossProductMethod;
    }

    // Static operators.

    Vector.norm = norm;
    Vector.scalarProduct = scalarProduct;

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

/**
 * @api private
 function perScalarProduct (Scalar) {
  var data       = this.data,
      ScalarData = toData(Scalar)
   for (var i = 0; i < dimension; i++)
    data[i] = Scalar.mul(data[i], ScalarData)
   this.data = data
   return this
}
 Vector.prototype.perScalarProduct = perScalarProduct
 */

/**
 * Transpose a column-vector to a row-vector
 *
 * If you want to multiply at right a vector by a matrix you need to transpose it.
 *
 * @api private
 *
 * @returns {Object} Matrix
 function transpose () {
  var data   = this.data
   var MatrixSpace = itemsPool.getMatrixSpace()
   var Matrix = MatrixSpace(Scalar)(1, dimension)
   return new Matrix(data)
}
 Vector.prototype.transpose = transpose
 */

},{"./TensorSpace":18,"./operators.json":22,"./toData":25,"inherits":5,"static-props":12}],20:[function(require,module,exports){
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

},{"./toData":25}],21:[function(require,module,exports){
/**
 * Convert a pair of indices to a 1-dimensional index
 *
 * @api private
 *
 * @param {Number} i index row
 * @param {Number} j index column
 * @param {Number} numCols
 *
 * @returns {Number} index
 */

var multiDimArrayIndex = require('multidim-array-index');

function matrixToArrayIndex(i, j, numCols) {
  return multiDimArrayIndex([numCols, numCols], [i, j]);
}

module.exports = matrixToArrayIndex;

},{"multidim-array-index":9}],22:[function(require,module,exports){
module.exports={
  "group": [
    "addition",
    "subtraction"
  ],
  "ring": [
    "multiplication"
  ],
  "aliasesOf": {
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
    "transpose": [
      "tr"
    ]
  }
}

},{}],23:[function(require,module,exports){
var realField = {
  zero: 0,
  one: 1,
  contains: function (a, b) {
    // NaN, Infinity and -Infinity are not allowed.
    return typeof a === 'number' && isFinite(a);
  },
  equality: function (a, b) {
    return a === b;
  },
  addition: function (a, b) {
    return a + b;
  },
  negation: function (a) {
    return -a;
  },
  multiplication: function (a, b) {
    return a * b;
  },
  inversion: function (a) {
    return 1 / a;
  }
};

module.exports = realField;

},{}],24:[function(require,module,exports){
var isInteger = require('is-integer');
var matrixToArrayIndex = require('./matrixToArrayIndex');
/* TODO
var tensorContraction = require('tensor-contraction')
var tensorProduct = require('tensor-product')
*/
var toData = require('./toData');

/**
 * Multiply two matrices, row by column.
 *
 * @api private
 *
 * @param {Object} field
 * @param {Function} field.addition
 * @param {Function} field.multiplication
 * @param {Object|Array} leftMatrix
 * @param {Array} leftNumRows
 * @param {Object|Array} rightMatrix
 * @param {Array} rightNumCols
 *
 * @returns {Array} matrix
 */

function rowByColumnMultiplication(field, leftMatrix, leftNumRows, rightMatrix, rightNumCols) {
  var leftMatrixData = toData(leftMatrix);
  var rightMatrixData = toData(rightMatrix);

  var leftNumCols = leftMatrix.length / leftNumRows;
  var rightNumRows = rightMatrix.length / rightNumCols;

  if (!isInteger(leftNumCols)) {
    throw new TypeError('leftNumCols does not divide leftMatrix.length');
  }

  if (!isInteger(rightNumRows)) {
    throw new TypeError('rightNumRows does not divide rightMatrix.length');
  }

  // Check if matrices can be multiplied.
  if (leftNumCols !== rightNumRows) {
    throw new TypeError('Left num cols != right num rows');
  }

  /*
   * TODO try with tensor product and contraction.
  var tensorIndices = [leftNumRows, leftNumCols, rightNumRows, rightNumCols]
   var tensorProductData = tensorProduct(field.multiplication, [leftNumRows, leftNumCols], [rightNumRows, rightNumCols], leftMatrixData, rightMatrixData)
   return tensorContraction(field.addition, [1, 2], tensorIndices, tensorProductData)
  */
  var commonIndex = leftNumCols,
      data = [],
      rows = leftNumRows,
      cols = rightNumCols;

  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      var leftIndex = matrixToArrayIndex(i, 0, commonIndex),
          rightIndex = matrixToArrayIndex(0, j, cols);

      var rightElement = rightMatrix[rightIndex],
          leftElement = leftMatrix[leftIndex];

      var element = field.multiplication(leftElement, rightElement);

      for (var k = 1; k < commonIndex; k++) {
        leftIndex = matrixToArrayIndex(i, k, commonIndex);
        rightIndex = matrixToArrayIndex(k, j, cols);

        rightElement = rightMatrix[rightIndex];
        leftElement = leftMatrix[leftIndex];

        element = field.addition(element, field.multiplication(rightElement, leftElement));
      }

      data.push(element);
    }
  }

  return data;
}

module.exports = rowByColumnMultiplication;

},{"./matrixToArrayIndex":21,"./toData":25,"is-integer":7}],25:[function(require,module,exports){
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

  if (typeof arg.data === 'undefined') data = arg;else data = arg.data;

  if (typeof data === 'undefined') throw new TypeError('No data');

  return data;
}

module.exports = toData;

},{}],"algebra":[function(require,module,exports){
require('strict-mode')(function () {
  var realField = require('./src/realField');
  var CompositionAlgebra = require('./src/CompositionAlgebra');

  exports.Real = CompositionAlgebra(realField)(0);
  exports.Complex = CompositionAlgebra(realField)(1);
  exports.Quaternion = CompositionAlgebra(realField)(2);
  exports.Octonion = CompositionAlgebra(realField)(3);

  exports.VectorSpace = require('./src/VectorSpace');
  exports.MatrixSpace = require('./src/MatrixSpace');
  exports.TensorSpace = require('./src/TensorSpace');
});

},{"./src/CompositionAlgebra":16,"./src/MatrixSpace":17,"./src/TensorSpace":18,"./src/VectorSpace":19,"./src/realField":23,"strict-mode":13}]},{},[]);
