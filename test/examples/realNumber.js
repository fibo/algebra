
var algebra = require('../../index.js')
  , assert  = require('assert')

var Real = algebra.Real.Element

describe('example', function () {
  it('is ok', function () {

    // Create a real number x = 10.
    
    var x = new Real(10)
    
    //You can use the common arithmetic operators and see result.
    
    x.mul(2) // x -> x * 2
    
    x.add(6) // x -> x + 6 
    
    x.div(2) // x -> x / 2
    
    x.sub(5) // x -> x - 5
    
    assert.equal(x.num(), 8) // 8
    
    // You can use chaining but remember that operator precedence may not be what you expect.
    
    var x1 = new Real(5)
      , x2 = new Real(6)
      , x3 = new Real(2)
    
    x1.add(x2).mul(x3) // x1 -> (x1 + x2) * x3
    
    x1.add(x2.mul(x3)) // x1 -> x1 + (x2 * x3)
    
    // You can invert by addition and multiplication operators.
    
    var ten = new Real(10)
    
    ten.neg()
    
    assert.equal(ten.num(), -10) // -10
    
    ten.inv()
    
    assert.equal(ten.num(), -0.1) // -0.1
    
    // Also inversions can be chained.
    
    ten.inv().neg()
    
    assert.equal(ten.num(), 10) // 10 ( again :)
    
    // Operations can modify a real number. You can clone it if you want to preserve it.
    
    var one = new Real(1)
    
    var y = one.clone()
    
    // 1 -> 10 -> 2 -> 1 -> -1 -> 1 -> 1
    y.mul(10).sub(8).div(2).neg().add(2).inv()
    
    // You can check if two numbers are equal.
    
    assert.ok(one.eq(y))
  })
})

