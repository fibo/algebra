
var abstractMethod = require('./util/abstractMethod.js')
  , util = require('util')

function Element() {
  var self = this
    , arg = arguments[0] || {}
    , _data
  
  function getData () { return _data }
  self.getData = getData

  function setData () {
    var arg = arguments[0]

    _data = arg
  }
  self.setData = setData
}

Element.prototype.addition       = abstractMethod
Element.prototype.clone          = abstractMethod
Element.prototype.division       = abstractMethod
Element.prototype.equals         = abstractMethod
Element.prototype.inversion      = abstractMethod
Element.prototype.isNotOne       = abstractMethod
Element.prototype.isNotZero      = abstractMethod
Element.prototype.isOne          = abstractMethod
Element.prototype.isZero         = abstractMethod
Element.prototype.multiplication = abstractMethod
Element.prototype.notEquals      = abstractMethod
Element.prototype.subtraction    = abstractMethod

module.exports = Element

