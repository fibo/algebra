/* eslint-env mocha */

const algebra = require('algebra')
const notDefined = require('not-defined')

const Real = algebra.Real
const VectorSpace = algebra.VectorSpace

const methodBinaryOperator = require('./features/methodBinaryOperator')
const staticBinaryOperator = require('./features/staticBinaryOperator')
const staticUnaryOperator = require('./features/staticUnaryOperator')

const R2 = VectorSpace(Real)(2)
const R3 = VectorSpace(Real)(3)

describe('VectorSpace', () => {
  describe('data', () => {
    const vector = new R2([0, 1])

    it('is enumerable', () => {
      Object.prototype.propertyIsEnumerable.call(vector, 'data').should.be.ok()
    })

    it('is immutable', () => {
      ;(() => {
        'use strict'
        vector.data = [2, 1]
      }).should.throwError()
    })
  })

  describe('addition()', () => {
    const operator = 'addition'

    it('is a static method', staticBinaryOperator(R2, operator, [0, 2], [-1, 3], [-1, 5]))

    it('is a class method', methodBinaryOperator(R2, operator, [0, 1], [1, 1], [1, 2]))
  })

  describe('subtraction()', () => {
    const operator = 'subtraction'

    it('is a static method', staticBinaryOperator(R2, operator, [0, 2], [-1, 3], [1, -1]))

    it('is a class method', methodBinaryOperator(R2, operator, [0, 1], [1, 1], [-1, 0]))
  })

  describe('scalarProduct()', () => {
    it('is a static operator', () => {
      const data = R2.scalarProduct([0, 1], [1, 1])

      data.should.eql(1)
    })

    it('is a class method', () => {
      const vector1 = new R2([0, 1])
      const vector2 = new R2([1, 1])

      const scalar = vector1.scalarProduct(vector2)

      scalar.data.should.be.eql(1)
    })

    it('is returns a scalar', () => {
      const vector1 = new R2([0, 1])
      const vector2 = new R2([1, 1])

      const scalar = vector1.scalarProduct(vector2)

      scalar.data.should.be.eql(1)
    })
  })

  describe('dimension', () => {
    it('is a static attribute', () => {
      const vector1 = new R2([0, 1])
      const vector2 = new R3([1, 1, 2])

      vector1.dimension.should.be.eql(2)
      vector2.dimension.should.be.eql(3)

      R2.dimension.should.be.eql(2)
      R3.dimension.should.be.eql(3)
    })
  })

  describe('norm', () => {
    it('is an attribute holding a scalar', () => {
      const vector1 = new R2([0, 1])
      const vector2 = new R3([1, 1, 2])

      vector1.norm.data.should.be.eql(1)
      vector2.norm.data.should.be.eql(6)
    })
  })

  describe('norm()', () => {
    const operator = 'norm'

    it('is a static method', () => {
      staticUnaryOperator(R2, operator, [0, 1], 1)
      staticUnaryOperator(R3, operator, [1, 1, 2], 6)
    })
  })

  describe('crossProduct()', () => {
    const operator = 'crossProduct'

    it('is a static method', () => {
      staticBinaryOperator(R3, operator, [3, -3, 1], [4, 9, 2], [-15, -2, 39])
    })

    it('is a class method', () => {
      methodBinaryOperator(R3, operator, [3, -3, 1], [-12, 12, -4], [0, 0, 0])
    })

    it('is defined only in dimension 3', () => {
      notDefined(R2.crossProduct).should.be.ok()

      const vector = new R2([1, 0])
      notDefined(vector.crossProduct).should.be.ok()
    })
  })

  describe('cross()', () => {
    it('is an alias of crossProduct()', () => {
      R3.crossProduct.should.be.eql(R3.cross)

      const vector = new R3([1, 0, 1])
      vector.crossProduct.should.be.eql(vector.cross)
    })
  })
})
