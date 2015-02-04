---
title: Complex number
---

```js
var algebra = require('algebra');

var C = algebra.Complex

var z1 = new C([1, 2]);
var z1 = new C([0, 3]);
var z3 = new C([-4, 2]);
```

Arithmetic operators are defined

```
// z1 + z2 = [1, 2] + [0, 3] = [1, 5]
z1.add(z2);
console.log(z1.data); // [1, 5]
```

