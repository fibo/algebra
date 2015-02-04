# algebra

> Vectors, Matrices, Tensors for Node.js

[![NPM version](https://badge.fury.io/js/algebra.png)](http://badge.fury.io/js/algebra) [![Build Status](https://travis-ci.org/fibo/algebra.png?branch=master)](https://travis-ci.org/fibo/algebra?branch=master) [![Dependency Status](https://gemnasium.com/fibo/algebra.png)](https://gemnasium.com/fibo/algebra)

For more information point your browser to [algebra Homepage](http://g14n.info/algebra).

## Synopsis

```
var algebra = require('algebra');

var R = algebra.Real;

console.log(R.add(1, 2, 3)); // 1 + 2 + 3 = 6

var x = new R(2),
    y = new R(-1);

x.mul(y);
console.log(x.data); // 2 * (-1) = -2

x.add(5).mul(2).inv();
console.log(x.data); // ((-2 + 5) * 2)^(-1) = 0.25
```

See also [algebra quick start](http://g14n.info/algebra/examples/quick-start).

## Installation

With [npm](https://npmjs.org/) do

```bash
$ npm install algebra
```

## License

[MIT](http://g14n.info/mit-licence)

