
var assert  = require('assert');
var algebra = require('../index.js');

var Collection = algebra.Collection;
var Element    = algebra.Element;

var e1 = new Element(); 
var e2 = new Element(); 
var elements = [e1, e2];
     
describe('Collection', function () {
    describe('constructor:', function () {
      it('accepts an array of elements as sinle argument', function () {
        var collection = new Collection(elements);

        assert.ok(collection instanceof Collection);
      });
    });

    describe('getElements()', function () {
      it('returns the collection\'s elements', function () {
   
      });
    });
});

