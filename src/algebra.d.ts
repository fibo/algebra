export type AlgebraSetElement<T> = {
	value: T
	eq(b: unknown): boolean
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
	value: [T, T]
	eq(b: unknown): boolean
	conj(): ComplexAlgebraSetElement<T>
}

export type ComplexAlgebraGroupElement<T> = ComplexAlgebraSetElement<T> & {
	add(arg: unknown): ComplexAlgebraGroupElement<T>
	sub(arg: unknown): ComplexAlgebraGroupElement<T>
	neg(): ComplexAlgebraGroupElement<T>
}

export type ComplexAlgebraRingElement<T> = ComplexAlgebraSetElement<T> & {
	add(arg: unknown): ComplexAlgebraRingElement<T>
	sub(arg: unknown): ComplexAlgebraRingElement<T>
	neg(): ComplexAlgebraRingElement<T>
	mul(arg: unknown): ComplexAlgebraRingElement<T>
	inv(arg: unknown): ComplexAlgebraRingElement<T>
}

export type QuaternionAlgebraSetElement<T> = {
	value: [T, T, T, T]
	eq(b: unknown): boolean
	conj(): QuaternionAlgebraSetElement<T>
}

/**
 * Real numbers.
 *
 * @example
 * const x = new R(1.5)
 * x.add(0.5).mul(2) // (1.5 + 0.5) * 2
 * x.value // 4
 *
 * @example square
 * const x = new R(3)
 * x.mul(x) // 3 * 3
 * x.value // 9
 */
export declare class R implements AlgebraRingElement<number> {
	constructor(value: number | R)
	readonly value: number
	eq(b: unknown): boolean
	add(arg: R | number): R
	sub(arg: R | number): R
	neg(): R
	mul(arg: R | number): R
	inv(arg: R | number): R
}

/**
 * Complex numbers.
 *
 * @example
 * const one = new C(1)
 * z.value // [1, 0]
 *
 * @example
 * const z = new C([1, 1]) // 1 + i
 * z.add(z).conj() // (1 + i) + (1 + i) = 2 + 2i -- conjugate --> = 2 - 2i
 * z.value // [2, -2]
 */
export declare class C implements ComplexAlgebraRingElement<number> {
	constructor(value: number | [number, number] | C)
	readonly value: [number, number]
	eq(b: unknown): boolean
	conj(): C
	add(arg: C | number): C
	sub(arg: C | number): C
	neg(): C
	mul(arg: C | number): C
	inv(arg: C | number): C
}
