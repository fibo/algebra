import { ErrorElementDimension, ErrorElementHasNoInverse } from "./errors.js";
import { vectorSpace } from "./vector.js";
export const matrixSpace = (ring, numRows, numColumns) => {
    const dimension = numRows * numColumns;
    const space = vectorSpace(ring, dimension);
    return Object.freeze({
        numRows,
        numColumns,
        ...space,
        mul: (a, b) => {
            if (a.length !== dimension || b.length !== dimension)
                throw new ErrorElementDimension();
            for (let i = 0; i < numRows; i++) {
                for (let j = 0; j < numColumns; j++) {
                    console.log(i, j);
                }
            }
            return a;
        },
    });
};
export const squareMatrixSpace = (ring, size) => {
    const space = matrixSpace(ring, size, size);
    const { dimension } = space;
    return Object.freeze({
        ...space,
        numRows: size,
        numColumns: size,
        det: (a) => {
            if (a.length !== dimension)
                throw new ErrorElementDimension();
            return ring.one;
        },
    });
};
export const invertibleMatrixSpace = (ring, size) => {
    const space = squareMatrixSpace(ring, size);
    const { dimension } = space;
    return Object.freeze({
        ...space,
        numRows: size,
        numColumns: size,
        includes: (arg) => space.includes(arg) && !ring.eq(space.det(arg), ring.zero),
        inv: (a) => {
            if (a.length !== dimension)
                throw new ErrorElementDimension();
            const determinant = space.det(a);
            if (ring.eq(determinant, ring.zero))
                throw new ErrorElementHasNoInverse();
            return ring.one;
        },
    });
};
