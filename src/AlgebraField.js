
var operators = [
  'addition', 'add', 'subtraction', 'sub', 'multiplication', 'mul', 'division',
  'div', 'equal', 'eq', 'notEqual', 'ne', 'inversion', 'inv', 'negation', 'neg'
]

/**
 * Abstract algebra field
 *
 * ## Examples
 *
 * [Algebra over any field](../examples/algebraOverAnyField.html)
 */

function AlgebraField (zero, one) {

  function getZero() { return zero }

  Object.defineProperty(this, 'zero', {get: getZero})

  function getOne() { return one }

  Object.defineProperty(this, 'one', {get: getOne})
}

function abstractOperator () {
  throw new Error('Unimplemented abstract operator')
}

function isAlgebraField (field) {
  var unimplementedOperators = []

  if (!(field instanceof AlgebraField))
    throw new Error('Not an AlgebraField')

  operators.forEach(function (operator) {
    if (operator === abstractOperator)
      unimplementedOperators.push(operator)
  })

  if (unimplementedOperators.length > 0)
    throw new Error('Unimplemented operators: ' + unimplementedOperators.join(' '))
}

operators.forEach(function (operator) {
  AlgebraField.prototype[operator] = abstractOperator
})

module.exports = AlgebraField

