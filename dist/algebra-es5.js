(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.algebra = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

require('strict-mode')(function () {
    var iterateCayleyDickson = require('cayley-dickson'),
        realField = require('./src/realField'),
        Scalar = require('./src/Scalar');

    var K0 = iterateCayleyDickson(realField, 0),
        K1 = iterateCayleyDickson(realField, 1),
        K2 = iterateCayleyDickson(realField, 2),
        K3 = iterateCayleyDickson(realField, 3);

    exports.Real = Scalar([K0.zero, K0.one], K0);
    exports.Complex = Scalar([K1.zero, K1.one], K1);
    exports.Quaternion = Scalar([K2.zero, K2.one], K2);
    exports.Octonion = Scalar([K3.zero, K3.one], K3);

    exports.VectorSpace = require('./src/VectorSpace');
    exports.MatrixSpace = require('./src/MatrixSpace');
});

},{"./src/MatrixSpace":11,"./src/Scalar":12,"./src/VectorSpace":13,"./src/realField":19,"cayley-dickson":4,"strict-mode":9}],2:[function(require,module,exports){

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

var ring = require('algebra-ring')

var twoPow = Math.pow.bind(null, 2)

/**
 * Turn unary operator on single value to operator on n values.
 */

function arrayfy1 (operator, dim) {
   return function (a) {
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

     var c = []

     for (var i = 0; i < dim; i++)
       c.push(operator(a[i], b[i]))

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

  if (iterations === 0)
    return field

   var fieldZero           = field.zero,
       fieldOne            = field.one,
       fieldAddition       = field.addition,
       fieldMultiplication = field.multiplication,
       fieldNegation       = field.negation,
       fieldDisequality    = field.disequality,
       fieldNotContains    = field.notContains

  // identities

  var one  = [],
      zero = [],
      dim  = twoPow(iterations)

  one.push(fieldOne)
  zero.push(fieldZero)

  for (var i = 1; i < dim; i++) {
    one.push(fieldZero)
    zero.push(fieldZero)
  }

  // operators

  function equality (a, b) {
    for (var i = 0; i < dim; i++)
      if (fieldDisequality(a[i], b[i]))
        return false

    return true
  }

  function contains (a) {
    for (var i = 0; i < dim; i++)
      if (fieldNotContains(a[i]))
        return false

    return true
  }

  function buildConjugation (fieldNegation, iterations) {
    if (iterations === 0)
      return function (a) { return a }

    var dim = twoPow(iterations)

    // b -> p looks like complex conjugation simmetry (:
    function conjugation (b) {
      var p = [b[0]],
          i

      // First, copy half of b into q.
      for (i = 1; i < dim; i++)
        p.push(fieldNegation(b[i]))

      return p
    }

    return conjugation
  }

  var conjugation = buildConjugation(fieldNegation, iterations)

  function buildMultiplication (fieldAddition, fieldNegation, fieldMultiplication, iterations) {
    if (iterations === 0)
      return function (a, b) { return [fieldMultiplication(a, b)] }

    var dim     = twoPow(iterations),
        halfDim = twoPow(iterations - 1)

    var add  = arrayfy2(fieldAddition, halfDim),
        conj = buildConjugation(fieldNegation, iterations -1),
        mul  = buildMultiplication(fieldAddition, fieldNegation, fieldMultiplication, iterations - 1),
        neg  = arrayfy1(fieldNegation, halfDim)

    function multiplication (a, b) {
      var c = []

      //         a = (p, q)
      //         +    +  +
      //         b = (r, s)
      //         =    =  =
      // a + b = c = (t, u)

      var p = [], q = [],
          r = [], s = []

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

      var t = add(mul(p, r), neg(mul(conj(s), q))),
          u = add(mul(s, p), mul(q, conj(r)))

      for (var i3 = 0; i3 < halfDim; i3++)
        c.push(t[i3])

      for (var i4 = 0; i4 < halfDim; i4++)
        c.push(u[i4])

      return c
    }

    return multiplication
  }

  var multiplication = buildMultiplication(fieldAddition, fieldNegation, fieldMultiplication, iterations)

  function norm (a) {
    var n       = fieldZero,
        squares = multiplication(a, conjugation(a))

    for (var i = 0; i < dim; i++)
      n = fieldAddition(n, squares[i])

    return n
  }

  function inversion (a) {
    var n = norm(a)

    var b = conjugation(a)

    for (var i = 0; i < dim; i++)
      b[i] = field.division(b[i], n)

    return b
  }

  var addition = arrayfy2(fieldAddition, dim),
      negation = arrayfy1(fieldNegation, dim)

  // Cayley-Dickson construction take a field as input but the result can be often a ring,
  // this means that it can be *not-commutative*.
  // To elevate it to an algebra, we need a bilinear form wich is given by the norm.
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

module.exports = iterateCayleyDickson


},{"algebra-ring":3}],5:[function(require,module,exports){
// https://github.com/paulmillr/es6-shim
// http://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.isinteger
var isFinite = require("is-finite");
module.exports = Number.isInteger || function(val) {
  return typeof val === "number" &&
    isFinite(val) &&
    Math.floor(val) === val;
};

},{"is-finite":6}],6:[function(require,module,exports){
'use strict';
var numberIsNan = require('number-is-nan');

module.exports = Number.isFinite || function (val) {
	return !(typeof val !== 'number' || numberIsNan(val) || val === Infinity || val === -Infinity);
};

},{"number-is-nan":7}],7:[function(require,module,exports){
'use strict';
module.exports = Number.isNaN || function (x) {
	return x !== x;
};

},{}],8:[function(require,module,exports){

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

// IN browserify context, fall back to a no op
module.exports = function (cb) { cb() }


},{}],10:[function(require,module,exports){

/**
 * Abstract element
 *
 * It has a *data* attribute that can contain anything, validated by its *check*.
 *
 * @param {*} data
 * @param {Function} check
 */

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Element = (function () {
  function Element(data, check) {
    _classCallCheck(this, Element);

    if (typeof data === 'undefined') throw new TypeError('Undefined data');

    if (check(data)) this.data = data;else throw new TypeError('Invalid data = ' + data);
  }

  _createClass(Element, [{
    key: 'valueOf',
    value: function valueOf() {
      return this.data;
    }
  }]);

  return Element;
})();

module.exports = Element;

},{}],11:[function(require,module,exports){
'use strict';

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var determinant = require('laplace-determinant'),
    itemsPool = require('./itemsPool'),
    isInteger = require('is-integer'),
    matrixToArrayIndex = require('./matrixToArrayIndex'),
    rowByColumnMultiplication = require('./rowByColumnMultiplication'),
    toData = require('./toData'),
    VectorSpace = require('./VectorSpace');

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

  /**
   *
   * @api private
   *
   * @param {Number} numRows
   * @param {Number} [numCols] defaults to a square matrix.
   *
   * @returns {Function} Matrix
   */

  return function (numRows, numCols) {

    function createIdentity(scalarZero, scalarOne, rank) {
      var identity = [];

      for (var i = 0; i < rank; i++) for (var j = 0; j < rank; j++) if (i === j) identity.push(scalarOne);else identity.push(scalarZero);

      return identity;
    }

    // numCols defaults to numRows
    if (typeof numCols === 'undefined') numCols = numRows;

    var dimension = numRows * numCols,
        indices = [numRows, numCols],
        isSquare = numRows === numCols;

    // MatrixSpace mxn is a VectorSpace with dim=m*n
    var Vector = VectorSpace(Scalar)(dimension);

    /**
     * Matrix
     *
     * Inherits from [Element](#element).
     *
     * ```
     * var m = R2x2([0, 1,
     *               1, 0]
     * ```
     *
     * @param {*} data
     */

    var Matrix = (function (_Vector) {
      _inherits(Matrix, _Vector);

      function Matrix(data) {
        _classCallCheck(this, Matrix);

        _get(Object.getPrototypeOf(Matrix.prototype), 'constructor', this).call(this, data);

        this.numCols = numCols;
        this.numRows = numRows;

        Object.defineProperties(this, {
          'numCols': { writable: false, value: numCols },
          'numRows': { writable: false, value: numRows }
        });

        function matrixDeterminant() {
          var det = determinant(this.data, Scalar, numRows);

          return new Scalar(det);
        }

        if (isSquare) {
          Object.defineProperty(this, 'determinant', { get: matrixDeterminant });
        }
      }

      // Static attributes.

      return Matrix;
    })(Vector);

    if (isSquare) {
      // TODO rank should be calculated depending on determinant
      // if determinant is zero, rank < numRows, but this needs sub-matrix function
      // which is in laplace-determinant package and should be placed in its own package
      var rank = numRows;

      var identity = createIdentity(Scalar.zero, Scalar.one, rank);

      Object.defineProperty(Matrix, 'identity', {
        writable: false,
        value: identity
      });
    }

    Object.defineProperties(Matrix, {
      'isSquare': { writable: false, value: isSquare },
      'numCols': { writable: false, value: numCols },
      'numRows': { writable: false, value: numRows },
      'zero': { writable: false, value: Vector.zero }
    });

    /**
     * @api private
     *
     * Row by column multiplication at right side
     */

    function staticRightMultiplication(leftNumRows, leftNumCols, left, right) {
      // Multiplication is possible only if
      //
      //     left num cols = right num rows
      //
      // Since
      //
      //     right num rows * right num cols = rightData.length
      //
      // it is possible to compute right num cols and the right matrix is square if
      //
      //     right num rows = right num cols
      //

      // leftNumRows, leftNumCols = rightNumRows, rightNumCols

      var leftData = toData(left),
          rightData = toData(right),
          rightNumCols = rightData.length / leftNumCols;

      // Check if rightNumCols results to be an integer: it means matrices can be multiplied.
      if (!isInteger(rightNumCols)) throw new TypeError('left num cols != right num rows');

      return rowByColumnMultiplication(Scalar, leftData, leftNumRows, rightData, rightNumCols);
    }

    function rightMultiplication(right) {
      var left = this.data,
          leftNumCols = this.numCols,
          leftNumRows = this.numRows,
          rightData = toData(right);

      var data = staticRightMultiplication(leftNumRows, leftNumCols, left, right);

      // If staticRightMultiplication does not throw it means that matrices can be multiplied.
      var rightNumCols = rightData.length / leftNumCols,
          rightNumRows = leftNumCols;

      var leftIsVector = leftNumCols === 1,
          rightIsVector = rightNumCols === 1;

      if (leftIsVector && rightIsVector) return new Scalar(data[0]);

      if (rightIsVector) {
        var VectorSpace = itemsPool.getVectorSpace();

        var Vector = VectorSpace(Scalar)(leftNumRows);

        return new Vector(data);
      } else {
        var MatrixSpace = itemsPool.getMatrixSpace();

        var Matrix = MatrixSpace(Scalar)(rightNumRows, rightNumCols);

        return new Matrix(data);
      }
    }

    Matrix.prototype.multiplication = rightMultiplication;

    /**
     *
     * @api private
     *
     * @param {numRows}
     * @param {numCols}
     * @param {Object|Array} matrix
     *
     * @returns {Array} transposedData
     */

    function transpose(numRows, numCols, matrix) {
      var data = toData(matrix),
          transposedData = [];

      for (var i = 0; i < numRows; i++) for (var j = 0; j < numCols; j++) {
        transposedData[matrixToArrayIndex(j, i, numRows)] = data[matrixToArrayIndex(i, j, numCols)];
      }

      return transposedData;
    }

    /**
     *
     * @api private
     *
     * @returns {Object} transposed matrix
     */

    function matrixTransposition() {
      var data = this.data,
          numCols = this.numCols,
          numRows = this.numRows;

      var transposedData = transpose(numRows, numCols, data);

      // +--------+-- Transposed indices here.
      // ↓        ↓
      var TransposedMatrix = MatrixSpace(Scalar)(numCols, numRows);
      return new TransposedMatrix(transposedData);
    }

    Matrix.prototype.transpose = matrixTransposition;

    // Static operators.

    Matrix.addition = Vector.addition;
    Matrix.multiplication = staticRightMultiplication.bind(null, numRows, numCols);
    Matrix.negation = Vector.negation;
    Matrix.subtraction = Vector.subtraction;
    Matrix.transpose = transpose.bind(null, numRows, numCols);

    // Aliases.

    Matrix.add = Matrix.addition;
    Matrix.mul = Matrix.multiplication;
    Matrix.neg = Matrix.negation;
    Matrix.sub = Matrix.subtraction;

    Matrix.prototype.mul = rightMultiplication;
    Matrix.prototype.o = rightMultiplication;

    Matrix.prototype.tr = matrixTransposition;
    Matrix.prototype.t = matrixTransposition;

    Matrix.tr = Matrix.transpose;

    return Matrix;
  };
}

itemsPool.setMatrixSpace(MatrixSpace);

module.exports = MatrixSpace;

},{"./VectorSpace":13,"./itemsPool":16,"./matrixToArrayIndex":17,"./rowByColumnMultiplication":20,"./toData":21,"is-integer":5,"laplace-determinant":8}],12:[function(require,module,exports){
'use strict';

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var algebraRing = require('algebra-ring'),
    coerced = require('./coerced'),
    comparison = require('./comparison'),
    Element = require('./Element'),
    method = require('./method');

var nAryMethod = method.nAry,
    unaryMethod = method.unary;

/**
 * Create an algebra scalar.
 *
 * @param {Array} identity
 * @param {Array} identity[0] a.k.a. zero
 * @param {Array} identity[1] a.k.a. uno
 * @param {Object}   given operator functions
 * @param {Function} given.contains
 * @param {Function} given.equality
 * @param {Function} given.addition
 * @param {Function} given.negation
 * @param {Function} given.multiplication
 * @param {Function} given.inversion
 *
 * @returns {Function} Scalar that implements an algebra scalar as a class
 */

function Scalar(identity, given) {
  var r = algebraRing(identity, given);

  var Scalar = (function (_Element) {
    _inherits(Scalar, _Element);

    function Scalar(data) {
      _classCallCheck(this, Scalar);

      _get(Object.getPrototypeOf(Scalar.prototype), 'constructor', this).call(this, data, given.contains);
    }

    // TODO questo codice dovrebbe stare in cayley-dickson
    return Scalar;
  })(Element);

  if (typeof given.conjugation === 'undefined') given.conjugation = function (a) {
    return a;
  };

  var addition = coerced(given.addition),
      contains = coerced(given.contains),
      conjugation = coerced(given.conjugation),
      disequality = coerced(given.disequality),
      equality = coerced(given.equality),
      negation = coerced(given.negation),
      notContains = coerced(given.notContains),
      subtraction = coerced(given.subtraction);

  var multiplication = coerced(given.multiplication),
      division = coerced(given.division),
      inversion = coerced(given.inversion);

  // Comparison operators.

  Scalar.prototype.equality = comparison(equality);
  Scalar.prototype.disequality = comparison(disequality);

  // Chainable class methods.

  Scalar.prototype.addition = function () {
    var data = addition.bind(null, this.data).apply(null, arguments);
    return new Scalar(data);
  };

  Scalar.prototype.subtraction = nAryMethod(subtraction, Scalar);
  Scalar.prototype.negation = unaryMethod(negation, Scalar);
  Scalar.prototype.conjugation = unaryMethod(conjugation, Scalar);

  Scalar.prototype.multiplication = nAryMethod(multiplication, Scalar);
  Scalar.prototype.division = nAryMethod(division, Scalar);
  Scalar.prototype.inversion = unaryMethod(inversion, Scalar);

  // Static operators.

  Scalar.addition = addition;
  Scalar.contains = contains;
  Scalar.conjugation = conjugation;
  Scalar.disequality = disequality;
  Scalar.equality = equality;
  Scalar.negation = negation;
  Scalar.notContains = notContains;
  Scalar.subtraction = subtraction;

  Scalar.multiplication = multiplication;
  Scalar.division = division;
  Scalar.inversion = inversion;

  // Aliases.

  Scalar.eq = Scalar.equality;
  Scalar.ne = Scalar.disequality;

  Scalar.equal = Scalar.equality;
  Scalar.notEqual = Scalar.disequality;
  Scalar.notEq = Scalar.disequality;

  Scalar.add = Scalar.addition;
  Scalar.neg = Scalar.negation;
  Scalar.sub = Scalar.subtraction;

  Scalar.div = Scalar.division;
  Scalar.inv = Scalar.inversion;
  Scalar.mul = Scalar.multiplication;

  Scalar.conj = Scalar.conj;

  Scalar.prototype.eq = Scalar.prototype.equality;
  Scalar.prototype.ne = Scalar.prototype.disequality;

  Scalar.prototype.equal = Scalar.prototype.equality;
  Scalar.prototype.notEqual = Scalar.prototype.disequality;
  Scalar.prototype.notEq = Scalar.prototype.disequality;

  Scalar.prototype.add = Scalar.prototype.addition;
  Scalar.prototype.neg = Scalar.prototype.negation;
  Scalar.prototype.sub = Scalar.prototype.subtraction;

  Scalar.prototype.mul = Scalar.prototype.multiplication;
  Scalar.prototype.div = Scalar.prototype.division;
  Scalar.prototype.inv = Scalar.prototype.inversion;

  Scalar.prototype.conj = Scalar.prototype.conjugation;

  // Identities.

  Scalar.zero = new Scalar(identity[0]);
  Scalar.one = new Scalar(identity[1]);

  return Scalar;
}

module.exports = Scalar;

},{"./Element":10,"./coerced":14,"./comparison":15,"./method":18,"algebra-ring":3}],13:[function(require,module,exports){
'use strict';

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var algebraGroup = require('algebra-group'),
    coerced = require('./coerced'),
    comparison = require('./comparison'),
    Element = require('./Element'),
    itemsPool = require('./itemsPool'),
    method = require('./method'),
    rowByColumnMultiplication = require('./rowByColumnMultiplication.js'),
    toData = require('./toData');

var nAryMethod = method.nAry,
    unaryMethod = method.unary;

/**
 * Space of vectors
 *
 * ```
 * var V = VectorSpace(R)(2)
 *
 * var v = new V([1, 2])
 * ```
 *
 * @param {Object} Scalar class
 *
 * @returns {Function} anonymous with signature (dimension)
 */

function VectorSpace(Scalar) {

  /**
   * @api private
   *
   * @param {Number} dimension
   *
   * @returns {Constructor} Vector
   */

  return function (dimension) {

    function createZero(scalarZero, dimension) {
      var vectorZero = [];

      for (var i = 0; i < dimension; i++) vectorZero.push(scalarZero);

      return vectorZero;
    }

    var zero = createZero(Scalar.zero, dimension);

    function _contains(a) {
      if (a.length !== dimension) return false;

      for (var i = 0; i < dimension; i++) if (!Scalar.contains(a[i])) return false;

      return true;
    }

    function _equality(a, b) {
      for (var i = 0; i < dimension; i++) if (!Scalar.equality(a[i], b[i])) return false;

      return true;
    }

    function _addition(a, b) {
      var c = [];

      for (var i = 0; i < dimension; i++) c.push(Scalar.addition(a[i], b[i]));

      return c;
    }

    function _negation(a) {
      var b = [];

      for (var i = 0; i < dimension; i++) b.push(Scalar.negation(a[i]));

      return b;
    }

    var g = algebraGroup({
      identity: zero,
      contains: _contains,
      equality: _equality,
      compositionLaw: _addition,
      inversion: _negation
    });

    var addition = coerced(g.addition),
        contains = coerced(g.contains),
        disequality = coerced(g.disequality),
        equality = coerced(g.equality),
        negation = coerced(g.negation),
        notContains = coerced(g.notContains),
        subtraction = coerced(g.subtraction);

    /**
     * Vector
     *
     * Inherits from [Element](#element).
     *
     * @param {*} data
     */

    var Vector = (function (_Element) {
      _inherits(Vector, _Element);

      function Vector(data) {
        _classCallCheck(this, Vector);

        _get(Object.getPrototypeOf(Vector.prototype), 'constructor', this).call(this, data, contains);

        /**
         * Norm of a vector
         *
         * Given v = (x1, x2, ... xN)
         *
         * norm is defined as n = x1 * x1 + x2 * x2 + ... + xN * xN
         *
         * @api private
         *
         * @returns {Scalar} result
         */

        function vectorNorm() {
          var result = Scalar.multiplication(data[0], data[0]);

          for (var i = 1; i < dimension; i++) result = Scalar.addition(result, Scalar.multiplication(data[i], data[i]));

          return new Scalar(result);
        }

        Object.defineProperty(this, 'norm', { get: vectorNorm });
      }

      // Static attributes.

      return Vector;
    })(Element);

    Object.defineProperty(Vector, 'zero', {
      writable: false,
      value: zero
    });

    /**
     * @api private
     */

    function crossProduct(right) {
      var rightData = toData(right);

      // TODO complete cross product
    }

    // Cross product is defined only in dimension 3.
    if (dimension === 3) {
      Vector.prototype.crossProduct = crossProduct;
      Vector.prototype.cross = crossProduct;
      Vector.prototype.x = crossProduct;
    }

    // TODO staticRightMultiplication by a matrix

    /**
     * @api private
     */

    function scalarProduct(vector1, vector2) {
      var vectorData1 = toData(vector1),
          vectorData2 = toData(vector2);

      if (vectorData1.length !== vectorData2.length) throw new TypeError('Vectors has not the same dimension');

      var result = Scalar.multiplication(vectorData1[0], vectorData2[0]);

      for (var i = 1; i < dimension; i++) {
        result = Scalar.addition(result, Scalar.multiplication(vectorData1[i], vectorData2[i]));
      }

      return result;
    }

    /**
     * @api private
     */

    function vectorScalarProduct(vector) {
      var result = scalarProduct(this.data, vector);

      return new Scalar(result);
    }

    Vector.prototype.scalarProduct = vectorScalarProduct;

    /**
     * @api private
     */

    function perScalarProduct(Scalar) {
      var data = this.data,
          ScalarData = toData(Scalar);

      for (var i = 0; i < dimension; i++) data[i] = Scalar.mul(data[i], ScalarData);

      this.data = data;

      return this;
    }

    Vector.prototype.perScalarProduct = perScalarProduct;

    /**
     * Transpose a column-vector to a row-vector
     *
     * If you want to multiply at right a vector by a matrix you need to transpose it.
     *
     * @api private
     *
     * @returns {Object} Matrix
     */

    function transpose() {
      var data = this.data;

      var MatrixSpace = itemsPool.getMatrixSpace();

      var Matrix = MatrixSpace(Scalar)(dimension, 1);

      return new Matrix(data);
    }

    Vector.prototype.transpose = transpose;

    // Comparison operators.

    Vector.prototype.equality = comparison(equality);
    Vector.prototype.disequality = comparison(disequality);

    // Chainable class methods.

    Vector.prototype.addition = nAryMethod(addition, Vector);
    Vector.prototype.subtraction = nAryMethod(subtraction, Vector);
    Vector.prototype.negation = unaryMethod(negation, Vector);

    // Static operators.

    Vector.contains = contains;
    Vector.disequality = disequality;
    Vector.equality = equality;
    Vector.notContains = notContains;

    Vector.addition = addition;
    Vector.subtraction = subtraction;
    Vector.negation = negation;

    Vector.scalarProduct = scalarProduct;

    // Aliases

    Vector.eq = Vector.equality;
    Vector.ne = Vector.disequality;

    Vector.equal = Vector.equality;
    Vector.notEqual = Vector.disequality;
    Vector.notEq = Vector.disequality;

    Vector.add = Vector.addition;
    Vector.neg = Vector.negation;
    Vector.sub = Vector.subtraction;

    Vector.prototype.add = Vector.prototype.addition;
    Vector.prototype.neg = Vector.prototype.negation;
    Vector.prototype.sub = Vector.prototype.subtraction;

    Vector.prototype.dotProduct = vectorScalarProduct;
    Vector.prototype.dot = vectorScalarProduct;

    return Vector;
  };
}

itemsPool.setVectorSpace(VectorSpace);

module.exports = VectorSpace;

},{"./Element":10,"./coerced":14,"./comparison":15,"./itemsPool":16,"./method":18,"./rowByColumnMultiplication.js":20,"./toData":21,"algebra-group":2}],14:[function(require,module,exports){
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

},{"./toData":21}],15:[function(require,module,exports){

/**
 * Comparison operator for group and ring classes
 *
 * @api private
 *
 * @param {Function} operator
 *
 * @returns {Function} anonymous accessor
 */

"use strict";

function comparison(operator) {
  return function () {
    return operator.bind(null, this.data).apply(null, arguments);
  };
}

module.exports = comparison;

},{}],16:[function(require,module,exports){
'use strict';

function itemsPool() {
  var MatrixSpace, VectorSpace;

  function getMatrixSpace() {
    if (typeof MatrixSpace === 'undefined') throw new Error('MatrixSpace not yet in items pool');

    return MatrixSpace;
  }

  this.getMatrixSpace = getMatrixSpace;

  function setMatrixSpace(item) {
    if (typeof MatrixSpace === 'undefined') MatrixSpace = item;else throw new Error('MatrixSpace already in items pool');
  }

  this.setMatrixSpace = setMatrixSpace;

  function getVectorSpace() {
    if (typeof VectorSpace === 'undefined') throw new Error('VectorSpace not yet in items pool');

    return VectorSpace;
  }

  this.getVectorSpace = getVectorSpace;

  function setVectorSpace(item) {
    if (typeof VectorSpace === 'undefined') VectorSpace = item;else throw new Error('VectorSpace already in items pool');
  }

  this.setVectorSpace = setVectorSpace;
}

module.exports = new itemsPool();

},{}],17:[function(require,module,exports){

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

"use strict";

function matrixToArrayIndex(i, j, numCols) {
  return j + i * numCols;
}

module.exports = matrixToArrayIndex;

},{}],18:[function(require,module,exports){
"use strict";

function unaryMethod(operator, Scalar) {
  return function () {
    var data = operator(this.data);
    return new Scalar(data);
  };
}

exports.unary = unaryMethod;

function nAryMethod(operator, Scalar) {
  return function () {
    var data = operator.bind(null, this.data).apply(null, arguments);
    return new Scalar(data);
  };
}

exports.nAry = nAryMethod;

},{}],19:[function(require,module,exports){
'use strict';

var realField = {
  zero: 0,
  one: 1,
  contains: function contains(a, b) {
    // NaN, Infinity and -Infinity are not allowed
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

},{}],20:[function(require,module,exports){
'use strict';

var isInteger = require('is-integer'),
    matrixToArrayIndex = require('./matrixToArrayIndex');

/**
 * Multiply two matrices, row by column.
 *
 * @api private
 *
 * @param {Object}   scalar
 * @param {Function} scalar.addition
 * @param {Function} scalar.multiplication
 * @param {Array} leftMatrix
 * @param {Array} leftNumRows
 * @param {Array} rightMatrix
 * @param {Array} rightNumCols
 *
 * @returns {Array} data
 */

function rowByColumnMultiplication(scalar, leftMatrix, leftNumRows, rightMatrix, rightNumCols) {
  var leftNumCols = leftMatrix.length / leftNumRows,
      rightNumRows = rightMatrix.length / rightNumCols;

  if (!isInteger(leftNumCols)) throw new TypeError('leftNumCols does not divide leftMatrix.length');

  if (!isInteger(rightNumRows)) throw new TypeError('rightNumRows does not divide rightMatrix.length');

  // Check if matrices can be multiplied.
  if (leftNumCols !== rightNumRows) throw new TypeError('Left num cols != right num rows');

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

      var element = scalar.multiplication(leftElement, rightElement);

      for (var k = 1; k < commonIndex; k++) {
        leftIndex = matrixToArrayIndex(i, k, commonIndex);
        rightIndex = matrixToArrayIndex(k, j, cols);

        rightElement = rightMatrix[rightIndex];
        leftElement = leftMatrix[leftIndex];

        element = scalar.addition(element, scalar.multiplication(rightElement, leftElement));
      }

      data.push(element);
    }
  }

  return data;
}

module.exports = rowByColumnMultiplication;

},{"./matrixToArrayIndex":17,"is-integer":5}],21:[function(require,module,exports){

/**
 * Extract data attribute, if any, and check it
 *
 * @api private
 *
 * @param {*} arg
 *
 * @returns {*} data
 */

'use strict';

function toData(arg) {
  var data;

  if (typeof arg.data === 'undefined') data = arg;else data = arg.data;

  if (typeof data === 'undefined') throw new TypeError('No data');

  return data;
}

module.exports = toData;

},{}]},{},[1])(1)
});