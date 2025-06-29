import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import type { AlgebraGroupElement } from 'algebra'

class Z implements AlgebraGroupElement<bigint> {
	value: bigint
	#coerceToBigInt(arg: bigint | Z): bigint {
		if (typeof arg === 'bigint')
			return arg
		if (arg instanceof Z)
			return arg.value
		throw new TypeError('Cannot coerce to bigint')
	}
	constructor(value: bigint) {
		this.value = value
	}
	eq(arg: unknown): boolean {
		try {
			if (typeof arg === 'bigint')
				return arg === this.value
			if (arg instanceof Z)
				return arg.value === this.value
			if (typeof arg === 'number')
				return BigInt(arg) === this.value
		} finally { return false }
	}
	add(arg: bigint | Z): Z {
		this.value = this.value + this.#coerceToBigInt(arg)
		return this
	}
	sub(arg: bigint | Z): Z {
		this.value = this.value - this.#coerceToBigInt(arg)
		return this
	}
	neg(): Z {
		this.value = -this.value
		return this
	}
}

test('Z', () => {
	const one = new Z(1n)

	assert.equal(one.value, 1n)

	assert.equal(new Z(2n).add(one).value, 3n)
})

