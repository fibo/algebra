import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import type { ComplexAlgebraGroupElement } from 'algebra'

function coerce(arg: unknown): [bigint, bigint] {
	if (Array.isArray(arg) && arg.length === 2) {
		const [a, b] = arg;
		if (typeof a === 'bigint' && typeof b === 'bigint') return [a, b];
	}
	throw new TypeError('Cannot coerce to Z[i]');
}

function Zi(a: bigint, b: bigint): ComplexAlgebraGroupElement<bigint> {
	let re = a
	let im = b
	return {
		get re() { return re },
		get im() { return im },
		valueOf() { return [re, im] },
		eq(arg: unknown): boolean {
			const [a, b] = coerce(arg)
			return a === re && b === im
		},
		add(arg: unknown): ComplexAlgebraGroupElement<bigint> {
			const [a, b] = coerce(arg)
			re += a
			im += b
			return this;
		},
		sub(arg: unknown): ComplexAlgebraGroupElement<bigint> {
			const [a, b] = coerce(arg)
			re -= a
			im -= b
			return this;
		},
		neg(): ComplexAlgebraGroupElement<bigint> {
			re = -re
			im = -im
			return this
		}
	}
}

test('Zi', () => {
	const x = Zi(2n, 0n)
	x.add([3n, 4n])
	assert.equal(x.re, 5n)
	assert.equal(x.im, 4n)
})