
var util = require('util');

var Group = require('./Group.js');

var abstractMethod = require('./util/abstractMethod.js');

function Ring() {
  var self = this;

//-----------------------------------------------------------------------------

  Group.apply(self, arguments);
};

util.inherits(Ring, Group);

//-----------------------------------------------------------------------------

Ring.prototype.getOne = abstractMethod;

//-----------------------------------------------------------------------------

module.exports = Ring;

