
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
      console.log(dim, a, b)
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

