---
title: Real vector
---

```
var algebra = require('algebra'),
    should  = require('should')

var V = algebra.VectorSpace,
    R = algebra.Real
```

Create a vector space over Real numbers with dimension 2

```
var R2 = new V(R, 2)
// var R2 = V(R)(2)
var vector1 = new R2([1, 2])
```

Create few vectors

```
var vector1 = new R2.Vector([1, 2])
var vector2 = new R2.Vector([-1, 1])
var vector3 = new R2.Vector([0, 1])
var vector4 = new R2.Vector([2, 0])
```

create vector1 and add it to itself

```
vector1.addition(vector1)
console.log(vector1.data) // [2, 4]
```

add vector2 to vector1

```
vector1.addition(vector2)
console.log(vector1.data) // [1, 5]
```

addition accepts raw data

```
vector1.addition([1, 1])
console.log(vector1.data) // [2, 6]
```

addition is chainable

```
vector1.addition(vector2).addition(vector3)
console.log(vector1.data) // [1, 8]
```

addition accepts more than one argument

```
vector1.addition(vector2, vector3, vector4)
console.log(vector1.data) // [2, 10]
```

