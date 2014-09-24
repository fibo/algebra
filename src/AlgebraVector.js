
/**
 * Abstract Vector
 *
 * @param {Object} space instance of AlgebraVectorSpace
 * @param {Array} elements
 */

function AlgebraVector (space, elements) {
  for (var i = 0; i < space.dimension; i ++) {
    var element = elements[i]

    if (typeof element === 'undefined')
      elements[i] = new space.Element()

    if (!element instanceof space.Element)
      elements[i] = new space.Element(element)
  }

  this.elements = elements

  this.space = space

  function getDimension () {
    return space.dimension
  }

  Object.defineProperty(this, 'dimension', {get: getDimension})

  Object.defineProperty(this, 'data', {get: valueOf})
}

/**
 *
 * @param {Object} vector
 *
 * @return {Object} this
 */

function addition (vector) {
  this.elements.forEach(function (element, index) {
    element.addition(vector.elements[index])
  })

  return this
}

AlgebraVector.prototype.addition = addition
AlgebraVector.prototype.add = addition


/**
 *
 * @param {Object} vector
 *
 * @return {Object} this
 */

function subtraction (vector) {
  this.elements.forEach(function (element, index) {
    element.subtraction(vector.elements[index])
  })

  return this
}

AlgebraVector.prototype.subtraction = subtraction

/**
 * 
 * @return {Array} value
 */

function valueOf () {
  var value = []

  this.elements.forEach(function (element) {
    value.push(element.valueOf())
  })

  return value
}

AlgebraVector.prototype.valueOf = valueOf

module.exports = AlgebraVector
