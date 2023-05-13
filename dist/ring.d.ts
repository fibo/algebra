import { Group } from './Group.js';
export type Ring<Scalar> = Group<Scalar> & {
    one: Scalar;
    mul(a: Scalar, b: Scalar): Scalar;
    inv(a: Scalar, b: Scalar): Scalar;
};
//# sourceMappingURL=Ring.d.ts.map