export const Boole = Object.freeze({
    zero: false,
    one: true,
    includes: (arg) => typeof arg === "boolean",
    eq: (a, b) => a === b,
    add: (a, b) => a || b,
    sub: (a, b) => a || b,
    neg: (a) => a,
    mul: (a, b) => a && b,
    div: (a, b) => a && b,
    inv: (a) => a,
});
