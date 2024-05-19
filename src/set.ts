export type AlgebraSetElement<Element> = {
	equal(b: unknown): boolean;
	valueOf(): Element;
	toString(): string;
};

/**
 * An algebra set of elements.
 *
 * @example
 *
 * ```ts
 * const Integers: AlgebraSet<bigint> = {
 * }
 * ```
 */
export type AlgebraSet<Element> = {
	element(arg: unknown): AlgebraSetElement<Element>;
	includes(arg: unknown): boolean;
	equal(a: unknown, b: unknown): boolean;
};
