import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import type { AlgebraGroupElement } from 'algebra'

// This shows an example of algebra group implemented by a class.
class Z implements AlgebraGroupElement<bigint> {
	#value: bigint;
	#coerce(arg: unknown): bigint {
		if (typeof arg === 'bigint') return arg;
		if (typeof arg === 'number') return BigInt(arg);
		if (arg instanceof Z) return arg.value;
		throw new TypeError('Cannot coerce to bigint')
	}
	constructor(value: bigint) {
		this.#value = this.#coerce(value)
	}
	get value(): bigint {
		return this.#value
	}
	valueOf(): bigint {
		return this.#value
	}
	eq(arg: unknown): boolean {
		return this.#value === this.#coerce(arg);
	}
	add(arg: unknown): Z {
		this.#value = this.#value + this.#coerce(arg);
		return this
	}
	sub(arg: unknown): Z {
		this.#value = this.#value - this.#coerce(arg);
		return this
	}
	neg(): Z {
		this.#value = -this.#value
		return this
	}
}

test('Z', () => {
	const one = new Z(1n)

	assert.equal(one.value, 1n)

	assert.equal(new Z(2n).add(one).value, 3n)
})

