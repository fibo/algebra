const coerce = (arg) => {
    let value = arg;
    if (arg !== null &&
        typeof arg === "object" &&
        typeof arg.valueOf === "function") {
        value = arg.valueOf();
    }
    if (typeof value === "bigint")
        return value;
    if (typeof value === 'number' && !isNaN(value) && Number.isFinite(value) && Number.isInteger(value))
        return BigInt(value);
    throw new Error('Cannot coerce');
};
export const Z = {
    element(arg) {
        let a = coerce(arg);
        return {
            valueOf() {
                return a;
            },
            toString() {
                return a.toString();
            },
            eq(argB) {
                let b = coerce(argB);
                return Z.eq(a, b);
            },
            add(argB) {
                let b = coerce(argB);
                return Z.element(Z.add(a, b));
            },
            sub(argB) {
                let b = coerce(argB);
                return Z.element(Z.sub(a, b));
            },
            neg() {
                return Z.element(Z.neg(a));
            },
        };
    },
    includes(arg) {
        try {
            coerce(arg);
            return true;
        }
        catch {
            return false;
        }
    },
    eq(argA, argB) {
        let a = coerce(argA);
        let b = coerce(argB);
        return a === b;
    },
    zero: 0n,
    add(argA, argB) {
        let a = coerce(argA);
        let b = coerce(argB);
        return a + b;
    },
    sub(argA, argB) {
        let a = coerce(argA);
        let b = coerce(argB);
        return a - b;
    },
    neg(argA) {
        let a = coerce(argA);
        return -a;
    },
};
