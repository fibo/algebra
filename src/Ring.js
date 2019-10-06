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
