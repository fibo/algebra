export type AlgebraSetElement<T> = {
	readonly value: T
    eq(b: unknown): boolean
    valueOf(): T
}

export type AlgebraGroupElement<T> = AlgebraSetElement<T> & {
    add(arg: unknown): AlgebraGroupElement<T>
    sub(arg: unknown): AlgebraGroupElement<T>
    neg(): AlgebraGroupElement<T>
}

export type AlgebraRingElement<T> = AlgebraSetElement<T> & {
    add(arg: unknown): AlgebraRingElement<T>
    sub(arg: unknown): AlgebraRingElement<T>
    neg(): AlgebraRingElement<T>
    mul(arg: unknown): AlgebraRingElement<T>
    inv(arg: unknown): AlgebraRingElement<T>
}

export type ComplexAlgebraSetElement<T> = {
	readonly re: T
	readonly im: T
    eq(b: unknown): boolean
    valueOf(): [T, T]
}

export type ComplexAlgebraGroupElement<T> = ComplexAlgebraSetElement<T> & {
	add(arg: unknown): ComplexAlgebraGroupElement<T>
	sub(arg: unknown): ComplexAlgebraGroupElement<T>
	neg(): ComplexAlgebraGroupElement<T>
}

export type QuaternionAlgebraSetElement<T> = {
	readonly re: T
	readonly im: [T, T, T]
    eq(b: unknown): boolean
    valueOf(): [T, T, T, T]
}

/**
 * Real numbers.
 *
 * @example
 * const x = R(1.5)
 * x.add(0.5).mul(2) // (1.5 + 0.5) * 2
 * x.value // 4
 *
 * @example square
 * const x = R(3)
 * x.mul(x) // 3 * 3
 * x.value // 9
 */
export declare function R(arg: unknown): AlgebraRingElement<number>
