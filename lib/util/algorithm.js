
var algorithm = {};

var RealField   = require('../Real/Field.js');

var R = new RealField();

//-----------------------------------------------------------------------------

function determinant(order, elements) {
  var det = R.getZero();

  if (order == 2) {
    det.add(elements[0].mul(elements[3])).sub(elements[2].mul(elements[1]));
    return det;
  }

  // TODO per ora scelgo sempre la prima riga.
  // TODO classe Collection con metodo countZeros o numberOfZeros()
  var rowIndex = 0;

  for (var columnIndex = 0; columnIndex < order; columnIndex++) {
    var adjointElements=getAdjointElements(rowIndex,columnIndex,order,order,elements);
    var adjointDeterminant=determinant(order - 1,adjointElements);
    var element = elements[index(rowIndex, columnIndex, order)];
    if (columnIndex % 2 == 0) {
      det.add(element);
    }
    else {
      det.sub(element);
    }
    det.mul(adjointDeterminant);
  }
  return det;
}

algorithm.determinant = determinant;

//-----------------------------------------------------------------------------

function getAdjointElements(rowIndex, columnIndex, numRows, numCols, elements) {
  var adjointElements = [];
    for (var i = 0; i < numRows; i++) {
      for (var j = 0; j < numCols; j++) {
        if (i != rowIndex && j != columnIndex) {
          adjointElements.push(elements[index(i, j, numCols)]);
        }
      }
    }
  return adjointElements;
};

algorithm.getAdjointElements = getAdjointElements;

//-----------------------------------------------------------------------------

function rowByColumnMultiplication(leftMatrix, rightMatrix) {
  var matricesCanNotBeMultiplied = (leftMatrix.getNumberOfColumns() !== rightMatrix.getNumberOfRows());

  var elements = [];

  // TODO dovrei controllare anche il Field o Ring del Gruppo di Matrici
  // per ora uso secco R
  var ring = R;

  if (matricesCanNotBeMultiplied) throw new Error();

  for (var i = 0; i < leftMatrix.getNumberOfRows(); i++) {
    for (var j = 0; j < rightMatrix.getNumberOfColumns(); j++) {
      var element = ring.getZero();

      for (var k = 0; k < leftMatrix.getNumberOfColumns(); k++) {
        // TODO funzione generica di somma sugli indici, tipo notazione di Einstein.
        var rightElement = leftMatrix.ij(i, k);
        var leftElement = rightMatrix.ij(k, j);
        element.add(ring.mul(rightElement,leftElement));
      }

      elements.push(element);
    }
  }

  return elements;
};


module.exports = algorithm;

