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

},{}],7:[function(require,module,exports){
module.exports=function(x){return typeof x==='undefined'}

},{}],8:[function(require,module,exports){
function staticProps (obj) {
  return function (props) {
    var statik = {}

    for (var propName in props) {
      var propValue = props[propName]

      statik[propName] = {
        value: propValue,
        writable: false
      }
    }

    Object.defineProperties(obj, statik)
  }
}
module.exports = staticProps

},{}],9:[function(require,module,exports){
// In browserify context, *strict-mode* fall back to a no op.
module.exports = function (cb) { cb() }

},{}],10:[function(require,module,exports){
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

},{"indices-permutations":4,"multidim-array-index":6}],11:[function(require,module,exports){

/**
 * Abstract element
 *
 * It has a *data* attribute that can contain anything, validated by its *check*.
 *
 * @param {Any} data
 * @param {Function} check
 */

function Element(data, check) {
  if (typeof data === 'undefined') throw new TypeError('Undefined data');

  if (check(data)) this.data = data;else throw new TypeError('Invalid data = ' + data);
}

function valueOf() {
  return this.data;
}

Element.prototype.valueOf = valueOf;

module.exports = Element;

},{}],12:[function(require,module,exports){
var inherits = require('inherits');
var no = require('not-defined');
var operators = require('./operators.json');
var staticProps = require('static-props');
var TensorSpace = require('./TensorSpace');

/**
 * Space of m x n matrices
 *
 * ```
 * var R = algebra.R
 *
 * var R2x2 = algebra.MatrixSpace(R)(2)
 * ```
 *
 * @param {Object} field
 *
 * @returns {Function} anonymous with signature (numRows[, numCols])
 */

function MatrixSpace(field) {

  /**
   * @api private
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

    var AbstractMatrix = TensorSpace([numRows, numCols])(field);

    function Matrix(data) {
      AbstractMatrix.call(this, data);

      staticProps(this, {
        numCols: numCols,
        numRows: numRows
      });
    }

    inherits(Matrix, AbstractMatrix);

    operators.group.forEach(function (operator) {
      Matrix[operator] = AbstractMatrix[operator];
    });

    staticProps(Matrix, {
      isSquare: isSquare,
      numCols: numCols,
      numRows: numRows
    });

    return Matrix;
  };
}

module.exports = MatrixSpace;

},{"./TensorSpace":13,"./operators.json":20,"inherits":5,"not-defined":7,"static-props":8}],13:[function(require,module,exports){
var nAry = require('./nAry');
var staticProps = require('static-props');
var tensorProduct = require('tensor-product');

/**
 * Creates a tensor space that is a class representing a tensor.
 *
 * @param {Array} indices
 * @returns {Function}
 */

function tensorSpace(indices) {
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

  var isScalar = order === 0;

  return function (ring) {
    // Create zero.
    var zero = indices.reduce(function (result, dim) {
      if (isScalar) {
        return ring.zero;
      } else {
        for (var i = 0; i < dim; i++) {
          result.push(ring.zero);
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
      this.data = data;
    }

    Tensor.prototype.addition = function () {
      var args = [].slice.call(arguments);
      var operands = [this.data].concat(args);

      var data = Tensor.addition.apply(null, operands);

      return new Tensor(data);
    };

    Tensor.prototype.add = function () {
      var args = [].slice.call(arguments);
      var operands = [this.data].concat(args);

      var data = Tensor.addition.apply(null, operands);

      return new Tensor(data);
    };

    Tensor.prototype.subtraction = function () {
      var args = [].slice.call(arguments);
      var operands = [this.data].concat(args);

      var data = Tensor.subtraction.apply(null, operands);

      return new Tensor(data);
    };

    Tensor.prototype.sub = function () {
      var args = [].slice.call(arguments);
      var operands = [this.data].concat(args);

      var data = Tensor.subtraction.apply(null, operands);

      return new Tensor(data);
    };

    Tensor.equality = function () {
      return nAry(indices, ring.equality).apply(null, arguments);
    };

    Tensor.eq = function () {
      return nAry(indices, ring.equality).apply(null, arguments);
    };

    Tensor.addition = function () {
      return nAry(indices, ring.addition).apply(null, arguments);
    };

    Tensor.add = function () {
      return nAry(indices, ring.addition).apply(null, arguments);
    };

    Tensor.subtraction = function () {
      return nAry(indices, ring.subtraction).apply(null, arguments);
    };

    Tensor.sub = function () {
      return nAry(indices, ring.subtraction).apply(null, arguments);
    };

    Tensor.product = function (leftData) {
      return function (rightDim) {
        return function (rightData) {
          return tensorProduct(ring.multiplication, indices, rightDim, leftData, rightData);
        };
      };
    };

    staticProps(Tensor)({
      order: order,
      zero: zero
    });

    return Tensor;
  };
}

module.exports = tensorSpace;

},{"./nAry":19,"static-props":8,"tensor-product":10}],14:[function(require,module,exports){
var inherits = require('inherits');
var operators = require('./operators.json');
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
 * @param {Object} field
 *
 * @returns {Function} anonymous with signature (dimension)
 */

function VectorSpace(field) {

  /**
   * @api private
   *
   * @param {Number} dimension
   *
   * @returns {Function} Vector
   */

  return function (dimension) {
    var AbstractVector = TensorSpace([dimension])(field);
    var Scalar = TensorSpace([1])(field);

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

      if (vectorData1.length !== vectorData2.length) throw new TypeError('Vectors have not the same dimension');

      var result = field.multiplication(vectorData1[0], vectorData2[0]);

      for (var i = 1; i < dimension; i++) {
        result = field.addition(result, field.multiplication(vectorData1[i], vectorData2[i]));
      }

      return result;
    }

    /**
     * @class
     */

    function Vector(data) {
      AbstractVector.call(this, data);
    }

    inherits(Vector, AbstractVector);

    Vector.prototype.scalarProduct = function (vector2) {
      var data = this.data;

      var result = scalarProduct(data, vector2);

      return new Scalar(result);
    };

    // Static operators.

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

    return Vector;
  };
}

module.exports = VectorSpace;

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
 function vectorNorm () {
  var result = Scalar.multiplication(data[0], data[0])
   for (var i = 1; i < dimension; i++)
    result = Scalar.addition(result, Scalar.multiplication(data[i], data[i]))
   return new Scalar(result)
}
 Object.defineProperty(this, 'norm', {get: vectorNorm})
 */

/**
 * @api private
 function crossProduct (right) {
  var rightData      = toData(right)
         // TODO complete cross product
}
 // Cross product is defined only in dimension 3.
if (dimension === 3) {
  Vector.prototype.crossProduct = crossProduct
  Vector.prototype.cross        = crossProduct
  Vector.prototype.x            = crossProduct
}
 */

/**
 * @api private
 function vectorScalarProduct (vector) {
  var result = scalarProduct(this.data, vector)
   return new Scalar(result)
}
 Vector.prototype.scalarProduct = vectorScalarProduct
 */

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

},{"./TensorSpace":13,"./operators.json":20,"./toData":22,"inherits":5}],15:[function(require,module,exports){

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

},{"./toData":22}],16:[function(require,module,exports){

/**
 * Comparison operator for group and ring classes
 *
 * @api private
 *
 * @param {Function} operator
 *
 * @returns {Function} anonymous accessor
 */

function comparison(operator) {
  return function () {
    return operator.bind(null, this.data).apply(null, arguments);
  };
}

module.exports = comparison;

},{}],17:[function(require,module,exports){
var algebraRing = require('algebra-ring');
var coerced = require('./coerced');
var comparison = require('./comparison');
var Element = require('./Element');
var inherits = require('inherits');
var method = require('./method');

var nAryMethod = method.nAry;
var unaryMethod = method.unary;

/**
 * Create an algebra scalar.
 *
 * @api private
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

function createScalar(identity, given) {
  var r = algebraRing(identity, given);

  function Scalar(data) {
    Element.call(this, data, given.contains);
  }

  inherits(Scalar, Element);

  // TODO questo codice dovrebbe stare in cayley-dickson
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

module.exports = createScalar;

},{"./Element":11,"./coerced":15,"./comparison":16,"./method":18,"algebra-ring":2,"inherits":5}],18:[function(require,module,exports){

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
var coerced = require('./coerced');

function nAry(indices, operator) {
  var isScalar = indices.length === 1 && indices[0] === 1;

  return function () {
    var op = coerced(operator);

    if (isScalar) {
      return op.apply(null, arguments);
    } else {
      var first = arguments[0];
      var rest = [].slice.call(arguments, 1);
      var dimension = indices.reduce(function (a, b) {
        return a * b;
      }, 1);

      return rest.reduce(function (a, b) {
        var result = [];

        for (var i = 0; i < dimension; i++) {
          result.push(op(a[i], b[i]));
        }

        return result;
      }, first);
    }
  };
}

module.exports = nAry;

},{"./coerced":15}],20:[function(require,module,exports){
module.exports={
  "group": [
    "addition",
    "subtraction"
  ],
  "ring": [
    "multiplication"
  ],
  "aliasesOf": {
    "addition": [
      "add"
    ],
    "multiplication": [
      "mul"
    ],
    "scalarProduct": [
      "dotProduct",
      "dot"
    ],
    "subtraction": [
      "sub"
    ]
  }
}

},{}],21:[function(require,module,exports){
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

},{}],22:[function(require,module,exports){
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
  var iterateCayleyDickson = require('cayley-dickson');
  var realField = require('./src/realField');
  var createScalar = require('./src/createScalar');

  var K0 = iterateCayleyDickson(realField, 0);
  var K1 = iterateCayleyDickson(realField, 1);
  var K2 = iterateCayleyDickson(realField, 2);
  var K3 = iterateCayleyDickson(realField, 3);

  exports.Real = createScalar([K0.zero, K0.one], K0);
  exports.Complex = createScalar([K1.zero, K1.one], K1);
  exports.Quaternion = createScalar([K2.zero, K2.one], K2);
  exports.Octonion = createScalar([K3.zero, K3.one], K3);

  exports.VectorSpace = require('./src/VectorSpace');
  exports.MatrixSpace = require('./src/MatrixSpace');
  exports.TensorSpace = require('./src/TensorSpace');
});

},{"./src/MatrixSpace":12,"./src/TensorSpace":13,"./src/VectorSpace":14,"./src/createScalar":17,"./src/realField":21,"cayley-dickson":3,"strict-mode":9}]},{},[]);
