import { ErrorCannotDivideByZero } from "./errors.js";
export const real = Object.freeze({
    zero: 0,
    one: 1,
    includes: (arg) => typeof arg === "number" && !isNaN(arg) && isFinite(arg),
    eq: (a, b) => a === b,
    add: (a, b) => a + b,
    sub: (a, b) => a - b,
    neg: (a) => -a,
    mul: (a, b) => a * b,
    div: (a, b) => {
        if (b === 0)
            throw new ErrorCannotDivideByZero();
        return a / b;
    },
    inv: (a) => {
        if (a === 0)
            throw new ErrorCannotDivideByZero();
        return 1 / a;
    },
});
export const realProjectiveLine = Object.freeze({
    zero: 0,
    one: 1,
    includes: (arg) => typeof arg === "number" && !isNaN(arg),
    eq: (a, b) => a === b,
    add: (a, b) => a + b,
    sub: (a, b) => a - b,
    neg: (a) => -a,
    mul: (a, b) => a * b,
    div: (a, b) => a / b,
    inv: (a) => 1 / a,
});
