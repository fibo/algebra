export const vectorSpace = ({ zero, includes, eq, add, sub, neg, mul }, dimension) => Object.freeze({
    dimension,
    zero: Array.from({ length: dimension }).fill(zero),
    includes: (arg) => Array.isArray(arg) && arg.every((value) => includes(value)),
    eq: (a, b) => a.every((value, index) => eq(value, b[index])),
    add: (a, b) => a.map((value, index) => add(value, b[index])),
    sub: (a, b) => a.map((value, index) => sub(value, b[index])),
    neg: (a) => a.map((value) => neg(value)),
    norm: (a) => a.reduce((sum, value) => add(sum, mul(value, value)), zero),
});
