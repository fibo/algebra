import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import type { ComplexAlgebraGroupElement } from 'algebra'

class Zi implements ComplexAlgebraGroupElement<bigint> {
	#re: bigint
	#im: bigint
	get value(): [bigint, bigint] {
		return [this.#re, this.#im]
	}

	constructor(re: bigint, im = 0n) {
		this.#re = re
		this.#im = im
	}

	#coerce(arg: unknown): [bigint, bigint] {
		if (arg instanceof Zi)
			return arg.value
		if (Array.isArray(arg) && arg.length === 2) {
			const [a, b] = arg
			if (typeof a === 'bigint' && typeof b === 'bigint')
				return [a, b]
		}
		throw new TypeError('Cannot coerce to Z[i]')
	}

	eq (arg: unknown): boolean {
		const [a, b] = this.#coerce(arg)
		return a === this.#re && b === this.#im
	}
	add (arg: unknown): Zi {
		const [a, b] = this.#coerce(arg)
		this.#re += a
		this.#im += b
		return this
	}
	sub (arg: unknown): Zi {
		const [a, b] = this.#coerce(arg)
		this.#re -= a
		this.#im -= b
		return this
	}
	neg (): Zi {
		this.#re = -this.#re
		this.#im = -this.#im
		return this
	}
}

test('Zi', () => {
	const x = new Zi(2n, 0n)
	x.add([3n, 4n])
	assert.deepEqual(x.value, [5n, 4n])
})
