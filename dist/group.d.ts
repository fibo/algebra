export type Group<Scalar> = {
    zero: Scalar;
    includes(arg: unknown): boolean;
    add(a: Scalar, b: Scalar): Scalar;
    neg(a: Scalar): Scalar;
};
//# sourceMappingURL=Group.d.ts.map