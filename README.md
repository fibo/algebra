# algebra

> means completeness and balancing, from the Arabic word الجبر

To install with npm do `npm install algebra`.

Real numbers:

```ts
import { R } from 'algebra';

const x = new R(0.1);
x.add(0.2);
console.log(x.value); // 0.3
```

Complex numbers:

```ts
import { C } from 'algebra';

const z = new C([1, 2]); // 1 + 2i
const z_ = new C(z).conj(); // 1 - 2i
console.log(z.mul(z_).eq(5)); // true
```

See full documentation here: https://fibo.github.io/algebra

