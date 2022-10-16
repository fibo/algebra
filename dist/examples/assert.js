const equals = (a, b) => {
    if (Array.isArray(a)) {
        if (!Array.isArray(b))
            return false;
        if (a.length !== b.length)
            return false;
        return a.every((value, index) => equals(value, b[index]));
    }
    return Object.is(a, b);
};
export const assertEquals = (a, b) => {
    console.assert(equals(a, b));
};
