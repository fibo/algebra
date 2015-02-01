---
title: Real number
layout: default
---

```
var algebra = require('algebra');

var R = algebra.Real;
```

A real number is just a common number.

```
var x1 = new R(4);
var x2 = new R(-1);
var x3 = new R(0.7);
var x4 = new R(2);
```

Arithmetic operators are implemented

```
// x1 + x2 = 4 + (-1) = 3
x1.add(x2);
console.log(x1.data); // 3

// x1 - x2 = 3 - (-1) = 4
x1.sub(x2);
console.log(x1.data); // 4

// x3 * 10 = 0.7 * 10 = 7
x3.mul(10);
console.log(x3.data); // 7

// x4 / 4 = 2 / 4 = 0.5
x3.div(4);
console.log(x4.data); // 0.5
```

Operators can be chained

```
// At this point x1 data should be 4
console.log(x1.data); // 4

// ((( x1 + 2 ) * 3) - 6) / 4 =
// ((( 4 + 2 ) * 3) - 6) / 4 =
// ((6 * 3) - 6) / 4 =
// (18 - 6) / 4 =
// 12 / 4 = 3

x1.add(2).mul(3).sub(6).div(4);
console.log(x1.data); // 3
```

