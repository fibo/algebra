function permutationsWithRepetitions (previousValue, currentValue, currentIndex, array) {
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

    var previousIteration = arrayWithoutLastElement.reduce(permutationsWithRepetitions, [])

    for (var l = 0; l < previousIteration.length; l++) {
      for (var k = 0; k < currentValue; k++) {
        result.push(previousIteration[l].concat(k))
      }
    }
  }

  return result
}

module.exports = permutationsWithRepetitions
