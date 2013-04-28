
var abstractMethod = require('./util/abstractMethod.js')
  , util = require('util')

function Element() {
  var self = this

  self.getData = abstractMethod
}

Element.prototype.clone     = abstractMethod
Element.prototype.equals    = abstractMethod
Element.prototype.isNotOne  = abstractMethod
Element.prototype.isNotZero = abstractMethod
Element.prototype.isOne     = abstractMethod
Element.prototype.isZero    = abstractMethod
Element.prototype.notEquals = abstractMethod

module.exports = Element

