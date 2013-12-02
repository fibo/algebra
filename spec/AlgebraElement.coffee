
algebra = require '../index'

AlgebraElement = algebra.AlgebraElement
AlgebraField   = algebra.AlgebraField
RealElement    = algebra.RealElement
RealField      = algebra.RealField
ComplexField   = algebra.ComplexField

field   = new AlgebraField()
element = new AlgebraElement(field)

real    = new RealField()
complex = new ComplexField()

describe 'AlgebraElement', ->
  describe 'Constructor', ->
    it 'has signature (field, data)', ->
      field   = new AlgebraField()
      data    = 1
      element = new AlgebraElement(field, data)

      element.should.be.instanceOf AlgebraElement

    it 'has signature (field)', ->
      field   = new AlgebraField()
      element = new AlgebraElement(field)

      element.should.be.instanceOf AlgebraElement

    it 'checks *field* is an AlgebraField', ->
      ( () ->
          element = new AlgebraElement('not a field')
      ).should.throwError()

    it 'defaults *data* to field.one', ->
      field = real
      element = new AlgebraElement(field)

      element.data.should.eql field.one

      field = complex 
      element = new AlgebraElement(field)

      element.data.should.eql field.one

  describe 'Attributes', ->
    describe '#data', ->
      it 'returns element data', ->
        field = real
        data = 6
        element = new AlgebraElement(field, data)

        element.data.should.eql data

    describe '#field', ->
      it 'returns element field', ->
        field = real
        data = 5
        element = new AlgebraElement(field, data)

        element.field.should.eql field

  describe 'Methods', ->
    describe '#clone()', ->
      it 'returns an element with the same data', ->
        data = 10
        element1 = new RealElement(data)
        element2 = element1.clone()

        element2.should.be.instanceOf RealElement
        element1.data.should.be.eql element2.data

    describe '#addition()', ->
      it 'is abstract', ->
        element.addition.should.throwError()

    describe '#add()', ->
      it 'is abstract', ->
        element.add.should.throwError()

    describe '#subtraction()', ->
      it 'is abstract', ->
        element.subtraction.should.throwError()

    describe '#sub()', ->
      it 'is abstract', ->
        element.sub.should.throwError()

    describe '#multiplication()', ->
      it 'is abstract', ->
        element.multiplication.should.throwError()

    describe '#mul()', ->
      it 'is abstract', ->
        element.mul.should.throwError()

    describe '#division()', ->
      it 'is abstract', ->
        element.division.should.throwError()

    describe '#div()', ->
      it 'is abstract', ->
        element.div.should.throwError()

