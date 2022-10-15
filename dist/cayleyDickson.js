import { ErrorInvalidDimension } from "./errors";
import { vectorSpace } from "./vector.js";
export const cayleyDickson = (ring, dimension) => {
    if (dimension === 1 ||
        (Math.log(dimension) / Math.log(2)) % 1 !== 0)
        throw new ErrorInvalidDimension();
    const space = vectorSpace(ring, dimension);
    return Object.freeze({
        ...space,
        mul: (a, _b) => a,
        conj: (a) => a.map((value, index) => (index === 0 ? value : ring.neg(value))),
    });
};
