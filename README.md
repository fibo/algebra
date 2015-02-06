# algebra

> Vectors, Matrices, Tensors for Node.js

[![NPM version](https://badge.fury.io/js/algebra.png)](http://badge.fury.io/js/algebra) [![Build Status](https://travis-ci.org/fibo/algebra.png?branch=master)](https://travis-ci.org/fibo/algebra?branch=master) [![Dependency Status](https://gemnasium.com/fibo/algebra.png)](https://gemnasium.com/fibo/algebra)

For more information point your browser to [algebra Homepage](//g14n.info/algebra).

## Synopsis

```
var algebra = require('algebra');

var R = algebra.Real;

// Static addition operator
console.log(R.add(1, 2, 3)); // 1 + 2 + 3 = 6

// Create two real numbers: x = 2, y = -1
var x = new R(2),
    y = new R(-1);

// Operators on objects are mutators. Here x value is modified, multipling it by y value.
x.mul(y);
console.log(x.data); // 2 * (-1) = -2

// Number coercion and chained operators.
// Resulting x value will be 0.25: x -> x + 5 -> x * 2 -> x ^-1
x.add(5).mul(2).inv();
console.log(x.data); // ((-3 + 5) * 2)^(-1) = 0.25
```

##See also 

* [algebra quick start](//g14n.info/algebra/examples/quick-start)
: A 60 seconds tutorial to get your hands dirty with algebra.

## Installation

With [npm](https://npmjs.org/) do

```bash
$ npm install algebra
```

## License

[MIT](//g14n.info/mit-licence)

