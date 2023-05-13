export type AlgebraSetElement<Element> = {
    eq(b: Element): boolean;
    valueOf(): Element;
    toString(): string;
};
export type AlgebraSet<Element> = {
    element(arg: Element): AlgebraSetElement<Element>;
    includes(arg: unknown): arg is Element;
    eq(a: Element, b: Element): boolean;
};
//# sourceMappingURL=set.d.ts.map