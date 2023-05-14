export type AlgebraSetElement<Element> = {
	equal(b: unknown): boolean;
	valueOf(): Element;
	toString(): string;
};
export type AlgebraSet<Element> = {
	element(arg: unknown): AlgebraSetElement<Element>;
	includes(arg: unknown): boolean;
	equal(a: unknown, b: unknown): boolean;
};
