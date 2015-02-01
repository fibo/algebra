---
title: Boolean Algebra
layout: default
---

Create an algebra field with only two elements: *true* and *false*


Implement a custom field algebra class.

See code [here](https://github.com/fibo/algebra/blob/master/test/examples/Boole.js)

```js
var Boole = require('./Boole')

console.log(Boole.contains(true)); // true
console.log(Boole.contains(10)); // false

console.log(Boole.addition(true, false)); // false
console.log(Boole.addition(true, true)); // true
console.log(Boole.addition(false, false)); // false
```

See also [Complex source](https://github.com/fibo/algebra/blob/master/src/Complex.js) as example.

